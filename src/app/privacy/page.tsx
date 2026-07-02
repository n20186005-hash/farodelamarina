import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Parque Bicentenario Travel Guide",
  description: "Privacy policy for Parque Bicentenario Travel Guide",
};

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-cream)", padding: "2rem" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", background: "#fff", padding: "3rem", borderRadius: "2px", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "var(--color-deep)", marginBottom: "1rem" }}>
          隐私政策
        </h1>
        <p style={{ color: "var(--color-stone)", marginBottom: "2rem" }}>
          最后更新时间：2026年6月
        </p>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--color-deep)", marginBottom: "1rem" }}>
            我们收集的信息
          </h2>
          <p style={{ lineHeight: "1.8", color: "var(--color-earth-soft)", marginBottom: "1rem" }}>
            我们仅收集提供服务所必需的最低限度数据。这些数据可能包括：
          </p>
          <ul style={{ lineHeight: "1.8", color: "var(--color-earth-soft)", paddingLeft: "1.5rem" }}>
            <li>浏览数据（IP 地址、浏览器类型、访问页面）</li>
            <li>Cookie 和类似技术</li>
            <li>您通过联系表格或电子邮件自愿提供的任何信息</li>
          </ul>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--color-deep)", marginBottom: "1rem" }}>
            我们如何使用您的信息
          </h2>
          <p style={{ lineHeight: "1.8", color: "var(--color-earth-soft)", marginBottom: "1rem" }}>
            我们使用收集到的信息用于：
          </p>
          <ul style={{ lineHeight: "1.8", color: "var(--color-earth-soft)", paddingLeft: "1.5rem" }}>
            <li>改善网站内容和用户体验</li>
            <li>分析流量和使用模式</li>
            <li>回应请求</li>
            <li>遵守我们的法律义务</li>
          </ul>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--color-deep)", marginBottom: "1rem" }}>
            第三方服务
          </h2>
          <p style={{ lineHeight: "1.8", color: "var(--color-earth-soft)" }}>
            我们的网站可能会使用第三方服务，例如谷歌地图（用于嵌入式地图和位置数据）、谷歌分析（用于流量分析）和 Unsplash（用于图片）。这些服务均有各自的隐私政策。
          </p>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--color-deep)", marginBottom: "1rem" }}>
            您的权利
          </h2>
          <p style={{ lineHeight: "1.8", color: "var(--color-earth-soft)", marginBottom: "1rem" }}>
            根据《通用数据保护条例》(GDPR)及相关法规，您享有以下权利：
          </p>
          <ul style={{ lineHeight: "1.8", color: "var(--color-earth-soft)", paddingLeft: "1.5rem" }}>
            <li>访问您的个人数据</li>
            <li>要求更正或删除</li>
            <li>反对治疗</li>
            <li>向监管机构提出投诉</li>
          </ul>
        </section>

        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(0,0,0,0.1)" }}>
          <Link href="/" style={{ color: "var(--color-teal)", textDecoration: "none" }}>
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
