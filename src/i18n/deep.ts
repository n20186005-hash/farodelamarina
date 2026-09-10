import type { Locale } from "./translations";

/**
 * 深度科普内容模块
 * ------------------------------------------------------------------
 * 面向"专业景点科普落地页"的补充内容：
 *   science   灯塔光学与工程原理（科普主体）
 *   timeline  大事记年表（历史脉络）
 *   legends   传说与民间故事（明确标注为非史实）
 *   nature    自然、气候与生态
 *   photo     摄影与观景指南
 *   amenities 实用设施（仅描述类型，保持中立、不推荐具体商户）
 *
 * 编写原则：
 *   1. 可考证的事实与民间传说严格分开，传说一律显式标注；
 *   2. 设施信息只讲"有什么类型"，不出现任何商户名、不排序、不背书；
 *   3. 不做无法验证的断言（尤其不臆断涂装缘由、守塔人等细节）。
 */

export type DeepItem = { icon: string; title: string; text: string };
export type DeepPlainItem = { title: string; text: string };

export type DeepContent = {
  nav: { science: string; legends: string; amenities: string };
  science: {
    label: string;
    title: string;
    intro: string;
    items: DeepItem[];
  };
  timeline: {
    label: string;
    title: string;
    intro: string;
    entries: { year: string; title: string; text: string }[];
  };
  legends: {
    label: string;
    title: string;
    intro: string;
    note: string;
    items: DeepItem[];
  };
  nature: {
    label: string;
    title: string;
    intro: string;
    items: DeepItem[];
  };
  photo: {
    title: string;
    intro: string;
    items: DeepPlainItem[];
  };
  amenities: {
    label: string;
    title: string;
    intro: string;
    neutral: string;
    updated: string;
    groups: DeepItem[];
  };
  /** 内容核校说明（E-E-A-T：作者、来源与时效） */
  review: string;
};

const zh: DeepContent = {
  nav: { science: "光学科技", legends: "传说故事", amenities: "实用设施" },
  science: {
    label: "03",
    title: "灯塔的光学与工程原理",
    intro:
      "灯塔既是建筑，也是一台光学仪器。理解光如何被聚集、如何被识别、塔身为何这样造，才能看懂这座铁塔背后的技术逻辑。以下内容为通用的灯塔科学原理，适用于理解本类历史航标。",
    items: [
      {
        icon: "🔍",
        title: "菲涅尔透镜带来的革命",
        text: "19 世纪以前，灯塔依靠抛光金属反射镜聚光，大量光线在反射与散射中损失。1822 年问世的菲涅尔透镜改用同心棱镜环，把发散的光线折射、反射成接近水平的平行光束，亮度大幅提升、镜体却更轻更薄。正是这项技术让大型海岸灯塔成为可能，也让 19 世纪末的灯塔普遍采用这种光学系统。",
      },
      {
        icon: "📏",
        title: "两个射程：地理射程与光视距",
        text: "灯塔的可见距离由两个因素中较小的一个决定。地理射程受地球曲率限制——灯高与观测者眼高共同决定能看到多远；光视距则取决于灯光强度与当时的大气能见度。因此「18 海里」这类指标属于理想条件下的量级，实际看到多远往往由雾气、雨幕和浪花决定。",
      },
      {
        icon: "🔆",
        title: "灯质：灯塔在海上的身份证",
        text: "海图上标注的不是灯塔的样子，而是它的明暗节奏。通过闪光、暗歇与间隔的组合（称为「灯质」），相邻的两座灯塔可以完全区分开，航海者在没有电子设备的年代也能靠数闪光来确认自己看到的是哪一座。这是导航史上最早的「编码识别」实践。",
      },
      {
        icon: "🔩",
        title: "铸铁分段：可拆卸的工程智慧",
        text: "19 世纪的塔身常在工厂里预制成一圈圈编号铸铁构件，平板打包、海运到岸、现场用法兰螺栓拼装。这种建造方式运输成本低、施工周期短，最关键的是可逆——结构如同巨大的立体拼图，可以完整拆开再在别处复原，这正是这座灯塔能在数十年后被整体搬迁的前提。",
      },
      {
        icon: "🧭",
        title: "坐标、地址网格与 Plus Code",
        text: "同一处地点同时拥有几套「地址」：经纬度坐标、城市街道门牌，以及像 VXG5+GW 这样的 Plus Code（开放位置代码）。Plus Code 把地球表面切成层层嵌套的方格，即便当地没有门牌系统，也能把位置精确到几米之内。同时公布多种编码，能让紧急救援与地图导航都快速定位到同一地点。",
      },
    ],
  },
  timeline: {
    label: "05",
    title: "大事记：一座铁塔的迁徙",
    intro:
      "以下年表依据站内记载与公开航海资料整理。凡属推断或存在争议的细节，文中均已明确标注。",
    entries: [
      {
        year: "1860s–1890s",
        title: "一条需要「眼睛」的海岸",
        text: "随着蒸汽航运与硝石、鸟粪石贸易的发展，秘鲁太平洋沿岸的船舶流量大幅增长。在无线电出现之前，一座位置精确、夜间点亮的灯塔，是船只在夜里确认自身位置最可靠的手段。",
      },
      {
        year: "1900",
        title: "在科莱斯角（Punta Coles）落成",
        text: "这座塔身由 Chance Bros 制造，于 1900 年建成于莫克瓜大区伊洛港以南的科莱斯角，开始为秘鲁南部海域的船只提供定位与避障指引。",
      },
      {
        year: "1900–1973",
        title: "南方海域的七十年",
        text: "在长达七十余年的时间里，这座灯塔持续标定着南部航路。守塔人每夜的例行工作是修剪灯芯、擦拭镜面、记录气象——这是当时海岸基础设施中最不起眼却最不能中断的一环。",
      },
      {
        year: "1973",
        title: "被逐件拆解",
        text: "在原址完成历史使命后，秘鲁海军水文航海局（DHNM）选择保存而非拆除这座铁塔，将其按编号逐件拆解，以便向北运输。",
      },
      {
        year: "1973 年 12 月",
        title: "在米拉弗洛雷斯重新立起",
        text: "灯塔在米拉弗洛雷斯的 Malecón Cisneros 崖顶重新组装完成，成为海军灯塔公园（Parque El Faro de la Marina），用以纪念秘鲁航海史的一百周年，也为首都留下了一座属于本国航海事业的纪念物。",
      },
      {
        year: "此后数十年",
        title: "从航标到城市纪念地",
        text: "随着海滨长廊逐渐成为利马的城市客厅，这座塔也从一座纯功能性航标，转变为观景平台与市政仪式的场所，塔基周围相继设立了纪念铭牌，向公众讲述它自身的迁移史。",
      },
      {
        year: "今天",
        title: "仍在原处守望太平洋",
        text: "场地全天候免费开放。铁塔依旧矗立崖顶，而它脚下的广场已是俯瞰太平洋、观看日落与举行纪念活动的公共空间。",
      },
    ],
  },
  legends: {
    label: "06",
    title: "传说与民间故事",
    intro:
      "传说是一座纪念物被记忆的方式之一。以下故事来自游客与本地居民的口耳相传，我们保留它们，但明确标注其性质——这是科普与遗产导览应有的分寸。",
    note:
      "本节内容属于民间传说与都市传闻，不构成史实陈述。我们有意把「可考证的事实」与「被反复讲述的故事」分开呈现：这正是本站作为非营利科普网站的基本编辑准则。",
    items: [
      {
        icon: "🗼",
        title: "埃菲尔设计的传说",
        text: "关于这座深蓝色铁塔最广为人知的说法，是它出自法国工程师古斯塔夫·埃菲尔（埃菲尔铁塔的设计者）之手。这一说法在导览与游记中被反复引用，但至今没有档案文献能够支持；目前可追溯的记录指向其实际制造厂商。传说之所以顽强，是因为它抓住了一个真实的印象：这座塔的铆接铁构，与 19 世纪末那批钢铁工程师的作品确实属于同一个技术世界。",
      },
      {
        icon: "🌊",
        title: "灯塔是「岸上的最后一只手」",
        text: "在许多港口文化中，灯塔都被赋予守护者的意味——它不说话，只是整夜把光推向海面。水手家属把它当作岸上仍在等候的象征，出航前到塔下停留片刻。这类情感并非某地独有，却很好地解释了为什么一座纯功能的建筑会被城市当作纪念物来珍视。",
      },
      {
        icon: "🕯️",
        title: "守塔人的传说",
        text: "本地流传的一则故事讲，某位守塔人在风暴之夜拒绝离岗，用手一寸寸守着灯火，好让返航的船只找到入口。故事的年代与主人翁姓名在不同版本中互相矛盾，唯一被稳定复述的细节是「那一夜灯没有熄」。它更像一则关于职责的寓言，而不是一份记录——却恰好映照出守塔工作真实而无趣的一面：整夜记录、擦拭、修剪，重复到无人注意。",
      },
      {
        icon: "🎨",
        title: "为什么是深蓝色",
        text: "塔身为何是深蓝色？民间给出过几种解释：与搬移它的海军机构身份呼应、与太平洋的海色呼应、或为了在天空中形成更清晰的轮廓。三种说法都合理，但没有一种能作为原始依据被证实。颜色因此成了一桩小小的谜，也成了这座纪念物最难被混淆的识别特征。",
      },
    ],
  },
  nature: {
    label: "07",
    title: "崖顶之上的自然与气候",
    intro:
      "灯塔恰好站在「沙漠城市」与「地球上最丰饶的海域之一」的交界处。它的景观与气候，都由这个位置决定。",
    items: [
      {
        icon: "🪨",
        title: "海岸崖壁与「下崖」地形",
        text: "利马的海岸是一条连续的陡崖，沙漠平原在这里直接跌落至太平洋。米拉弗洛雷斯就坐落在这道崖坎的顶端，因此一座 22 米高的铁塔在此获得的地平线视野，通常是更高建筑才能拥有的。",
      },
      {
        icon: "🌫️",
        title: "garúa：利马的灰色季节",
        text: "大约每年 5 月至 11 月，利马被低而湿润的海岸雾覆盖，当地人称为 garúa。潮湿空气经过冷洋面时降温到露点以下，形成持续的阴天与毛毛雨，这就是「利马永远阴天」印象的来源。到了夏季（12 月至次年 4 月），雾层抬升消散，海岸迎来强烈的直射阳光。",
      },
      {
        icon: "🐟",
        title: "洪堡洋流带来的生命",
        text: "近岸海水异常寒冷，原因是从南向北输送副南极水的洪堡洋流（秘鲁寒流）。冷水富含营养物质，支撑起庞大的浮游生物繁殖，进而养育了世界上最丰产的渔场之一，也让这一带的海面终年群鸟盘旋——海水的温度，决定了整条食物链。",
      },
      {
        icon: "🦅",
        title: "不用出海就能看到的野生动物",
        text: "冷水带来的饵料让海鸟贴近岸边活动。在崖顶可以观察鹈鹕、鸬鹚、鲣鸟与海鸥在水面上盘旋俯冲；沿海南行到海湾处，还常能见到海狮。对于旅行者而言，这里是利马最容易接触海岸生态的位置之一。",
      },
      {
        icon: "📐",
        title: "地震带上的工程课",
        text: "秘鲁位于板块汇聚边界，利马的崖壁与岬角既是缓慢抬升的结果，也被历次地震反复重塑。这座灯塔用螺栓连接的铁构与落在岩层上的基础，正是工程师面对地震带时最朴素的三条原则：轻、柔、坐落在坚实的基础上。",
      },
      {
        icon: "🌇",
        title: "日落与海雾的两种黄昏",
        text: "夏季这一段海岸几乎正对日落方向，洁净的海洋空气让色彩格外饱和；而在 garúa 季节，太阳多在半途隐入云层，得到的是柔和、低对比的漫射光。同一条长廊，一年中有两种完全不同的黄昏。",
      },
    ],
  },
  photo: {
    title: "摄影与观景指南",
    intro: "给希望把这片太平洋带回家的访客一些实用建议。",
    items: [
      {
        title: "时段选择",
        text: "下午后段到日落（约 17:00–19:30，随季节变化）光线最暖、地平线最通透；日落之后的蓝调时刻，塔身的灯光与深蓝天色对比最强，是出片率最高的窗口。",
      },
      {
        title: "构图思路",
        text: "沿海滨长廊后退几步，把栏杆与城市边缘收进画面，可以用环境交代位置；从低处仰拍天空背景可以强调塔高，与长廊齐平的机位则更适合呈现铭牌与广场空间。",
      },
      {
        title: "曝光与现场条件",
        text: "金属塔身与明亮海面的反差很大：要么以天空为准曝光再提亮暗部，要么使用渐变减光镜。此处最常见的画质杀手是镜头上的海盐雾粒，请随时检查并擦拭。",
      },
      {
        title: "文明拍摄",
        text: "这里同时是一处纪念广场：请让三脚架与无人机避让仪式活动，不攀爬塔身及基座护栏，拍摄他人面部前先征得同意。",
      },
    ],
  },
  amenities: {
    label: "09",
    title: "实用设施与周边服务",
    intro:
      "这一带你能找到哪些类型的服务设施，按类型说明，方便你安排行程。",
    neutral:
      "本站是非营利的科普导览，只说明纪念地周边的设施类型与分布规律，不推荐、不排序、不背书任何具体商户。请根据自身需求与现场情况自行选择。",
    updated:
      "公共空间的服务设施与开放安排会随时间调整，请把以下说明作为行程规划的参考，抵达后以现场信息为准。",
    groups: [
      {
        icon: "🚻",
        title: "公共卫生间",
        text: "海滨长廊沿线与内街商业中心内通常都设有公共卫生间。与其他公共场所一样，随身携带纸巾、并为零钱付费式服务略作准备，是比较稳妥的习惯。",
      },
      {
        icon: "🅿️",
        title: "停车",
        text: "停车供给大致由三部分组成：长廊沿线的路边收费车位、内街商业中心的地下收费停车场，以及出租车与旅游巴士使用的临时上下客点。周末与日落前后车位最紧张，早到通常比绕行更省时间。",
      },
      {
        icon: "🍽️",
        title: "餐饮",
        text: "周边餐饮层次齐全：海景餐厅、咖啡与烘焙店、简餐与外卖、以及长廊上的冰淇淋与鲜果汁摊。在公共长椅上自带食物小憩在当地十分常见，也被普遍接受。",
      },
      {
        icon: "🏨",
        title: "住宿",
        text: "步行可达范围内有精品酒店、国际连锁商务酒店、青年旅舍与短租公寓等多种类型。夏季与长假期建议提前预订。",
      },
      {
        icon: "🛒",
        title: "商超与日用",
        text: "社区超市、便利店、药房与纪念品摊位均在步行数分钟范围内；需要更完整的购物选择时，往内陆方向稍走一段有大型商业中心。",
      },
      {
        icon: "⛽",
        title: "加油与充电",
        text: "加油站主要分布在城区主干道，海滨一线基本没有；部分内街商业停车场设有电动车充电位。自驾访客建议在进入这一片区前补足燃料，区内加油点稀少。",
      },
      {
        icon: "♿",
        title: "无障碍通行",
        text: "长廊主体平整、铺装完好且无台阶，路口设有缘石坡道，广场与步道之间为平接。个别低处观景平台需下台阶抵达，长廊也并非全程设有连续扶手，行动不便者建议结伴同行。",
      },
      {
        icon: "🚰",
        title: "饮水与补水",
        text: "附近商铺与摊位可购买瓶装水与饮料，直饮水设施并不连续。海岸日照比气温给人的感觉更强，12 月至次年 4 月尤其建议随身带水。",
      },
      {
        icon: "🩺",
        title: "医疗与安全",
        text: "区内分布有诊所与药房。秘鲁的紧急电话为：警察 105、消防 116、医疗急救（SAMU）106。崖下的海面不是游泳区，有暗流与礁石且没有救生员值守，请勿下海。",
      },
      {
        icon: "📶",
        title: "通讯与网络",
        text: "长廊沿线移动数据信号良好；部分公园与商业中心提供公共 Wi-Fi，但开放网络的安全性无法保证，建议避免在此类网络上进行敏感操作。",
      },
    ],
  },
  review:
    "内容核校：2026 年 9 月。本页由本站编辑依据公开的航海、市政与气象资料整理撰写，非营利、无商业合作、不含赞助内容。若发现事实性错误，欢迎通过页脚联系方式指正。",
};

const en: DeepContent = {
  nav: { science: "How It Works", legends: "Legends", amenities: "Facilities" },
  science: {
    label: "03",
    title: "How a Lighthouse Works",
    intro:
      "A lighthouse is an optical instrument as much as it is a building. Understanding how light is gathered, identified and supported explains why towers like this one were engineered the way they were. The principles below are general to historic coastal lights.",
    items: [
      {
        icon: "🔍",
        title: "The Fresnel lens revolution",
        text: "Before the 19th century, lighthouses relied on polished metal reflectors that lost much of their light to scattering. The Fresnel lens, introduced in 1822, replaced them with concentric rings of prisms that bend a lamp's rays into a single near-horizontal beam. Far brighter and far lighter than a conventional lens of the same size, it made large coastal lighthouses practical, and it became the standard optic of late 19th-century stations.",
      },
      {
        icon: "📏",
        title: "Two ranges, one visible distance",
        text: "How far you can see a light is decided by whichever limit is smaller. The geographical range is set by the curvature of the Earth — the height of the lamp and the height of the observer's eye. The luminous range is set by the intensity of the light and the clarity of the air. This is why figures such as 18 nautical miles describe a magnitude under favourable conditions, while the practical distance is often decided by haze, rain and spray.",
      },
      {
        icon: "🔆",
        title: "Light character: a lighthouse's signature",
        text: "Nautical charts record not what a lighthouse looks like but how it blinks. A defined sequence of flashes, eclipses and pauses — its light character — allows two neighbouring stations to be told apart, so a navigator could confirm a landfall by counting flashes long before electronics existed. It is one of the earliest uses of coded identification in navigation.",
      },
      {
        icon: "🔩",
        title: "Cast iron in bolted segments",
        text: "Nineteenth-century towers were often prefabricated in foundries as numbered cast-iron rings, shipped as flat sections and bolted together on site with flanged joints. The method was cheap to transport, quick to erect and, critically, reversible: the structure behaves like an enormous three-dimensional puzzle that can be taken apart and rebuilt elsewhere. That is precisely what made this tower's later relocation possible.",
      },
      {
        icon: "🧭",
        title: "Coordinates, address grids and Plus Codes",
        text: "One place can hold several addresses at once: latitude and longitude, a street address, and short grid codes such as Plus Codes (Open Location Code), which divide the globe into nested squares and can pin a doorway to within a few metres even where no street-naming system exists. Publishing several of them lets both mapping apps and emergency services arrive at the same spot.",
      },
    ],
  },
  timeline: {
    label: "05",
    title: "Timeline: the journey of an iron tower",
    intro:
      "The chronology below follows the record kept on site and in public maritime sources. Where a detail is inferred or disputed, it is marked as such.",
    entries: [
      {
        year: "1860s–1890s",
        title: "A coast that needed eyes",
        text: "As steam shipping and the guano and nitrate trades expanded, traffic along the Peruvian coast multiplied. Before radio, a precisely placed tower lit at night was the most reliable way for a vessel to fix its position after dark.",
      },
      {
        year: "1900",
        title: "Commissioned at Punta Coles",
        text: "The tower was manufactured by Chance Bros and completed in 1900 at Punta Coles, south of the port of Ilo in the Moquegua region, where it began guiding vessels along Peru's southern approaches.",
      },
      {
        year: "1900–1973",
        title: "Seven decades of southern service",
        text: "For more than seventy years the station marked the southern route. A keeper's nightly routine — trimming the light, cleaning the optic, logging the weather — was the least visible and least interruptible part of the coast's infrastructure.",
      },
      {
        year: "1973",
        title: "Dismantled, piece by piece",
        text: "Having completed its service at the original station, the tower was preserved rather than demolished: the Peruvian Navy's Directorate of Hydrography and Navigation (DHNM) had it taken apart into its numbered components for transport north.",
      },
      {
        year: "December 1973",
        title: "Re-erected in Miraflores",
        text: "The lighthouse was reassembled on the Malecón Cisneros in Miraflores and dedicated as Parque El Faro de la Marina, commemorating the centenary of Peruvian maritime history and giving the capital a monument to its own navigation service.",
      },
      {
        year: "Following decades",
        title: "From navigational aid to civic memorial",
        text: "As the seafront promenade became one of Lima's public living rooms, the tower shifted from a purely functional aid into a viewpoint and a setting for civic ceremony, with commemorative plaques added around its base to tell the story of its own move.",
      },
      {
        year: "Today",
        title: "Still watching the Pacific",
        text: "The site is open to the public at all hours and free of charge. The tower remains on its cliff-top position, and the plaza around it serves as a viewpoint, a sunset spot and a gathering place for commemorations.",
      },
    ],
  },
  legends: {
    label: "06",
    title: "Legends and local stories",
    intro:
      "Legends are one of the ways a monument is remembered. The stories below are repeated by visitors and residents; we keep them, and we label them for what they are — the minimum courtesy a heritage and science guide owes its readers.",
    note:
      "The stories in this section are folklore and urban tradition, not statements of historical fact. Separating what can be documented from what is merely repeated is a deliberate editorial rule of this non-commercial educational site.",
    items: [
      {
        icon: "🗼",
        title: "The Eiffel attribution",
        text: "The best-known claim about the dark blue tower is that it was designed by the French engineer Gustave Eiffel. The story is repeated in tours and travel writing, yet no archival document has been produced to support it, and the traceable record points to its recorded manufacturer instead. The legend survives because it captures something true: this riveted ironwork belongs to the same engineering world as the great steel structures of the late 19th century.",
      },
      {
        icon: "🌊",
        title: "The last hand on the shore",
        text: "In port cultures around the world, a lighthouse carries the meaning of a guardian — a thing that says nothing and simply pushes light out to sea all night. Families of sailors have long treated it as a sign that someone on shore is still waiting. The feeling is not unique to one place, and it explains why a purely functional structure ends up treasured by a city as a memorial.",
      },
      {
        icon: "🕯️",
        title: "The keeper who stayed",
        text: "A local tale describes a keeper who refused to leave his post on a stormy night and kept the flame burning by hand so that returning boats could find the entrance. Versions disagree about the decade and the name; the detail that repeats is that the light never went out. It reads as a parable about duty rather than a record — and it happens to mirror the real, unglamorous work of keepers: logging, cleaning, trimming, repeated until nobody notices.",
      },
      {
        icon: "🎨",
        title: "Why dark blue?",
        text: "Why is the tower painted dark blue? Popular explanations link the colour to the naval institution that moved it, to the colour of the Pacific, or to the need for a crisp silhouette against the sky. All three are plausible; none can be confirmed as the original reason. The colour thus remains a small mystery — and the monument's most unmistakable identifying feature.",
      },
    ],
  },
  nature: {
    label: "07",
    title: "Nature and climate above the cliffs",
    intro:
      "The lighthouse stands exactly where a desert city meets one of the most productive oceans on Earth. Its view, and its weather, follow from that position.",
    items: [
      {
        icon: "🪨",
        title: "Coastal cliffs and the drop to the sea",
        text: "Lima's shoreline is a continuous line of steep cliffs where the desert plain falls directly into the Pacific. Miraflores sits on the top of this escarpment, which is why a 22-metre tower here commands a horizon normally reserved for much taller buildings.",
      },
      {
        icon: "🌫️",
        title: "Garúa: Lima's grey season",
        text: "From roughly May to November the city lies under garúa, a low, damp coastal fog that forms when moist air passes over cold water and cools below its dew point, producing persistent overcast skies and drizzle. This is the origin of Lima's reputation for grey weather. In summer, from December to April, the fog lifts and the coast receives strong direct sun.",
      },
      {
        icon: "🐟",
        title: "Life carried by the Humboldt Current",
        text: "The water offshore is unusually cold because the Humboldt (Peru) Current carries subantarctic water northward along the coast. Cold water is nutrient-rich, supporting enormous plankton blooms that in turn feed one of the world's great fisheries and keep the sea here busy with birds all year. Water temperature, in other words, decides the entire food chain.",
      },
      {
        icon: "🦅",
        title: "Wildlife without a boat",
        text: "Cold, productive water brings seabirds close to shore. From the cliff top you can watch pelicans, cormorants, boobies and gulls working the surface, and sea lions are often visible in the bays further along the coast. For a traveller, this is one of the easiest places in Lima to meet coastal wildlife.",
      },
      {
        icon: "📐",
        title: "An engineering lesson on a seismic coast",
        text: "Peru sits on a convergent plate boundary, and Lima's cliffs and headlands have been shaped both by slow uplift and by repeated earthquakes. A bolted iron structure on a rock foundation illustrates the three plainest rules engineers apply in seismic regions: build light, build flexible, and build on solid ground.",
      },
      {
        icon: "🌇",
        title: "Two different sunsets",
        text: "In summer this stretch of coast faces almost directly into the sunset, and clean marine air makes the colours unusually saturated. In the garúa months the sun usually slips into cloud part-way down, leaving soft, low-contrast, diffuse light. The same promenade offers two entirely different evenings in the course of a year.",
      },
    ],
  },
  photo: {
    title: "Photography and viewing notes",
    intro: "Practical guidance for visitors who want to take the Pacific home with them.",
    items: [
      {
        title: "Choosing your time",
        text: "Late afternoon into sunset (roughly 17:00–19:30 depending on the season) gives the warmest light and the clearest horizon. The blue hour just after sunset offers the strongest contrast between the lit tower and a deep sky, and is when most keepers of photographs press the shutter.",
      },
      {
        title: "Framing the tower",
        text: "Stepping back along the promenade to include the railing and the city edge gives the picture context. Shooting from low down against the sky emphasises height, while an eye-level position along the walkway shows the plaques and the plaza.",
      },
      {
        title: "Exposure and site conditions",
        text: "The contrast between an iron tower and a bright ocean is high: either expose for the sky and lift the shadows, or use a graduated filter. The most common cause of soft pictures here is sea salt and spray on the lens — check and wipe it often.",
      },
      {
        title: "Visiting respectfully",
        text: "This is also a memorial plaza. Keep tripods and drones clear of ceremonies, do not climb the structure or its base railings, and ask before photographing people's faces.",
      },
    ],
  },
  amenities: {
    label: "09",
    title: "Facilities and practical services",
    intro:
      "What kinds of services you will find on and around the site, described by type so you can plan your visit.",
    neutral:
      "This is a non-commercial educational guide. We describe the kinds of facilities around the monument and how they are generally distributed; we do not recommend, rank or endorse any specific business. Please choose according to your own needs and what you find on site.",
    updated:
      "Facilities and opening arrangements in public spaces change over time. Treat the notes below as a planning aid and confirm details on arrival.",
    groups: [
      {
        icon: "🚻",
        title: "Public toilets",
        text: "Public restrooms are typically located along the seafront promenade and inside the commercial centres a short walk inland. As with most public facilities in the city, carrying your own tissue and a little change for optional attendant service is a sensible habit.",
      },
      {
        icon: "🅿️",
        title: "Parking",
        text: "Parking generally comes in three forms: regulated kerbside spaces along the promenade, paid underground car parks inside the shopping centres inland, and drop-off points used by taxis and tour buses. Capacity is tightest at weekends and around sunset, when arriving early is usually easier than circling.",
      },
      {
        icon: "🍽️",
        title: "Dining",
        text: "The district offers a full range: sea-view restaurants, cafés and bakeries, casual and takeaway food, and dessert or juice stands along the promenade. Eating your own food on the public benches is common and widely accepted.",
      },
      {
        icon: "🏨",
        title: "Accommodation",
        text: "Within walking distance you will find boutique hotels, international business chains, hostels and short-stay apartments. Booking ahead is advisable in the summer months and around major holidays.",
      },
      {
        icon: "🛒",
        title: "Shops and supermarkets",
        text: "Neighbourhood supermarkets, convenience stores, pharmacies and souvenir stalls are all a few minutes' walk away. Larger shopping centres a little further inland cover anything else you may need.",
      },
      {
        icon: "⛽",
        title: "Fuel and EV charging",
        text: "Fuel stations are located along the main arteries rather than on the seafront itself, and several commercial car parks inland provide electric-vehicle charging bays. Drivers are best off refuelling before entering the district, where forecourts are scarce.",
      },
      {
        icon: "♿",
        title: "Accessibility",
        text: "The promenade is largely flat, paved and step-free, with kerb ramps at crossings and level transitions between the plaza and the walkway. A few lower viewpoints are reached by steps, and the promenade does not have a continuous handrail, so some visitors may prefer to come accompanied.",
      },
      {
        icon: "🚰",
        title: "Water and hydration",
        text: "Bottled water and drinks are sold from shops and kiosks nearby; public drinking fountains are not consistently available. Coastal sun feels stronger than the temperature suggests, so carry water — especially between December and April.",
      },
      {
        icon: "🩺",
        title: "Health and safety",
        text: "Clinics and pharmacies operate throughout the district. Peru's emergency numbers are 105 for police, 116 for the fire service and 106 for medical emergencies (SAMU). The sea below the cliffs is not a swimming area: currents and rocks make it dangerous, and no lifeguards patrol this stretch.",
      },
      {
        icon: "📶",
        title: "Connectivity",
        text: "Mobile data coverage is good along the promenade. Free public Wi-Fi operates in some parks and commercial centres, but open networks cannot be considered secure, so avoid sensitive transactions on them.",
      },
    ],
  },
  review:
    "Content review: September 2026. Compiled by this site's editors from public maritime, municipal and meteorological sources. This site is non-commercial and carries no sponsored content. Corrections are welcome through the contact route in the footer.",
};

const es: DeepContent = {
  nav: { science: "Cómo funciona", legends: "Leyendas", amenities: "Servicios" },
  science: {
    label: "03",
    title: "Cómo funciona un faro",
    intro:
      "Un faro es tanto un instrumento óptico como un edificio. Entender cómo se concentra la luz, cómo se identifica y cómo se sostiene explica por qué torres como esta se construyeron de la manera en que se construyeron. Los principios siguientes son generales para los faros costeros históricos.",
    items: [
      {
        icon: "🔍",
        title: "La revolución de la lente de Fresnel",
        text: "Antes del siglo XIX los faros dependían de reflectores metálicos pulidos que perdían gran parte de la luz. La lente de Fresnel, introducida en 1822, los sustituyó por anillos concéntricos de prismas que desvían los rayos de la lámpara hacia un haz casi horizontal. Mucho más brillante y mucho más ligera que una lente convencional del mismo tamaño, hizo posibles los grandes faros costeros y se convirtió en la óptica estándar de finales del siglo XIX.",
      },
      {
        icon: "📏",
        title: "Dos alcances, una distancia visible",
        text: "La distancia a la que se ve una luz la decide el menor de dos límites. El alcance geográfico depende de la curvatura de la Tierra: la altura de la lámpara y la altura del ojo del observador. El alcance luminoso depende de la intensidad de la luz y de la transparencia del aire. Por eso cifras como 18 millas náuticas describen un orden de magnitud en condiciones favorables, mientras que la distancia real suele quedar decidida por la neblina, la lluvia y el rocío marino.",
      },
      {
        icon: "🔆",
        title: "El carácter de la luz: la firma del faro",
        text: "Las cartas náuticas no registran el aspecto del faro, sino su ritmo. Una secuencia definida de destellos, ocultaciones y pausas —el carácter de la luz— permite distinguir dos estaciones vecinas, de modo que un navegante podía confirmar su posición contando destellos mucho antes de que existiera la electrónica. Es uno de los primeros usos de la identificación codificada en la navegación.",
      },
      {
        icon: "🔩",
        title: "Hierro fundido en piezas atornilladas",
        text: "Las torres del siglo XIX solían prefabricarse en fundición como anillos numerados de hierro colado, se enviaban como secciones planas y se unían en obra con bridas atornilladas. El método era barato de transportar, rápido de montar y, sobre todo, reversible: la estructura funciona como un enorme rompecabezas tridimensional que puede desarmarse y volver a montarse en otro lugar. Precisamente eso hizo posible el traslado posterior de esta torre.",
      },
      {
        icon: "🧭",
        title: "Coordenadas, direcciones y Plus Codes",
        text: "Un mismo lugar puede tener varias direcciones a la vez: latitud y longitud, una dirección postal y códigos de rejilla cortos como los Plus Codes (Open Location Code), que dividen el globo en cuadrículas anidadas y permiten situar una puerta con precisión de metros incluso donde no existe un sistema de nombres de calle. Publicar varios de ellos permite que tanto los mapas como los servicios de emergencia lleguen al mismo punto.",
      },
    ],
  },
  timeline: {
    label: "05",
    title: "Cronología: el viaje de una torre de hierro",
    intro:
      "La cronología siguiente sigue el registro conservado en el sitio y en fuentes marítimas públicas. Cuando un detalle es inferido o está en disputa, se indica expresamente.",
    entries: [
      {
        year: "1860s–1890s",
        title: "Una costa que necesitaba ojos",
        text: "Con la expansión de la navegación a vapor y del comercio del guano y del salitre, el tráfico a lo largo de la costa peruana se multiplicó. Antes de la radio, una torre bien situada y encendida de noche era el medio más fiable para que un buque fijara su posición en la oscuridad.",
      },
      {
        year: "1900",
        title: "Encendido en Punta Coles",
        text: "La torre fue fabricada por Chance Bros y se completó en 1900 en Punta Coles, al sur del puerto de Ilo, en la región de Moquegua, donde comenzó a guiar a las embarcaciones en las aproximaciones del sur del país.",
      },
      {
        year: "1900–1973",
        title: "Siete décadas de servicio en el sur",
        text: "Durante más de setenta años la estación marcó la ruta austral. La rutina nocturna del torrero —recortar la luz, limpiar la óptica, registrar el tiempo— era la parte menos visible y menos interrumpible de la infraestructura de la costa.",
      },
      {
        year: "1973",
        title: "Desarmado pieza por pieza",
        text: "Concluida su función en la estación original, la torre se preservó en lugar de demolerse: la Dirección de Hidrografía y Navegación de la Marina de Guerra del Perú (DHNM) la hizo desmontar en sus componentes numerados para transportarla hacia el norte.",
      },
      {
        year: "Diciembre de 1973",
        title: "Reerigido en Miraflores",
        text: "El faro se reensambló en el Malecón Cisneros de Miraflores y se dedicó como Parque El Faro de la Marina, conmemorando el centenario de la historia marítima peruana y dando a la capital un monumento a su propio servicio de navegación.",
      },
      {
        year: "Décadas posteriores",
        title: "De ayuda a la navegación a memorial urbano",
        text: "A medida que el malecón se convertía en una de las salas públicas de Lima, la torre pasó de ser una ayuda puramente funcional a un mirador y escenario de ceremonias cívicas, con placas conmemorativas instaladas al pie que cuentan su propio traslado.",
      },
      {
        year: "Hoy",
        title: "Todavía mirando al Pacífico",
        text: "El recinto está abierto al público a toda hora y de forma gratuita. La torre permanece en su posición sobre el acantilado y la plaza que la rodea funciona como mirador, punto de atardecer y lugar de encuentro para conmemoraciones.",
      },
    ],
  },
  legends: {
    label: "06",
    title: "Leyendas y relatos locales",
    intro:
      "Las leyendas son una de las formas en que se recuerda un monumento. Los relatos que siguen se repiten entre visitantes y vecinos; los conservamos y los etiquetamos por lo que son: la cortesía mínima que una guía patrimonial y científica debe a sus lectores.",
    note:
      "Los relatos de esta sección son folclore y tradición urbana, no afirmaciones de hechos históricos. Separar lo documentable de lo meramente repetido es una regla editorial deliberada de este sitio educativo y sin fines de lucro.",
    items: [
      {
        icon: "🗼",
        title: "La atribución a Eiffel",
        text: "La afirmación más difundida sobre la torre azul oscuro es que fue diseñada por el ingeniero francés Gustave Eiffel. La historia se repite en visitas guiadas y en la prensa de viajes, pero no se ha presentado ningún documento de archivo que la respalde, y el registro rastreable apunta a su fabricante documentado. La leyenda sobrevive porque acierta en algo: esta estructura remachada de hierro pertenece al mismo mundo de ingeniería que las grandes obras de acero de fines del siglo XIX.",
      },
      {
        icon: "🌊",
        title: "La última mano en la orilla",
        text: "En las culturas portuarias de todo el mundo el faro tiene el sentido de un guardián: una cosa que no dice nada y que toda la noche empuja luz hacia el mar. Las familias de marinos lo han considerado durante mucho tiempo una señal de que alguien en tierra sigue esperando. El sentimiento no es exclusivo de un lugar, y explica por qué una estructura puramente funcional termina siendo atesorada por una ciudad como memorial.",
      },
      {
        icon: "🕯️",
        title: "El torrero que se quedó",
        text: "Un relato local describe a un torrero que se negó a abandonar su puesto en una noche de tormenta y mantuvo la llama encendida a mano para que los barcos que regresaban encontraran la entrada. Las versiones discrepan sobre la década y el nombre; el detalle que se repite es que la luz nunca se apagó. Se lee como una parábola sobre el deber más que como un registro, y refleja el trabajo real y poco glamoroso de los torreros: registrar, limpiar, recortar, repetir hasta que nadie lo note.",
      },
      {
        icon: "🎨",
        title: "¿Por qué azul oscuro?",
        text: "¿Por qué está pintada de azul oscuro? Las explicaciones populares vinculan el color con la institución naval que la trasladó, con el color del Pacífico o con la necesidad de una silueta nítida contra el cielo. Las tres son plausibles; ninguna puede confirmarse como la razón original. El color queda así como un pequeño misterio y como el rasgo identificatorio más inconfundible del monumento.",
      },
    ],
  },
  nature: {
    label: "07",
    title: "Naturaleza y clima sobre el acantilado",
    intro:
      "El faro se levanta justo donde una ciudad desértica se encuentra con uno de los océanos más productivos del planeta. Su vista y su clima se derivan de esa posición.",
    items: [
      {
        icon: "🪨",
        title: "Acantilados y la caída al mar",
        text: "El litoral de Lima es una línea continua de acantilados donde la llanura desértica cae directamente al Pacífico. Miraflores se asienta sobre la parte alta de ese talud, y por eso una torre de 22 metros alcanza aquí un horizonte que normalmente reservan edificios mucho más altos.",
      },
      {
        icon: "🌫️",
        title: "Garúa: la estación gris de Lima",
        text: "Entre mayo y noviembre aproximadamente, la ciudad queda bajo la garúa, una neblina costera baja y húmeda que se forma cuando el aire húmedo pasa sobre el agua fría y se enfría por debajo de su punto de rocío, produciendo cielos cubiertos persistentes y llovizna. Ese es el origen de la fama de gris de Lima. En verano, de diciembre a abril, la neblina se levanta y la costa recibe sol directo e intenso.",
      },
      {
        icon: "🐟",
        title: "La vida que trae la corriente de Humboldt",
        text: "El agua frente a la costa es inusualmente fría porque la corriente de Humboldt (o corriente peruana) transporta agua subantártica hacia el norte a lo largo del litoral. El agua fría es rica en nutrientes y sostiene enormes floraciones de plancton que alimentan una de las grandes pesquerías del mundo y mantienen el mar lleno de aves todo el año. La temperatura del agua decide, en otras palabras, toda la cadena alimentaria.",
      },
      {
        icon: "🦅",
        title: "Fauna sin necesidad de embarcarse",
        text: "El agua fría y productiva acerca las aves marinas a la orilla. Desde lo alto del acantilado se observan pelícanos, cormoranes, piqueros y gaviotas trabajando la superficie, y en las bahías más al sur suelen verse lobos marinos. Para el viajero, este es uno de los puntos más accesibles de Lima para encontrarse con la fauna costera.",
      },
      {
        icon: "📐",
        title: "Una lección de ingeniería en zona sísmica",
        text: "El Perú se sitúa en un límite de placas convergente, y los acantilados y penínsulas de Lima han sido modelados tanto por el levantamiento lento como por terremotos repetidos. Una estructura de hierro atornillada sobre cimiento rocoso ilustra las tres reglas más sencillas que aplican los ingenieros en zonas sísmicas: construir ligero, construir flexible y construir sobre suelo firme.",
      },
      {
        icon: "🌇",
        title: "Dos atardeceres distintos",
        text: "En verano este tramo de costa mira casi directamente al ocaso y el aire marino limpio hace que los colores sean inusualmente saturados. En los meses de garúa el sol suele hundirse en las nubes a medio camino y deja una luz suave, difusa y de bajo contraste. Un mismo malecón ofrece dos tardes completamente diferentes a lo largo del año.",
      },
    ],
  },
  photo: {
    title: "Notas de fotografía y observación",
    intro: "Consejos prácticos para quienes quieren llevarse el Pacífico a casa.",
    items: [
      {
        title: "Elegir la hora",
        text: "El final de la tarde hasta el atardecer (aproximadamente 17:00–19:30 según la estación) ofrece la luz más cálida y el horizonte más limpio. La hora azul, justo después del ocaso, da el mayor contraste entre la torre iluminada y el cielo profundo.",
      },
      {
        title: "Encuadrar la torre",
        text: "Retroceder unos pasos por el malecón e incluir la baranda y el borde de la ciudad aporta contexto a la imagen. Disparar desde abajo contra el cielo subraya la altura; una posición a la altura de la mirada sobre la pasarela muestra mejor las placas y la plaza.",
      },
      {
        title: "Exposición y condiciones del lugar",
        text: "El contraste entre la torre metálica y un océano brillante es alto: conviene exponer para el cielo y levantar las sombras, o usar un filtro degradado. La causa más frecuente de fotos blandas aquí es la sal marina sobre la lente: revísala y límpiala con frecuencia.",
      },
      {
        title: "Visitar con respeto",
        text: "Es también una plaza memorial. Mantén trípodes y drones lejos de las ceremonias, no trepes a la estructura ni a las barandas de la base, y pide permiso antes de fotografiar rostros.",
      },
    ],
  },
  amenities: {
    label: "09",
    title: "Servicios e infraestructura práctica",
    intro:
      "Qué tipos de servicios encontrarás en el entorno del monumento, descritos por tipo para que puedas organizar tu visita.",
    neutral:
      "Este es un sitio educativo sin fines de lucro. Describimos qué tipos de servicios existen alrededor del monumento y cómo se distribuyen en general; no recomendamos, clasificamos ni respaldamos ningún establecimiento concreto. Elige según tus necesidades y lo que encuentres en el lugar.",
    updated:
      "Los servicios y horarios de los espacios públicos cambian con el tiempo. Toma estas notas como apoyo para la planificación y confirma los detalles al llegar.",
    groups: [
      {
        icon: "🚻",
        title: "Baños públicos",
        text: "Los servicios higiénicos públicos suelen ubicarse a lo largo del malecón y dentro de los centros comerciales a pocos minutos hacia el interior. Como en la mayoría de los espacios públicos de la ciudad, llevar papel propio y algo de sencillo para el servicio opcional del personal es una costumbre sensata.",
      },
      {
        icon: "🅿️",
        title: "Estacionamiento",
        text: "La oferta suele tener tres formas: espacios regulados en la vía a lo largo del malecón, estacionamientos subterráneos de pago en los centros comerciales interiores y zonas de embarque y desembarque para taxis y buses turísticos. La capacidad es más ajustada los fines de semana y cerca del atardecer, cuando llegar temprano resulta más fácil que dar vueltas.",
      },
      {
        icon: "🍽️",
        title: "Dónde comer",
        text: "El distrito ofrece todo el rango: restaurantes con vista al mar, cafés y panaderías, comida casual y para llevar, y puestos de postres o jugos a lo largo del malecón. Comer alimentos propios en las bancas públicas es habitual y ampliamente aceptado.",
      },
      {
        icon: "🏨",
        title: "Alojamiento",
        text: "A distancia caminable hay hoteles boutique, cadenas internacionales de negocios, hostales y departamentos de corta estancia. Conviene reservar con antelación en los meses de verano y en los feriados largos.",
      },
      {
        icon: "🛒",
        title: "Comercios y supermercados",
        text: "Supermercados de barrio, tiendas de conveniencia, farmacias y puestos de souvenirs están a pocos minutos a pie. Centros comerciales más grandes, un poco más hacia el interior, cubren cualquier otra necesidad.",
      },
      {
        icon: "⛽",
        title: "Combustible y carga eléctrica",
        text: "Las gasolineras se ubican en las avenidas principales más que en el frente marítimo, y varios estacionamientos comerciales interiores ofrecen puntos de carga para vehículos eléctricos. Quien conduzca hará bien en abastecerse antes de entrar al distrito, donde escasean las estaciones de servicio.",
      },
      {
        icon: "♿",
        title: "Accesibilidad",
        text: "El malecón es en su mayor parte plano, pavimentado y sin escalones, con rampas en los cruces y transiciones a nivel entre la plaza y la pasarela. Algunos miradores bajos se alcanzan por escaleras y el malecón no tiene pasamanos continuo, por lo que conviene venir acompañado si se necesita apoyo.",
      },
      {
        icon: "🚰",
        title: "Agua e hidratación",
        text: "En tiendas y kioscos cercanos se vende agua embotellada y bebidas; las fuentes públicas no están disponibles de forma continua. El sol costero se siente más fuerte de lo que sugiere la temperatura, así que lleva agua, sobre todo entre diciembre y abril.",
      },
      {
        icon: "🩺",
        title: "Salud y seguridad",
        text: "En el distrito funcionan clínicas y farmacias. Los números de emergencia en el Perú son 105 para la Policía, 116 para Bomberos y 106 para emergencias médicas (SAMU). El mar bajo los acantilados no es zona de baño: las corrientes y las rocas lo hacen peligroso y no hay salvavidas en este tramo.",
      },
      {
        icon: "📶",
        title: "Conectividad",
        text: "La cobertura de datos móviles es buena a lo largo del malecón. Algunos parques y centros comerciales ofrecen Wi-Fi público gratuito, pero las redes abiertas no pueden considerarse seguras: evita operaciones sensibles en ellas.",
      },
    ],
  },
  review:
    "Revisión de contenido: septiembre de 2026. Elaborado por los editores del sitio a partir de fuentes marítimas, municipales y meteorológicas públicas. Sitio sin fines de lucro y sin contenido patrocinado. Se agradecen las correcciones a través del contacto del pie de página.",
};

const qu: DeepContent = {
  nav: { science: "Imayna llamk'an", legends: "Willakuykuna", amenities: "Yanapaykuna" },
  science: {
    label: "03",
    title: "Faro imayna llamk'an",
    intro:
      "Faroqa wasipas, k'anchay llamk'anapas. Kay p'anqapiqa farokunapa k'anchay ruwayninmanta willakun.",
    items: [
      {
        icon: "🔍",
        title: "Fresnel lente",
        text: "1822 watamanta Fresnel lenteqa k'anchayta huk siqiman hukllachan. Chayraykum hatun farokuna ruwakurqa.",
      },
      {
        icon: "📏",
        title: "Iskay karu kay",
        text: "Faro karu kayqa iskay imamantam: allpa p'alltamanta (geo) hinallataq k'anchay kallpamanta. 18 millas nisqa sumaq p'unchawkunapaqmi.",
      },
      {
        icon: "🔆",
        title: "K'anchay sanampan",
        text: "Faroqa k'anchay ritmonwan riqsinakun: phawaq, ch'isi, samay. Chaywanmi iskay farokuna mana pantachinakunchu.",
      },
      {
        icon: "🔩",
        title: "Hierro p'aki-p'aki",
        text: "Hierro torreqa p'akikunapi ruwasqa karqa, samp'apayasqa, apasqa, huk lawpi hukmanta huñusqa. Chaymi kay faro apakuy atikurqa.",
      },
      {
        icon: "🧭",
        title: "Coordinates, Plus Code",
        text: "Huk kitiqa achka sutiyuqmi: latitud-longitud, calle sutin, Plus Code (VXG5+GW hina). Chaywanmi mapakuna, emergencia-kunapas tarin.",
      },
    ],
  },
  timeline: {
    label: "05",
    title: "Unay willakuy: torre puriy",
    intro: "Kay p'anqakunaqa testimoniopim, marina willakuykunapim sayan. Mana chiqap kaqkunaqa sut'ichasqam kachkan.",
    entries: [
      { year: "1860s–1890s", title: "Hatun mama qucha", text: "Guano, salitre qhatu wiñarqan. Radio mana kaptinmi faroqa sapan yanapaq karqa." },
      { year: "1900", title: "Punta Coles", text: "Chance Bros ruwasqa, 1900 watapi Punta Coles (Ilo, Moquegua) llaqtapi sayarirqan." },
      { year: "1900–1973", title: "Qanchis chunka wata", text: "Qanchis chunka wata astawanmi sur mama qucha ñanpi k'ancharqan." },
      { year: "1973", title: "P'akiy", text: "DHNM (Marina) farota p'akirqan, mana chinkachinapaq." },
      { year: "1973 pikchu killa", title: "Miraflores", text: "Miraflores, Malecón Cisneros-pi hukmanta sayarichirqan: Parque El Faro de la Marina." },
      { year: "Qhipa watakuna", title: "Llaqta yuyarinapaq", text: "Faroqa ñan rikuy kanmanta llaqta yuyarinaman tukmurqan." },
      { year: "Kunan", title: "Kunan", text: "Sapa p'unchaw, mana qullqiyuq. Torreqa chayllapim, plazapas runakunapa huñunakuyninmi." },
    ],
  },
  legends: {
    label: "06",
    title: "Willakuykuna",
    intro: "Kay willakuykunaqa runakunapa rimasqan, mana chiqap qillqasqachu.",
    note: "Kay willakuykunaqa folklore, mana historiachu. Chiqap kaqta willakuy kaqmanta rakiyqa kay web kitip ruwayninmi.",
    items: [
      { icon: "🗼", title: "Eiffel willakuy", text: "Achka runam ninku Gustave Eiffel ruwarqa. Manam qillqasqa chiqapchu kachkan." },
      { icon: "🌊", title: "Mama qucha amachaq", text: "Mama qucha llaqtakunapi faroqa amachaq hina qhawasqa. Aychaqkuna yuyarinku wasipi suyakuq kananta." },
      { icon: "🕯️", title: "Faro waqyakuq", text: "Huk willakuy willakun huk runam wayra phuyupipas mana ripurqanchu, makinwan k'anchayta waqyaykurqan." },
      { icon: "🎨", title: "Imaraykum anqas", text: "Imaraykum anqas llimpisqa? Achka nisqakuna kachkan, ichaqa manam chiqap yachakunchu." },
    ],
  },
  nature: {
    label: "07",
    title: "Sallqa pachapas, wayrapas",
    intro: "Faroqa ch'aki llaqta mama qucha tinkunpi sayan. Chaymi rikuyninpas, wayranpas chayman hina.",
    items: [
      { icon: "🪨", title: "Qaqa patan", text: "Lima mama qucha patanqa hatun qaqakunam. Mirafloresqa qaqa patapim, chaymi karuman rikukun." },
      { icon: "🌫️", title: "Garúa", text: "Maymanta ayamarq'a killakama Limapi garúa (llantu pukutay) kachkan. Qasqu killakunapiqa inti k'anchanmi." },
      { icon: "🐟", title: "Humboldt yaku", text: "Mama qucha yakunqa chirim, Humboldt (Perú) yakuraykum. Chirim yakum challwa, pisqu achka kananpaq." },
      { icon: "🦅", title: "Pisqukuna", text: "Qaqa patamanta pelícano, cormorán, booby, gaviota rikukun. Wakin quchakunapim lobo marino kachkan." },
      { icon: "📐", title: "Allpa kuyuy", text: "Perúpiqa allpa kuyuy achkam. Faroqa lluchk'asqa hierromanta, rumi patapim, chaymi allpa kuyuypipas sayan." },
      { icon: "🌇", title: "Iskay inti chinkay", text: "Qasqu killakunapi intiqa mama quchaman chinkan; garúa killakunapim pukutayman chinkan." },
    ],
  },
  photo: {
    title: "Rikuy, fotota ruway",
    intro: "Willaykuna Mama quchata rikuy munakuqkunapaq.",
    items: [
      { title: "Mayk'aq", text: "Inti chinkay pachapi (17:00–19:30 hina) aswan allin. Chay qhipa anqas pachapim faro k'anchaynin sumaq rikukun." },
      { title: "Imayna rikuy", text: "Malecón patamanta qhipaman puriy barandata rikunaykipaq; uranmanta rikuspaqa torrepa sayayninta rikunkiman." },
      { title: "Rikch'ay", text: "Hierro torre mama qucha k'anchaywan mana kaqlla. Kikinpiqa mama qucha hina rikch'ay, ch'isin pampata wiñay." },
      { title: "Sumaq kay", text: "Kay plazapas yuyarinapaqmi. Mana torreta ayquichu, runakunata mana tapuspaqa manam fotota ruwankichu." },
    ],
  },
  amenities: {
    label: "09",
    title: "Yanapaykuna, serviciokuna",
    intro: "Kay kitipi ima laya serviciokunam kachkan, layanwanllam willakun.",
    neutral:
      "Kay web kitiqa mana qullqimanta ruwasqachu (non-profit). Servicio layakunallatam willakun, mana huk qhatuta chaninchaspa. Kikiyuq yuyaywan akllay.",
    updated: "Serviciokunapaq horariokunaqa hukmanyan. Kay willakuyqa yuyanapaqmi; chayamuspataq kikinpi qhaway.",
    groups: [
      { icon: "🚻", title: "Bañokuna", text: "Malecón patapi, centros comerciales ukhupipas bañokunam kachkan. Papelta, katuyuq qullqitapas apay." },
      { icon: "🅿️", title: "Estacionamiento", text: "Callimpi estacionamiento, centros comerciales ukhupi subterráneo, taxikunapaq sayay kitipas kachkan. Sábado-domingo, inti chinkaypi sasachakun." },
      { icon: "🍽️", title: "Mikhuy", text: "Mama qucha rikuy restaurant, café, panadería, apakuy mikhuypas kachkan. Banco patapi mikhuyqa allinmi qhawasqa." },
      { icon: "🏨", title: "Puñuna wasi", text: "Hotel, hostal, apartamento kachkan. Qasqu killakunapi, hatun p'unchawkunapi ñawpaqta reservay." },
      { icon: "🛒", title: "Qhatukuna", text: "Supermercado, tienda, farmacia, souvenir qhatukuna. Astawan hatun centros comercialesqa ukhunpim kachkan." },
      { icon: "⛽", title: "Gasolina", text: "Gasolinerakunaqa hatun ñankunapim kachkan, malecón patapiqa manam. Auto eléctricopaq carga puntos wakin estacionamientopim kachkan." },
      { icon: "♿", title: "Kikin kallpayuq", text: "Malecónqa pampam, mana lluchk'ananchu. Wakin rikuy kitakunam cascaderaswan. Mana yanapayta atispaykiqa masiykiwan riy." },
      { icon: "🚰", title: "Yaku", text: "Botellapi yakum qhatukunapi kachkan. Qasqu killakunapi intiqa sinchimi, yakuta apay." },
      { icon: "🩺", title: "Hampina, amachay", text: "Clínica, farmacia kachkan. Emergencia yupaykuna: 105 policía, 116 bomberos, 106 SAMU. Qaqa urapi mama quchaqa manam challpuykipaqchu, salvavidas manam kanchu." },
      { icon: "📶", title: "Internet", text: "Malecón patapi telefonokuna allin llamk'anmi. Wakin parquepi Wi-Fi kanmi, ichaqa manam segurachu." },
    ],
  },
  review:
    "Qillqa qhaway: 2026 pikchu killa. Kay web kitip qillqaqkunam qillqarqan, mana qullqimanta kaq. Pantayta tarispaykiqa willaway.",
};

export const deepContent: Record<Locale, DeepContent> = { zh, en, es, qu };
