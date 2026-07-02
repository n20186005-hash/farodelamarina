export type Locale = "zh" | "en" | "es" | "qu";
export type LinkItem = { name: string; url: string };
export type FAQItem = { question: string; answer: string };
export type TransportOption = { name: string; time: string; price: string; steps: string[] };
export type TimelineEvent = { period: string; description: string };
export type HistorySection = { subtitle: string; content: string };
export type ArchitectureSection = { subtitle: string; content: string };
export type CultureSection = { subtitle: string; content: string };
export type LoveParkSection = { subtitle: string; content: string };
export type InscriptionSection = { subtitle: string; content: string; items?: string[] };

export type Translations = {
  nav: { about: string; inscriptions?: string; visiting: string; transportation: string; tips: string; gallery: string; reviews: string; faq: string; location: string };
  hero: { tagline: string; title: string; subtitle: string; cta: string };
  rating: { reviews: string; source: string };
  about: { title: string; p1: string; p2: string; highlights: { title: string; items: string[] }; bestTime?: { title: string; content: string; tip: string } };
  inscriptions?: { title: string; subtitle: string; intro: { title: string; content: string }; plaque: { title: string; content: string; items: { label: string; value: string }[] }; monuments: { title: string; content: string; items: { name: string; description: string }[] } };
  visiting: { title: string; hours: { title: string; content: string; note: string }; price: { title: string; content: string; note: string }; duration: { title: string; content: string; note: string }; tips: { title: string; items: string[] } };
  transportation: { title: string; airport: { title: string; content: string; options: TransportOption[] }; publicTransport?: { title: string; content: string; options: { name: string; description: string; steps: string[] }[] }; cycling?: { title: string; content: string }; localTransport?: { title: string; description?: string; content?: string; steps?: string[] }; city: { title: string; content: string; steps: string[] } };
  tips: { title: string; items: string[] };
  gallery: { title: string; viewMore: string };
  reviews: { title: string; subtitle: string; viewMore: string };
  faq: { title: string; subtitle: string; items: FAQItem[] };
  location: { title: string; address: string; openMaps: string };
  footer: { callToAction: string; text: string; made: string; linksTitle: string; links: LinkItem[] };
};

export const translations: Record<Locale, Translations> = {
  zh: {
    nav: { about: "景点概览", inscriptions: "铭文历史", visiting: "游览指南", transportation: "交通指南", tips: "游览建议", gallery: "照片画廊", reviews: "游客评价", faq: "常见问题", location: "地图位置" },
    hero: { tagline: "秘鲁利马 · 米拉弗洛雷斯海滨观景台", title: "海军灯塔", subtitle: "Navy Lighthouse · Faro de la Marina · 太平洋畔的历史地标", cta: "探索灯塔" },
    rating: { reviews: "条评价", source: "Google 评论" },
    about: {
      title: "海军灯塔（Navy Lighthouse）：利马米拉弗洛雷斯的标志性观景台",
      p1: "海军灯塔（Navy Lighthouse，西班牙语：Faro de la Marina）位于秘鲁首都利马的著名海滨区——米拉弗洛雷斯（Miraflores）。这座历史悠久的灯塔建于1900年，于1973年由秘鲁海军安装于此，是利马最重要的观景台之一。\n\n灯塔亮度射程可达45公里（25海里），塔高22米，海拔86米。灯塔采用铸铁材质，由319个可拆卸部件和1,750个连接螺栓组成，总重量达60,000公斤。这里不仅是重要的航海导航设施，也是欣赏太平洋壮丽景色的绝佳地点。",
      p2: `海军灯塔公园（Parque El Faro de la Marina）是一个集历史、技术和自然景观于一体的独特景点。公园内设有多位秘鲁海军历史重要人物的纪念雕像，包括秘鲁海军创始人马丁·豪尔赫·吉斯中将（Vicealmirante Martín Jorge Guise）和海军上尉胡安·曼努埃尔·范宁·加西亚（Capitán de Navío Juan Manuel Fanning García）。

**历史意义：** 海军灯塔不仅是航海导航的重要设施，也是秘鲁海军历史的见证。灯塔基座上的铭牌详细记录了其技术参数和建造历史，是了解秘鲁航海史的重要窗口。

**年度传统：** 作为米拉弗洛雷斯的标志性景点，这里每年吸引大量游客前来观赏太平洋日落，感受秘鲁海军的辉煌历史。

💡 **旅行知识：** 海军灯塔是观赏太平洋日落的最佳地点之一。傍晚时分，金色的阳光洒在海面上，与历史悠久的灯塔交相辉映，景色极为壮观。`,
      highlights: { title: "景点亮点", items: ["历史灯塔: 建于1900年的铸铁灯塔", "射程45公里: 亮度可达25海里", "塔高22米: 海拔86米的壮丽视野", "铭文牌: 详细记录技术参数", "纪念雕像: 海军英雄人物", "24小时开放: 全天候公共空间"] },
    },
    inscriptions: {
      title: "铭文与历史",
      subtitle: "灯塔基座铭牌与纪念雕像",
      intro: {
        title: "海军灯塔公园简介",
        content: `海军灯塔公园（Parque El Faro de la Marina）位于米拉弗洛雷斯的海滨悬崖之上。公园入口处设有绿色指示牌，介绍了灯塔的历史：

**建造年份：** 1900年
**安装时间：** 1973年由秘鲁海军安装于此
**亮度射程：** 45公里（25海里）

公园内设有多位海军历史重要人物的纪念雕像和铭文牌，是了解秘鲁海军历史的重要场所。`
      },
      plaque: {
        title: "灯塔基座铭牌详细参数",
        content: "灯塔正下方深色基座上的金属铭牌，记录了灯塔的详细物理参数和地理位置：",
        items: [
          { label: "名称", value: "FARO \"LA MARINA\"（海军灯塔）" },
          { label: "主管部门", value: "秘鲁海军部 · 水文航海局" },
          { label: "亮度", value: "83,000 坎德拉" },
          { label: "射程", value: "25海里（45公里）" },
          { label: "闪光", value: "闪烁白光" },
          { label: "纬度", value: "12° 07' 13\"" },
          { label: "经度", value: "77° 02' 17\"" },
          { label: "塔高", value: "22米" },
          { label: "海拔高度", value: "86米" },
          { label: "建造年份", value: "1900年" },
          { label: "材质", value: "铸铁" },
          { label: "可拆卸部件", value: "319件" },
          { label: "连接螺栓", value: "1,750个" },
          { label: "总重量", value: "60,000公斤" },
          { label: "安装信息", value: "由DHNM安装，1973年12月" }
        ]
      },
      monuments: {
        title: "历史人物纪念雕像",
        content: "公园内设有多位海军历史重要人物的半身像及生平铭文：",
        items: [
          {
            name: "马丁·豪尔赫·吉斯 中将 (Vicealmirante Martín Jorge Guise, 1780-1828)",
            description: `秘鲁海军创始人，共和国第一任海军上将，曾是米拉弗洛雷斯镇的居民。1828年11月24日，他在"总统号"护卫舰上为保卫其收养祖国而献出生命，践行了其家族座右铭："最诚实，最安全"（QUO HONESTIOR EO TUTIOR）。

纪念雕像于2022年3月12日在米拉弗洛雷斯揭幕。`
          },
          {
            name: "胡安·曼努埃尔·范宁·加西亚 海军上尉 (Capitán de Navío Juan Manuel Fanning García)",
            description: `英勇的米拉弗洛雷斯市向海军上尉致敬。作为海军驻防营指挥官，在1881年1月15日的米拉弗洛雷斯战役中表现英勇并受致命重伤，为秘鲁人民和今日及永远的海军陆战队留下了牺牲与荣誉的光辉榜样。

口号："前进，海军，前进！"(¡ADELANTE MARINA ADELANTE!)

纪念牌于2022年7月在米拉弗洛雷斯揭幕。`
          }
        ]
      }
    },
    visiting: {
      title: "游览指南",
      hours: { title: "开放时间", content: "24小时开放\n全年无休", note: "⚠️ 提醒：建议日落前到达，欣赏太平洋日落美景。" },
      price: { title: "门票费用", content: "免费开放\n无需购票\n欢迎所有游客", note: "⚠️ 重要提示：海军灯塔公园是免费公共空间，无需门票。" },
      duration: { title: "建议游览时长", content: "建议预留 30 分钟 - 1 小时", note: "可以结合米拉弗洛雷斯海滨步道游览，安排半天时间探索周边景点。" },
      tips: { title: "游览建议物品", items: ["舒适的步行鞋", "防晒用品与墨镜（利马阳光强烈）", "相机和备用电池（日落美景不容错过）", "帽子和轻薄外套（海风较凉）", "水和零食", "当地地图或导游APP"] },
    },
    transportation: {
      title: "交通指南",
      airport: { title: "第一程：豪尔赫·查韦斯国际机场 (LIM) ➔ 米拉弗洛雷斯", content: "所有游客需先到达利马（Lima）——秘鲁的首都和最大城市。然后从利马机场前往米拉弗洛雷斯区（约40分钟车程）。", options: [
        { name: "出租车 / 私人包车", price: "约 50 - 80 索尔", time: "约 40 分钟", steps: ["耗时与费用： 约 40 分钟", "私人包车费用约 50-80 索尔", "可在利马机场安排"] },
        { name: "机场大巴（Airport Shuttle）", price: "约 15 - 25 索尔", time: "约 1 小时", steps: ["从机场乘坐大巴到米拉弗洛雷斯", "票价约15-25索尔", "约每30分钟一班，车程1小时"] }
      ]},
      publicTransport: {
        title: "利马公共交通（推荐）",
        content: "利马拥有南美典型的BRT（快速公交）系统和完善的公交网络，是体验当地生活的最佳方式。",
        options: [
          {
            name: "快捷公交系统 (Metropolitano)",
            description: "利马的BRT系统，快速便捷",
            steps: [
              "乘坐Metropolitano（B线或C线）",
              "在Ricardo Palma站或Benavides站下车",
              "沿着Av. Ricardo Palma或Av. Benavides向海边步行约20-25分钟",
              "或换乘几分钟的出租车，即可抵达悬崖边的海军灯塔公园",
              "💡 提示：这种方式能完美避开利马市区拥堵的地面交通"
            ]
          },
          {
            name: "蓝色快速公交 (Corredor Azul)",
            description: "沿阿雷基帕大道行驶的蓝色公交车",
            steps: [
              "乘坐301路等蓝色公交车",
              "沿Av. Arequipa行驶",
              "在米拉弗洛雷斯区的终点站或靠近公园的站点下车",
              "步行即可到达海军灯塔公园"
            ]
          }
        ]
      },
      cycling: {
        title: "沿着海岸线骑行（微出行/自行车）",
        content: `海军灯塔公园所在的"米拉弗洛雷斯海滨步道（Malecón）"拥有利马规划最完善的自行车道。

推荐路线：
• 从南部的波西米亚区巴兰科（Barranco）出发
• 从北部的圣伊西德罗（San Isidro）出发
• 租用共享自行车或滑板车，沿着壮丽的悬崖海岸线一路骑行至海军灯塔公园

💡 提示：这是欣赏太平洋悬崖海岸线的最佳方式，沿途风景绝美。`
      },
      localTransport: {
        title: "传统的微型巴士 (Micros/Combis)",
        description: "极具拉美特色的私人小巴，车身通常涂满鲜艳的颜色。虽然路线复杂、不适合初级游客，但对于想要体验极致本地生活的人来说，是前往米拉弗洛雷斯区最接地气的方式。",
        steps: [
          "在利马市区寻找前往Miraflores的小巴",
          "车费约1-2索尔，非常便宜",
          "⚠️ 注意：路线复杂，建议在当地人陪同下乘坐"
        ]
      },
      city: { title: "利马市区 ➔ 海军灯塔公园", content: "海军灯塔公园位于米拉弗洛雷斯区的海滨步道（Malecón Cisneros），交通便利，可乘坐出租车、公交车或步行到达。", steps: ["推荐：从米拉弗洛雷斯中心步行约10-15分钟", "也可乘坐出租车，约10分钟车程", "公交车可乘坐至Faro de la Marina站"] },
    },
    tips: { title: "游览建议", items: [
      "⚠️ 最佳时间：建议傍晚到达，欣赏太平洋日落",
      "💡 交通建议：建议从利马市区乘坐出租车前往，既节省时间又舒适。",
      "请做好防晒措施，利马阳光强烈，即使阴天也要涂防晒霜",
      "公园免费开放，无需购票",
      "请尊重当地文化，保持公园整洁",
      "建议聘请当地导游（约50-100索尔），了解更多历史故事和海军传统",
      "可以结合参观米拉弗洛雷斯其他景点，如印加市场、肯尼迪公园等",
      "注意保管个人物品，市中心游客较多，提防小偷",
      "尊重当地文化和传统",
      "保持景点整洁，不要乱扔垃圾。带走的只有照片，留下的只有脚印"
    ] },
    gallery: { title: "照片画廊", viewMore: "在 Google Maps 查看更多相片" },
    reviews: { title: "游客评价 (Visitor Reviews)", subtitle: "来自海军灯塔的声音：Google Maps 真实见证", viewMore: "在 Google Maps 查看更多评价" },
    faq: { title: "常见问题", subtitle: "深入了解海军灯塔", items: [
      { question: "海军灯塔的开放时间是？", answer: "海军灯塔公园24小时开放，全年无休。但由于是户外公园，建议白天或傍晚参观，安全和光线更佳。日落时分是观赏的最佳时机。" },
      { question: "参观海军灯塔需要门票吗？", answer: "不需要。海军灯塔公园是免费的公共空间，无需购买门票，欢迎所有游客前来参观。公园全年对外开放，您可以随时前往。" },
      { question: "海军灯塔有什么特别之处？", answer: `海军灯塔建于1900年，是一座具有重要历史和技术价值的铸铁灯塔。灯塔亮度射程可达45公里（25海里），塔高22米，海拔86米。

**技术参数：** 灯塔基座上的铭牌详细记录了其技术参数，包括亮度83,000坎德拉、319个可拆卸部件、1,750个连接螺栓、总重量60,000公斤等。

**历史意义：** 公园内设有多位秘鲁海军历史重要人物的纪念雕像，包括秘鲁海军创始人马丁·豪尔赫·吉斯中将和海军上尉胡安·曼努埃尔·范宁·加西亚。

此外，这里也是观赏太平洋日落的最佳地点之一。` },
      { question: "如何前往海军灯塔？有什么交通建议？", answer: "海军灯塔位于秘鲁利马米拉弗洛雷斯区，地址是Mal. Cisneros 18, Miraflores 15074。\n\n⚠️ 重要交通建议：\n1. 从利马机场乘坐出租车到米拉弗洛雷斯约40分钟\n2. 从米拉弗洛雷斯中心步行到海军灯塔公园约10-15分钟\n3. 具体导航可在 Google Maps 中搜索Faro de la Marina, Miraflores\n4. 也可以参加利马市区游旅行团，包含海军灯塔" },
      { question: "游览海军灯塔需要注意什么？有什么安全建议？", answer: "游览时需要注意：\n1. 🌞 防晒：利马阳光强烈，即使阴天也要涂防晒霜，戴墨镜和帽子\n2. 👟 舒适：穿着舒适的步行鞋，方便在公园和海滨步道漫步\n3. 🏛️ 文化尊重：请尊重当地文化和传统，保持公园整洁\n4. 💰 安全：保管好个人物品，游客较多，提防小偷\n5. 🎨 历史欣赏：仔细欣赏铭文牌和纪念雕像的历史价值" },
      { question: "附近还有哪些值得一游的景点？", answer: "海军灯塔位于米拉弗洛雷斯区，游览完公园后，可以参观以下景点：\n1. 印加市场（Inca Market）——购买秘鲁手工艺品\n2. 肯尼迪公园（Kennedy Park）——观赏猫猫和夜市\n3. 拉尔科博物馆（Larco Museum）——秘鲁黄金收藏\n4. 圣弗朗西斯科修道院（San Francisco Monastery）——利马历史文化\n5. 爱情公园（Love Park）——观赏太平洋日落的另一绝佳地点" }
    ]},
    location: { title: "地图位置", address: "Mal. Cisneros 18, Miraflores 15074\nPerú\n（利马米拉弗洛雷斯区）", openMaps: "在 Google Maps 查看位置" },
    footer: { callToAction: "作为利马的重要历史景点，请与我们一起爱护公园、保护环境。保持景点整洁，共同维护这一美丽的历史空间。", text: "© 2026 海军灯塔指南 · 保留所有权利。\n本网站是一个独立的第三方指南项目，致力于准确传播海军灯塔信息。我们与秘鲁政府或其他官方机构没有任何关联。", made: "本网站是一个独立的第三方指南项目。为探索者与学习者而制。", linksTitle: "相关链接", links: [
      { name: "秘鲁外贸和旅游部", url: "https://www.gob.pe/mincetur" },
      { name: "秘鲁国家旅游局官方指南 - 利马大区专页", url: "https://www.peru.travel/es/destinos/lima" },
      { name: "利马都会区市政府", url: "https://www.gob.pe/munilima" },
      { name: "米拉弗洛雷斯区政府", url: "https://www.miraflores.gob.pe/" },
      { name: "秘鲁国防部", url: "https://www.gob.pe/mindef" },
      { name: "秘鲁海军水文航海局", url: "https://www.dhn.mil.pe/" },
      { name: "全球灯塔权威名录", url: "https://www.ibiblio.org/lighthouse/photos/Peru/Peru.htm" },
      { name: "维基百科：海军灯塔专页", url: "https://en.wikipedia.org/wiki/La_Marina_Lighthouse" }
    ]}
  },

  en: {
    nav: { about: "Overview", inscriptions: "Inscriptions", visiting: "Visit Guide", transportation: "Getting There", tips: "Travel Tips", gallery: "Photo Gallery", reviews: "Reviews", faq: "FAQ", location: "Location" },
    hero: { tagline: "Lima, Peru · Miraflores Seaside Viewpoint", title: "Navy Lighthouse", subtitle: "Navy Lighthouse · Faro de la Marina · Historic Landmark on the Pacific", cta: "Explore the Lighthouse" },
    rating: { reviews: "reviews", source: "Google Reviews" },
    about: {
      title: "Navy Lighthouse (Faro de la Marina): Lima's Iconic Viewpoint in Miraflores",
      p1: "The Navy Lighthouse (Spanish: Faro de la Marina) is located in Miraflores, the famous seaside district of Lima, the capital of Peru. This historic lighthouse was built in 1900 and installed here by the Peruvian Navy in 1973. It is one of the most important viewpoints in Lima.\n\nThe lighthouse has a luminous range of 45 kilometers (25 nautical miles), stands 22 meters tall, and is situated at an altitude of 86 meters. The lighthouse is made of cast iron, consisting of 319 detachable parts and 1,750 connecting bolts, with a total weight of 60,000 kilograms. It is not only an important maritime navigation facility but also an excellent place to enjoy the spectacular views of the Pacific Ocean.",
      p2: `Navy Lighthouse Park (Parque El Faro de la Marina) is a unique attraction that combines history, technology, and natural landscapes. The park features memorial statues of important figures in Peruvian naval history, including Vice Admiral Martín Jorge Guise, founder of the Peruvian Navy, and Captain Juan Manuel Fanning García.

**Historical Significance:** The Navy Lighthouse is not only an important facility for maritime navigation but also a witness to Peruvian naval history. The plaque on the base of the lighthouse records its technical parameters and construction history in detail, serving as an important window into Peruvian maritime history.

**Annual Tradition:** As a landmark attraction in Miraflores, it attracts numerous visitors each year to watch the Pacific sunset and experience the glorious history of the Peruvian Navy.

💡 **Travel Knowledge:** Navy Lighthouse is one of the best spots in Lima to watch the Pacific sunset. In the evening, golden sunlight spreads across the sea, creating a perfect harmony with the historic lighthouse—an extremely spectacular scene.`,
      highlights: { title: "Highlights", items: ["Historic Lighthouse: Cast iron lighthouse built in 1900", "Range 45km: Luminous range of 25 nautical miles", "Height 22m: Spectacular views at 86m altitude", "Inscription Plaque: Detailed technical parameters", "Memorial Statues: Naval heroes", "Open 24/7: Public space always accessible"] },
    },
    inscriptions: {
      title: "Inscriptions & History",
      subtitle: "Lighthouse Base Plaque and Memorial Statues",
      intro: {
        title: "About Navy Lighthouse Park",
        content: `Navy Lighthouse Park (Parque El Faro de la Marina) is located on the seaside cliff of Miraflores. A green information sign at the park entrance introduces the history of the lighthouse:

**Construction Year:** 1900
**Installation:** Installed by the Peruvian Navy in 1973
**Luminous Range:** 45 kilometers (25 nautical miles)

The park features memorial statues and inscription plaques of important figures in naval history, making it an important place to learn about Peruvian naval history.`
      },
      plaque: {
        title: "Lighthouse Base Plaque - Technical Specifications",
        content: "The metal plaque on the dark base below the lighthouse records the detailed physical parameters and geographic location of the lighthouse:",
        items: [
          { label: "Name", value: "FARO \"LA MARINA\" (Navy Lighthouse)" },
          { label: "Authority", value: "Ministry of Marine · Directorate of Hydrography and Navigation" },
          { label: "Luminosity", value: "83,000 Candelas" },
          { label: "Range", value: "25 Nautical Miles (45 km)" },
          { label: "Flash", value: "White Flashes" },
          { label: "Latitude", value: "12° 07' 13\"" },
          { label: "Longitude", value: "77° 02' 17\"" },
          { label: "Tower Height", value: "22 Meters" },
          { label: "Altitude", value: "86 Meters above Sea Level" },
          { label: "Construction Year", value: "1900" },
          { label: "Material", value: "Cast Iron" },
          { label: "Detachable Parts", value: "319 Pieces" },
          { label: "Connecting Bolts", value: "1,750 Pieces" },
          { label: "Total Weight", value: "60,000 Kilograms" },
          { label: "Installation", value: "Installed by DHNM, December 1973" }
        ]
      },
      monuments: {
        title: "Memorial Statues of Historical Figures",
        content: "The park features busts and biographical inscriptions of important figures in naval history:",
        items: [
          {
            name: "Vice Admiral Martín Jorge Guise (1780-1828)",
            description: `Founder of the Peruvian Navy, first Admiral of the Republic, and former resident of Miraflores district. On November 24, 1828, he gave his life in defense of his adoptive country aboard the frigate Presidente, fulfilling his family motto: "The more honest, the safer" (QUO HONESTIOR EO TUTIOR).

Memorial statue unveiled in Miraflores on March 12, 2022.`
          },
          {
            name: "Captain Juan Manuel Fanning García",
            description: `The heroic city of Miraflores pays homage to Captain Juan Manuel Fanning García. As commander of the Marine Garrison Battalion, he acted valiantly in the Battle of Miraflores on January 15, 1881, and was mortally wounded in this action, leaving a clear example of sacrifice and honor to Peruvians and Marines of today and always.

Motto: "Forward Navy Forward!" (¡ADELANTE MARINA ADELANTE!)

Memorial plaque unveiled in Miraflores in July 2022.`
          }
        ]
      }
    },
    visiting: {
      title: "Visit Guide",
      hours: { title: "Opening Hours", content: "Open 24/7\nEvery day of the year", note: "⚠️ Note: Arrive before sunset to enjoy the beautiful Pacific sunset." },
      price: { title: "Entrance Fee", content: "Free Admission\nNo ticket required\nAll visitors welcome", note: "⚠️ Important Note: Navy Lighthouse Park is a free public space, no tickets needed." },
      duration: { title: "Recommended Duration", content: "Recommended: 30 minutes - 1 hour", note: "Can be combined with Miraflores seaside promenade tour, plan half a day to explore nearby attractions." },
      tips: { title: "Recommended Items", items: ["Comfortable walking shoes", "Sun protection & sunglasses (strong Lima sunlight)", "Camera and spare batteries (don't miss the sunset)", "Hat and light jacket (cool sea breeze)", "Water and snacks", "Local map or guide APP"] },
    },
    transportation: {
      title: "Getting There",
      airport: { title: "From Jorge Chávez International Airport (LIM) to Miraflores", content: "All visitors must first arrive in Lima—the capital and largest city of Peru. Then travel from Lima airport to Miraflores district (about 40 minutes drive).", options: [
        { name: "Taxi / Private Transfer", price: "About 50 - 80 soles", time: "About 40 minutes", steps: ["About 40 minutes", "Private transfer about 50-80 soles", "Can be arranged at Lima airport"] },
        { name: "Airport Shuttle", price: "About 15 - 25 soles", time: "About 1 hour", steps: ["Take shuttle from airport to Miraflores", "Ticket about 15-25 soles", "Departs every 30 minutes, 1-hour journey"] }
      ]},
      publicTransport: {
        title: "Lima Public Transport (Recommended)",
        content: "Lima has a typical BRT (Bus Rapid Transit) system and comprehensive bus network in South America, which is the best way to experience local life.",
        options: [
          {
            name: "Metropolitano (BRT System)",
            description: "Lima's BRT system, fast and convenient",
            steps: [
              "Take Metropolitano (Line B or C)",
              "Get off at Ricardo Palma Station or Benavides Station",
              "Walk towards the sea along Av. Ricardo Palma or Av. Benavides for about 20-25 minutes",
              "Or transfer to a taxi for a few minutes to reach Navy Lighthouse Park on the cliff",
              "💡 Tip: This way can perfectly avoid Lima's congested ground traffic"
            ]
          },
          {
            name: "Corredor Azul (Blue Bus)",
            description: "Blue buses running along Avenida Arequipa",
            steps: [
              "Take blue buses like Route 301",
              "Runs along Av. Arequipa",
              "Get off at the terminal in Miraflores district or a station near the park",
              "Walk to reach Navy Lighthouse Park"
            ]
          }
        ]
      },
      cycling: {
        title: "Cycling Along the Coastline (Micro-mobility/Bike)",
        content: `The "Miraflores Seaside Promenade (Malecón)" where Navy Lighthouse Park is located has Lima's best-planned bicycle lane.

Recommended routes:
• Start from Barranco (Bohemian district) in the south
• Start from San Isidro in the north
• Rent shared bikes or scooters, ride along the magnificent cliff coastline to Navy Lighthouse Park

💡 Tip: This is the best way to enjoy the Pacific cliff coastline, with beautiful scenery along the way.`
      },
      localTransport: {
        title: "Traditional Micros/Combis (Mini-buses)",
        description: "Private minibuses with unique Latin American characteristics, usually painted with bright colors. Although the routes are complex and not suitable for beginner tourists, for those who want to experience the ultimate local life, it is the most authentic way to go to Miraflores district.",
        steps: [
          "Look for minibuses heading to Miraflores in Lima city center",
          "Fare about 1-2 soles, very cheap",
          "⚠️ Note: Complex routes, recommended to take with locals"
        ]
      },
      city: { title: "Lima City to Navy Lighthouse", content: "Navy Lighthouse Park is located on the seaside promenade (Malecón Cisneros) in Miraflores district. Transportation is convenient, accessible by taxi, bus, or on foot.", steps: ["Recommended: Walk from Miraflores center, about 10-15 minutes", "Taxi ride about 10 minutes", "Bus available to Faro de la Marina station"] },
    },
    tips: { title: "Travel Tips", items: [
      "⚠️ Best Time: Arrive in the evening to enjoy the Pacific sunset",
      "💡 Transportation Tip: Recommended to take taxi from Lima city center, saves time and comfortable.",
      "Take sun protection measures, Lima sunlight is strong, apply sunscreen even on cloudy days",
      "Park is free, no ticket needed",
      "Respect local culture, keep the park clean",
      "Hire a local guide (about 50-100 soles) to learn more about history and naval traditions",
      "Visit other Miraflores attractions like Inca Market, Kennedy Park",
      "Keep personal belongings safe, many tourists, beware of pickpockets",
      "Respect local culture and traditions",
      "Keep the attraction clean, do not litter. Take only photos, leave only footprints"
    ] },
    gallery: { title: "Photo Gallery", viewMore: "View More Photos on Google Maps" },
    reviews: { title: "Visitor Reviews", subtitle: "Voices from Navy Lighthouse: Real Reviews from Google Maps", viewMore: "View More Reviews on Google Maps" },
    faq: { title: "Frequently Asked Questions", subtitle: "Learn More About Navy Lighthouse", items: [
      { question: "What are the opening hours of Navy Lighthouse?", answer: "Navy Lighthouse Park is open 24/7, every day of the year. However, as it is an outdoor park, daytime or evening visits are recommended for better safety and lighting. Sunset time is the best time to visit." },
      { question: "Is there an entrance fee to see Navy Lighthouse?", answer: "No. Navy Lighthouse Park is a free public space, no entrance fee required. All visitors are welcome. The park is open all year round, you can visit at any time." },
      { question: "What is special about Navy Lighthouse?", answer: `Navy Lighthouse was built in 1900 and is a cast iron lighthouse with significant historical and technical value. The lighthouse has a luminous range of 45 kilometers (25 nautical miles), stands 22 meters tall, and is at an altitude of 86 meters.

**Technical Parameters:** The plaque on the base of the lighthouse records its technical parameters in detail, including luminosity of 83,000 candelas, 319 detachable parts, 1,750 connecting bolts, total weight of 60,000 kilograms, etc.

**Historical Significance:** The park features memorial statues of important figures in Peruvian naval history, including Vice Admiral Martín Jorge Guise, founder of the Peruvian Navy, and Captain Juan Manuel Fanning García.

In addition, it is also one of the best spots to watch the Pacific sunset.` },
      { question: "How to get to Navy Lighthouse? Any transportation recommendations?", answer: "Navy Lighthouse is located in Miraflores district, Lima, Peru. The address is Mal. Cisneros 18, Miraflores 15074.\n\n⚠️ Important Transportation Recommendations:\n1. Taxi from Lima airport to Miraflores about 40 minutes\n2. Walk from Miraflores center to Navy Lighthouse Park about 10-15 minutes\n3. For specific navigation, search for 'Faro de la Marina, Miraflores' in Google Maps\n4. You can also join a Lima city tour, which includes Navy Lighthouse" },
      { question: "What should I pay attention to when visiting? Any safety recommendations?", answer: "When visiting, please note:\n1. 🌞 Sun protection: Lima sunlight is strong, apply sunscreen even on cloudy days, wear sunglasses and hat\n2. 👟 Comfort: Wear comfortable walking shoes for walking in the park and seaside promenade\n3. 🏛️ Cultural respect: Please respect local culture and traditions, keep the park clean\n4. 💰 Safety: Keep personal belongings safe, many tourists, beware of pickpockets\n5. 🎨 History appreciation: Carefully appreciate the historical value of inscription plaques and memorial statues" },
      { question: "What other attractions are worth visiting nearby?", answer: "Navy Lighthouse is located in Miraflores district. After visiting the park, you can visit the following attractions:\n1. Inca Market — Buy Peruvian handicrafts\n2. Kennedy Park — See cats and night market\n3. Larco Museum — Peruvian gold collection\n4. San Francisco Monastery — Lima history and culture\n5. Love Park — Another excellent spot to watch Pacific sunset" }
    ]},
    location: { title: "Map Location", address: "Mal. Cisneros 18, Miraflores 15074\nPeru\n(Miraflores District, Lima)", openMaps: "View Location on Google Maps" },
    footer: { callToAction: "As an important historical attraction in Lima, please join us in caring for the park and protecting the environment. Keep the attraction clean and maintain this beautiful historical space together.", text: "© 2026 Navy Lighthouse Guide · All rights reserved.\nThis website is an independent third-party guide project dedicated to accurately sharing information about Navy Lighthouse. We are not affiliated with the Peruvian government or any official authority.", made: "This website is an independent third-party guide project. Made for explorers and learners.", linksTitle: "Related Links", links: [
      { name: "Peru Ministry of Foreign Trade and Tourism", url: "https://www.gob.pe/mincetur" },
      { name: "Official Peru Travel Guide - Lima Region", url: "https://www.peru.travel/es/destinos/lima" },
      { name: "Lima Metropolitan Municipality", url: "https://www.gob.pe/munilima" },
      { name: "Miraflores District Municipality", url: "https://www.miraflores.gob.pe/" },
      { name: "Peru Ministry of Defense", url: "https://www.gob.pe/mindef" },
      { name: "Peruvian Navy Directorate of Hydrography", url: "https://www.dhn.mil.pe/" },
      { name: "World Lighthouse Directory", url: "https://www.ibiblio.org/lighthouse/photos/Peru/Peru.htm" },
      { name: "Wikipedia: La Marina Lighthouse", url: "https://en.wikipedia.org/wiki/La_Marina_Lighthouse" }
    ]}
  },

  es: {
    nav: { about: "Descripción", inscriptions: "Inscripciones", visiting: "Guía de Visita", transportation: "Cómo Llegar", tips: "Consejos", gallery: "Galería", reviews: "Reseñas", faq: "Preguntas Frecuentes", location: "Ubicación" },
    hero: { tagline: "Lima, Perú · Mirador Marítimo de Miraflores", title: "Faro de la Marina", subtitle: "Faro de la Marina · Navy Lighthouse · Punto Histórico en el Pacífico", cta: "Explorar" },
    rating: { reviews: "reseñas", source: "Google Reviews" },
    about: {
      title: "Faro de la Marina: El Mirador Histórico de Lima en Miraflores",
      p1: "El Faro de la Marina está ubicado en Miraflores, el famoso distrito costero de Lima, la capital de Perú. Este faro histórico fue construido en 1900 e instalado aquí por la Marina de Guerra del Perú en 1973. Es uno de los miradores más importantes de Lima.\n\nEl faro tiene un alcance luminoso de 45 kilómetros (25 millas náuticas), se eleva 22 metros de altura y está situado a una altitud de 86 metros. El faro está hecho de hierro fundido, que consta de 319 partes desmontables y 1,750 pernos de unión, con un peso total de 60,000 kilogramos. No es solo una instalación importante de navegación marítima, sino también un excelente lugar para disfrutar de las vistas espectaculares del Océano Pacífico.",
      p2: `El Parque El Faro de la Marina es una atracción única que combina historia, tecnología y paisajes naturales. El parque cuenta con estatuas conmemorativas de figuras importantes en la historia naval peruana, incluyendo el Vicealmirante Martín Jorge Guise, fundador de la Marina Peruana, y el Capitán Juan Manuel Fanning García.

**Significado Histórico:** El Faro de la Marina no es solo una instalación importante para la navegación marítima, sino también un testigo de la historia naval peruana. La placa en la base del faro registra sus parámetros técnicos e historia de construcción en detalle, sirviendo como una ventana importante al conocimiento de la historia marítima peruana.

**Tradición Anual:** Como una atracción histórica en Miraflores, atrae a numerosos visitantes cada año para ver la puesta del sol en el Pacífico y experimentar la gloriosa historia de la Marina Peruana.

💡 **Consejo de Viaje:** El Faro de la Marina es uno de los mejores lugares en Lima para ver la puesta del sol en el Pacífico. En la tarde, la luz dorada del sol se extiende sobre el mar, creando una armonía perfecta con el faro histórico—una escena extremadamente espectacular.`,
      highlights: { title: "Puntos Destacados", items: ["Faro Histórico: Faro de hierro fundido construido en 1900", "Alcance 45km: Alcance luminoso de 25 millas náuticas", "Altura 22m: Vistas espectaculares a 86m de altitud", "Placa de Inscripción: Parámetros técnicos detallados", "Estatuas Conmemorativas: Héroes navales", "Abierto 24/7: Espacio público siempre accesible"] },
    },
    inscriptions: {
      title: "Inscripciones e Historia",
      subtitle: "Placa Base del Faro y Estatuas Conmemorativas",
      intro: {
        title: "Acerca del Parque El Faro de la Marina",
        content: `El Parque El Faro de la Marina está ubicado en el acantilado costero de Miraflores. Un letrero de información verde en la entrada del parque presenta la historia del faro:

**Año de Construcción:** 1900
**Instalación:** Instalado por la Marina de Guerra del Perú en 1973
**Alcance Luminoso:** 45 kilómetros (25 millas náuticas)

El parque cuenta con estatuas conmemorativas y placas de inscripción de figuras importantes en la historia naval, convirtiéndose en un lugar importante para aprender sobre la historia naval peruana.`
      },
      plaque: {
        title: "Placa Base del Faro - Especificaciones Técnicas",
        content: "La placa de metal en la base oscura debajo del faro registra los parámetros físicos detallados y la ubicación geográfica del faro:",
        items: [
          { label: "Nombre", value: "FARO \"LA MARINA\" (Faro de la Marina)" },
          { label: "Autoridad", value: "Ministerio de Marina · Dirección de Hidrografía y Navegación" },
          { label: "Luminosidad", value: "83,000 Candelas" },
          { label: "Alcance", value: "25 Millas Náuticas (45 km)" },
          { label: "Destellos", value: "Destellos Blancos" },
          { label: "Latitud", value: "12° 07' 13\"" },
          { label: "Longitud", value: "77° 02' 17\"" },
          { label: "Altura de Torre", value: "22 Metros" },
          { label: "Altitud", value: "86 Metros sobre el Nivel del Mar" },
          { label: "Año de Construcción", value: "1900" },
          { label: "Material", value: "Hierro Fundido" },
          { label: "Partes Desarmables", value: "319 Piezas" },
          { label: "Pernos de Unión", value: "1,750 Piezas" },
          { label: "Peso Total", value: "60,000 Kilogramos" },
          { label: "Instalación", value: "Instalado por DHNM, Diciembre 1973" }
        ]
      },
      monuments: {
        title: "Estatuas Conmemorativas de Figuras Históricas",
        content: "El parque cuenta con bustos e inscripciones biográficas de figuras importantes en la historia naval:",
        items: [
          {
            name: "Vicealmirante Martín Jorge Guise (1780-1828)",
            description: `Fundador de la Marina de Guerra del Perú, primer Almirante de la República, y ex residente del distrito de Miraflores. El 24 de noviembre de 1828, dio su vida en defensa de su patria adoptiva a bordo de la fragata Presidente, cumpliendo con su lema familiar: "El más honesto, el más seguro" (QUO HONESTIOR EO TUTIOR).

Estatua conmemorativa develada en Miraflores el 12 de marzo de 2022.`
          },
          {
            name: "Capitán de Navío Juan Manuel Fanning García",
            description: `La heroica ciudad de Miraflores rinde homenaje al Capitán de Navío Juan Manuel Fanning García. Como comandante del Batallón Guarnición de Marina, actuó valientemente en la Batalla de Miraflores el 15 de enero de 1881, y fue mortalmente herido en esta acción, dejando un claro ejemplo de sacrificio y pundonor a los peruanos e infantes de marina de hoy y siempre.

Lema: "¡Adelante Marina Adelante!"

Placa conmemorativa develada en Miraflores en julio de 2022.`
          }
        ]
      }
    },
    visiting: {
      title: "Guía de Visita",
      hours: { title: "Horario de Apertura", content: "Abierto las 24 horas\nTodos los días del año", note: "⚠️ Nota: Llegue antes de la puesta del sol para disfrutar de la hermosa vista." },
      price: { title: "Entrada", content: "Entrada Gratuita\nNo se requiere boleto\nTodos los visitantes bienvenidos", note: "⚠️ Nota Importante: El Parque El Faro de la Marina es un espacio público gratuito, no se necesitan boletos." },
      duration: { title: "Duración Recomendada", content: "Recomendado: 30 minutos - 1 hora", note: "Puede combinarse con un tour del malecón de Miraflores, planear medio día para explorar atracciones cercanas." },
      tips: { title: "Qué llevar", items: ["Zapatos cómodos para caminar", "Protección solar y gafas de sol (sol fuerte en Lima)", "Cámara y baterías de repuesto (no se pierda la puesta del sol)", "Sombrero y chaqueta ligera (brisa fresca del mar)", "Agua y snacks", "Mapa local o APP de guía"] },
    },
    transportation: {
      title: "Cómo Llegar",
      airport: { title: "Desde el Aeropuerto Internacional Jorge Chávez (LIM) a Miraflores", content: "Todos los visitantes deben llegar primero a Lima—la capital y ciudad más grande de Perú. Luego viajar del aeropuerto de Lima al distrito de Miraflores (about 40 minutos en auto).", options: [
        { name: "Taxi / Transferencia Privada", price: "Aprox. 50 - 80 soles", time: "Aprox. 40 minutos", steps: ["Aprox. 40 minutos", "Transferencia privada about 50-80 soles", "Puede ser organizado en aeropuerto Lima"] },
        { name: "Bus del Aeropuerto (Airport Shuttle)", price: "Aprox. 15 - 25 soles", time: "Aprox. 1 hora", steps: ["Tomar bus del aeropuerto a Miraflores", "Boleto about 15-25 soles", "Sale cada 30 minutos, 1 hora de viaje"] }
      ]},
      publicTransport: {
        title: "Transporte Público de Lima (Recomendado)",
        content: "Lima tiene un sistema típico de BRT (Transporte Rápido en Autobús) y una red integral de autobuses en Sudamérica, que es la mejor manera de experimentar la vida local.",
        options: [
          {
            name: "Metropolitano (Sistema BRT)",
            description: "Sistema BRT de Lima, rápido y conveniente",
            steps: [
              "Tomar Metropolitano (Línea B o C)",
              "Bajar en la estación Ricardo Palma o estación Benavides",
              "Caminar hacia el mar por Av. Ricardo Palma o Av. Benavides por about 20-25 minutos",
              "O transferir a un taxi por unos minutos para llegar al Parque El Faro de la Marina en el acantilado",
              "💡 Consejo: Esta manera puede evitar perfectamente el tráfico congestionado de Lima"
            ]
          },
          {
            name: "Corredor Azul (Autobús Azul)",
            description: "Autobuses azules que corren por Avenida Arequipa",
            steps: [
              "Tomar autobuses azules como la Ruta 301",
              "Corre por Av. Arequipa",
              "Bajar en la terminal en el distrito de Miraflores o una estación cerca del parque",
              "Caminar para llegar al Parque El Faro de la Marina"
            ]
          }
        ]
      },
      cycling: {
        title: "Ciclismo a lo largo de la costa (Micromovilidad/Bicicleta)",
        content: `El "Malecón de Miraflores" donde está ubicado el Parque El Faro de la Marina tiene el carril para bicicletas mejor planificado de Lima.

Rutas recomendadas:
• Empezar desde Barranco (distrito bohemio) en el sur
• Empezar desde San Isidro en el norte
• Alquilar bicicletas compartidas o patinetes, montar a lo largo del magnífico acantilado costero hasta el Parque El Faro de la Marina

💡 Consejo: Esta es la mejor manera de disfrutar el acantilado costero del Pacífico, con hermoso paisaje a lo largo del camino.`
      },
      localTransport: {
        title: "Micros/Combis (Minibuses tradicionales)",
        description: "Minibuses privados con únicas características latinoamericanas, usualmente pintados con colores brillantes. Aunque las rutas son complejas y no adecuadas para turistas principiantes, para aquellos que quieren experimentar la vida local definitiva, es la manera más auténtica de ir al distrito de Miraflores.",
        steps: [
          "Buscar minibuses que van a Miraflores en el centro de Lima",
          "Pasaje about 1-2 soles, muy barato",
          "⚠️ Nota: Rutas complejas, recomendado tomar con locales"
        ]
      },
      city: { title: "Lima al Faro de la Marina", content: "El Parque El Faro de la Marina está ubicado en el malecón costero (Malecón Cisneros) en el distrito de Miraflores. El transporte es conveniente, accesible en taxi, bus o a pie.", steps: ["Recomendado: Caminar desde el centro de Miraflores, about 10-15 minutos", "Taxi about 10 minutos", "Bus disponible a la estación Faro de la Marina"] },
    },
    tips: { title: "Consejos", items: [
      "⚠️ Mejor Momento: Llegue en la tarde para disfrutar la puesta del sol",
      "💡 Consejo de Transporte: Recomendado tomar taxi del centro de Lima, ahorra tiempo y cómodo.",
      "Tome medidas de protección solar",
      "El parque es gratuito, no se requiere boleto",
      "Respetar la cultura local",
      "Contratar un guía local",
      "Visitar otras atracciones de Miraflores"
    ] },
    gallery: { title: "Galería", viewMore: "Ver Más Fotos en Google Maps" },
    reviews: { title: "Reseñas de Visitantes", subtitle: "Voces del Faro de la Marina", viewMore: "Ver Más Reseñas en Google Maps" },
    faq: { title: "Preguntas Frecuentes", subtitle: "Aprenda Más Sobre el Faro de la Marina", items: [
      { question: "¿Cuál es el horario del Faro de la Marina?", answer: "Abierto las 24 horas, todos los días." },
      { question: "¿Hay entrada?", answer: "No, entrada gratuita." }
    ]},
    location: { title: "Ubicación", address: "Mal. Cisneros 18, Miraflores 15074\nPerú\n(Distrito de Miraflores, Lima)", openMaps: "Ver en Google Maps" },
    footer: { callToAction: "Como un importante atractivo histórico en Lima, únanse a nosotros para cuidar el parque.", text: "© 2026 Guía del Faro de la Marina.", made: "Hecho para exploradores.", linksTitle: "Enlaces", links: [
      { name: "MINCETUR", url: "https://www.gob.pe/mincetur" },
      { name: "Peru Travel - Lima", url: "https://www.peru.travel/es/destinos/lima" },
      { name: "Municipalidad de Lima", url: "https://www.gob.pe/munilima" },
      { name: "Municipalidad de Miraflores", url: "https://www.miraflores.gob.pe/" },
      { name: "Ministerio de Defensa", url: "https://www.gob.pe/mindef" },
      { name: "Dirección de Hidrografía", url: "https://www.dhn.mil.pe/" },
      { name: "Directorio de Faros", url: "https://www.ibiblio.org/lighthouse/photos/Peru/Peru.htm" },
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/La_Marina_Lighthouse" }
    ]}
  },

  qu: {
    nav: { about: "Qhaway", inscriptions: "Qillqakuna", visiting: "Puriy", transportation: "Chaykamuy", tips: "Yachay", gallery: "Rikuy", reviews: "Niykuna", faq: "Tapuykuna", location: "Maypi" },
    hero: { tagline: "Lima, Piruw · Miraflores", title: "Navy Lighthouse", subtitle: "Faro de la Marina", cta: "Rikuy" },
    rating: { reviews: "niykuna", source: "Google niykuna" },
    about: {
      title: "Navy Lighthouse: Lima",
      p1: "Navy Lighthouse, Miraflores, Lima, Piruwpi. Historic lighthouse. Kayqa Pacífico ñawpaqpi. 1900 watapi ruwasqa.",
      p2: "Navy Lighthouse. 22 metros altura. 86 metros altitude. 45 km range.",
      highlights: { title: "Rikuy", items: ["Lighthouse: 1900", "Range: 45 km", "Height: 22m", "Free: All visitors"] },
    },
    inscriptions: {
      title: "Qillqakuna",
      subtitle: "Lighthouse plaque",
      intro: {
        title: "Park",
        content: "Navy Lighthouse Park. 1900. Peruvian Navy."
      },
      plaque: {
        title: "Plaque",
        content: "Lighthouse technical data:",
        items: [
          { label: "Name", value: "Faro La Marina" },
          { label: "Year", value: "1900" },
          { label: "Height", value: "22 meters" },
          { label: "Range", value: "45 km" }
        ]
      },
      monuments: {
        title: "Statues",
        content: "Naval heroes.",
        items: [
          {
            name: "Martín Jorge Guise",
            description: "Peruvian Navy founder. 1780-1828."
          },
          {
            name: "Juan Manuel Fanning",
            description: "Naval captain. Battle of Miraflores."
          }
        ]
      }
    },
    visiting: {
      title: "Puriy",
      hours: { title: "Punchaw", content: "24 horas\nSapa punchaw", note: "⚠️ Punchaw rikuy." },
      price: { title: "Qullqi", content: "Free", note: "⚠️ Free." },
      duration: { title: "Unay", content: "30 min - 1 ura", note: "Miraflores puriy." },
      tips: { title: "Apamuy", items: ["Bota", "Inti amachana", "Cámara"] },
    },
    transportation: {
      title: "Chaykamuy",
      airport: { title: "Lima-manta", content: "Lima-man antawan hamuy.", options: [
        { name: "Taxi", price: "50 - 80 soles", time: "40 min", steps: ["Lima-manta Miraflores-man taxi", "40 min"] }
      ]},
      city: { title: "Lima", content: "Miraflores-man.", steps: ["Taxi", "Bus", "Google Maps-mi maskuy"] },
    },
    tips: { title: "Yachay", items: [
      "Navy Lighthouse, Lima",
      "Taxi",
      "Free"
    ] },
    gallery: { title: "Rikuy", viewMore: "Google Maps nisqapi astawan rikuy" },
    reviews: { title: "Niykuna", subtitle: "Navy Lighthouse niykuna", viewMore: "Astawan niykuna" },
    faq: { title: "Tapuykuna", subtitle: "Yachay", items: [
      { question: "Hayk'aq kachkan?", answer: "24 horas. Sapa p'unchay." },
      { question: "Qullqi paganan chá?", answer: "Mana. Free." }
    ]},
    location: { title: "Maypipas", address: "Mal. Cisneros 18, Miraflores\nPerú", openMaps: "Google Maps nisqapi maytapas rikuy" },
    footer: { callToAction: "Navy Lighthouse cuiday.", text: "© 2026 Navy Lighthouse.", made: "Kayqa puriy yachay.", linksTitle: "Imakunata", links: [
      { name: "MINCETUR", url: "https://www.gob.pe/mincetur" },
      { name: "Peru Travel - Lima", url: "https://www.peru.travel/es/destinos/lima" },
      { name: "Lima Gobierno", url: "https://www.gob.pe/munilima" },
      { name: "Miraflores", url: "https://www.miraflores.gob.pe/" },
      { name: "Defensa", url: "https://www.gob.pe/mindef" },
      { name: "Hidrografía", url: "https://www.dhn.mil.pe/" },
      { name: "Faro Directorio", url: "https://www.ibiblio.org/lighthouse/photos/Peru/Peru.htm" },
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/La_Marina_Lighthouse" }
    ]}
  }
};
