import type { Locale } from "@/i18n/translations";

/**
 * 天气出行建议文案库（4 语言）
 * ------------------------------------------------------------------
 * 设计原则：
 * 1. 全部面向游客口语，不出现「相对湿度 75%」「辐照强度」这类气象术语；
 * 2. 每条文案都是「可以直接照做」的动作，而不是天气现象的复述；
 * 3. 条件是「触发式」的 —— 不满足条件的文案不会渲染到页面上。
 */

export type AdviceKey =
  /* 风险提醒（优先级最高，红色置顶） */
  | "riskThunder"
  | "riskDownpour"
  | "riskGale"
  | "riskRoughSea"
  | "riskFog"
  | "riskExtremeUv"
  | "riskHeat"
  /* 出行穿搭 */
  | "outfitDrizzle"
  | "outfitRain"
  | "outfitGale"
  | "outfitHot"
  | "outfitVeryHot"
  | "outfitCold"
  | "outfitSwing"
  | "outfitHumid"
  | "outfitMild"
  /* 游玩安排 */
  | "planThunder"
  | "planRain"
  | "planDrizzle"
  | "planGarua"
  | "planClear"
  | "planCloudy"
  | "planHot"
  | "planWind"
  | "planFog"
  | "planSeaCalm"
  | "planSeaRough"
  | "planCalm";

export type ItemKey =
  | "umbrella"
  | "raincoat"
  | "sunscreen"
  | "sunglasses"
  | "hat"
  | "water"
  | "jacket"
  | "windbreaker"
  | "warmLayer"
  | "gripShoes"
  | "mask"
  | "camera";

export type AdviceItem = { icon: string; text: string };

export type WeatherAdviceCopy = {
  blocks: { severe: string; outfit: string; plan: string; items: string };
  allClear: string;
  sea: {
    title: string;
    wave: string;
    /** 当日最大浪高 */
    waveMax: string;
    period: string;
    temperature: string;
    highTide: string;
    lowTide: string;
    highTideShort: string;
    lowTideShort: string;
    verdictCalm: string;
    verdictModerate: string;
    verdictRough: string;
    note: string;
  };
  tide: {
    title: string;
    /** 基准与时间说明 */
    basis: string;
    today: string;
    tomorrow: string;
    now: string;
    /** 「下一次」标记 */
    next: string;
    /** 按当前潮势输出的安全提示（涨潮 / 退潮 / 无数据） */
    notes: { rising: string; falling: string; steady: string };
  };
  messages: Record<AdviceKey, string>;
  items: Record<ItemKey, AdviceItem>;
};

const ICONS: Record<ItemKey, string> = {
  umbrella: "🌂",
  raincoat: "🥼",
  sunscreen: "🧴",
  sunglasses: "🕶️",
  hat: "🧢",
  water: "🚰",
  jacket: "🧥",
  windbreaker: "🧥",
  warmLayer: "🧣",
  gripShoes: "👟",
  mask: "😷",
  camera: "📷",
};

function makeItems(labels: Record<ItemKey, string>): Record<ItemKey, AdviceItem> {
  return Object.keys(labels).reduce((acc, key) => {
    acc[key as ItemKey] = { icon: ICONS[key as ItemKey], text: labels[key as ItemKey] };
    return acc;
  }, {} as Record<ItemKey, AdviceItem>);
}

const zh: WeatherAdviceCopy = {
  blocks: {
    severe: "风险提醒",
    outfit: "出行穿搭",
    plan: "游玩安排",
    items: "随身物品",
  },
  allClear: "暂未发现需要特别防范的天气风险，按原计划出行即可。",
  sea: {
    title: "海边情况",
    wave: "浪高",
    waveMax: "当日最大浪高",
    period: "海浪周期",
    temperature: "海水温度",
    highTide: "下一次涨潮",
    lowTide: "下一次退潮",
    highTideShort: "涨潮",
    lowTideShort: "退潮",
    verdictCalm: "海况平稳，可在观景平台看海",
    verdictModerate: "海况一般，建议只在护栏内活动",
    verdictRough: "海况较差，不建议靠近礁石与浪区",
    note: "观察点位于临海悬崖上方，观景平台与步道均在护栏内；请勿翻越护栏或下到礁石上。",
  },
  tide: {
    title: "潮汐",
    basis: "当地时间 · 以平均海平面为基准",
    today: "今天",
    tomorrow: "明天",
    now: "现在",
    next: "下一次",
    notes: {
      rising: "正在涨潮：低处的礁石和平台会逐渐被浪覆盖，请留在护栏内，不要下到礁石区。",
      falling: "正在退潮：露出来的礁石依旧湿滑，请勿翻越护栏或下到礁石上。",
      steady: "观景平台与滨海步道不受潮位影响，任何时段都可以安全看海。",
    },
  },
  messages: {
    riskThunder:
      "有雷电活动：不要登山、不要在海边戏水，也不要在树下或孤立凉棚避雨，请尽快进入坚固建筑内。",
    riskDownpour:
      "降雨较强：避开山谷与低洼地带，海边栈道和礁石湿滑，游船、缆车等露天项目可能临时停运。",
    riskGale:
      "风力很强：远离广告牌、临时搭建物与海边礁石，拍照时注意站稳并护好随身物品。",
    riskRoughSea:
      "海浪较大：不要下海游泳，也不要走到礁石上取景，留意岸边突然打来的大浪。",
    riskFog:
      "能见度很低：观景视野会大打折扣，轮渡与航班可能延误，行走崖边步道请放慢速度。",
    riskExtremeUv:
      "紫外线极强：正午前后户外活动很容易晒伤，请务必做好防晒并缩短暴晒时间。",
    riskHeat: "高温天气：注意补水防暑，尽量避开正午时段长时间户外活动。",
    outfitRain: "有降水，建议穿防水外套或带防水层，鞋子选鞋底防滑的更稳妥。",
    outfitDrizzle:
      "有毛毛雨或小雨：路面、台阶会偏滑，外层可选轻微防水的材质，鞋子优先选防滑的。",
    outfitGale: "风大，建议穿贴身防风外套；不建议穿宽松长裙、戴宽檐帽。",
    outfitHot: "气温偏高，建议轻薄透气的衣物，浅色更凉爽。",
    outfitVeryHot: "天气炎热，建议宽松速干的浅色衣物，注意遮阳。",
    outfitCold: "气温偏低，建议厚外套，早晚风大时可加一条围巾。",
    outfitSwing: "昼夜温差较大，建议备一件外套，方便随时增减。",
    outfitHumid: "空气湿度偏大，棉质衣物不易干，建议选速干面料。",
    outfitMild: "气温舒适，常规休闲衣物即可；海边风感偏凉，备一件薄外套更稳妥。",
    planThunder: "雷雨期间水上项目与露天设施大概率关闭，请以现场公告为准。",
    planRain:
      "不建议安排户外游玩，优先选择室内场馆，海边与登高行程建议改期。",
    planDrizzle: "小雨或毛毛雨对短程游览影响不大，但路面湿滑，走栈道请放慢脚步。",
    planGarua:
      "正值利马常见的 “garúa” 海雾季：天色灰蒙、空气潮湿，视野可能受限，但通常不影响出行。",
    planClear: "天气晴好，适合户外游览，也是拍灯塔与太平洋日落的理想时机。",
    planCloudy: "光线柔和不刺眼，适合长时间散步与拍照，也没有暴晒顾虑。",
    planHot: "建议把户外游览安排在清晨或傍晚，正午缩短停留并多在阴凉处休息。",
    planWind: "崖顶与观景平台风感明显，拍照注意站稳，帽子等轻物容易被吹走。",
    planFog: "浓雾会遮挡海景，观景效果不佳，可先安排室内行程再回来。",
    planSeaCalm: "可以到观景平台看海与拍日落，请始终待在护栏内。",
    planSeaRough: "海面不平静，建议只在护栏内观景，不要下海或走到礁石边拍照。",
    planCalm: "适合沿滨海步道散步、看海与拍照，日出与日落前后景色最佳。",
  },
  items: makeItems({
    umbrella: "折叠伞",
    raincoat: "雨衣（风大时比长柄伞更安全）",
    sunscreen: "防晒霜",
    sunglasses: "墨镜",
    hat: "遮阳帽",
    water: "充足饮用水",
    jacket: "薄外套",
    windbreaker: "防风外套",
    warmLayer: "保暖衣物",
    gripShoes: "防滑鞋",
    mask: "口罩",
    camera: "相机",
  }),
};

const en: WeatherAdviceCopy = {
  blocks: {
    severe: "Weather warnings",
    outfit: "What to wear",
    plan: "How to plan the visit",
    items: "What to pack",
  },
  allClear: "No weather hazard worth planning around right now — go ahead with your itinerary.",
  sea: {
    title: "Sea conditions",
    wave: "Wave height",
    waveMax: "Peak wave height today",
    period: "Wave period",
    temperature: "Sea temperature",
    highTide: "Next high tide",
    lowTide: "Next low tide",
    highTideShort: "High tide",
    lowTideShort: "Low tide",
    verdictCalm: "Calm sea — good for views from the platform",
    verdictModerate: "Moderate sea — stay behind the railings",
    verdictRough: "Rough sea — keep clear of the rocks and the surf zone",
    note: "The viewpoint sits on a seaside cliff; the promenade and platforms are all inside railings. Never climb over them or walk down onto the rocks.",
  },
  tide: {
    title: "Tides",
    basis: "Local time · heights above mean sea level",
    today: "Today",
    tomorrow: "Tomorrow",
    now: "Now",
    next: "Next",
    notes: {
      rising: "The tide is coming in: the lower rocks and ledges will soon be covered — stay behind the railings and keep off the rocks.",
      falling: "The tide is going out: newly exposed rocks stay slippery — do not climb over the railings or walk down onto them.",
      steady: "The viewing platforms and seafront walkway sit above the tide line, so the view is safe at any hour.",
    },
  },
  messages: {
    riskThunder:
      "Thunderstorms: skip the cliffs and the water, avoid sheltering under trees or isolated canopies, and move into a solid building.",
    riskDownpour:
      "Heavy rain: avoid gullies and low ground, the coastal walkways and rocks turn slippery, and open-air rides such as boats or cable cars may stop running.",
    riskGale:
      "Strong wind: stay away from billboards, temporary structures and the seaside rocks, hold on to your belongings and keep your footing.",
    riskRoughSea:
      "Big swell: do not swim and do not walk out onto the rocks — waves can break higher than expected.",
    riskFog:
      "Very low visibility: the ocean view will be mostly hidden, ferries and flights may be delayed, and you should slow down on the cliffside path.",
    riskExtremeUv:
      "Extreme UV: sunburn is quick around midday — use proper sun protection and shorten time in direct sun.",
    riskHeat: "Hot day: keep drinking water and avoid long stretches outdoors around midday.",
    outfitRain: "Rain is likely — wear a water-repellent layer and shoes with decent grip.",
    outfitDrizzle:
      "Light drizzle around: paths and steps turn slick — choose a lightly water-repellent outer layer and shoes with grip.",
    outfitGale: "It is windy — wear a fitted windproof jacket and skip loose dresses or wide-brim hats.",
    outfitHot: "Warm — light, breathable clothing works best, and lighter colours feel cooler.",
    outfitVeryHot: "Hot — loose, quick-drying light-coloured clothes keep you comfortable.",
    outfitCold: "Chilly — bring a warm coat, plus a scarf for the windy early and late hours.",
    outfitSwing: "Big gap between day and night temperatures — pack a jacket you can add or remove.",
    outfitHumid: "Humidity is high, so cotton stays damp — quick-drying fabrics are more comfortable.",
    outfitMild: "Comfortable temperatures — everyday casual wear is fine, plus a light jacket for the breezy seafront.",
    planThunder: "Water activities and open-air facilities usually close during thunderstorms — check on-site notices.",
    planRain:
      "Not a day for outdoor sightseeing: prefer indoor venues and postpone the coast and any climbing.",
    planDrizzle: "Light drizzle will not spoil a short visit, but surfaces get slippery — take the walkways slowly.",
    planGarua:
      "This is Lima's “garúa” season: grey skies and damp air may limit the view, but it rarely stops a visit.",
    planClear: "Clear weather — ideal for outdoor sightseeing and for photographing the lighthouse and the Pacific sunset.",
    planCloudy: "Soft, even light — great for a long walk and for photos, with no harsh sun to worry about.",
    planHot: "Plan outdoor visits for early morning or late afternoon, and rest in the shade around midday.",
    planWind: "It feels windy on the cliff top and the viewing platforms — watch your footing and hold on to light items.",
    planFog: "Fog will hide the ocean view — do the indoor part of your visit first and come back later.",
    planSeaCalm: "The sea is calm enough for views and sunset photos — just stay inside the railings.",
    planSeaRough: "The sea is unsettled — enjoy it from behind the railings and stay off the rocks.",
    planCalm: "Good conditions for the seafront promenade, ocean views and photos; sunrise and sunset are the best moments.",
  },
  items: makeItems({
    umbrella: "Compact umbrella",
    raincoat: "Rain jacket (safer than an umbrella in wind)",
    sunscreen: "Sunscreen",
    sunglasses: "Sunglasses",
    hat: "Sun hat",
    water: "Plenty of water",
    jacket: "Light jacket",
    windbreaker: "Windproof jacket",
    warmLayer: "Warm layer",
    gripShoes: "Shoes with grip",
    mask: "Face mask",
    camera: "Camera",
  }),
};

const es: WeatherAdviceCopy = {
  blocks: {
    severe: "Avisos meteorológicos",
    outfit: "Qué ponerse",
    plan: "Cómo organizar la visita",
    items: "Qué llevar",
  },
  allClear: "No hay ningún riesgo meteorológico que obligue a cambiar planes: puedes seguir tu itinerario.",
  sea: {
    title: "Estado del mar",
    wave: "Altura de ola",
    waveMax: "Ola máxima de hoy",
    period: "Periodo de ola",
    temperature: "Temperatura del mar",
    highTide: "Próxima pleamar",
    lowTide: "Próxima bajamar",
    highTideShort: "Pleamar",
    lowTideShort: "Bajamar",
    verdictCalm: "Mar tranquilo: bueno para contemplar desde el mirador",
    verdictModerate: "Mar moderado: conviene quedarse tras las barandas",
    verdictRough: "Mar revuelto: no te acerques a las rocas ni a la zona de rompientes",
    note: "El mirador está sobre un acantilado costero; el paseo y las plataformas están protegidos por barandas. No las saltes ni bajes a las rocas.",
  },
  tide: {
    title: "Mareas",
    basis: "Hora local · altura sobre el nivel medio del mar",
    today: "Hoy",
    tomorrow: "Mañana",
    now: "Ahora",
    next: "Siguiente",
    notes: {
      rising: "La marea está subiendo: las rocas y plataformas bajas quedarán cubiertas; permanece tras las barandas y no bajes a las rocas.",
      falling: "La marea está bajando: las rocas que quedan al descubierto siguen resbaladizas; no saltes las barandas ni bajes a ellas.",
      steady: "Los miradores y el paseo quedan por encima de la línea de marea, así que la vista es segura a cualquier hora.",
    },
  },
  messages: {
    riskThunder:
      "Tormenta eléctrica: no subas a los acantilados ni te bañes, y no te refugies bajo árboles o toldos aislados; entra en un edificio sólido.",
    riskDownpour:
      "Lluvia intensa: evita quebradas y zonas bajas, el paseo costero y las rocas se vuelven resbaladizas y los servicios al aire libre (botes, teleféricos) pueden suspenderse.",
    riskGale:
      "Viento muy fuerte: aléjate de carteles, estructuras provisionales y rocas del litoral; asegura tus objetos y mantén el equilibrio.",
    riskRoughSea:
      "Oleaje alto: no nades ni camines sobre las rocas, puede llegar una ola más grande de lo esperado.",
    riskFog:
      "Visibilidad muy reducida: la vista al mar quedará cubierta, los ferris y vuelos pueden retrasarse y conviene caminar despacio por el paseo del acantilado.",
    riskExtremeUv:
      "Radiación UV extrema: el sol quema rápido al mediodía; protégete bien y reduce el tiempo de exposición directa.",
    riskHeat: "Día caluroso: bebe agua con frecuencia y evita largos periodos al aire libre al mediodía.",
    outfitRain: "Probable lluvia: usa una prenda impermeable y calzado con buena adherencia.",
    outfitDrizzle:
      "Hay llovizna: el paseo y los escalones se ponen resbaladizos; usa una capa ligeramente impermeable y calzado con agarre.",
    outfitGale: "Hace viento: usa una chaqueta cortavientos ajustada y evita faldas amplias y sombreros de ala ancha.",
    outfitHot: "Temperatura alta: ropa ligera y transpirable; los colores claros se sienten más frescos.",
    outfitVeryHot: "Hace mucho calor: ropa holgada, de secado rápido y de color claro.",
    outfitCold: "Temperatura baja: lleva abrigo y una bufanda para las horas de más viento.",
    outfitSwing: "Gran diferencia entre el día y la noche: lleva una chaqueta que puedas ponerte o quitarte.",
    outfitHumid: "La humedad es alta y el algodón tarda en secar: mejor tejidos de secado rápido.",
    outfitMild: "Temperatura agradable: ropa casual y una chaqueta fina para el viento del malecón.",
    planThunder: "Durante la tormenta suelen cerrar las actividades acuáticas y las instalaciones al aire libre; consulta los avisos del lugar.",
    planRain:
      "No es día para visitas al aire libre: prioriza lugares cerrados y pospón la costa y cualquier ascenso.",
    planDrizzle: "La llovizna apenas afecta una visita corta, pero el suelo se vuelve resbaladizo: camina con calma.",
    planGarua:
      "Estamos en temporada de “garúa”: cielo gris y aire húmedo pueden limitar la vista, aunque rara vez impide la visita.",
    planClear: "Cielo despejado: ideal para recorrer al aire libre y fotografiar el faro y el atardecer sobre el Pacífico.",
    planCloudy: "Luz suave y uniforme: perfecta para caminar y fotografiar sin sol molesto.",
    planHot: "Programa lo exterior al amanecer o al atardecer y descansa a la sombra al mediodía.",
    planWind: "En la parte alta del acantilado y en los miradores se siente el viento: cuidado con el equilibrio y con los objetos ligeros.",
    planFog: "La neblina tapará la vista al mar: empieza por la parte interior de la visita y vuelve más tarde.",
    planSeaCalm: "El mar está tranquilo para contemplarlo y fotografiar el atardecer; permanece tras las barandas.",
    planSeaRough: "El mar está agitado: disfrútalo desde las barandas y no bajes a las rocas.",
    planCalm: "Buenas condiciones para el malecón, las vistas y las fotos; el amanecer y el atardecer son los mejores momentos.",
  },
  items: makeItems({
    umbrella: "Paraguas compacto",
    raincoat: "Impermeable (más seguro que el paraguas con viento)",
    sunscreen: "Protector solar",
    sunglasses: "Gafas de sol",
    hat: "Sombrero o gorra",
    water: "Agua suficiente",
    jacket: "Chaqueta ligera",
    windbreaker: "Chaqueta cortavientos",
    warmLayer: "Prenda de abrigo",
    gripShoes: "Calzado con agarre",
    mask: "Mascarilla",
    camera: "Cámara",
  }),
};

const qu: WeatherAdviceCopy = {
  blocks: {
    severe: "Manchakuy willakuy",
    outfit: "Imatam churakuy",
    plan: "Imaynatam puriy",
    items: "Imatam apay",
  },
  allClear: "Manam ima sasachakuychu kan: puriyniykita qatinalla.",
  sea: {
    title: "Mama qucha kaynin",
    wave: "Yaku hatun kay",
    waveMax: "Kunan p'unchaw yaku hatun kay",
    period: "Yaku muyu",
    temperature: "Yaku q'uñi kay",
    highTide: "Qatiq yaku hunt'ay",
    lowTide: "Qatiq yaku chakiy",
    highTideShort: "Hunt'ay",
    lowTideShort: "Chakiy",
    verdictCalm: "Yaku sami: qhawana patapim qhawayta atinki",
    verdictModerate: "Yaku chawpi: rump'ulla ukhullapim kakuy",
    verdictRough: "Yaku sinchi: mana rumikunaman asuykuychu",
    note: "Qhawananchikmanta mama qucha patapim kashan; purinapas rump'ullapim. Ama rump'ullata t'inkispa rumikunaman uraykuychu.",
  },
  tide: {
    title: "Yaku hunt'ay",
    basis: "Kay pacha · mama qucha chawpi patamanta",
    today: "Kunan p'unchaw",
    tomorrow: "Paqarin",
    now: "Kunan",
    next: "Qatiq",
    notes: {
      rising: "Yaku hunt'achkan: uray rumikuna p'istukapunqam; rump'ulla ukhullapi kakuy, ama rumikunaman uraykuychu.",
      falling: "Yaku chakichkan: lluqsimuq rumikuna llusk'amin; ama rump'ullata t'inkispa uraykuychu.",
      steady: "Qhawana patakuna yaku patamanta hanaqpim kashan, hayk'aqpas qhawayta atinki.",
    },
  },
  messages: {
    riskThunder: "Illapa kanmi: ama urquman wichaychu, ama qucha patapi pukllaychu; sinchi wasiman yaykuy.",
    riskDownpour: "Sinchi para: ama wayq'ukunaman, ura mayukunaman riychu; rumikuna llusk'amin, botekunapas sayanman.",
    riskGale: "Sinchi wayra: ama willanaman, rumikunaman asuykuychu; imaykikunatapas allin hap'iy.",
    riskRoughSea: "Yaku hatunmi: ama challpukuy... ama quchapi armakuyta atiwaqchu, ama rumikunamapas riychu.",
    riskFog: "Manam karputa rikunachu: qhawana manam allinchu kanqa, puriyta allichakuy.",
    riskExtremeUv: "Inti sinchi: chawpi p'unchawpi q'aspaqmi; inti hark'akuyta ruway.",
    riskHeat: "Q'uñi p'unchaw: yakuta upyay, chawpi p'unchawpi mana unayllapaq lluqsiychu.",
    outfitRain: "Para hamunqa: yaku mana yaykuq p'achata churakuy, llusk'a mana kaq sapatuwan.",
    outfitDrizzle:
      "Aslla param: ñan llusk'amin; huk lliphi yaku mana yaykuq p'achata, llusk'a mana kaq sapatutapas churakuy.",
    outfitGale: "Wayranmi: k'uchuykachikuq wayra p'achata churakuy; hatun chuku ama churakuychu.",
    outfitHot: "Q'uñi: ch'uya, wayra yaykuq p'achakuna allinmi.",
    outfitVeryHot: "Ancha q'uñi: chanra p'achakuna, llimpi llimpi llimp'ikuna allinmi.",
    outfitCold: "Chiri: rupay p'achata apay, wayra pachapi wak'ullatapas.",
    outfitSwing: "P'unchaw ch'isi muyuriyman: huk p'achata apay, chaskiyta atinaykipaq.",
    outfitHumid: "Yaku pacha: utqay chakikuq p'achakuna allinmi.",
    outfitMild: "Allin q'uñi: p'acha allinmi; wayra kanman, huk lliphi p'achata apay.",
    planThunder: "Illapa pachapi yaku pukllaykuna wichq'akunmi: wasipi willakuyta qhaway.",
    planRain: "Ama cancha lluqsiychu: wasi ukhu kitukunaman riy; qucha, urqu puriytapas huk p'unchawman apay.",
    planDrizzle: "Aslla para manam hatun sasachakuychu, ichaqa ñan llusk'amin: allichakuspa puriy.",
    planGarua: "Kunan “garúa” pacham: phuyu pacha, yaku pacha; qhawana pisi kanman, ichaqa puriyta mana hark'anchu.",
    planClear: "Ch'uya p'unchaw: hawapim puriyta atinki, farota, inti chinkaytam siqllita atinki.",
    planCloudy: "Lliphi achkiy: puriypaq, siqllipaq allinmi; inti manam q'aspanchu.",
    planHot: "Paqarinpi, ch'isipi hawapim puriy; chawpi p'unchawpi samay.",
    planWind: "Qhawanapi wayran sinchim: allin sayay, chuqcha chuku apasqaykita qhawariy.",
    planFog: "Pukutay mama quchata pakaykunmi: wasi ukhu puriyta ñawpaqta ruway.",
    planSeaCalm: "Yaku sami: qhawanamanta qhawariy, inti chinkaytam siqlliy; rump'ulla ukhullapi kakuy.",
    planSeaRough: "Yaku sinchi: rump'ulla ukhullamanta qhaway, ama rumikunaman riychu.",
    planCalm: "Malecón patapi puriy, qhaway, siqlliy allinmi; inti lluqsimuy, inti chinkaymi allin pacha.",
  },
  items: makeItems({
    umbrella: "P'ikitay paragua",
    raincoat: "Para p'acha (wayrapi allinmi)",
    sunscreen: "Inti hark'a",
    sunglasses: "Inti lentes",
    hat: "Inti chuku",
    water: "Yaku apay",
    jacket: "Lliphilla p'acha",
    windbreaker: "Wayra p'acha",
    warmLayer: "Rupay p'acha",
    gripShoes: "Llusk'a mana kaq sapatu",
    mask: "Uya hark'a",
    camera: "Siqlli (cámara)",
  }),
};

export const weatherAdviceCopy: Record<Locale, WeatherAdviceCopy> = {
  es,
  en,
  zh,
  qu,
};
