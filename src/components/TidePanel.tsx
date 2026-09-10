"use client";

import { Fragment } from "react";
import { useLang } from "@/components/LangProvider";
import type { Locale } from "@/i18n/translations";
import {
  describeWeekday,
  formatClock,
  type SeaConditions,
  type TideEvent,
  type TidePoint,
} from "@/lib/weather";
import { weatherAdviceCopy } from "@/i18n/weather-advice";
import { buildTideAdvice } from "@/lib/weather-advice";

/**
 * 潮汐板块
 * ------------------------------------------------------------------
 * 1. 潮汐曲线：今天 00:00 起 48 小时的逐小时潮位，标注高 / 低潮与当前时刻；
 * 2. 潮汐表：今天与明天的高潮、低潮时刻与潮位，标出「下一次」；
 * 3. 潮汐提示：按涨潮 / 退潮给出一条可直接照做的安全提示。
 *
 * 曲线只做逐小时采样与极值点标注，不输出任何潮汐预测模型结论；
 * 刻度取自窗口内的实际潮位，读数与数据一致。
 */

/* SVG 坐标空间，实际渲染尺寸由 CSS 决定 */
const CURVE_W = 640;
const CURVE_H = 170;
const CURVE_PAD_Y = 22;

type Mark = {
  event: TideEvent;
  left: number;
  top: number;
  labelLeft: number;
};

function groupByDay(events: TideEvent[]): { date: string; events: TideEvent[] }[] {
  const days: { date: string; events: TideEvent[] }[] = [];
  for (const event of events) {
    const last = days[days.length - 1];
    if (last && last.date === event.date) last.events.push(event);
    else days.push({ date: event.date, events: [event] });
  }
  return days;
}

function shiftDay(date: string, offset: number): string {
  const d = new Date(`${date}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + offset);
  return d.toISOString().slice(0, 10);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function TideCurve({
  series,
  events,
  lowest,
  highest,
  observedAt,
  nowLabel,
  dayLabels,
}: {
  series: TidePoint[];
  events: TideEvent[];
  lowest: number;
  highest: number;
  observedAt: string;
  nowLabel: string;
  dayLabels: [string, string];
}) {
  const span = Math.max(highest - lowest, 0.1);
  const lastIndex = Math.max(series.length - 1, 1);
  const x = (index: number) => (index / lastIndex) * CURVE_W;
  const y = (height: number) => CURVE_PAD_Y + (1 - (height - lowest) / span) * (CURVE_H - CURVE_PAD_Y * 2);

  const line = series
    .map((point, index) => `${index === 0 ? "M" : "L"}${x(index).toFixed(1)},${y(point.height).toFixed(1)}`)
    .join(" ");
  const area = `${line} L${CURVE_W},${CURVE_H} L0,${CURVE_H} Z`;

  const marks: Mark[] = [];
  for (const event of events) {
    const index = series.findIndex((point) => point.time.slice(0, 13) === event.time.slice(0, 13));
    if (index < 0) continue;
    const left = (x(index) / CURVE_W) * 100;
    marks.push({
      event,
      left,
      top: (y(event.height) / CURVE_H) * 100,
      // 标签做边缘收敛，避免首尾事件的时间文字溢出面板
      labelLeft: clamp(left, 8, 92),
    });
  }

  const nowIndex = series.findIndex((point) => point.time.slice(0, 13) >= observedAt.slice(0, 13));
  const nowLeft = nowIndex >= 0 ? (x(nowIndex) / CURVE_W) * 100 : null;

  // 今天与明天的分界（午夜）
  const firstDate = series[0]?.time.slice(0, 10) ?? "";
  const breakIndex = series.findIndex((point) => point.time.slice(0, 10) !== firstDate);
  const breakLeft = breakIndex > 0 ? (x(breakIndex) / CURVE_W) * 100 : null;

  return (
    <div className="tide-curve">
      {/* 绘图区：SVG 与标注层共用同一坐标系，百分比定位才能与曲线对齐 */}
      <div className="tide-plot">
        <svg
          className="tide-curve-svg"
          viewBox={`0 0 ${CURVE_W} ${CURVE_H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="tideFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2f7ea8" stopOpacity="0.26" />
              <stop offset="100%" stopColor="#2f7ea8" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#tideFill)" />
          <path
            className="tide-curve-line"
            d={line}
            fill="none"
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>

        {breakLeft !== null && <span className="tide-daybreak" style={{ left: `${breakLeft}%` }} />}

        {marks.map((mark) => (
          <Fragment key={mark.event.time}>
            <span
              className={`tide-dot tide-dot-${mark.event.type}`}
              style={{ left: `${mark.left}%`, top: `${mark.top}%` }}
            />
            <span
              className={`tide-label tide-label-${mark.event.type}`}
              style={{ left: `${mark.labelLeft}%`, top: `${mark.top}%` }}
            >
              <span aria-hidden="true">{mark.event.type === "high" ? "▲" : "▼"}</span>
              {formatClock(mark.event.time)}
            </span>
          </Fragment>
        ))}

        {nowLeft !== null && (
          <>
            <span className="tide-now-line" style={{ left: `${nowLeft}%` }} />
            <span className="tide-now-label" style={{ left: `${clamp(nowLeft, 6, 94)}%` }}>
              {nowLabel}
            </span>
          </>
        )}

        <span className="tide-scale tide-scale-top">{highest.toFixed(2)} m</span>
        <span className="tide-scale tide-scale-bottom">{lowest.toFixed(2)} m</span>
      </div>

      <div className="tide-axis">
        <span>{dayLabels[0]}</span>
        <span>{dayLabels[1]}</span>
      </div>
    </div>
  );
}

export function TidePanel({ sea, observedAt }: { sea: SeaConditions; observedAt: string }) {
  const { locale } = useLang();
  const l = (locale as Locale) || "es";
  const copy = weatherAdviceCopy[l] || weatherAdviceCopy.es;

  const series = sea.tideSeries;
  if (series.length < 2 || !sea.tides.length) return null;

  const advice = buildTideAdvice(sea, observedAt, l);

  const firstDate = series[0].time.slice(0, 10);
  const tomorrowDate = shiftDay(firstDate, 1);
  const days = groupByDay(sea.tides.filter((event) => event.date === firstDate || event.date === tomorrowDate));

  const nowKey = observedAt.slice(0, 13);
  const nextEvent = sea.tides.find((event) => event.time.slice(0, 13) >= nowKey) ?? null;

  const dayLabel = (date: string) => {
    if (date === firstDate) return copy.tide.today;
    if (date === tomorrowDate) return copy.tide.tomorrow;
    return `${describeWeekday(date, l)} ${Number(date.slice(8, 10))}/${Number(date.slice(5, 7))}`;
  };

  return (
    <div className="tide-panel">
      <div className="tide-head">
        <span className="tide-title">🌊 {copy.tide.title}</span>
        <span className="tide-basis">{copy.tide.basis}</span>
      </div>

      <TideCurve
        series={series}
        events={sea.tides}
        lowest={sea.tideLowest}
        highest={sea.tideHighest}
        observedAt={observedAt}
        nowLabel={copy.tide.now}
        dayLabels={[copy.tide.today, copy.tide.tomorrow]}
      />

      <div className="tide-days">
        {days.map((day) => (
          <div className="tide-day" key={day.date}>
            <div className="tide-day-name">{dayLabel(day.date)}</div>
            <ul className="tide-events">
              {day.events.map((event) => {
                const isNext = nextEvent !== null && nextEvent.time === event.time;
                return (
                  <li key={event.time} className={isNext ? "tide-event is-next" : "tide-event"}>
                    <span className={`tide-event-icon tide-event-icon-${event.type}`} aria-hidden="true">
                      {event.type === "high" ? "▲" : "▼"}
                    </span>
                    <span className="tide-event-type">
                      {event.type === "high" ? copy.sea.highTideShort : copy.sea.lowTideShort}
                    </span>
                    <span className="tide-event-time">{formatClock(event.time)}</span>
                    <span className="tide-event-height">{event.height.toFixed(2)} m</span>
                    {isNext && <span className="tide-event-badge">{copy.tide.next}</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <p className={`tide-note tide-note-${advice.trend}`}>{advice.note}</p>
    </div>
  );
}

export default TidePanel;
