import type { Metadata } from "next";
import CookiesClient from "./CookiesClient";

export const metadata: Metadata = {
  title: "Cookie 设置 | Faro de la Marina (Navy Lighthouse) 旅游指南",
  description: "管理您的 Cookie 偏好设置。",
};

export default function CookiesPage() {
  return <CookiesClient />;
}
