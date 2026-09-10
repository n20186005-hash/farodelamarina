import type { Locale } from "@/i18n/translations";
import {
  weatherAdviceCopy,
  type AdviceItem,
  type AdviceKey,
  type ItemKey,
} from "@/i18n/weather-advice";
import type { SeaConditions, WeatherData } from "@/lib/weather";

/**
 * 出行建议规则引擎
 * ------------------------------------------------------------------
 * 输入：天气/海况原始数据 + 语言
 * 输出：风险提醒、出行穿搭、游玩安排、随身物品 四组「可直接照做」的建议
 *
 * 三条产品原则（对应普通游客的真实关心点）：
 * 1. 不满足条件的条目「不渲染」，而不是渲染成“无”；
 * 2. 输出的是动作（带伞 / 改期 / 别下海），不是天气现象的复述；
 * 3. 风险提示优先级最高，出现时其余建议只作补充。
 *
 * 阈值参考：中国气象局风力等级、WHO 紫外线指数分级、
 * 以及本景点「临海悬崖 + 城市滨海」的环境特征。
 */

export type SeaLevel = "calm" | "moderate" | "rough";

export type WeatherAdvice = {
  /** 是否存在需要置顶强调的风险 */
  hasRisk: boolean;
  /** 风险提醒（红色置顶，无风险时为空数组） */
  risks: AdviceItem[];
  /** 出行穿搭 */
  outfit: string[];
  /** 游玩安排 */
  plan: string[];
  /** 随身物品 */
  items: AdviceItem[];
  /** 海况分级，用于海边面板的结论 */
  seaLevel: SeaLevel;
};

/** 风险项图标 */
const RISK_ICONS: Partial<Record<AdviceKey, string>> = {
  riskThunder: "⛈️",
  riskDownpour: "🌧️",
  riskGale: "💨",
  riskRoughSea: "🌊",
  riskFog: "🌫️",
  riskExtremeUv: "🥵",
  riskHeat: "🌡️",
};

/* ── 触发阈值（集中在此，便于按景点微调） ── */
const THUNDER_CODES = [95, 96, 99];
const DOWNPOUR_CODES = [65, 82, 99];
const MODERATE_RAIN_CODES = [63, 81];
const LIGHT_RAIN_CODES = [51, 53, 55, 61, 80];
const FOG_CODES = [45, 48];
const CLOUDY_CODES = [2, 3];
const CLEAR_CODES = [0, 1];

const RAIN_PROBABILITY_UMBRELLA = 60; // 降水概率≥60% 提示带伞
const DOWNPOUR_MM = 12; // 日累计降水≥12mm 视为强降雨
const MODERATE_RAIN_MM = 4;
const WIND_MODERATE_KMH = 29; // 约 5 级风
const GUST_MODERATE_KMH = 45;
const WIND_STRONG_KMH = 50; // 约 7 级风
const GUST_STRONG_KMH = 65;
const HOT_C = 28; // 本景点气候下「体感偏热」的起点
const VERY_HOT_C = 32;
const EXTREME_HEAT_C = 35;
const COLD_C = 10;
const TEMP_SWING_C = 8; // 昼夜温差
const UV_PROTECTION = 5; // 需要防晒
const UV_HAT = 8;
const UV_EXTREME = 11;
const HUMIDITY_HIGH = 85;
const FOG_HUMIDITY = 95;
const SEA_MODERATE_M = 1.5;
const SEA_ROUGH_M = 2.5;

export function buildWeatherAdvice(data: WeatherData, locale: Locale): WeatherAdvice {
  const copy = weatherAdviceCopy[locale] || weatherAdviceCopy.es;
  const { current, days, sea } = data;
  const today = days[0];

  const code = today?.code ?? current.weatherCode;
  const precipProbability = today?.precipProbability ?? 0;
  const precipSum = today?.precipSum ?? 0;

  const thunder = THUNDER_CODES.includes(code) || THUNDER_CODES.includes(current.weatherCode);
  const downpour = DOWNPOUR_CODES.includes(code) || precipSum >= DOWNPOUR_MM;
  const moderateRain = MODERATE_RAIN_CODES.includes(code) || precipSum >= MODERATE_RAIN_MM;
  const lightRain =
    LIGHT_RAIN_CODES.includes(code) || precipSum > 0 || current.precipitation > 0;
  const anyRain = thunder || downpour || moderateRain || lightRain;
  const umbrellas = anyRain || precipProbability >= RAIN_PROBABILITY_UMBRELLA;

  const uvMax = Math.max(today?.uvIndexMax ?? 0, current.uvIndex);
  const tempMax = today?.tempMax ?? current.temperature;
  const tempMin = today?.tempMin ?? current.temperature;
  const swing = tempMax - tempMin;

  const wind = Math.max(today?.windMax ?? 0, current.windSpeed);
  const gust = Math.max(today?.windGustMax ?? 0, current.windGust);
  const windy = wind >= WIND_MODERATE_KMH || gust >= GUST_MODERATE_KMH;
  const gale = wind >= WIND_STRONG_KMH || gust >= GUST_STRONG_KMH;

  const foggy = FOG_CODES.includes(code) || FOG_CODES.includes(current.weatherCode);
  const heavyFog = foggy && current.humidity >= FOG_HUMIDITY;
  const cloudy = CLOUDY_CODES.includes(code);
  const clear = CLEAR_CODES.includes(code);

  const hot = tempMax >= HOT_C;
  const veryHot = tempMax >= VERY_HOT_C;
  const cold = tempMax <= COLD_C;

  const wave = sea?.waveHeight ?? 0;
  const seaLevel: SeaLevel = wave >= SEA_ROUGH_M ? "rough" : wave >= SEA_MODERATE_M ? "moderate" : "calm";

  // 利马 4—11 月的 “garúa” 海雾季：天色灰蒙但通常不影响出行，属于提示级别而非风险
  const month = Number((today?.date ?? "").slice(5, 7)) || 0;
  const garua =
    month >= 4 &&
    month <= 11 &&
    !downpour &&
    !moderateRain &&
    precipProbability < RAIN_PROBABILITY_UMBRELLA &&
    (foggy || cloudy);

  /* ── 1. 风险提醒（优先级最高） ── */
  const risks: AdviceItem[] = [];
  const addRisk = (key: AdviceKey) => risks.push({ icon: RISK_ICONS[key] ?? "⚠️", text: copy.messages[key] });

  if (thunder) addRisk("riskThunder");
  if (gale) addRisk("riskGale");
  if (downpour) addRisk("riskDownpour");
  if (seaLevel === "rough") addRisk("riskRoughSea");
  if (heavyFog) addRisk("riskFog");
  if (tempMax >= EXTREME_HEAT_C) addRisk("riskHeat");
  if (uvMax >= UV_EXTREME) addRisk("riskExtremeUv");

  /* ── 2. 出行穿搭（最多 3 条，按体感影响排序） ── */
  const outfit: string[] = [];
  if (gale) outfit.push(copy.messages.outfitGale);
  else if (downpour || moderateRain || thunder) outfit.push(copy.messages.outfitRain);
  else if (lightRain) outfit.push(copy.messages.outfitDrizzle);

  if (veryHot) outfit.push(copy.messages.outfitVeryHot);
  else if (hot) outfit.push(copy.messages.outfitHot);

  if (cold) outfit.push(copy.messages.outfitCold);
  else if (swing >= TEMP_SWING_C) outfit.push(copy.messages.outfitSwing);

  if (current.humidity >= HUMIDITY_HIGH && !cold && outfit.length < 3) {
    outfit.push(copy.messages.outfitHumid);
  }
  if (!outfit.length) outfit.push(copy.messages.outfitMild);

  /* ── 3. 游玩安排（天气决策 + 海边场景，最多 3 条） ── */
  // 天气相关的行程建议最多 2 条，海边建议始终保留（本景点最贴近游客的场景）
  const planWeather: string[] = [];
  const addPlan = (text: string) => {
    if (!planWeather.includes(text)) planWeather.push(text);
  };

  if (thunder) addPlan(copy.messages.planThunder);
  if (downpour || moderateRain) addPlan(copy.messages.planRain);
  else if (lightRain) addPlan(copy.messages.planDrizzle);

  if (clear) addPlan(copy.messages.planClear);
  else if (cloudy) addPlan(copy.messages.planCloudy);
  if ((garua || foggy) && !heavyFog) addPlan(copy.messages.planGarua);

  if (hot) addPlan(copy.messages.planHot);
  if (gale || windy) addPlan(copy.messages.planWind);

  const seaLine = sea
    ? seaLevel === "rough"
      ? copy.messages.planSeaRough
      : copy.messages.planSeaCalm
    : heavyFog
      ? copy.messages.planFog
      : copy.messages.planCalm;

  const plan: string[] = [...planWeather.slice(0, 2), seaLine];

  /* ── 4. 随身物品（按需渲染，最多 6 件） ── */
  const itemKeys: ItemKey[] = [];
  if (umbrellas) itemKeys.push(gale ? "raincoat" : "umbrella");
  if (gale) itemKeys.push("windbreaker");
  if (uvMax >= UV_PROTECTION) {
    itemKeys.push("sunscreen");
    itemKeys.push("sunglasses");
  }
  if (uvMax >= UV_HAT && !windy) itemKeys.push("hat");
  if (hot) itemKeys.push("water");
  if (umbrellas && !gale) itemKeys.push("gripShoes");
  if (cold) itemKeys.push("warmLayer");
  if (!hot && !cold && swing >= TEMP_SWING_C) itemKeys.push("jacket");
  if (heavyFog) itemKeys.push("mask");
  if ((clear || cloudy) && !anyRain) itemKeys.push("camera");
  if (uvMax >= UV_HAT && !itemKeys.includes("water")) itemKeys.push("water");

  const seen = new Set<ItemKey>();
  const items: AdviceItem[] = [];
  for (const key of itemKeys) {
    if (seen.has(key)) continue;
    seen.add(key);
    items.push(copy.items[key]);
    if (items.length >= 6) break;
  }

  return {
    hasRisk: risks.length > 0,
    risks: risks.slice(0, 3),
    outfit: outfit.slice(0, 3),
    plan: plan.slice(0, 3),
    items,
    seaLevel,
  };
}

/* ── 潮汐提示 ────────────────────────────────────────────── */

export type TideTrend = "rising" | "falling" | "steady";

export type TideAdvice = {
  /** 当前潮势 */
  trend: TideTrend;
  /** 一句可直接照做的安全提示 */
  note: string;
};

/**
 * 潮汐动态提示
 * ------------------------------------------------------------------
 * 判定方式：比较「下一次高潮」与「下一次低潮」的先后，先到者决定当前潮势。
 * 这里只输出安全动作，不预测潮时、也不鼓励下海 —— 本景点的礁石区禁止进入，
 * 潮汐板块的价值在于「什么时候该离礁石更远」，而不是赶海攻略。
 */
export function buildTideAdvice(
  sea: SeaConditions | null,
  observedAt: string,
  locale: Locale,
): TideAdvice {
  const copy = weatherAdviceCopy[locale] || weatherAdviceCopy.es;
  const notes = copy.tide.notes;
  const nowKey = observedAt.slice(0, 13);

  const upcoming = (sea?.tides ?? [])
    .filter((event) => event.time.slice(0, 13) >= nowKey)
    .sort((a, b) => a.time.localeCompare(b.time));

  const nextHigh = upcoming.find((e) => e.type === "high") ?? null;
  const nextLow = upcoming.find((e) => e.type === "low") ?? null;

  if (!nextHigh && !nextLow) return { trend: "steady", note: notes.steady };

  let rising: boolean;
  if (!nextHigh) rising = false;
  else if (!nextLow) rising = true;
  else rising = nextHigh.time < nextLow.time;

  return {
    trend: rising ? "rising" : "falling",
    note: rising ? notes.rising : notes.falling,
  };
}
