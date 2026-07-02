"use client";

import React, { useEffect, useState } from "react";
import { useLang } from "@/components/LangProvider";

export function WeatherWidget() {
  const { t, locale } = useLang();
  const [weather, setWeather] = useState<{ temp: number; uv: number; precip: number } | null>(null);

  useEffect(() => {
    // Open-Meteo API for Love Park, Miraflores, Lima (-12.1264, -77.0297)
    fetch("https://api.open-meteo.com/v1/forecast?latitude=-12.1264&longitude=-77.0297&current=temperature_2m,precipitation,uv_index")
      .then(res => res.json())
      .then(data => {
        if (data && data.current) {
          setWeather({
            temp: data.current.temperature_2m,
            uv: data.current.uv_index,
            precip: data.current.precipitation,
          });
        }
      })
      .catch(err => console.error("Weather fetch failed", err));
  }, []);

  if (!weather) return null;

  // Determine UV level string
  let uvLevel = "Low";
  let uvColor = "#28a745";
  if (weather.uv >= 3 && weather.uv < 6) { uvLevel = "Moderate"; uvColor = "#ffc107"; }
  else if (weather.uv >= 6 && weather.uv < 8) { uvLevel = "High"; uvColor = "#fd7e14"; }
  else if (weather.uv >= 8 && weather.uv < 11) { uvLevel = "Very High"; uvColor = "#dc3545"; }
  else if (weather.uv >= 11) { uvLevel = "Extreme"; uvColor = "#6f42c1"; }

  if (locale === "zh") {
    if (weather.uv < 3) uvLevel = "低";
    else if (weather.uv < 6) uvLevel = "中等";
    else if (weather.uv < 8) uvLevel = "高";
    else if (weather.uv < 11) uvLevel = "极高";
    else uvLevel = "危险";
  } else if (locale === "es") {
    if (weather.uv < 3) uvLevel = "Bajo";
    else if (weather.uv < 6) uvLevel = "Moderado";
    else if (weather.uv < 8) uvLevel = "Alto";
    else if (weather.uv < 11) uvLevel = "Muy Alto";
    else uvLevel = "Extremo";
  }

  return (
    <div style={{
      marginTop: "2rem",
      padding: "1.5rem",
      background: "rgba(255,255,255,0.9)",
      borderRadius: "12px",
      border: "1px solid rgba(0,0,0,0.05)",
      boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem"
    }}>
      <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--color-deep)", display: "flex", alignItems: "center", gap: "0.5rem", margin: 0 }}>
        🌤️ {locale === "zh" ? "利马实时天气" : locale === "es" ? "Clima en Lima" : "Live Weather in Lima"}
      </h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", margin: "0.5rem 0" }}>
        <div style={{ background: "#f8f9fa", padding: "0.5rem 1rem", borderRadius: "8px", fontWeight: 600 }}>
          🌡️ {weather.temp}°C
        </div>
        <div style={{ background: "#f8f9fa", padding: "0.5rem 1rem", borderRadius: "8px", fontWeight: 600 }}>
          🌧️ {weather.precip}mm
        </div>
        <div style={{ background: "#f8f9fa", padding: "0.5rem 1rem", borderRadius: "8px", fontWeight: 600, color: uvColor }}>
          ☀️ UV: {weather.uv} ({uvLevel})
        </div>
      </div>
      <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--color-earth)", lineHeight: 1.5 }}>
        {locale === "zh" && `当前紫外线指数：${uvLevel} (${weather.uv})。利马阳光强烈，请备好防晒霜！`}
        {locale === "en" && `Current UV Index: ${uvLevel} (${weather.uv}). Lima sun is strong, apply sunscreen!`}
        {locale === "es" && `Índice UV actual: ${uvLevel} (${weather.uv}). ¡Use protector solar, el sol en Lima es fuerte!`}
        {locale === "qu" && `Inti k'anchay: ${uvLevel} (${weather.uv}). Limapi inti k'anchay, amachakunapaq.`}
      </p>
    </div>
  );
}
