import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Parque Bicentenario Travel Guide",
  description: "Terms of service for Parque Bicentenario Travel Guide",
};

export default function TermsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-cream)", padding: "2rem" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", background: "#fff", padding: "3rem", borderRadius: "2px", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "var(--color-deep)", marginBottom: "1rem" }}>
          服务条款
        </h1>
        <p style={{ color: "var(--color-stone)", marginBottom: "2rem" }}>
          最后更新时间：2026年6月
        </p>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--color-deep)", marginBottom: "1rem" }}>
            访问和使用
          </h2>
          <p style={{ lineHeight: "1.8", color: "var(--color-earth-soft)" }}>
            访问和使用本网站，即表示您同意受这些服务条款的约束。
          </p>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--color-deep)", marginBottom: "1rem" }}>
            内容使用
          </h2>
          <p style={{ lineHeight: "1.8", color: "var(--color-earth-soft)" }}>
            本网站所有内容仅供参考。我们是一家独立的第三方旅游信息网站，与任何旅游景点、政府机构或商业运营商均无关联。
          </p>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--color-deep)", marginBottom: "1rem" }}>
            信息的准确性
          </h2>
          <p style={{ lineHeight: "1.8", color: "var(--color-earth-soft)" }}>
            我们力求提供准确及时的信息，但无法保证信息的完整性或准确性。行程安排、条件和服务如有变更，恕不另行通知。请务必在出行前通过官方渠道核实重要信息。
          </p>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--color-deep)", marginBottom: "1rem" }}>
            知识产权
          </h2>
          <p style={{ lineHeight: "1.8", color: "var(--color-earth-soft)" }}>
            本网站设计和原创内容受版权保护。图片来自 Unsplash，并已获得其许可。Google 地图数据的使用符合 Google 的服务条款。
          </p>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--color-deep)", marginBottom: "1rem" }}>
            责任限制
          </h2>
          <p style={{ lineHeight: "1.8", color: "var(--color-earth-soft)" }}>
            本网站按&quot;现状&quot;提供，不作任何担保。对于因使用本网站信息而造成的任何损失，包括但不限于基于本网站内容做出的旅行决定，我们概不负责。
          </p>
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
