"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/components/LangProvider";
import type { Locale } from "@/i18n/translations";
import {
  fetchWeatherLive,
  describeWeatherCode,
  describeUv,
  describeWindDirection,
  describeWeekday,
  formatClock,
  type WeatherData,
} from "@/lib/weather";
import { buildWeatherAdvice } from "@/lib/weather-advice";
import { weatherAdviceCopy } from "@/i18n/weather-advice";
import { TidePanel } from "@/components/TidePanel";

const COPY: Record<
  Locale,
  {
    title: string;
    updatedAt: string;
    feels: string;
    humidity: string;
    wind: string;
    gust: string;
    uvPeak: string;
    rainChance: string;
    sunrise: string;
    sunset: string;
    forecast: string;
    today: string;
    units: string;
    unavailable: string;
  }
> = {
  es: {
    title: "Clima en el faro",
    updatedAt: "Actualizado",
    feels: "Sensación",
    humidity: "Humedad",
    wind: "Viento",
    gust: "Rachas",
    uvPeak: "UV máximo",
    rainChance: "Prob. de lluvia",
    sunrise: "Amanecer",
    sunset: "Atardecer",
    forecast: "Próximos 7 días",
    today: "Hoy",
    units: "Temperatura en °C · viento en km/h · lluvia en mm · olas en metros",
    unavailable: "La información del tiempo no está disponible en este momento.",
  },
  en: {
    title: "Weather at the lighthouse",
    updatedAt: "Updated",
    feels: "Feels like",
    humidity: "Humidity",
    wind: "Wind",
    gust: "Gusts",
    uvPeak: "Peak UV",
    rainChance: "Rain chance",
    sunrise: "Sunrise",
    sunset: "Sunset",
    forecast: "Next 7 days",
    today: "Today",
    units: "Temperature in °C · wind in km/h · rain in mm · waves in metres",
    unavailable: "Weather information is not available right now.",
  },
  zh: {
    title: "灯塔实时天气",
    updatedAt: "更新于",
    feels: "体感",
    humidity: "湿度",
    wind: "风力",
    gust: "阵风",
    uvPeak: "紫外线峰值",
    rainChance: "降水概率",
    sunrise: "日出",
    sunset: "日落",
    forecast: "未来 7 天预报",
    today: "今天",
    units: "气温 °C · 风力 km/h · 降水 mm · 浪高 米",
    unavailable: "暂时无法获取天气信息，请稍后再试。",
  },
  qu: {
    title: "Faro wayran",
    updatedAt: "Musuqyachisqa",
    feels: "Rikch'akuy",
    humidity: "Ch'ichi yakuy",
    wind: "Wayra",
    gust: "Wayra kallpa",
    uvPeak: "Inti kallpa",
    rainChance: "Para kanman",
    sunrise: "Paqarin",
    sunset: "Ch'isiyay",
    forecast: "Qatiq 7 p'unchaw",
    today: "Kunan",
    units: "Q'uñi °C · wayra km/h · para mm · yaku hatun kay metro",
    unavailable: "Wayra willakuyta mana tarinchikku.",
  },
};

export function WeatherWidget({ initial }: { initial: WeatherData | null }) {
  const { locale } = useLang();
  const l = (locale as Locale) || "es";
  const copy = COPY[l] || COPY.es;

  const [data, setData] = useState<WeatherData | null>(initial);

  // 客户端保鲜：静态产物里的天气会随时间过期，这里拉取一次实时数据覆盖
  useEffect(() => {
    let active = true;
    fetchWeatherLive()
      .then((fresh) => {
        if (active && fresh) setData(fresh);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  if (!data) {
    return (
      <div className="weather-panel">
        <div className="weather-panel-head">
          <span className="weather-panel-title">🌤️ {copy.title}</span>
        </div>
        <p className="weather-unavailable">{copy.unavailable}</p>
      </div>
    );
  }

  const { current, days, sea } = data;
  const advice = buildWeatherAdvice(data, l);
  const adviceCopy = weatherAdviceCopy[l] || weatherAdviceCopy.es;
  const seaVerdict =
    advice.seaLevel === "calm"
      ? adviceCopy.sea.verdictCalm
      : advice.seaLevel === "moderate"
        ? adviceCopy.sea.verdictModerate
        : adviceCopy.sea.verdictRough;
  const currentInfo = describeWeatherCode(current.weatherCode);
  const today = days[0];
  const week = days.slice(0, 7);
  const uvPeak = Math.max(today?.uvIndexMax ?? 0, current.uvIndex);

  const stats = [
    { icon: "🌡️", label: copy.feels, value: `${Math.round(current.feelsLike)}°C` },
    { icon: "💧", label: copy.humidity, value: `${Math.round(current.humidity)}%` },
    {
      icon: "💨",
      label: copy.wind,
      value: `${Math.round(current.windSpeed)} km/h ${describeWindDirection(current.windDirection, l)}`,
    },
    { icon: "🌬️", label: copy.gust, value: `${Math.round(Math.max(current.windGust, today?.windGustMax ?? 0))} km/h` },
    { icon: "☀️", label: copy.uvPeak, value: `${uvPeak.toFixed(0)} · ${describeUv(uvPeak, l)}` },
    { icon: "🌧️", label: copy.rainChance, value: `${Math.round(today?.precipProbability ?? 0)}%` },
  ];

  return (
    <div className="weather-panel">
      <div className="weather-panel-head">
        <span className="weather-panel-title">🌤️ {copy.title}</span>
        <span className="weather-panel-meta">
          {copy.updatedAt} {formatClock(data.observedAt)}
        </span>
      </div>

      <div className="weather-now">
        <div className="weather-now-main">
          <span className="weather-now-icon" aria-hidden="true">
            {currentInfo.icon}
          </span>
          <div>
            <div className="weather-now-temp">{Math.round(current.temperature)}°C</div>
            <div className="weather-now-desc">{currentInfo.label[l]}</div>
          </div>
        </div>
        <div className="weather-now-stats">
          {stats.map((s, i) => (
            <div className="weather-stat" key={i}>
              <span className="weather-stat-icon" aria-hidden="true">
                {s.icon}
              </span>
              <span className="weather-stat-label">{s.label}</span>
              <span className="weather-stat-value">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {today && (
        <div className="weather-sun">
          <span>
            🌅 {copy.sunrise} <strong>{formatClock(today.sunrise)}</strong>
          </span>
          <span>
            🌇 {copy.sunset} <strong>{formatClock(today.sunset)}</strong>
          </span>
        </div>
      )}

      {/* ── 海边情况：临海悬崖景点的专属维度 ── */}
      {sea && (
        <div className="marine-panel">
          <div className="marine-head">
            <span className="marine-title">🌊 {adviceCopy.sea.title}</span>
            <span className={`marine-verdict marine-verdict-${advice.seaLevel}`}>
              {seaVerdict}
            </span>
          </div>
          <div className="marine-grid">
            <div className="marine-item">
              <span className="marine-item-icon" aria-hidden="true">🌊</span>
              <span className="marine-item-label">{adviceCopy.sea.wave}</span>
              <span className="marine-item-value">{sea.waveHeight.toFixed(1)} m</span>
            </div>
            <div className="marine-item">
              <span className="marine-item-icon" aria-hidden="true">📈</span>
              <span className="marine-item-label">{adviceCopy.sea.waveMax}</span>
              <span className="marine-item-value">{sea.waveHeightMax.toFixed(1)} m</span>
            </div>
            <div className="marine-item">
              <span className="marine-item-icon" aria-hidden="true">⏱️</span>
              <span className="marine-item-label">{adviceCopy.sea.period}</span>
              <span className="marine-item-value">{sea.wavePeriod.toFixed(1)} s</span>
            </div>
            <div className="marine-item">
              <span className="marine-item-icon" aria-hidden="true">🌡️</span>
              <span className="marine-item-label">{adviceCopy.sea.temperature}</span>
              <span className="marine-item-value">{sea.seaTemperature.toFixed(1)} °C</span>
            </div>
          </div>
          <p className="marine-note">{adviceCopy.sea.note}</p>
        </div>
      )}

      {/* ── 潮汐：逐小时潮位曲线 + 今日/明日潮汐表 + 潮势安全提示 ── */}
      {sea && <TidePanel sea={sea} observedAt={data.observedAt} />}

      {/* ── 出行建议：风险置顶，其余按「穿搭 / 游玩 / 随身」三块输出 ── */}
      <div className="advice-area">
        {advice.hasRisk ? (
          <div className="risk-banner" role="alert">
            <div className="risk-banner-title">⚠️ {adviceCopy.blocks.severe}</div>
            <ul className="risk-list">
              {advice.risks.map((risk, i) => (
                <li key={i}>
                  <span aria-hidden="true">{risk.icon}</span>
                  <span>{risk.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="risk-clear">
            <span aria-hidden="true">✅</span> {adviceCopy.allClear}
          </p>
        )}

        <div className="advice-grid">
          <div className="advice-block">
            <div className="advice-block-head">
              <span aria-hidden="true">👕</span> {adviceCopy.blocks.outfit}
            </div>
            <ul className="advice-list">
              {advice.outfit.map((text, i) => (
                <li key={i}>{text}</li>
              ))}
            </ul>
          </div>

          <div className="advice-block">
            <div className="advice-block-head">
              <span aria-hidden="true">🗺️</span> {adviceCopy.blocks.plan}
            </div>
            <ul className="advice-list">
              {advice.plan.map((text, i) => (
                <li key={i}>{text}</li>
              ))}
            </ul>
          </div>

          <div className="advice-block">
            <div className="advice-block-head">
              <span aria-hidden="true">🎒</span> {adviceCopy.blocks.items}
            </div>
            <div className="advice-chips">
              {advice.items.map((item, i) => (
                <span className="advice-chip" key={i}>
                  <span aria-hidden="true">{item.icon}</span> {item.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="weather-forecast">
        <div className="weather-forecast-title">{copy.forecast}</div>
        <div className="weather-forecast-grid">
          {week.map((day, i) => {
            const info = describeWeatherCode(day.code);
            return (
              <div className="weather-day" key={day.date}>
                <div className="weather-day-name">
                  {i === 0 ? copy.today : describeWeekday(day.date, l)}
                </div>
                <div className="weather-day-icon" aria-hidden="true">
                  {info.icon}
                </div>
                <div className="weather-day-temps">
                  <span className="weather-day-max">{Math.round(day.tempMax)}°</span>
                  <span className="weather-day-min">{Math.round(day.tempMin)}°</span>
                </div>
                <div className="weather-day-rain">
                  <span aria-hidden="true">💧</span>
                  {Math.round(day.precipProbability)}%
                </div>
              </div>
            );
          })}
        </div>
        <p className="weather-units">{copy.units}</p>
      </div>
    </div>
  );
}

export default WeatherWidget;
