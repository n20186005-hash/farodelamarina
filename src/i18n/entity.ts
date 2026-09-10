import type { FAQItem, Locale } from "./translations";
import { siteConfig } from "@/site.config";

/**
 * 单景点实体语义内容（多语言）
 * ------------------------------------------------------------------
 * 使用「变量」在语义层面将域名含义（Faro de la Marina）
 * 与官方全称（Navy Lighthouse）等同，并绑定「城市 → 省 → 国家」层级。
 * 该模块被页面正文与 JSON-LD 结构化数据共同消费，保证实体一致。
 */

export type EntitySection = { title: string; content: string };
export type EntitySource = { name: string; url: string };

export type EntityContent = {
  /** H1 中展示的官方全称 + 城市 */
  heroOfficialName: string;
  breadcrumbLabel: string;
  /** {{ATTRACTION_FULL_NAME}} → {{CITY}} → {{STATE}} → {{COUNTRY}} */
  breadcrumb: string[];
  /** 首段等位声明模板 */
  welcome: string;
  guideLabel: string;
  about: EntitySection;
  location: EntitySection;
  landmarks: EntitySection;
  history: EntitySection;
  sources: {
    title: string;
    intro: string;
    officialUpdate: string;
    officialUpdateLink: string;
    items: EntitySource[];
  };
  galleryCopyright: string;
  plusCode: string;
  nap: { title: string; name: string; address: string; maps: string };
  /** 追加到现有 FAQ 的问题（用于补充至 5~8 条并生成 FAQPage） */
  faqExtra: FAQItem[];
};

const mapsUrl = siteConfig.mapsShareUrl;

export const entityContent: Record<Locale, EntityContent> = {
  en: {
    heroOfficialName: "Navy Lighthouse (Miraflores)",
    breadcrumbLabel: "You are here",
    breadcrumb: ["Navy Lighthouse", "Miraflores", "Lima", "Peru"],
    welcome:
      "Welcome to **Navy Lighthouse**, widely recognized as the central **Faro de la Marina**. Located in the heart of **Miraflores**, **Lima**, **Peru**, this destination serves as a primary hub for travelers visiting the region.",
    guideLabel: "Visitor Guide Overview",
    about: {
      title: "About Navy Lighthouse",
      content:
        "**Navy Lighthouse** (Spanish: **Faro de la Marina**) is a 72-foot (22 m) cast-iron lighthouse perched on the Miraflores cliff at Mal. Cisneros 18, Miraflores 15074, Peru. Its white beam reaches 18 nautical miles (about 33 km) out over the Pacific Ocean, making it the most visited lighthouse and the best free public viewpoint in Lima.",
    },
    location: {
      title: "Location & How to Visit Faro de la Marina in Miraflores",
      content:
        "The lighthouse stands on the Malecón Cisneros coastal promenade at Plus Code VXG5+GW, about a 15-minute walk from Kennedy Park in central Miraflores. Admission is free and the park is open 24 hours a day, all year round — sunset is the most popular time to visit. Use the map below for live directions.",
    },
    landmarks: {
      title: "Landmarks & Attractions Around Faro de la Marina",
      content:
        "When visiting **Navy Lighthouse**, visitors can easily explore surrounding historical landmarks and points of interest, including **Love Park (Parque del Amor)** and **Larcomar**, both within walking distance along the Miraflores cliffs.",
    },
    history: {
      title: "History & Significance of Navy Lighthouse",
      content:
        "Completed in 1900 by the Swedish firm Chance Bros at Punta Coles, Moquegua, the tower was dismantled and re-erected by the Peruvian Navy's Directorate of Hydrography and Navigation (DHNM) on the Miraflores cliffs in December 1973, to commemorate the centenary of Peruvian maritime history.",
    },
    sources: {
      title: "Sources & Official References",
      intro:
        "This independent visitor guide is compiled and fact-checked against the official and authoritative sources listed below. Always confirm travel details with the relevant organisations before you travel.",
      officialUpdate: "For official updates and regional tourism information, visit",
      officialUpdateLink: "Peru / Lima Official Tourism Portal",
      items: [
        { name: "Peru Ministry of Foreign Trade and Tourism (MINCETUR)", url: "https://www.gob.pe/mincetur" },
        { name: "Official Peru Travel Guide — Lima Region (peru.travel)", url: "https://www.peru.travel/es/destinos/lima" },
        { name: "Municipality of Miraflores (miraflores.gob.pe)", url: "https://www.miraflores.gob.pe/" },
        { name: "Peruvian Navy Directorate of Hydrography and Navigation (DHNM)", url: "https://www.dhn.mil.pe/" },
        { name: "Wikipedia — La Marina Lighthouse", url: "https://en.wikipedia.org/wiki/La_Marina_Lighthouse" },
        { name: "The Lighthouse Directory (UNC ibiblio) — Peru", url: "https://www.ibiblio.org/lighthouse/photos/Peru/Peru.htm" },
        { name: "Google Maps — Faro de la Marina (Navy Lighthouse)", url: mapsUrl },
      ],
    },
    galleryCopyright:
      "All images displayed on this website remain the property and copyright of their original photographers.",
    plusCode: "Plus Code: VXG5+GW Miraflores, Peru",
    nap: {
      title: "Attraction Information",
      name: "Navy Lighthouse (Faro de la Marina)",
      address: "Mal. Cisneros 18, Miraflores 15074, Lima, Peru · Plus Code VXG5+GW",
      maps: "Open in Google Maps",
    },
    faqExtra: [
      {
        question: "Where is Navy Lighthouse located?",
        answer:
          "Navy Lighthouse (Faro de la Marina) is located at Mal. Cisneros 18, Miraflores 15074, Lima, Peru, on the coastal cliff of the Miraflores district, overlooking the Pacific Ocean.",
      },
      {
        question: "Is Faro de la Marina free to visit?",
        answer:
          "Yes, Navy Lighthouse is a public space and is free to visit year-round. The park is open 24 hours a day and no ticket is required.",
      },
      {
        question: "How tall is Navy Lighthouse and how far does its light reach?",
        answer:
          "The cast-iron tower is 72 feet (22 m) tall and stands 86 m above sea level. Its white light reaches 18 nautical miles (about 33 km) in clear weather.",
      },
      {
        question: "What is the history of the Navy Lighthouse (Faro de la Marina)?",
        answer:
          "The cast-iron tower was manufactured by Chance Bros and completed in 1900 at Punta Coles, Moquegua, where it guided ships along Peru's southern coast for over seventy years. In December 1973 the Peruvian Navy's Directorate of Hydrography and Navigation dismantled it into numbered sections and re-erected it on the Malecón Cisneros in Miraflores, to commemorate the centenary of Peruvian maritime history.",
      },
    ],
  },

  zh: {
    heroOfficialName: "Navy Lighthouse（米拉弗洛雷斯）",
    breadcrumbLabel: "当前位置",
    breadcrumb: ["Navy Lighthouse 海军灯塔", "米拉弗洛雷斯", "利马", "秘鲁"],
    welcome:
      "欢迎来到 **Navy Lighthouse（海军灯塔）**，它正是广为人知的 **Faro de la Marina**。景点坐落于 **秘鲁** **利马** **米拉弗洛雷斯** 的核心地带，是造访该地区旅客的首要枢纽。",
    guideLabel: "景点导览总览",
    about: {
      title: "关于 Navy Lighthouse（海军灯塔）",
      content:
        "**Navy Lighthouse**（西班牙语：**Faro de la Marina**）是一座高 72 英尺（约 22 米）的崖畔铸铁灯塔，位于秘鲁米拉弗洛雷斯 15074 区 Cisneros 海滨大道 18 号（Mal. Cisneros 18）。其白色灯光射程可达 18 海里（约 33 公里），是利马访问量最大的灯塔与最佳免费公共观景台。",
    },
    location: {
      title: "Faro de la Marina 的位置与游览方式（米拉弗洛雷斯）",
      content:
        "灯塔位于 Cisneros 海滨步道（Malecón Cisneros）上，Plus Code 为 VXG5+GW，从米拉弗洛雷斯中心的肯尼迪公园步行约 15 分钟即可抵达。公园免费开放、全年 24 小时可进入，日落时分人气最高。可使用下方地图获取实时导航。",
    },
    landmarks: {
      title: "Faro de la Marina 周边地标与景点",
      content:
        "参观 **Navy Lighthouse** 时，游客可轻松探索周边的历史地标与景点，包括 **爱情公园（Parque del Amor）** 与 **拉尔科马购物中心（Larcomar）**，沿米拉弗洛雷斯海滨步行皆可到达。",
    },
    history: {
      title: "Navy Lighthouse 的历史与意义",
      content:
        "灯塔由瑞典 Chance Bros 公司于 1900 年在莫克瓜 Punta Coles 建成，1973 年 12 月由秘鲁海军水文航海局（DHNM）拆解并重新组装于米拉弗洛雷斯的悬崖之上，以纪念秘鲁航海史一百周年。",
    },
    sources: {
      title: "资料来源与权威参考",
      intro:
        "本独立指南的内容均依据下列官方与权威来源整理并核对。出行前请以相关机构发布的最新信息为准。",
      officialUpdate: "如需获取官方更新与区域旅游信息，请访问",
      officialUpdateLink: "秘鲁 / 利马官方旅游门户",
      items: [
        { name: "秘鲁外贸和旅游部（MINCETUR）", url: "https://www.gob.pe/mincetur" },
        { name: "秘鲁国家旅游局官方指南 — 利马大区专页（peru.travel）", url: "https://www.peru.travel/es/destinos/lima" },
        { name: "米拉弗洛雷斯区政府", url: "https://www.miraflores.gob.pe/" },
        { name: "秘鲁海军水文航海局（DHNM）", url: "https://www.dhn.mil.pe/" },
        { name: "维基百科 — La Marina Lighthouse", url: "https://en.wikipedia.org/wiki/La_Marina_Lighthouse" },
        { name: "全球灯塔权威名录（UNC ibiblio）— 秘鲁", url: "https://www.ibiblio.org/lighthouse/photos/Peru/Peru.htm" },
        { name: "Google Maps — Faro de la Marina（Navy Lighthouse）", url: mapsUrl },
      ],
    },
    galleryCopyright: "本网站所展示的所有图片产权及版权均归原摄影者所有。",
    plusCode: "Plus Code：VXG5+GW 米拉弗洛雷斯，秘鲁",
    nap: {
      title: "景点信息",
      name: "Navy Lighthouse（Faro de la Marina 海军灯塔）",
      address: "Mal. Cisneros 18, Miraflores 15074, Lima, Perú · Plus Code VXG5+GW",
      maps: "在 Google Maps 查看",
    },
    faqExtra: [
      {
        question: "Navy Lighthouse（海军灯塔）位于哪里？",
        answer:
          "Navy Lighthouse（Faro de la Marina）位于秘鲁利马米拉弗洛雷斯区 Cisneros 海滨大道 18 号（Mal. Cisneros 18, Miraflores 15074），坐落于该区的太平洋崖岸之上。",
      },
      {
        question: "Faro de la Marina 是否需要门票？",
        answer:
          "不需要。Navy Lighthouse 属于公共空间，全年 24 小时免费开放参观，无需购买门票。",
      },
      {
        question: "Navy Lighthouse 有多高？灯光能照多远？",
        answer:
          "灯塔塔高 72 英尺（约 22 米），矗立于海拔 86 米的崖顶；其白色灯光在晴朗天气下射程可达 18 海里（约 33 公里）。",
      },
      {
        question: "海军灯塔（Faro de la Marina）的历史沿革是怎样的？",
        answer:
          "灯塔的铸铁塔身由瑞典 Chance Bros 公司制造，1900 年在莫克瓜 Punta Coles 落成，为秘鲁南部海岸的船舶导航超过七十年。1973 年 12 月，秘鲁海军水文航海局（DHNM）将其拆解为编号构件运抵利马，并在米拉弗洛雷斯 Cisneros 海滨大道重新组装，以纪念秘鲁航海史一百周年。",
      },
    ],
  },

  es: {
    heroOfficialName: "Navy Lighthouse (Miraflores)",
    breadcrumbLabel: "Estás aquí",
    breadcrumb: ["Navy Lighthouse", "Miraflores", "Lima", "Perú"],
    welcome:
      "Bienvenido al **Navy Lighthouse**, ampliamente reconocido como el **Faro de la Marina**. Situado en el corazón de **Miraflores**, **Lima**, **Perú**, este destino es un punto de referencia principal para los viajeros que visitan la región.",
    guideLabel: "Resumen de la guía",
    about: {
      title: "Sobre el Navy Lighthouse",
      content:
        "El **Navy Lighthouse** (en español: **Faro de la Marina**) es un faro de hierro fundido de 72 pies (22 m) situado en el acantilado de Miraflores, en Mal. Cisneros 18, Miraflores 15074, Perú. Su luz blanca alcanza las 18 millas náuticas (unos 33 km) sobre el Pacífico, lo que lo convierte en el faro más visitado y en el mejor mirador público gratuito de Lima.",
    },
    location: {
      title: "Ubicación y cómo visitar el Faro de la Marina en Miraflores",
      content:
        "El faro se encuentra en el Malecón Cisneros, con Plus Code VXG5+GW, a unos 15 minutos a pie del Parque Kennedy, en el centro de Miraflores. La entrada es gratuita y el parque abre las 24 horas, todo el año; el atardecer es el momento más popular para visitarlo. Use el mapa inferior para obtener indicaciones en tiempo real.",
    },
    landmarks: {
      title: "Monumentos y atracciones alrededor del Faro de la Marina",
      content:
        "Al visitar el **Navy Lighthouse**, los visitantes pueden explorar fácilmente los monumentos históricos y puntos de interés cercanos, como el **Parque del Amor** y **Larcomar**, ambos a poca distancia a pie por los acantilados de Miraflores.",
    },
    history: {
      title: "Historia e importancia del Navy Lighthouse",
      content:
        "Construido en 1900 por la empresa sueca Chance Bros en Punta Coles, Moquegua, el faro fue desmontado y reensamblado por la Dirección de Hidrografía y Navegación (DHNM) de la Marina de Guerra del Perú en los acantilados de Miraflores en diciembre de 1973, con motivo del centenario de la historia marítima peruana.",
    },
    sources: {
      title: "Fuentes y referencias oficiales",
      intro:
        "Esta guía independiente se elabora y verifica con las fuentes oficiales y autorizadas que figuran a continuación. Confirme siempre los detalles con las organizaciones antes de viajar.",
      officialUpdate: "Para actualizaciones oficiales e información turística regional, visite",
      officialUpdateLink: "Portal Oficial de Turismo de Perú / Lima",
      items: [
        { name: "Ministerio de Comercio Exterior y Turismo del Perú (MINCETUR)", url: "https://www.gob.pe/mincetur" },
        { name: "Guía oficial de Peru Travel — Región Lima (peru.travel)", url: "https://www.peru.travel/es/destinos/lima" },
        { name: "Municipalidad de Miraflores", url: "https://www.miraflores.gob.pe/" },
        { name: "Dirección de Hidrografía y Navegación de la Marina (DHNM)", url: "https://www.dhn.mil.pe/" },
        { name: "Wikipedia — La Marina Lighthouse", url: "https://en.wikipedia.org/wiki/La_Marina_Lighthouse" },
        { name: "The Lighthouse Directory (UNC ibiblio) — Perú", url: "https://www.ibiblio.org/lighthouse/photos/Peru/Peru.htm" },
        { name: "Google Maps — Faro de la Marina (Navy Lighthouse)", url: mapsUrl },
      ],
    },
    galleryCopyright:
      "Todas las imágenes mostradas en este sitio web son propiedad y están protegidas por los derechos de autor de sus fotógrafos originales.",
    plusCode: "Plus Code: VXG5+GW Miraflores, Perú",
    nap: {
      title: "Información del atractivo",
      name: "Navy Lighthouse (Faro de la Marina)",
      address: "Mal. Cisneros 18, Miraflores 15074, Lima, Perú · Plus Code VXG5+GW",
      maps: "Ver en Google Maps",
    },
    faqExtra: [
      {
        question: "¿Dónde se encuentra el Navy Lighthouse?",
        answer:
          "El Navy Lighthouse (Faro de la Marina) se encuentra en Mal. Cisneros 18, Miraflores 15074, Lima, Perú, en el acantilado costero del distrito de Miraflores, frente al Océano Pacífico.",
      },
      {
        question: "¿Es gratis visitar el Faro de la Marina?",
        answer:
          "Sí, el Navy Lighthouse es un espacio público y se puede visitar gratis todo el año. El parque abre las 24 horas y no requiere entrada.",
      },
      {
        question: "¿Cuál es la mejor hora para visitar el Navy Lighthouse?",
        answer:
          "El atardecer es el mejor momento: la luz dorada junto al faro azul marino ofrece las mejores fotografías y vistas del Pacífico.",
      },
      {
        question: "¿Cuánto mide el Navy Lighthouse y hasta dónde llega su luz?",
        answer:
          "La torre mide 72 pies (22 m) y se alza sobre un acantilado de 86 m; su luz blanca alcanza 18 millas náuticas (unos 33 km) en condiciones despejadas.",
      },
      {
        question: "¿Cómo llego al Navy Lighthouse desde el centro de Miraflores?",
        answer:
          "Desde el Parque Kennedy son unos 15 minutos a pie por el Malecón Cisneros, o unos 5 minutos en taxi.",
      },
      {
        question: "¿Cuál es la historia del Faro de la Marina?",
        answer:
          "La torre de hierro fundido fue fabricada por Chance Bros y se completó en 1900 en Punta Coles (Moquegua), donde guio el tráfico marítimo del sur del Perú durante más de setenta años. En diciembre de 1973 la Dirección de Hidrografía y Navegación de la Marina la desmontó por piezas y la volvió a montar en el Malecón Cisneros, en Miraflores, para conmemorar el centenario de la historia marítima peruana.",
      },
    ],
  },

  qu: {
    heroOfficialName: "Navy Lighthouse (Miraflores)",
    breadcrumbLabel: "Kaypi kachkanki",
    breadcrumb: ["Navy Lighthouse", "Miraflores", "Lima", "Piruw"],
    welcome:
      "**Navy Lighthouse**-man hamuy, **Faro de la Marina** nisqa riqsisqa. **Miraflores**, **Lima**, **Piruw**-pi chawpipi kachkan.",
    guideLabel: "Puriy yachay",
    about: {
      title: "Navy Lighthouse -manta",
      content:
        "**Navy Lighthouse** (**Faro de la Marina**) 72 feet (22 m) hatun fierro faro, Miraflores-pi Mal. Cisneros 18, Miraflores 15074, Piruw. 18 millas náuticas (33 km) k'anchan.",
    },
    location: {
      title: "Maypin kachkan, imaynata purina Faro de la Marina, Miraflores-pi",
      content:
        "Malecón Cisneros-pi, Plus Code VXG5+GW. Kennedy Park-manta 15 min puriy. Mana qullqiyuq, 24 horas kichasqa.",
    },
    landmarks: {
      title: "Faro de la Marina -pa muyuriynin rikunakuna",
      content: "**Navy Lighthouse**-ta rikuspa, **Parque del Amor**-ta **Larcomar**-tapas puriyta atinki.",
    },
    history: {
      title: "Navy Lighthouse -pa ñawpaq kawsaynin",
      content:
        "1900 watapi Chance Bros ruwarqa Punta Coles, Moquegua-pi. 1973 watapi DHNM Miraflores-pi hukmanta sayachirqa.",
    },
    sources: {
      title: "Pukyukuna / Fuentes oficiales",
      intro: "Kay guíaqa oficial fuentesmanta hurqusqa. Purinaykipaq ñawpaqta willakuykunata qhaway.",
      officialUpdate: "Oficial willakuykunapaq, rikuy",
      officialUpdateLink: "Piruw / Lima Oficial Turismo Portal",
      items: [
        { name: "MINCETUR (Piruw)", url: "https://www.gob.pe/mincetur" },
        { name: "Peru Travel — Lima", url: "https://www.peru.travel/es/destinos/lima" },
        { name: "Wikipedia — La Marina Lighthouse", url: "https://en.wikipedia.org/wiki/La_Marina_Lighthouse" },
      ],
    },
    galleryCopyright:
      "Kay webpi llika rikchakuna (imágenes) nisqakunaqa original fotógrafokunap copyright-ninmi.",
    plusCode: "Plus Code: VXG5+GW Miraflores, Piruw",
    nap: {
      title: "Info",
      name: "Navy Lighthouse (Faro de la Marina)",
      address: "Mal. Cisneros 18, Miraflores 15074, Lima, Piruw",
      maps: "Google Maps",
    },
    faqExtra: [
      {
        question: "Maypin Navy Lighthouse kachkan?",
        answer: "Mal. Cisneros 18, Miraflores 15074, Lima, Piruw-pi kachkan.",
      },
      {
        question: "Qullqichu pagana Faro de la Marina-man?",
        answer: "Mana. Navy Lighthouse sapa pachaq kichasqa, mana qullqiyuq.",
      },
      {
        question: "Hayk'aq aswan allin Navy Lighthouse-ta rikuna?",
        answer: "Inti chinkay pachapi aswan allin: k'anchaq intiwan Pacific qucha rikukuy aswan sumaqmi.",
      },
      {
        question: "Hayk'a hatunmi Navy Lighthouse, maykama k'anchanmi?",
        answer: "72 feet (22 m) hatunmi, 18 millas náuticas (33 km) k'anchanmi.",
      },
      {
        question: "Imaynata Navy Lighthouse-man chayamuni Miraflores-manta?",
        answer: "Kennedy Park-manta Malecón Cisneros-ninta 15 min puriy, utaq 5 min taxi-pi.",
      },
      {
        question: "Imayna karqa Navy Lighthouse -pa ñawpaq kawsaynin?",
        answer:
          "Chance Bros sutiyuq ruraqmi 1900 watapi Punta Coles (Moquegua) -pi tukurqa, chaypi 70 wata mastan mama qucha patapi pusarqa. 1973 watapi DHNM ch'iqtaspa Miraflores-pi hukmanta sayachirqa, Piruw mama qucha yachayninpa 100 wata yupaychananpaq.",
      },
    ],
  },
};
