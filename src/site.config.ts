/**
 * 单景点 SEO 实体绑定配置变量表
 * ------------------------------------------------------------------
 * 全站唯一的实体数据源（Single Source of Truth）。
 * schema.ts / metadata / sitemap / robots / 正文组件均从此处读取，
 * 确保 NAP（名称、地址、地名）在结构化数据与页面展示间完全一致。
 */

export const siteConfig = {
  /** {{DOMAIN_NAME}} 网站域名 */
  domain: process.env.CURRENT_SITE_DOMAIN || "farodelamarina.com",

  /** {{ATTRACTION_FULL_NAME}} 景点官方全称 */
  attractionFullName: "Navy Lighthouse",

  /** {{ATTRACTION_SHORT_NAME}} 景点常用俗称 / 域名对应含义 */
  attractionShortName: "Faro de la Marina",

  /** {{CITY_NAME}} 所在城市 */
  city: "Miraflores",

  /** {{STATE_PROVINCE}} 所在省 / 州 */
  state: "Lima",

  /** {{COUNTRY_NAME}} 所在国家 */
  country: "Peru",

  /** {{COUNTRY_CODE_2LETTER}} 两位国家代码 */
  countryCode: "PE",

  /** {{POSTAL_CODE}} 邮政编码 */
  postalCode: "15074",

  /** 街道地址 */
  streetAddress: "Mal. Cisneros 18",

  /** Google Plus Code */
  plusCode: "VXG5+GW",

  /** {{LATITUDE}} / {{LONGITUDE}} 精确坐标 */
  latitude: -12.1236515,
  longitude: -77.0401591,

  /** {{MAPS_SHARE_URL}} Google Maps 分享短链接 */
  mapsShareUrl: "https://maps.app.goo.gl/7FXLGcATHHeRnALv8",

  /** {{MAPS_EMBED_SRC}} Google Maps 嵌入代码 src */
  mapsEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6938.19840673814!2d-77.0401591!3d-12.1236515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c824155b389f%3A0xd16de2f9bc56fc76!2sNavy%20Lighthouse!5e1!3m2!1szh-CN!2s!4v1789004106858!5m2!1szh-CN!2s",

  /** {{GOVT_TOURISM_URL}} 当地政府 / 官方旅游局链接 */
  govtTourismUrl: "https://www.peru.travel/es/destinos/lima",

  /** 周边核心地标 */
  nearbyLandmarks: ["Love Park (Parque del Amor)", "Larcomar"],

  /** 综合评价数据 */
  ratingValue: "4.7",
  reviewCount: "6688",
  reviewCountDisplay: "6,688",

  /**
   * 灯塔物理参数（最新景点信息）
   * 页面「核心参数看板」与 JSON-LD additionalProperty 共用此处，避免两处读数漂移。
   */
  heightFeet: 72,
  heightMeters: 22,
  rangeNauticalMiles: 18,
  rangeKm: 33,

  /** 塔身所在崖顶海拔（米） */
  altitudeMeters: 86,

  /** 焦平面高度（米） */
  focalHeightMeters: 108,

  /** 光强（坎德拉） */
  luminosityCandelas: "83,000",

  /** 可拆卸铸铁构件数 */
  detachableParts: "319",

  /** 连接螺栓数 */
  connectingBolts: "1,750",

  /** 总重（公斤） */
  weightKg: "60,000",

  /** 建成 / 迁建年份 */
  constructionYear: "1900",
  installationYear: "1973",

  /** 建成时所在地（1900 年原始站址） */
  originalLocation: "Punta Coles, Moquegua",

  /** 建筑材质（结构化数据使用的英文规范值） */
  material: "Cast iron",

  /**
   * 主视觉图 / 首屏图（命名规范：<前缀>-<序号>.<扩展名>，URL 安全，无需转义）。
   * 全站唯一来源：首屏 <img>、og:image 与 JSON-LD 的 image 都读这里，
   * 改动此处即可同时切换页面主视觉与分享卡片 / 结构化数据声明的图。
   */
  heroImage: "/gallery/navy-lighthouse-2.jpg",

  /** GA4 衡量 ID */
  gaMeasurementId: "G-HXM22WWPKP",
} as const;

/** 站点根 URL（无尾斜杠） */
export const siteUrl = `https://${siteConfig.domain}`;

/** 生成某个语言的绝对 URL */
export function localeUrl(locale: string) {
  return `${siteUrl}/${locale}`;
}

/** 完整的 NAP 单行地址 */
export const napAddress = `${siteConfig.streetAddress}, ${siteConfig.city} ${siteConfig.postalCode}, ${siteConfig.state}, ${siteConfig.country}`;
