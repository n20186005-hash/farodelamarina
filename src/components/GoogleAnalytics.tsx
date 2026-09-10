import Script from "next/script";

/**
 * Google Analytics 4 (gtag.js) 接入。
 * 通过 next/script 以 afterInteractive 策略加载，避免阻塞首屏渲染。
 */
export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${measurementId}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
