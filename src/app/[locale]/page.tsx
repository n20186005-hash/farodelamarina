import HomeClient from "@/components/HomeClient";
import { WeatherForecast } from "@/components/WeatherForecast";

const SUPPORTED_LOCALES = ["es", "en", "zh", "qu"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

/**
 * 页面外壳（Server Component）
 * ------------------------------------------------------------------
 * 由服务端负责取数（天气）并把结果渲染结果作为 slot 交给客户端岛，
 * 客户端岛负责全部交互与语言切换。
 */
export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const safeLocale: SupportedLocale = (SUPPORTED_LOCALES as readonly string[]).includes(locale)
    ? (locale as SupportedLocale)
    : "es";

  return <HomeClient locale={safeLocale} weatherSlot={<WeatherForecast />} />;
}
