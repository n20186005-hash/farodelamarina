import type { Locale } from "@/i18n/translations";

/**
 * 天气数据层
 * ------------------------------------------------------------------
 * - getWeatherForecast()  服务端取数（在 Server Component 中调用，带缓存）
 * - fetchWeatherLive()    客户端保鲜取数（保证访客看到的是实时数据）
 * - 各类标签与本地化文案
 *
 * 采集维度面向「来海边悬崖景点游览的游客」：
 *   气温 / 体感 / 湿度 / 云量 / 降水概率与累计量 / 风力与阵风 /
 *   紫外线 / 日出日落 / 浪高 / 海浪周期 / 海水温度 /
 *   潮汐（高潮与低潮时刻、逐小时潮位曲线）
 *
 * 说明：界面文案不出现任何接口/授权相关的技术叙述，游客只需要看到天气本身。
 */

export type WeatherCurrent = {
  temperature: number;
  feelsLike: number;
  humidity: number;
  precipitation: number;
  weatherCode: number;
  cloudCover: number;
  pressure: number;
  windSpeed: number;
  windGust: number;
  windDirection: number;
  uvIndex: number;
  isDay: boolean;
};

export type WeatherDay = {
  date: string;
  code: number;
  tempMax: number;
  tempMin: number;
  feelsLikeMax: number;
  feelsLikeMin: number;
  sunrise: string;
  sunset: string;
  /** 当日降水概率上限（%） */
  precipProbability: number;
  /** 当日累计降水量（mm） */
  precipSum: number;
  uvIndexMax: number;
  windMax: number;
  windGustMax: number;
};

export type TideEvent = {
  /** 形如 2026-09-10T14:00（景点所在地时间） */
  time: string;
  /** 所属自然日，形如 2026-09-10 */
  date: string;
  /** 相对平均海平面的潮位高度（米） */
  height: number;
  /** high = 高潮 / low = 低潮 */
  type: "high" | "low";
};

/** 潮位曲线上的一个逐小时采样点 */
export type TidePoint = {
  time: string;
  height: number;
};

export type SeaConditions = {
  /** 有效浪高（米） */
  waveHeight: number;
  /** 海浪周期（秒） */
  wavePeriod: number;
  /** 海水表层温度（℃） */
  seaTemperature: number;
  /** 当日最大浪高（米） */
  waveHeightMax: number;
  nextHighTide: TideEvent | null;
  nextLowTide: TideEvent | null;
  /** 取数窗口内全部高潮 / 低潮事件，按时间升序 */
  tides: TideEvent[];
  /** 逐小时潮位，覆盖今天与明天，用于绘制潮汐曲线 */
  tideSeries: TidePoint[];
  /** 窗口内最低潮位（米），用于曲线刻度 */
  tideLowest: number;
  /** 窗口内最高潮位（米） */
  tideHighest: number;
};

export type WeatherData = {
  current: WeatherCurrent;
  days: WeatherDay[];
  /** 取不到海况时降级为 null，天气主体照常展示 */
  sea: SeaConditions | null;
  /** 观测时间（景点所在时区，形如 2026-09-10T06:12） */
  observedAt: string;
};

/* 潮汐曲线与潮汐表展示的天数（今天 + 明天） */
const TIDE_DISPLAY_DAYS = 2;

export const WEATHER_LATITUDE = -12.1236515;
export const WEATHER_LONGITUDE = -77.0401591;
export const WEATHER_TIMEZONE = "America/Lima";

/** 陆地天气与预报 */
export const WEATHER_ENDPOINT =
  `https://api.open-meteo.com/v1/forecast` +
  `?latitude=${WEATHER_LATITUDE}&longitude=${WEATHER_LONGITUDE}` +
  `&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_gusts_10m,wind_direction_10m,uv_index` +
  `&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_probability_max,precipitation_sum,uv_index_max,wind_speed_10m_max,wind_gusts_10m_max` +
  `&timezone=${encodeURIComponent(WEATHER_TIMEZONE)}&forecast_days=7`;

/** 海况：浪高、周期、海水温度、潮位 */
export const MARINE_ENDPOINT =
  `https://marine-api.open-meteo.com/v1/marine` +
  `?latitude=${WEATHER_LATITUDE}&longitude=${WEATHER_LONGITUDE}` +
  `&current=wave_height,wave_period,sea_surface_temperature` +
  `&daily=wave_height_max` +
  `&hourly=sea_level_height_msl` +
  `&timezone=${encodeURIComponent(WEATHER_TIMEZONE)}&forecast_days=3`;

type CodeGroup = {
  codes: number[];
  icon: string;
  label: Record<Locale, string>;
};

const CODE_GROUPS: CodeGroup[] = [
  {
    codes: [0],
    icon: "☀️",
    label: { es: "Despejado", en: "Clear sky", zh: "晴", qu: "Ch'uya" },
  },
  {
    codes: [1],
    icon: "🌤️",
    label: { es: "Mayormente despejado", en: "Mainly clear", zh: "晴间少云", qu: "Aslla phuyu" },
  },
  {
    codes: [2],
    icon: "⛅",
    label: { es: "Parcialmente nublado", en: "Partly cloudy", zh: "局部多云", qu: "Wakin phuyu" },
  },
  {
    codes: [3],
    icon: "☁️",
    label: { es: "Cubierto", en: "Overcast", zh: "阴", qu: "Phuyusapa" },
  },
  {
    codes: [45, 48],
    icon: "🌫️",
    label: { es: "Neblina costera", en: "Coastal fog", zh: "海雾", qu: "Pukutay" },
  },
  {
    codes: [51, 53, 55],
    icon: "🌦️",
    label: { es: "Llovizna", en: "Drizzle", zh: "毛毛雨", qu: "Aslla para" },
  },
  {
    codes: [56, 57],
    icon: "🧊",
    label: { es: "Llovizna helada", en: "Freezing drizzle", zh: "冻毛毛雨", qu: "Chiri aslla para" },
  },
  {
    codes: [61, 63, 65],
    icon: "🌧️",
    label: { es: "Lluvia", en: "Rain", zh: "降雨", qu: "Para" },
  },
  {
    codes: [66, 67],
    icon: "🧊",
    label: { es: "Lluvia helada", en: "Freezing rain", zh: "冻雨", qu: "Chiri para" },
  },
  {
    codes: [71, 73, 75, 77],
    icon: "🌨️",
    label: { es: "Nieve", en: "Snow", zh: "降雪", qu: "Rit'i" },
  },
  {
    codes: [80, 81, 82],
    icon: "🌦️",
    label: { es: "Chubascos", en: "Rain showers", zh: "阵雨", qu: "Para para" },
  },
  {
    codes: [85, 86],
    icon: "🌨️",
    label: { es: "Chubascos de nieve", en: "Snow showers", zh: "阵雪", qu: "Rit'i para" },
  },
  {
    codes: [95],
    icon: "⛈️",
    label: { es: "Tormenta eléctrica", en: "Thunderstorm", zh: "雷暴", qu: "Illapa" },
  },
  {
    codes: [96, 99],
    icon: "⛈️",
    label: { es: "Tormenta con granizo", en: "Thunderstorm with hail", zh: "雷暴伴冰雹", qu: "Illapa, ruphay" },
  },
];

export function describeWeatherCode(code: number): { icon: string; label: Record<Locale, string> } {
  const group = CODE_GROUPS.find((g) => g.codes.includes(code)) ?? CODE_GROUPS[3];
  return { icon: group.icon, label: group.label };
}

const UV_LEVELS: Record<Locale, string[]> = {
  es: ["Bajo", "Moderado", "Alto", "Muy alto", "Extremo"],
  en: ["Low", "Moderate", "High", "Very high", "Extreme"],
  zh: ["低", "中等", "高", "很高", "极高"],
  qu: ["Pisi", "Chawpi", "Hatun", "Ancha hatun", "Sinchi"],
};

export function describeUv(index: number, locale: Locale): string {
  const levels = UV_LEVELS[locale] || UV_LEVELS.en;
  if (index < 3) return levels[0];
  if (index < 6) return levels[1];
  if (index < 8) return levels[2];
  if (index < 11) return levels[3];
  return levels[4];
}

const COMPASS: Record<Locale, string[]> = {
  es: ["N", "NE", "E", "SE", "S", "SO", "O", "NO"],
  en: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"],
  zh: ["北", "东北", "东", "东南", "南", "西南", "西", "西北"],
  qu: ["N", "NE", "E", "SE", "S", "SO", "O", "NO"],
};

export function describeWindDirection(degrees: number, locale: Locale): string {
  const points = COMPASS[locale] || COMPASS.en;
  const index = Math.round((((degrees % 360) + 360) % 360) / 45) % 8;
  return points[index];
}

const WEEKDAYS: Record<Locale, string[]> = {
  es: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  zh: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
  qu: ["Inti", "Kill", "Atip", "Quyll", "Ch'as", "Illap", "K'uych"],
};

export function describeWeekday(date: string, locale: Locale): string {
  const names = WEEKDAYS[locale] || WEEKDAYS.en;
  return names[new Date(`${date}T12:00:00Z`).getUTCDay()];
}

/** "2026-09-10T06:12" -> "06:12"（接口已按目标时区返回本地时间字符串） */
export function formatClock(iso: string): string {
  if (!iso) return "--:--";
  const time = iso.includes("T") ? iso.split("T")[1] : iso;
  return time.slice(0, 5);
}

function num(value: unknown, fallback = 0): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function parseForecast(payload: any): WeatherData | null {
  const c = payload?.current;
  const d = payload?.daily;
  if (!c || !d?.time?.length) return null;

  const days: WeatherDay[] = d.time.map((date: string, i: number) => ({
    date,
    code: num(d.weather_code?.[i]),
    tempMax: num(d.temperature_2m_max?.[i]),
    tempMin: num(d.temperature_2m_min?.[i]),
    feelsLikeMax: num(d.apparent_temperature_max?.[i]),
    feelsLikeMin: num(d.apparent_temperature_min?.[i]),
    sunrise: String(d.sunrise?.[i] ?? ""),
    sunset: String(d.sunset?.[i] ?? ""),
    precipProbability: num(d.precipitation_probability_max?.[i]),
    precipSum: num(d.precipitation_sum?.[i]),
    uvIndexMax: num(d.uv_index_max?.[i]),
    windMax: num(d.wind_speed_10m_max?.[i]),
    windGustMax: num(d.wind_gusts_10m_max?.[i]),
  }));

  return {
    current: {
      temperature: num(c.temperature_2m),
      feelsLike: num(c.apparent_temperature),
      humidity: num(c.relative_humidity_2m),
      precipitation: num(c.precipitation),
      weatherCode: num(c.weather_code),
      cloudCover: num(c.cloud_cover),
      pressure: num(c.pressure_msl),
      windSpeed: num(c.wind_speed_10m),
      windGust: num(c.wind_gusts_10m),
      windDirection: num(c.wind_direction_10m),
      uvIndex: num(c.uv_index),
      isDay: Boolean(num(c.is_day, 1)),
    },
    days,
    sea: null,
    observedAt: String(c.time ?? ""),
  };
}

/**
 * 从逐小时潮位序列中识别高潮 / 低潮极值点。
 * 只做极值点识别，不引入任何专业潮汐模型，避免给出不准确的潮时。
 */
function extractTides(times: string[], heights: number[], nowIso: string) {
  const events: TideEvent[] = [];

  for (let i = 1; i < heights.length - 1; i += 1) {
    const prev = heights[i - 1];
    const cur = heights[i];
    const next = heights[i + 1];
    if (![prev, cur, next].every((v) => Number.isFinite(v))) continue;
    const time = String(times[i] ?? "");
    if (!time) continue;
    const date = time.slice(0, 10);
    if (cur > prev && cur >= next) events.push({ time, date, height: cur, type: "high" });
    else if (cur < prev && cur <= next) events.push({ time, date, height: cur, type: "low" });
  }

  const nowKey = nowIso.slice(0, 13);
  const upcoming = (type: TideEvent["type"]) =>
    events.find((e) => e.type === type && e.time.slice(0, 13) >= nowKey) ?? null;

  return { events, nextHigh: upcoming("high"), nextLow: upcoming("low") };
}

/** 潮汐曲线窗口：从今天 00:00 起取 TIDE_DISPLAY_DAYS 天逐小时潮位 */
function buildTideSeries(times: string[], levels: number[]): TidePoint[] {
  const start = times.findIndex((t) => typeof t === "string" && t.endsWith("T00:00"));
  const from = start >= 0 ? start : 0;
  const limit = TIDE_DISPLAY_DAYS * 24;
  const series: TidePoint[] = [];

  for (let i = from; i < times.length && series.length < limit; i += 1) {
    const height = levels[i];
    if (!Number.isFinite(height)) continue;
    series.push({ time: String(times[i] ?? ""), height });
  }
  return series;
}

function parseMarine(payload: any, nowIso: string): SeaConditions | null {
  const c = payload?.current;
  if (!c || typeof c.wave_height !== "number") return null;

  const times: string[] = payload?.hourly?.time ?? [];
  const levels: number[] = (payload?.hourly?.sea_level_height_msl ?? []).map((v: unknown) => num(v, NaN));
  const hasTideData = times.length > 0 && levels.length > 0;

  const tideData = hasTideData
    ? extractTides(times, levels, nowIso)
    : { events: [] as TideEvent[], nextHigh: null, nextLow: null };
  const tideSeries = hasTideData ? buildTideSeries(times, levels) : [];

  // 曲线刻度以展示窗口内的实际潮位为准，读数与实际数据一致
  const scale = tideSeries.length ? tideSeries.map((p) => p.height) : levels.filter((v) => Number.isFinite(v));

  return {
    waveHeight: num(c.wave_height),
    wavePeriod: num(c.wave_period),
    seaTemperature: num(c.sea_surface_temperature),
    waveHeightMax: num(payload?.daily?.wave_height_max?.[0], num(c.wave_height)),
    nextHighTide: tideData.nextHigh,
    nextLowTide: tideData.nextLow,
    tides: tideData.events,
    tideSeries,
    tideLowest: scale.length ? Math.min(...scale) : 0,
    tideHighest: scale.length ? Math.max(...scale) : 0,
  };
}

/** 并行请求陆地天气与海况；任一路失败都不影响另一路 */
async function requestWeather(init?: RequestInit): Promise<WeatherData | null> {
  const [forecast, marine] = await Promise.all([
    fetch(WEATHER_ENDPOINT, init)
      .then((res) => (res.ok ? res.json() : null))
      .catch(() => null),
    fetch(MARINE_ENDPOINT, init)
      .then((res) => (res.ok ? res.json() : null))
      .catch(() => null),
  ]);

  const parsed = forecast ? parseForecast(forecast) : null;
  if (!parsed) return null;

  const observedAt = parsed.observedAt;
  if (marine) {
    try {
      parsed.sea = parseMarine(marine, observedAt);
    } catch {
      parsed.sea = null;
    }
  }
  return parsed;
}

/**
 * 服务端取数：在 Server Component 中调用，结果进入 Next.js 数据缓存。
 * 取数失败时返回 null，页面降级为客户端拉取，不会因为第三方服务中断而报错。
 */
export async function getWeatherForecast(): Promise<WeatherData | null> {
  return requestWeather({ next: { revalidate: 1800 } } as RequestInit);
}

/** 客户端保鲜取数：访客打开页面后拉取一次实时数据，避免静态产物里的天气过期。 */
export async function fetchWeatherLive(): Promise<WeatherData | null> {
  return requestWeather({ cache: "no-store" });
}
