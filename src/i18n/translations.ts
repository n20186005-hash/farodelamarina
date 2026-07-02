export type Locale = "zh" | "en" | "es" | "qu";
export type LinkItem = { name: string; url: string };
export type FAQItem = { question: string; answer: string };
export type TransportOption = { name: string; time: string; price: string; steps: string[] };

export type Translations = {
  nav: { history: string; architecture: string; monuments: string; visiting: string; transportation: string; gallery: string; reviews: string; faq: string; location: string };
  hero: { tagline: string; title: string; subtitle: string; cta: string };
  rating: { reviews: string; source: string };
  history: { title: string; intro: string; originTitle: string; originContent: string; legendCard: { title: string; content: string } };
  architecture: { title: string; intro: string; specs: { structure: { title: string; content: string }; design: { title: string; content: string }; optics: { title: string; content: string } }; plaque: { title: string; items: { label: string; value: string }[] } };
  monuments: { title: string; intro: string; items: { name: string; description: string }[] };
  visiting: { title: string; intro: string; hours: { title: string; content: string; note: string }; price: { title: string; content: string; note: string }; duration: { title: string; content: string; note: string }; tips: { title: string; items: string[] } };
  transportation: { title: string; airport: { title: string; content: string; options: TransportOption[] }; publicTransport?: { title: string; content: string; options: { name: string; description: string; steps: string[] }[] }; cycling?: { title: string; content: string }; localTransport?: { title: string; description?: string; content?: string; steps?: string[] }; city: { title: string; content: string; steps: string[] }; tips: { title: string; items: string[] } };
  gallery: { title: string; viewMore: string };
  reviews: { title: string; subtitle: string; viewMore: string; nearbyTitle: string; nearbyIntro: string; nearbyItems: { name: string; description: string }[] };
  faq: { title: string; subtitle: string; items: FAQItem[] };
  location: { title: string; address: string; openMaps: string };
  footer: { callToAction: string; text: string; made: string; linksTitle: string; links: LinkItem[] };
};

export const translations: Record<Locale, Translations> = {
  zh: {
    nav: { history: "历史渊源", architecture: "技术规格", monuments: "海军荣誉", visiting: "游览指南", transportation: "交通规划", gallery: "照片画廊", reviews: "游客评价", faq: "常见问题", location: "地图位置" },
    hero: { tagline: "秘鲁利马 · 米拉弗洛雷斯海滨观景台", title: "Faro de la Marina", subtitle: "海军灯塔 · Navy Lighthouse · 太平洋畔的百年航海地标", cta: "探索灯塔" },
    rating: { reviews: "条评价", source: "Google 评论" },
    history: {
      title: "历史渊源与传奇身世",
      intro: "海军灯塔（西班牙语：Faro de la Marina）不仅是秘鲁首都利马最著名、访问量最大的灯塔，更是一座承载了百年航海记忆的工业文物。与许多人的直觉不同，这座标志性建筑最初并非矗立于米拉弗洛雷斯的悬崖之上。",
      originTitle: "从南部港口到首都悬崖",
      originContent: "灯塔的建造最初受委托于瑞典的 Chance Bros 公司，并于1900年落成于莫克瓜大区（Moquegua）伊洛港以南的科莱斯角（Punta Coles）。它在南部海域为往来船只指引了半个多世纪的航向。直到1973年12月，秘鲁海军水文航海局（DHNM）将其精心拆解，并跨越数百公里重新组装在利马米拉弗洛雷斯的现址——海军灯塔公园（Parque el Faro），以此纪念秘鲁航海史的一百周年。",
      legendCard: {
        title: "你知道吗？建筑谜团与都市传说",
        content: "关于这座深蓝色铁塔，民间一直流传着一个著名的都市传说：许多人坚信这座灯塔是由法国著名工程师古斯塔夫·埃菲尔（Gustave Eiffel，埃菲尔铁塔的设计者）所设计的。尽管这一说法在游客中广为流传，但迄今为止并没有确凿的文献记录能支持这一观点，为其平添了一抹神秘色彩。"
      }
    },
    architecture: {
      title: "建筑构造与技术规格",
      intro: "海军灯塔完美融合了维多利亚时代的工业美学与现代航海技术。灯塔正下方深色的金属铭牌记录了其详细的物理参数：",
      specs: {
        structure: { title: "建筑结构", content: "塔高22米，矗立于海拔86米的太平洋海岸悬崖之上，总焦高达到108米。" },
        design: { title: "工业设计", content: "塔身由319个可拆卸的铸铁部件和1,750个连接螺栓精密组装而成，总重量达60,000公斤。外部采用深海军蓝色涂装，并配有两条醒目的白色水平条纹。" },
        optics: { title: "光学性能", content: "灯塔拥有 83,000 坎德拉的亮度。其白光闪烁模式（每15秒闪烁三次）在无雾天气下的可视射程可达 18 海里（约 33 公里）。" }
      },
      plaque: {
        title: "灯塔基座铭牌详细参数",
        items: [
          { label: "名称", value: "FARO \"LA MARINA\"（海军灯塔）" },
          { label: "主管部门", value: "秘鲁海军部 · 水文航海局" },
          { label: "亮度", value: "83,000 坎德拉" },
          { label: "射程", value: "18海里（约33公里）" },
          { label: "闪光", value: "闪烁白光（每15秒三次）" },
          { label: "纬度", value: "12° 07' 13\"" },
          { label: "经度", value: "77° 02' 17\"" },
          { label: "塔高", value: "22米" },
          { label: "海拔高度", value: "86米" },
          { label: "总焦高", value: "108米" },
          { label: "建造年份", value: "1900年" },
          { label: "材质", value: "铸铁" },
          { label: "可拆卸部件", value: "319件" },
          { label: "连接螺栓", value: "1,750个" },
          { label: "总重量", value: "60,000公斤" },
          { label: "安装信息", value: "由DHNM安装，1973年12月" }
        ]
      }
    },
    monuments: {
      title: "纪念广场与海军荣誉",
      intro: "灯塔所在的公园是一个集技术和自然景观于一体的公共空间，设有多位秘鲁海军历史重要人物的纪念雕像与铭文，供后人瞻仰：",
      items: [
        { name: "马丁·豪尔赫·吉斯 中将 (Vicealmirante Martín Jorge Guise, 1780-1828)", description: "秘鲁海军创始人，共和国第一任海军上将。1828年11月24日，他在“总统号”护卫舰上为保卫这片收养他的祖国而献出生命。其家族座右铭为：“最诚实，最安全”（QUO HONESTIOR EO TUTIOR）。" },
        { name: "胡安·曼努埃尔·范宁·加西亚 海军上尉 (Capitán de Navío Juan Manuel Fanning García)", description: "在1881年1月15日的米拉弗洛雷斯战役中表现英勇并受致命重伤。他为秘鲁人民留下了不朽的牺牲榜样，以及那句著名的口号：“前进，海军，前进！”(¡ADELANTE MARINA ADELANTE!)。" }
      ]
    },
    visiting: {
      title: "游览指南",
      intro: "海军灯塔公园拥有广阔的太平洋全景视野，是利马市区观赏日落的顶级机位。",
      hours: { title: "最佳造访时间", content: "傍晚时分", note: "落日余晖与百年深蓝色灯塔的结合，是不可多得的摄影绝景。" },
      price: { title: "费用说明", content: "免费免票开放", note: "该公园作为城市公共空间，欢迎所有热爱历史与美景的旅行者。" },
      duration: { title: "防晒与着装", content: "备好防晒用品与墨镜\n携带轻薄外套", note: "利马的强紫外线不容忽视；海风较凉，建议备好衣物。" },
      tips: { title: "出行备忘录", items: ["防晒用品与墨镜（利马阳光强烈）", "轻薄外套（海风较凉）", "相机和备用电池（日落摄影）", "舒适的步行鞋", "当地地图或导游APP"] }
    },
    transportation: {
      title: "交通规划",
      airport: { title: "✈️ 豪尔赫·查韦斯国际机场 (LIM) ➔ 米拉弗洛雷斯", content: "所有国际游客落地利马后，可直接在机场乘坐官方出租车或安排私人包车前往米拉弗洛雷斯区。", options: [
        { name: "官方出租车 / 私人包车", price: "约 50-80 索尔", time: "约 40 分钟", steps: ["在机场官方柜台或提前预订", "直接前往米拉弗洛雷斯区"] },
        { name: "机场大巴（Airport Shuttle）", price: "约 15-25 索尔", time: "约 1 小时", steps: ["乘坐机场专线大巴", "在米拉弗洛雷斯中心下车后步行或打车"] }
      ]},
      publicTransport: {
        title: "🚌 快捷公交 (Metropolitano)",
        content: "推荐乘坐 Metropolitano 快捷公交。这种方式能完美避开利马市区拥堵的地面交通。",
        options: [
          {
            name: "B线 或 C线",
            description: "快捷公交系统",
            steps: [
              "乘坐 Metropolitano (B线或C线)",
              "在 Ricardo Palma 站 或 Benavides 站下车",
              "向海滨方向步行约20-25分钟，或换乘几分钟的出租车即可抵达"
            ]
          }
        ]
      },
      cycling: {
        title: "🚲 沿海悬崖骑行",
        content: `米拉弗洛雷斯海滨步道（Malecón）拥有利马规划最完善的自行车道。

强烈建议从南部的巴兰科（Barranco）或北部的圣伊西德罗（San Isidro）租用共享自行车，沿着绝美的海岸线一路骑行至公园。`
      },
      city: { title: "🚶 利马市区 ➔ 海军灯塔", content: "从米拉弗洛雷斯中心出发非常方便。", steps: ["从肯尼迪公园步行约15分钟即可到达", "打车仅需约5分钟"] },
      tips: { title: "交通小贴士", items: ["避免在高峰时段（早上7-9点，下午5-7点）乘坐地面交通", "推荐使用 Uber, Cabify 等打车软件", "骑行时请注意佩戴头盔并走专用自行车道"] }
    },
    reviews: { 
      title: "游客评价与周边探索", 
      subtitle: "来自海军灯塔的声音：Google Maps 真实见证", 
      viewMore: "在 Google Maps 查看更多评价",
      nearbyTitle: "周边步行可达景点",
      nearbyIntro: "参观完灯塔后，沿着海岸线步行，您还可以轻松抵达：",
      nearbyItems: [
        { name: "爱情公园 (Parque del Amor)", description: "以高迪风格马赛克装饰闻名的浪漫公园，同样是观赏太平洋日落的绝佳地点。" },
        { name: "肯尼迪公园 (Kennedy Park)", description: "米拉弗洛雷斯的中心广场，以观赏众多亲人的流浪猫而闻名。" },
        { name: "拉尔科马购物中心 (Larcomar)", description: "一座直接建在悬崖内部的现代化露天购物中心，拥有众多海景餐厅和商店。" }
      ]
    },
    gallery: { title: "照片画廊", viewMore: "在 Google Maps 查看更多相片" },
    faq: { title: "常见问题", subtitle: "深入了解海军灯塔", items: [
      { question: "海军灯塔的开放时间是？", answer: "海军灯塔公园24小时开放，全年无休。但由于是户外公园，建议白天或傍晚参观，安全和光线更佳。日落时分是观赏的最佳时机。" },
      { question: "参观海军灯塔需要门票吗？", answer: "不需要。海军灯塔公园是免费的公共空间，无需购买门票，欢迎所有游客前来参观。公园全年对外开放，您可以随时前往。" },
      { question: "海军灯塔是谁设计的？", answer: "坊间一直流传这座灯塔是由法国著名工程师古斯塔夫·埃菲尔（埃菲尔铁塔的设计者）所设计，但迄今并没有确凿文献记录支持这一都市传说。实际上，灯塔由瑞典的 Chance Bros 公司于1900年建造。" },
      { question: "如何前往海军灯塔？", answer: "海军灯塔位于秘鲁利马米拉弗洛雷斯区。从利马机场乘坐出租车到米拉弗洛雷斯约40分钟；从米拉弗洛雷斯中心步行到海军灯塔公园约10-15分钟。也可以乘坐快捷公交(Metropolitano)至 Ricardo Palma 站后步行前往。" }
    ]},
    location: { title: "地图位置", address: "Mal. Cisneros 18, Miraflores 15074\nPerú\n（利马米拉弗洛雷斯区）", openMaps: "在 Google Maps 查看位置" },
    footer: { callToAction: "作为利马的重要历史景点，请与我们一起爱护公园、保护环境。保持景点整洁，共同维护这一美丽的历史空间。", text: "© 2026 海军灯塔指南 · 保留所有权利。\n本网站是一个独立的第三方指南项目，致力于准确传播海军灯塔信息。我们与秘鲁政府或其他官方机构没有任何关联。", made: "本网站是一个独立的第三方指南项目。为探索者与学习者而制。", linksTitle: "相关链接", links: [
      { name: "秘鲁外贸和旅游部", url: "https://www.gob.pe/mincetur" },
      { name: "秘鲁国家旅游局官方指南 - 利马大区专页", url: "https://www.peru.travel/es/destinos/lima" },
      { name: "利马都会区市政府", url: "https://www.gob.pe/munilima" },
      { name: "米拉弗洛雷斯区政府", url: "https://www.miraflores.gob.pe/" },
      { name: "秘鲁海军水文航海局", url: "https://www.dhn.mil.pe/" },
      { name: "全球灯塔权威名录", url: "https://www.ibiblio.org/lighthouse/photos/Peru/Peru.htm" },
      { name: "维基百科：海军灯塔专页", url: "https://en.wikipedia.org/wiki/La_Marina_Lighthouse" }
    ]}
  },
  en: {
    nav: { history: "History & Origins", architecture: "Tech Specs", monuments: "Naval Honors", visiting: "Visit Guide", transportation: "Getting There", gallery: "Gallery", reviews: "Reviews", faq: "FAQ", location: "Location" },
    hero: { tagline: "Lima, Peru · Miraflores Seaside Viewpoint", title: "Faro de la Marina", subtitle: "Navy Lighthouse · Faro de la Marina · Historic Landmark on the Pacific", cta: "Explore the Lighthouse" },
    rating: { reviews: "reviews", source: "Google Reviews" },
    history: {
      title: "History & Origins",
      intro: "The Navy Lighthouse (Spanish: Faro de la Marina) is not only the most famous and visited lighthouse in Lima, the capital of Peru, but also an industrial artifact bearing a century of maritime memory. Contrary to many people's intuition, this iconic structure was not originally built on the cliffs of Miraflores.",
      originTitle: "From Southern Port to the Capital's Cliffs",
      originContent: "The lighthouse's construction was originally commissioned to the Swedish company Chance Bros, and it was completed in 1900 at Punta Coles, south of the port of Ilo in the Moquegua region. It guided ships in the southern seas for over half a century. It wasn't until December 1973 that the Peruvian Navy's Directorate of Hydrography and Navigation (DHNM) carefully dismantled it and reassembled it hundreds of kilometers away at its current location in Miraflores, Lima—Navy Lighthouse Park (Parque el Faro), to commemorate the centennial of Peruvian maritime history.",
      legendCard: {
        title: "Did you know? Architectural Mystery & Urban Legend",
        content: "Regarding this dark blue iron tower, a famous urban legend has long circulated: many people firmly believe that this lighthouse was designed by the famous French engineer Gustave Eiffel (designer of the Eiffel Tower). Although this claim is widely circulated among tourists, there has been no conclusive documentary evidence to support it so far, adding a touch of mystery to it."
      }
    },
    architecture: {
      title: "Architecture & Technical Specs",
      intro: "The Navy Lighthouse perfectly blends Victorian industrial aesthetics with modern maritime technology. The dark metal plaque directly below the lighthouse records its detailed physical parameters:",
      specs: {
        structure: { title: "Architectural Structure", content: "The tower is 22 meters high, standing on the Pacific coast cliff at an altitude of 86 meters, with a total focal height of 108 meters." },
        design: { title: "Industrial Design", content: "The tower is precisely assembled from 319 detachable cast-iron parts and 1,750 connecting bolts, with a total weight of 60,000 kg. The exterior is painted in deep navy blue with two striking white horizontal stripes." },
        optics: { title: "Optical Performance", content: "The lighthouse has a luminosity of 83,000 candelas. Its white flashing mode (three flashes every 15 seconds) has a visible range of up to 18 nautical miles (about 33 km) in clear weather." }
      },
      plaque: {
        title: "Lighthouse Base Plaque Parameters",
        items: [
          { label: "Name", value: "FARO \"LA MARINA\" (Navy Lighthouse)" },
          { label: "Authority", value: "Ministry of Marine · Directorate of Hydrography" },
          { label: "Luminosity", value: "83,000 Candelas" },
          { label: "Range", value: "18 Nautical Miles (33 km)" },
          { label: "Flash", value: "White Flashes (3 every 15s)" },
          { label: "Latitude", value: "12° 07' 13\"" },
          { label: "Longitude", value: "77° 02' 17\"" },
          { label: "Tower Height", value: "22 Meters" },
          { label: "Altitude", value: "86 Meters" },
          { label: "Total Focal Height", value: "108 Meters" },
          { label: "Construction Year", value: "1900" },
          { label: "Material", value: "Cast Iron" },
          { label: "Detachable Parts", value: "319 Pieces" },
          { label: "Connecting Bolts", value: "1,750 Pieces" },
          { label: "Total Weight", value: "60,000 Kilograms" },
          { label: "Installation", value: "Installed by DHNM, Dec 1973" }
        ]
      }
    },
    monuments: {
      title: "Memorial Square & Naval Honors",
      intro: "The park where the lighthouse is located is a public space integrating technology and natural landscape, featuring memorial statues and inscriptions of important figures in Peruvian naval history for future generations to pay their respects:",
      items: [
        { name: "Vice Admiral Martín Jorge Guise (1780-1828)", description: "Founder of the Peruvian Navy and first Admiral of the Republic. On November 24, 1828, he gave his life defending his adoptive country on the frigate 'Presidente'. His family motto was: 'The more honest, the safer' (QUO HONESTIOR EO TUTIOR)." },
        { name: "Captain Juan Manuel Fanning García", description: "Fought valiantly and was mortally wounded in the Battle of Miraflores on January 15, 1881. He left an immortal example of sacrifice for the Peruvian people, along with the famous motto: 'Forward Navy, Forward!' (¡ADELANTE MARINA ADELANTE!)." }
      ]
    },
    visiting: {
      title: "Visit Guide",
      intro: "Navy Lighthouse Park offers sweeping panoramic views of the Pacific Ocean and is the top spot in Lima for sunset viewing.",
      hours: { title: "Best Time to Visit", content: "Evening at Sunset", note: "The combination of the sunset glow and the century-old dark blue lighthouse is a rare photographic wonder." },
      price: { title: "Entrance Fee", content: "Free Admission", note: "As a city public space, the park welcomes all travelers who love history and beautiful scenery." },
      duration: { title: "Sun Protection & Clothing", content: "Bring sunscreen and sunglasses\nCarry a light jacket", note: "Lima's strong UV rays cannot be ignored; the sea breeze is cool, so it's advisable to have extra clothing." },
      tips: { title: "Travel Checklist", items: ["Sunscreen and sunglasses", "Light jacket (cool sea breeze)", "Camera and spare battery", "Comfortable walking shoes", "Local map or guide APP"] }
    },
    transportation: {
      title: "Transportation",
      airport: { title: "✈️ Airport Direct (From Jorge Chávez Int'l)", content: "After landing in Lima, international tourists can take an official taxi or arrange a private transfer directly from the airport to the Miraflores district.", options: [
        { name: "Official Taxi / Private Transfer", price: "About 50-80 soles", time: "About 40 minutes", steps: ["Book at official airport counters", "Head directly to Miraflores"] },
        { name: "Airport Shuttle", price: "About 15-25 soles", time: "About 1 hour", steps: ["Take the airport shuttle bus", "Walk or take a taxi after getting off in central Miraflores"] }
      ]},
      publicTransport: {
        title: "🚌 Metropolitano (BRT)",
        content: "We recommend taking the Metropolitano BRT system. This method perfectly avoids Lima's congested ground traffic.",
        options: [
          {
            name: "Line B or C",
            description: "Bus Rapid Transit System",
            steps: [
              "Take the Metropolitano (Line B or C)",
              "Get off at Ricardo Palma or Benavides Station",
              "Walk towards the coast for about 20-25 minutes, or take a quick taxi ride"
            ]
          }
        ]
      },
      cycling: {
        title: "🚲 Coastal Cliff Cycling",
        content: `The Miraflores Seaside Promenade (Malecón) has the best-planned bicycle lanes in Lima.

We highly recommend renting a shared bike from Barranco in the south or San Isidro in the north, and riding along the stunning coastline to the park.`
      },
      city: { title: "🚶 Lima City ➔ Navy Lighthouse", content: "It's very convenient to start from the center of Miraflores.", steps: ["About a 15-minute walk from Kennedy Park", "Only about a 5-minute taxi ride"] },
      tips: { title: "Transportation Tips", items: ["Avoid ground transportation during rush hours (7-9 AM, 5-7 PM)", "Recommend using ride-hailing apps like Uber or Cabify", "Please wear a helmet and use designated bike lanes when cycling"] }
    },
    reviews: { 
      title: "Visitor Reviews & Nearby Exploration", 
      subtitle: "Voices from the Navy Lighthouse: Real Testimonies from Google Maps", 
      viewMore: "View More Reviews on Google Maps",
      nearbyTitle: "Nearby Attractions (Walking Distance)",
      nearbyIntro: "After visiting the lighthouse, you can easily reach the following places by walking along the coastline:",
      nearbyItems: [
        { name: "Love Park (Parque del Amor)", description: "A romantic park famous for its Gaudí-style mosaic decorations, also an excellent spot for watching the Pacific sunset." },
        { name: "Kennedy Park", description: "The central square of Miraflores, famous for observing numerous friendly stray cats." },
        { name: "Larcomar", description: "A modern open-air shopping center built directly into the cliff, featuring many sea-view restaurants and shops." }
      ]
    },
    gallery: { title: "Photo Gallery", viewMore: "View More Photos on Google Maps" },
    faq: { title: "Frequently Asked Questions", subtitle: "Learn More About Navy Lighthouse", items: [
      { question: "What are the opening hours of Navy Lighthouse?", answer: "Navy Lighthouse Park is open 24/7, every day of the year. However, as it is an outdoor park, daytime or evening visits are recommended for better safety and lighting. Sunset time is the best time to visit." },
      { question: "Is there an entrance fee to see Navy Lighthouse?", answer: "No. Navy Lighthouse Park is a free public space, no entrance fee required. All visitors are welcome. The park is open all year round, you can visit at any time." },
      { question: "Who designed the Navy Lighthouse?", answer: "An urban legend claims that this lighthouse was designed by the famous French engineer Gustave Eiffel (designer of the Eiffel Tower), but so far there is no conclusive documentary evidence to support this. In fact, the lighthouse was built by the Swedish company Chance Bros in 1900." },
      { question: "How do I get to the Navy Lighthouse?", answer: "The Navy Lighthouse is located in the Miraflores district of Lima, Peru. It takes about 40 minutes by taxi from Lima airport to Miraflores; it is about a 10-15 minute walk from the center of Miraflores to the park. You can also take the Metropolitano BRT to Ricardo Palma station and walk from there." }
    ]},
    location: { title: "Map Location", address: "Mal. Cisneros 18, Miraflores 15074\nPeru\n(Miraflores District, Lima)", openMaps: "View Location on Google Maps" },
    footer: { callToAction: "As an important historical attraction in Lima, please join us in caring for the park and protecting the environment. Keep the attraction clean and maintain this beautiful historical space together.", text: "© 2026 Navy Lighthouse Guide · All rights reserved.\nThis website is an independent third-party guide project dedicated to accurately sharing information about Navy Lighthouse. We are not affiliated with the Peruvian government or any official authority.", made: "This website is an independent third-party guide project. Made for explorers and learners.", linksTitle: "Related Links", links: [
      { name: "Peru Ministry of Foreign Trade and Tourism", url: "https://www.gob.pe/mincetur" },
      { name: "Official Peru Travel Guide - Lima Region", url: "https://www.peru.travel/es/destinos/lima" },
      { name: "Miraflores District Municipality", url: "https://www.miraflores.gob.pe/" },
      { name: "Peruvian Navy Directorate of Hydrography", url: "https://www.dhn.mil.pe/" },
      { name: "Wikipedia: La Marina Lighthouse", url: "https://en.wikipedia.org/wiki/La_Marina_Lighthouse" }
    ]}
  },
  es: {
    nav: { history: "Historia", architecture: "Especificaciones", monuments: "Monumentos", visiting: "Guía de Visita", transportation: "Transporte", gallery: "Galería", reviews: "Reseñas", faq: "FAQ", location: "Ubicación" },
    hero: { tagline: "Lima, Perú · Mirador Marítimo de Miraflores", title: "Faro de la Marina", subtitle: "Faro de la Marina · Navy Lighthouse · Punto Histórico en el Pacífico", cta: "Explorar" },
    rating: { reviews: "reseñas", source: "Google Reviews" },
    history: {
      title: "Historia y Orígenes",
      intro: "El Faro de la Marina no es solo el faro más famoso y visitado de Lima, la capital del Perú, sino también un artefacto industrial que lleva un siglo de memoria marítima. Contrario a la intuición de muchos, esta icónica estructura no fue construida originalmente en los acantilados de Miraflores.",
      originTitle: "Del Puerto del Sur a los Acantilados de la Capital",
      originContent: "La construcción del faro fue comisionada originalmente a la empresa sueca Chance Bros, y se completó en 1900 en Punta Coles, al sur del puerto de Ilo en la región de Moquegua. Guió a los barcos en los mares del sur durante más de medio siglo. No fue hasta diciembre de 1973 que la Dirección de Hidrografía y Navegación (DHNM) de la Marina de Guerra del Perú lo desmanteló cuidadosamente y lo reensambló a cientos de kilómetros de distancia en su ubicación actual en Miraflores, Lima—el Parque El Faro de la Marina, para conmemorar el centenario de la historia marítima peruana.",
      legendCard: {
        title: "¿Sabías qué? Misterio Arquitectónico y Leyenda Urbana",
        content: "En cuanto a esta torre de hierro azul oscuro, ha circulado durante mucho tiempo una famosa leyenda urbana: muchas personas creen firmemente que este faro fue diseñado por el famoso ingeniero francés Gustave Eiffel (diseñador de la Torre Eiffel). Aunque esta afirmación circula ampliamente entre los turistas, hasta ahora no hay evidencia documental concluyente que la respalde, lo que le añade un toque de misterio."
      }
    },
    architecture: {
      title: "Arquitectura y Especificaciones Técnicas",
      intro: "El Faro de la Marina combina perfectamente la estética industrial victoriana con la tecnología marítima moderna. La placa de metal oscuro directamente debajo del faro registra sus parámetros físicos detallados:",
      specs: {
        structure: { title: "Estructura Arquitectónica", content: "La torre tiene 22 metros de altura, situada en el acantilado de la costa del Pacífico a una altitud de 86 metros, con una altura focal total de 108 metros." },
        design: { title: "Diseño Industrial", content: "La torre está ensamblada con precisión a partir de 319 piezas de hierro fundido desmontables y 1,750 pernos de conexión, con un peso total de 60,000 kg. El exterior está pintado de azul marino profundo con dos llamativas rayas horizontales blancas." },
        optics: { title: "Rendimiento Óptico", content: "El faro tiene una luminosidad de 83,000 candelas. Su modo de destello blanco (tres destellos cada 15 segundos) tiene un alcance visible de hasta 18 millas náuticas (aproximadamente 33 km) en clima despejado." }
      },
      plaque: {
        title: "Parámetros de la Placa Base del Faro",
        items: [
          { label: "Nombre", value: "FARO \"LA MARINA\"" },
          { label: "Autoridad", value: "Ministerio de Marina · Dirección de Hidrografía" },
          { label: "Luminosidad", value: "83,000 Candelas" },
          { label: "Alcance", value: "18 Millas Náuticas (33 km)" },
          { label: "Destellos", value: "Blancos (3 cada 15s)" },
          { label: "Altura de Torre", value: "22 Metros" },
          { label: "Altitud", value: "86 Metros" },
          { label: "Año de Construcción", value: "1900" },
          { label: "Material", value: "Hierro Fundido" },
          { label: "Peso Total", value: "60,000 Kilogramos" },
          { label: "Instalación", value: "Instalado por DHNM, Dic 1973" }
        ]
      }
    },
    monuments: {
      title: "Plaza Conmemorativa y Honores Navales",
      intro: "El parque donde se encuentra el faro es un espacio público que integra tecnología y paisaje natural, con estatuas conmemorativas e inscripciones de figuras importantes de la historia naval peruana:",
      items: [
        { name: "Vicealmirante Martín Jorge Guise (1780-1828)", description: "Fundador de la Marina de Guerra del Perú. El 24 de noviembre de 1828, dio su vida defendiendo su patria adoptiva en la fragata 'Presidente'. Su lema familiar era: 'El más honesto, el más seguro' (QUO HONESTIOR EO TUTIOR)." },
        { name: "Capitán de Navío Juan Manuel Fanning García", description: "Luchó valientemente y fue mortalmente herido en la Batalla de Miraflores el 15 de enero de 1881. Dejó un ejemplo inmortal de sacrificio, junto con el famoso lema: '¡Adelante Marina, Adelante!'." }
      ]
    },
    visiting: {
      title: "Guía de Visita",
      intro: "El Parque El Faro de la Marina ofrece vistas panorámicas del Océano Pacífico y es el mejor lugar en Lima para ver el atardecer.",
      hours: { title: "Mejor momento para visitar", content: "Atardecer", note: "La combinación del resplandor del atardecer y el centenario faro azul oscuro es una maravilla fotográfica poco común." },
      price: { title: "Entrada", content: "Entrada Gratuita", note: "Como espacio público de la ciudad, el parque da la bienvenida a todos los viajeros que aman la historia y los hermosos paisajes." },
      duration: { title: "Protección Solar y Ropa", content: "Lleve protector solar y gafas de sol\nLleve una chaqueta ligera", note: "Los fuertes rayos UV de Lima no pueden ser ignorados; la brisa marina es fresca, por lo que es aconsejable tener ropa extra." },
      tips: { title: "Lista de Verificación", items: ["Protector solar y gafas de sol", "Chaqueta ligera (brisa fresca del mar)", "Cámara y batería de repuesto", "Zapatos cómodos para caminar", "Mapa local o APP de guía"] }
    },
    transportation: {
      title: "Transporte",
      airport: { title: "✈️ Directo desde el Aeropuerto", content: "Después de aterrizar en Lima, los turistas pueden tomar un taxi oficial o transporte privado directamente desde el aeropuerto hasta el distrito de Miraflores.", options: [
        { name: "Taxi Oficial / Traslado Privado", price: "Aprox. 50-80 soles", time: "Aprox. 40 minutos", steps: ["Reserve en los mostradores oficiales", "Diríjase directamente a Miraflores"] }
      ]},
      publicTransport: {
        title: "🚌 Metropolitano (BRT)",
        content: "Recomendamos tomar el sistema BRT Metropolitano para evitar el tráfico.",
        options: [
          {
            name: "Línea B o C",
            description: "Sistema de Tránsito Rápido",
            steps: [
              "Tome el Metropolitano (Línea B o C)",
              "Baje en la estación Ricardo Palma o Benavides",
              "Camine hacia la costa por unos 20-25 minutos"
            ]
          }
        ]
      },
      cycling: {
        title: "🚲 Ciclismo por el Malecón",
        content: `El Malecón de Miraflores tiene las ciclovías mejor planificadas de Lima.
Recomendamos alquilar una bicicleta y pedalear a lo largo de la impresionante costa hasta el parque.`
      },
      city: { title: "🚶 Centro de Lima ➔ Faro de la Marina", content: "Es muy conveniente empezar desde el centro de Miraflores.", steps: ["A unos 15 minutos a pie del Parque Kennedy", "A solo 5 minutos en taxi"] },
      tips: { title: "Consejos de Transporte", items: ["Evite las horas punta (7-9 AM, 5-7 PM)", "Use aplicaciones como Uber o Cabify", "Use las ciclovías designadas"] }
    },
    reviews: { 
      title: "Reseñas y Exploración Cercana", 
      subtitle: "Voces del Faro de la Marina: Testimonios de Google Maps", 
      viewMore: "Ver Más Reseñas en Google Maps",
      nearbyTitle: "Atracciones Cercanas (A pie)",
      nearbyIntro: "Después de visitar el faro, puede llegar fácilmente a los siguientes lugares caminando por el malecón:",
      nearbyItems: [
        { name: "Parque del Amor", description: "Un parque romántico famoso por sus mosaicos estilo Gaudí." },
        { name: "Parque Kennedy", description: "La plaza central de Miraflores, famosa por sus amigables gatos callejeros." },
        { name: "Larcomar", description: "Un moderno centro comercial construido en el acantilado." }
      ]
    },
    gallery: { title: "Galería de Fotos", viewMore: "Ver Más Fotos en Google Maps" },
    faq: { title: "Preguntas Frecuentes", subtitle: "Aprenda Más Sobre el Faro de la Marina", items: [
      { question: "¿Cuál es el horario del Faro de la Marina?", answer: "Abierto las 24 horas, todos los días." },
      { question: "¿Hay que pagar entrada?", answer: "No, el Parque El Faro de la Marina es un espacio público gratuito." }
    ]},
    location: { title: "Ubicación", address: "Mal. Cisneros 18, Miraflores 15074\nPerú", openMaps: "Ver en Google Maps" },
    footer: { callToAction: "Únase a nosotros para cuidar el parque y proteger el medio ambiente.", text: "© 2026 Guía del Faro de la Marina.", made: "Hecho para exploradores.", linksTitle: "Enlaces Relacionados", links: [
      { name: "MINCETUR", url: "https://www.gob.pe/mincetur" },
      { name: "Peru Travel - Lima", url: "https://www.peru.travel/es/destinos/lima" },
      { name: "Municipalidad de Miraflores", url: "https://www.miraflores.gob.pe/" }
    ]}
  },
  qu: {
    nav: { history: "Ñawpaq", architecture: "Ruwasqa", monuments: "Yuyay", visiting: "Puriy", transportation: "Chaykamuy", gallery: "Rikuy", reviews: "Niykuna", faq: "Tapuykuna", location: "Maypi" },
    hero: { tagline: "Lima, Piruw · Miraflores", title: "Faro de la Marina", subtitle: "Faro de la Marina", cta: "Rikuy" },
    rating: { reviews: "niykuna", source: "Google niykuna" },
    history: {
      title: "Ñawpaq kawsay",
      intro: "Faro de la Marina, Miraflores, Lima, Piruwpi. Historic lighthouse.",
      originTitle: "Maymanta hamun",
      originContent: "1900 watapi ruwasqa Punta Coles, Moquegua. 1973 watapi Mirafloresman apamusqa.",
      legendCard: {
        title: "Yachankichu? Gustave Eiffel",
        content: "Achka runakunam ninku Gustave Eiffel ruwarqa, ichaqa manam qillqasqachu kachkan."
      }
    },
    architecture: {
      title: "Imayna ruwasqa",
      intro: "Hatun fierromanta ruwasqa.",
      specs: {
        structure: { title: "Sayaynin", content: "22 metros hatun, 86 metros qucha patanpi." },
        design: { title: "Fierromanta", content: "60,000 kg llasaq." },
        optics: { title: "K'anchay", content: "33 km karukam k'anchan." }
      },
      plaque: {
        title: "Qillqakuna",
        items: [
          { label: "Suti", value: "FARO \"LA MARINA\"" },
          { label: "Wata", value: "1900" },
          { label: "Hatun", value: "22 Metros" }
        ]
      }
    },
    monuments: {
      title: "Yuyaykuna",
      intro: "Hatun runakunata yuyarinapaq:",
      items: [
        { name: "Martín Jorge Guise", description: "Peruvian Navy founder. 1780-1828." },
        { name: "Juan Manuel Fanning", description: "Naval captain. Battle of Miraflores." }
      ]
    },
    visiting: {
      title: "Puriy",
      intro: "Quchata qawanapaq allin kachkan.",
      hours: { title: "Punchaw", content: "24 horas", note: "Inti yaykuyta qawana." },
      price: { title: "Qullqi", content: "Free", note: "Mana qullqiyuq." },
      duration: { title: "Apamuy", content: "Inti amachana", note: "Chiri wayra kanman." },
      tips: { title: "Yachay", items: ["Inti amachana", "Cámara"] }
    },
    transportation: {
      title: "Chaykamuy",
      airport: { title: "Lima-manta", content: "Lima-man antawan hamuy.", options: [
        { name: "Taxi", price: "50 - 80 soles", time: "40 min", steps: ["Lima-manta taxi"] }
      ]},
      city: { title: "🚶 Lima", content: "Miraflores-man.", steps: ["Taxi", "Bus"] },
      tips: { title: "Yachay", items: ["Taxi"] }
    },
    reviews: { 
      title: "Niykuna", 
      subtitle: "Navy Lighthouse niykuna", 
      viewMore: "Astawan niykuna",
      nearbyTitle: "Rikunapaq",
      nearbyIntro: "Huk kitikuna:",
      nearbyItems: [
        { name: "Parque del Amor", description: "Munay parke." }
      ]
    },
    gallery: { title: "Rikuy", viewMore: "Google Maps nisqapi astawan rikuy" },
    faq: { title: "Tapuykuna", subtitle: "Yachay", items: [
      { question: "Hayk'aq kachkan?", answer: "24 horas." },
      { question: "Qullqi paganan chá?", answer: "Mana. Free." }
    ]},
    location: { title: "Maypipas", address: "Mal. Cisneros 18, Miraflores\nPerú", openMaps: "Google Maps" },
    footer: { callToAction: "Navy Lighthouse cuiday.", text: "© 2026 Navy Lighthouse.", made: "Kayqa puriy yachay.", linksTitle: "Imakunata", links: [
      { name: "MINCETUR", url: "https://www.gob.pe/mincetur" }
    ]}
  }
};
