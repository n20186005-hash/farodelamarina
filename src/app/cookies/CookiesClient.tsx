"use client";

import Link from "next/link";
import { useState } from "react";

type CookieCategory = {
  id: string;
  name: string;
  description: string;
  provider: string;
  active: boolean;
  alwaysActive?: boolean;
};

export default function CookiesClient() {
  const [cookieSettings, setCookieSettings] = useState<CookieCategory[]>([
    {
      id: "necessary",
      name: "必要 Cookie",
      description: "这些 Cookie 对于网站正常运行至关重要，无法禁用。",
      provider: "始终保持活跃",
      active: true,
      alwaysActive: true,
    },
    {
      id: "analytics",
      name: "分析型 Cookie",
      description: "它们通过收集匿名使用数据，帮助我们了解访客如何与我们的网站互动。",
      provider: "Google Analytics",
      active: false,
    },
    {
      id: "preferences",
      name: "偏好 Cookie",
      description: "它们会记住您的设置，例如语言和主题偏好。",
      provider: "用户偏好",
      active: true,
    },
    {
      id: "marketing",
      name: "营销 Cookie",
      description: "它们用于展示相关广告并衡量广告活动的有效性。",
      provider: "个性化广告",
      active: false,
    },
  ]);

  const handleToggle = (id: string) => {
    setCookieSettings((prev) =>
      prev.map((cookie) =>
        cookie.id === id && !cookie.alwaysActive
          ? { ...cookie, active: !cookie.active }
          : cookie
      )
    );
  };

  const handleSave = () => {
    // 这里应该实际保存 cookie 设置
    alert("偏好设置已保存！");
  };

  const handleRejectAll = () => {
    setCookieSettings((prev) =>
      prev.map((cookie) =>
        cookie.alwaysActive ? cookie : { ...cookie, active: false }
      )
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-cream)", padding: "2rem" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", background: "#fff", padding: "3rem", borderRadius: "2px", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "var(--color-deep)", marginBottom: "1rem" }}>
          Cookie 设置
        </h1>
        <p style={{ color: "var(--color-stone)", marginBottom: "2rem" }}>
          最后更新时间：2026年6月
        </p>

        <section style={{ marginBottom: "2rem" }}>
          <p style={{ lineHeight: "1.8", color: "var(--color-earth-soft)", marginBottom: "1.5rem" }}>
            我们使用 Cookie 来改善您的浏览体验。您可以在下方管理您的偏好设置。
          </p>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          {cookieSettings.map((cookie) => (
            <div
              key={cookie.id}
              style={{
                padding: "1.5rem",
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: "2px",
                marginBottom: "1rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--color-deep)", margin: 0 }}>
                  {cookie.name}
                </h3>
                <label style={{ display: "flex", alignItems: "center", cursor: cookie.alwaysActive ? "not-allowed" : "pointer" }}>
                  <input
                    type="checkbox"
                    checked={cookie.active}
                    onChange={() => handleToggle(cookie.id)}
                    disabled={cookie.alwaysActive}
                    style={{ marginRight: "0.5rem" }}
                  />
                  <span style={{ fontSize: "0.9rem", color: cookie.active ? "var(--color-teal)" : "var(--color-stone)" }}>
                    {cookie.active ? "激活" : "停用"}
                  </span>
                </label>
              </div>
              <p style={{ fontSize: "0.9rem", lineHeight: "1.6", color: "var(--color-earth-soft)", marginBottom: "0.5rem" }}>
                {cookie.description}
              </p>
              <p style={{ fontSize: "0.8rem", color: "var(--color-stone)", margin: 0 }}>
                提供者：{cookie.provider}
              </p>
            </div>
          ))}
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--color-deep)", marginBottom: "1rem" }}>
            同意管理
          </h2>
          <p style={{ lineHeight: "1.8", color: "var(--color-earth-soft)" }}>
            您可以随时更改您的 Cookie 设置。请注意，禁用某些 Cookie 可能会影响网站的功能。
          </p>
        </section>

        <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
          <button
            onClick={handleSave}
            style={{
              padding: "0.75rem 2rem",
              background: "var(--color-teal)",
              color: "#fff",
              border: "none",
              borderRadius: "2px",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              fontWeight: 500,
            }}
          >
            保存偏好设置
          </button>
          <button
            onClick={handleRejectAll}
            style={{
              padding: "0.75rem 2rem",
              background: "transparent",
              color: "var(--color-teal)",
              border: "1.5px solid var(--color-teal)",
              borderRadius: "2px",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              fontWeight: 500,
            }}
          >
            拒绝一切
          </button>
        </div>

        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(0,0,0,0.1)" }}>
          <Link href="/" style={{ color: "var(--color-teal)", textDecoration: "none" }}>
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
