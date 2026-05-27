import { Zone, TriviaQuestion, ZooShow } from './types';

export const ZOO_ZONES: Zone[] = [
  {
    id: 'entrance',
    title: 'Welcome Archway',
    chineseTitle: '森林之门 · 正门广场',
    category: '首页·网站首页横幅',
    description: '欢迎来到生态奇境自然动物园。穿过繁花掩映的拱形正门，白鸽在澄澈的蓝天中飞羽，花海步道向葱茏的森林深处延伸，展开您的自然治愈之旅。',
    details: '动物园主入口大厅。拥有智慧型导览、观光小火车始发站与全天候咨询台，为您开启舒心、难忘的沉浸式游园体验。',
    bannerImage: 'https://cdn.phototourl.com/free/2026-05-26-fa2a6de9-8bb5-4f55-b80b-706a67d1cff5.jpg',
    color: {
      primary: '#15803d', // green-700
      bg: '#f0fdf4', // green-50
      text: '#14532d', // green-900
      accent: '#facc15' // yellow-400
    },
    animals: [
      {
        id: 'peacock_white',
        name: '白孔雀',
        scientificName: 'Pavo cristatus mut. alba',
        category: '观赏珍禽',
        description: '白孔雀是蓝孔雀的变异品种，全身羽毛洁白无瑕，展扇时如同一面巨大的蕾丝羽屏。它们在正门广场的花丛间漫步，优雅而圣洁。',
        funFact: '白孔雀全身羽毛洁白并非因为白化病，而是由于基因变异导致羽毛色素发育受阻。其眼睛依然是亮丽的蓝色。',
        diet: '昆虫、植物嫩叶、种子和谷物',
        conservationStatus: 'LC',
        imageUrl: 'https://cdn.phototourl.com/free/2026-05-26-6ecd94a9-9c65-4ad2-ae1d-febe5c5588ab.png',
        behavior: '喜在晨昏时分在草坪上缓慢行走开屏，展示其华丽的身姿。'
      },
      {
        id: 'squirrel_red',
        name: '松鼠',
        scientificName: 'Sciurus vulgaris',
        category: '林间小能手',
        description: '林间敏捷穿梭的小松鼠，蓬松的尾巴如毛茸茸的枫叶。正门道旁的针叶树上常能看见它们抱着坚果、好奇打量游客的样子。',
        funFact: '松鼠拥有极佳的前瞻嗅觉，甚至能在几英尺高的积雪下找到自己去年冬天埋藏的橡子！',
        diet: '松果、榛子、橡实、嫩芽',
        conservationStatus: 'LC',
        imageUrl: 'https://cdn.phototourl.com/member/2026-05-26-31a57cfb-9cde-4b66-a50b-931c7cc807a1.jpg',
        behavior: '极度活跃，善于攀爬，性格调皮，对好奇的事物会发出嘀咕声。'
      }
    ],
    features: {
      activities: ['免费获取AR纸质导览图', '与广场中散游的孔雀合影', '租用双人低碳踏板车'],
      tips: ['早上 9:00 前入园能赶上“白鸽晨曲”，成群白鸽在喷泉上方盘旋掠过。'],
      schedule: [
        { time: '09:15', activityName: '迎宾广场花车巡游', location: '正门中央大道', animalName: '金刚鹦鹉与矮马队' },
        { time: '10:00', activityName: '白鸥、白鸽放飞仪式', location: '喷泉广场', animalName: '信鸽群' }
      ]
    }
  },
  {
    id: 'savannah',
    title: 'Savannah Sanctuary',
    chineseTitle: '草原动物馆 · 狂野大地',
    category: '草原动物馆·栏目页',
    description: '10万平方米沉浸式东非大草原展区。微风拂过低灌木草场，高耸的长颈鹿、群居的斑马和巨大的草原象漫步在红土大地上，视野壮阔舒展。',
    details: '高度还原塞伦盖蒂生态结构，通过无视觉隔阂的生态战壕和土坡屏障，让游客仿佛置身于东非原野之中，饱览食草兽群的平和共生。',
    bannerImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&h=900&q=80',
    color: {
      primary: '#b45309', // amber-700
      bg: '#fef3c7', // amber-100
      text: '#78350f', // amber-900
      accent: '#22c55e' // green-500
    },
    animals: [
      {
        id: 'giraffe_savannah',
        name: '网纹长颈鹿',
        scientificName: 'Giraffa camelopardalis reticulata',
        category: '草原巨人',
        description: '高耸优雅的网纹长颈鹿，拥有精致如拼图的红棕色斑纹。它们站在金褐色的枯树旁，细嚼慢咽着高耸橡树的细叶。',
        funFact: '长颈鹿不仅脖子极长，它们的舌头甚至也长达45-50厘米，呈暗青色，能灵活避开含羞草等植物树枝上的尖刺。',
        diet: '金合欢树叶、灌木嫩叶',
        conservationStatus: 'VU',
        imageUrl: 'https://cdn.phototourl.com/member/2026-05-26-b147b6b9-777e-4141-9fc7-f47b5da32741.png', // Giraffe
        behavior: '站立反刍，步态优雅，由于体型庞大，它们甚至连睡觉都是站着的！'
      },
      {
        id: 'zebra_savannah',
        name: '平原斑马',
        scientificName: 'Equus quagga',
        category: '黑白交响乐',
        description: '斑马身上独一无二的黑白醒目斑纹在烈日下仿佛流动的迷彩。它们是天生的群居动物，常在草甸中一边吃草一边机警地警惕着四周。',
        funFact: '黑白条纹在野外能产生视觉眩晕效果，让狮子等猎食者难以测算单个斑马的运动速度和具体距离。',
        diet: '粗纤维干草、禾本科植物',
        conservationStatus: 'NT',
        imageUrl: 'https://cdn.phototourl.com/member/2026-05-26-d9fb5829-9222-487d-a50c-872d5a7abf69.jpg',
        behavior: '极为警觉，奔跑速度极快。休息时通常会两两头部反方向交错站立，以此确保360度视野。'
      }
    ],
    features: {
      activities: ['长颈鹿野奢喂食高台', '草原小火车越野穿越车', '斑马条纹趣味拓印馆'],
      tips: ['午后 14:00 左右，象群会结伴来到中央生态泥潭“泡澡”洗泥巴浴，是非常逗趣的景观！'],
      schedule: [
        { time: '10:30', activityName: '长颈鹿丰容互动科普', location: '高空喂食平台', animalName: '网纹长颈鹿群' },
        { time: '15:30', activityName: '大象泥浴及科普讲堂', location: '草原文泥潭', animalName: '非洲草原象' }
      ]
    }
  },
  {
    id: 'beasts',
    title: 'Predator Valley',
    chineseTitle: '猛兽谷 · 山石丛林',
    category: '猛兽区·栏目页',
    description: '深沟壁垒，野性扑面。怪石嶙峋的山崖、茂密险峻的灌木丛林中，东北虎、霸气雄狮、黑熊和狡黠的灰狼或在峭壁趴卧，或低吼巡视。',
    details: '采用全景高强度钢化防弹视窗与沉降式生态峡谷设计，既百分百保证安全度，又让您近距离凝视顶级猎食者的深邃眼纹，感受野性的极致张力。',
    bannerImage: 'https://cdn.phototourl.com/free/2026-05-26-47b84ab4-896f-42b8-9a97-09ccd2a696e5.jpg',
    color: {
      primary: '#991b1b', // red-800
      bg: '#fee2e2', // red-100
      text: '#450a0a', // red-950
      accent: '#ea580c' // orange-600
    },
    animals: [
      {
        id: 'tiger_siberian',
        name: '东北虎',
        scientificName: 'Panthera tigris altaica',
        category: '森林之王',
        description: '拥有壮美橘黄色毛皮和黑色条纹的斑斓猛兽，是现存体型最大的肉食性猫科动物。在冷冽山石泉水边踱步，王者气场不怒自威。',
        funFact: '世界上没有两只老虎的条纹是完全相同的。就像人类的指纹，它们的条纹是独一无二的身份标识，甚至连剃掉毛后的皮肤上也有条纹！',
        diet: '牛、羊、鹿等大型偶蹄类鲜肉',
        conservationStatus: 'EN',
        imageUrl: 'https://cdn.phototourl.com/member/2026-05-26-b4c66067-6273-4d7e-b028-b09f30e74ac7.jpg',
        behavior: '独居性，极擅游泳，耐寒。平时喜欢攀爬至岩石高处居高临下观察领地。'
      },
      {
        id: 'leopard_clouded',
        name: '云豹',
        scientificName: 'Neofelis nebulosa',
        category: '树栖暗夜灵猫',
        description: '身上布满大块深色、形如云朵斑纹的神秘云豹。它们是天生的树栖大师，身躯极其柔韧敏捷。',
        funFact: '云豹拥有猫科动物中按体型比例最长的犬齿，比例上与灭绝的剑齿虎非常相似，使它们常被称为“现代小剑齿虎”。',
        diet: '猴类、鸟类、松鼠、雉鸡',
        conservationStatus: 'VU',
        imageUrl: 'https://cdn.phototourl.com/member/2026-05-26-1ff370c8-a24b-4e0c-840a-70988cef82ba.png', // Clouded Leopard
        behavior: '极其隐秘，黄昏 and 夜间活跃，能以头部向下的姿势垂直爬下树干。'
      }
    ],
    features: {
      activities: ['岩石投喂感应悬梯', '深夜猛兽营（夏令营限定）', '红外热成像野外追踪互动'],
      tips: ['请勿拍打防弹玻璃或大声喧哗，顶级猫科动物的听觉敏锐，静静端详它们才可捕捉到最真实的眼神交流。'],
      schedule: [
        { time: '11:00', activityName: '猛兽丰容捕食展示', location: '东北虎领地', animalName: '东北虎“雷霆”' },
        { time: '16:00', activityName: '非洲狮群野性晚餐', location: '狮吼山石台', animalName: '非洲雄狮' }
      ]
    }
  },
  {
    id: 'primate',
    title: 'Primate Peak',
    chineseTitle: '灵长类馆 · 奇趣猴山',
    category: '灵长类馆·栏目页',
    description: '假山交错、瀑布飞流，茂盛的古藤老树环绕其间。聪明调皮的猕猴成群攀缘，高贵低调的金丝猴与稳重睿智的黑猩猩在林间荡漾、嬉戏打闹。',
    details: '全生态空中连廊与原生态攀爬栖架系统。不仅扩大了猴群的上下立体探索空间，还能让游客抬头即能观赏灵长类高空“飞跃”的奇特林栖景观。',
    bannerImage: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=1600&h=900&q=80',
    color: {
      primary: '#0d9488', // teal-600
      bg: '#ccfbf1', // teal-100
      text: '#115e59', // teal-800
      accent: '#fbbf24' // amber-400
    },
    animals: [
      {
        id: 'gold_monkey',
        name: '川金丝猴',
        scientificName: 'Rhinopithecus roxellana',
        category: '国宝仙子',
        description: '华丽金色丝状长发，天蓝色娇羞的面庞，鼻孔上仰。金丝猴性格极其温顺、灵气逼人，是我国特有的一等稀世珍宝。',
        funFact: '金丝猴的背部毛发长达三十多厘米，古代曾被作为防潮保暖的御寒仙裘。它们上仰的面孔和没有鼻梁的微翘鼻头是为了防止在零下几十度的冰雪高山森林里把鼻子冻伤。',
        diet: '松萝、地衣、野果、嫩皮叶',
        conservationStatus: 'EN',
        imageUrl: 'https://cdn.phototourl.com/member/2026-05-26-a8935528-c946-4ae5-9e5d-a744b1260a2b.jpg',
        behavior: '家庭群居，情感细腻。成年猴会互相梳理金毛，小猴则喜欢抱成毛团随母猴跳跃。'
      },
      {
        id: 'chimpanzee_clever',
        name: '黑猩猩',
        scientificName: 'Pan Paniscus',
        category: '智慧远亲',
        description: '黑猩猩是与人类基因距离最近的物种，目光充满灵智与沉思。它们乐于用不同的工具去解决“坚果难题”。',
        funFact: '黑猩猩不仅会用木棍钓白蚁，还会用平整的石头当砧板，锤子石头砸碎硬壳坚果，甚至懂得采集特定具有消炎草药性质的植物来敷伤口！',
        diet: '浆果、香蕉、昆虫、嫩草茎',
        conservationStatus: 'EN',
        imageUrl: 'https://cdn.phototourl.com/member/2026-05-26-365cacc9-1031-4a6e-ae7a-06a046ff09b2.jpg',
        behavior: '高度发达的社会性。会使用手势 and 20多种独特的复杂呼叫声进行社会沟通与分工。'
      }
    ],
    features: {
      activities: ['黑猩猩工具解密大挑战', '灵长类语汇声频破译台', '树冠吊网亲子攀爬攀岩林'],
      tips: ['当金丝猴张开嘴巴打呵欠时，通常不是疲倦，而是一种展示自我牙齿实力、宣示主权或警叹同伴的安全警告动作哦。'],
      schedule: [
        { time: '11:15', activityName: '黑猩猩拼图与智商大挑战', location: '智力展示馆', animalName: '黑猩猩“多多”' },
        { time: '14:30', activityName: '金丝猴松萝丰容加餐', location: '金丝树冠网区', animalName: '川金丝猴家庭' }
      ]
    }
  },
  {
    id: 'aquatic',
    title: 'Aqueous Sanctuary',
    chineseTitle: '水栖动物区 · 碧波绿甸',
    category: '水栖动物区·栏目页',
    description: '静谧开阔的自然湖泊，四周荷花摇曳、芦苇低吟。如镜的蓝色水面上，优雅的白天鹅与黑天鹅结伴畅游，鸳鸯相戏，憨厚硕大的河马在深水区吐着可爱的泡泡。',
    details: '基于自净化湿地植物过滤系统，全面模拟江南溪流湖泊湿地生境。水下观光隧道能让您抬头直视锦鲤群如绯红云彩般游弋，感受灵动柔顺的水中生命律动。',
    bannerImage: 'https://cdn.phototourl.com/free/2026-05-26-b9e45888-8ea3-4a27-a9c3-d0640024c8fa.jpg',
    color: {
      primary: '#0369a1', // sky-700
      bg: '#e0f2fe', // sky-100
      text: '#0c4a6e', // sky-900
      accent: '#38bdf8' // sky-400
    },
    animals: [
      {
        id: 'swan_black',
        name: '黑天鹅',
        scientificName: 'Cygnus atratus',
        category: '优雅碧波使者',
        description: '拥有修长的“S”形颈部、赤红的双眸与深邃黑绸锻般优雅羽毛。它们展翅时露出纯白的飞羽，姿态极尽华贵。',
        funFact: '黑天鹅是一夫一妻制的典范，它们一旦结对就会坚守终其一生。当它们相遇时会舒展脖子在空中轻轻依偎成一颗完美对称的红黑爱心。',
        diet: '水生植物、淡水藻类、小鱼虾',
        conservationStatus: 'LC',
        imageUrl: 'https://cdn.phototourl.com/member/2026-05-26-e561d91d-77ab-4034-b48b-ca08aba37871.jpg',
        behavior: '喜波光中成双划水。领地意识极强，在筑巢育雏期间会极力鸣叫保护雏鸟安全。'
      },
      {
        id: 'hippo_pond',
        name: '河马',
        scientificName: 'Hippopotamus amphibius',
        category: '温吞巨兽',
        description: '圆滚滚、体型硕大的哺乳巨兽。白日里它们几乎把整只身躯浸没在清凉的湖水中，只露出两只圆圆的小耳朵和小巧的鼻孔。',
        funFact: '尽管看起来皮肤光溜软萌，河马其实会分泌一种红色的粘稠液体，这并不是血，而是它们纯天然自带防晒、杀菌、防蚊的“血色防晒霜”！',
        diet: '短嫩草皮、水草',
        conservationStatus: 'VU',
        imageUrl: 'https://cdn.phototourl.com/member/2026-05-26-5cc89584-3bdb-4c36-8400-6f7d34cc272a.jpg',
        behavior: '群居，在陆地行动略显笨拙，但在水下它们其实是在轻盈地“芭蕾慢跑”。'
      }
    ],
    features: {
      activities: ['落水彩荷纸船祈福', '黑天鹅双燕游湖拍照', '百条红绯锦鲤投喂点'],
      tips: ['河马看似温吞，其实奔跑速度极快且极具咬合力！在码头观光时请务必配合安全线，不要向湖中扔任何非园区专用塑料食品。'],
      schedule: [
        { time: '11:30', activityName: '河马超级“大胃王”吃西瓜展示', location: '西瓜互动码头', animalName: '河马“圆圆”' },
        { time: '15:45', activityName: '天鹅湖华尔滋奏乐群游', location: '中心碧波湖区', animalName: '黑白天鹅群' }
      ]
    }
  },
  {
    id: 'birds',
    title: 'Aviary Woods',
    chineseTitle: '百鸟林 · 绿叶啼鸣',
    category: '鸟语林·栏目页',
    description: '高达45米的巨型生态巨幕天网下，枝叶繁密苍翠欲滴。数百只色彩斑斓的美丽雀鸟栖息在古意盎然的苍枝头，孔雀在斑驳阳光下优雅踱步，飞羽清鸣。',
    details: '半开放式森林步道，无笼笼阻隔设计，飞鸟近在咫尺。游客行走于丛高空中木制天梯，两旁五彩金刚鹦鹉、娇小文鸟自若飞飞，鸣声婉转清亮，入耳入心。',
    bannerImage: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?auto=format&fit=crop&w=1600&h=900&q=80',
    color: {
      primary: '#0891b2', // cyan-600
      bg: '#ecfeff', // cyan-50
      text: '#164e63', // cyan-950
      accent: '#22c55e' // green-500
    },
    animals: [
      {
        id: 'owl_snowy',
        name: '雪鸮',
        scientificName: 'Bubo scandiacus',
        category: '寒地冰霜精灵',
        description: '正如用户提供的图片中那样：一头雪白、有着散落黑点星斑、以及那一双仿佛充满哲思的澄亮亮明黄色大眼睛。它们歪头探究，萌态毕出、冷艳而惹人怜爱。',
        funFact: '雪鸮在冬天捕食旅鼠时，即便旅鼠藏身在地下十几厘米的厚厚雪层下，它们依然能单凭灵敏的双耳交叉听力精准锁定，并从空中俯冲直下击穿雪面擒获！',
        diet: '旅鼠、野兔、小型鸟类',
        conservationStatus: 'VU',
        imageUrl: 'https://cdn.phototourl.com/free/2026-05-26-99070801-8c23-4dd0-a1f0-f1591c07f0a2.jpg', // Snowy Owl
        behavior: '绝大多数猫头鹰都在黑夜捕食，但雪鸮因为生活在极昼的寒地圈中，它们通常是在明媚白天出来捕食的，歪头角度能高达270度！'
      },
      {
        id: 'macaw_scarlet',
        name: '绯红金刚鹦鹉',
        scientificName: 'Ara macao',
        category: '雨林调色板',
        description: '披挂着耀眼猩红、炫蓝、嫩黄三色羽毛的无双空中歌者。成对高挂在林梢，喜欢互相梳理光芒四射的翎毛。',
        funFact: '金刚鹦鹉非常长寿，它们的平均寿命可长达70至80岁，且拥有高达人类4岁幼儿的惊人逻辑智商，甚至能解开复杂的三重机关锁扣！',
        diet: '坚硬树果、棕榈果实、花蜜',
        conservationStatus: 'LC',
        imageUrl: 'https://cdn.phototourl.com/free/2026-05-26-102907cc-9fc2-4cd8-8210-b8c8b3f9ce3b.jpg',
        behavior: '声音十分嘈杂洪亮。它们特别喜欢啃咬啃软木桩、啃咬树干以此来保持它们的强健长喙的锋利程度。'
      }
    ],
    features: {
      activities: ['巨嘴鸟手握果串喂食', '百鸟天堂林间声纹录集', '鹦鹉亲近手臂地标照'],
      tips: ['请勿佩戴大颗亮闪闪的珍珠耳环、水晶闪亮发夹进入天网，对金闪闪饰品极其好奇的鹦鹉可能会飞落在您耳边温柔“偷窥”哦。'],
      schedule: [
        { time: '13:00', activityName: '七彩金刚鹦鹉树梢对话', location: '林中云梯小屋', animalName: '绯红金刚鹦鹉' },
        { time: '15:00', activityName: '雪鸮“歪头杀”科普时间', location: '寒地白桦木区', animalName: '雪鸮家庭' }
      ]
    }
  },
  {
    id: 'petting',
    title: 'Petting Meadow',
    chineseTitle: '萌宠乐园 · 亲子牧歌',
    category: '萌宠乐园·亲子专区页',
    description: '温馨木栅栏、青翠红瓦北欧草木小屋，流淌着浓郁的童话诗意。毛茸茸的垂耳兔蹦跳欢跑、温顺矮壮的小羊咩咩索食，梅花幼鹿眨巴着大眼睛走在欢声笑语之中。',
    details: '专为2至12岁亲子家庭研发设计的爱心零距离大自然抚触营。选用经过多重免疫与严格性格筛训的极其温顺、喜人温驯的超小体型动物群，备妥无菌草料、儿童胡萝卜，安全满分。',
    bannerImage: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=1600&h=900&q=80',
    color: {
      primary: '#ca8a04', // yellow-600
      bg: '#fef9c3', // yellow-100
      text: '#713f12', // yellow-900
      accent: '#f43f5e' // rose-500
    },
    animals: [
      {
        id: 'rabbit_cute',
        name: '荷兰垂耳兔',
        scientificName: 'Oryctolagus cuniculus var.',
        category: '毛茸豆包',
        description: '圆滚滚两颊、松软软垂在头侧的大耳朵，如一团白软黏人的棉花糖。胆子略小、极喜欢被轻柔抚摸额头中缝。',
        funFact: '兔子的牙齿终其一生都在像指甲一样不停生长！如果不给它们啃咬粗纤维的提摩西仙草或木枝来磨发牙齿，它们的门牙就会反向戳穿下巴，非常危险！',
        diet: '提摩西牧草、苜蓿、无水洗胡萝卜丁',
        conservationStatus: 'LC',
        imageUrl: 'https://cdn.phototourl.com/free/2026-05-26-63773454-d9df-480c-89e3-eec2d1b3e4b3.png', // Bunny
        behavior: '生性温驯。高兴时它们会在草坪上做出超级可爱的“空中180度螺旋”飞身跳跃动作表达极其快乐的情感。'
      },
      {
        id: 'deer_born',
        name: '梅花幼鹿',
        scientificName: 'Cervus nippon nippon',
        category: '斑驳精灵',
        description: '背布白梅般的淡白斑点，亮晶晶瞳孔，怯怯娇弱娇萌。走路时迈着娇小优雅的碎步，最爱舔舐儿童手心带甜意的牧草料。',
        funFact: '刚刚出生的梅花鹿幼子身上是没有异味的，这招大自然自带的“气味隐身伪装”能极大程度避免夜间遭到森林土狼狐狸的搜寻。',
        diet: '鲜枫叶、无菌桑叶、谷物压片',
        conservationStatus: 'VU',
        imageUrl: 'https://cdn.phototourl.com/free/2026-05-26-d4887baa-1587-417c-b9dd-9f78391d0af5.jpg',
        behavior: '家庭群居，胆小机警。休息时甚至会将头部枕在同伴温热的腹部上。'
      }
    ],
    features: {
      activities: ['爱心幼崽奶瓶科学饲喂', '儿童胡萝卜套圈挑战', '小萌宝泥塑制作课'],
      tips: ['抚摸小垂耳兔和小羊时，手指请务必顺着头部毛发的方向从前向后轻柔缓缓抚摸，千万不要使劲扯动它们细嫩的小耳朵或娇嫩长须哦。'],
      schedule: [
        { time: '10:00', activityName: '小鹿斑比喝奶瓶时间', location: '草坪环形木栅栏', animalName: '梅花幼鹿“花花”' },
        { time: '14:00', activityName: '小山羊赛跑大比拼（儿童观众可押草料）', location: '微风原木赛道', animalName: '矮马与小羊群' }
      ]
    }
  },
  {
    id: 'rainforest',
    title: 'Rainforest Canopy',
    chineseTitle: '热带雨林馆 · 室内奇境',
    category: '热带雨林馆·室内展区页',
    description: '高达28℃恒温恒湿的高大透明穹顶下，林间薄雾朦胧漂游。瀑布喧嚣流淌，高达数十米的参天雨林植被层层交叠，攀爬的变色龙、卷尾缠绕在枝条上的绿藤巨蟒神秘迷离。',
    details: '精心配置人工气雾冷雾生成系统、垂直落差15米人工微型瀑布与地表浅水红树林沼泽。以极其饱满的温湿植被层次与昏暗藤蔓树洞生境，让幽微、绚烂、原始的亚马逊热带季风丛林跃然眼前。',
    bannerImage: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1600&h=900&q=80',
    color: {
      primary: '#047857', // emerald-700
      bg: '#d1fae5', // emerald-100
      text: '#064e3b', // emerald-900
      accent: '#10b981' // emerald-500
    },
    animals: [
      {
        id: 'snake_python',
        name: '翡翠树蟒',
        scientificName: 'Corallus caninus',
        category: '幽绿藤之索',
        description: '正如同小图里展现的那样：一弯翠绿到极致、泛着细密白云般的细小星斑、盘作一整排完美的螺旋形、将三角形的蟒头稳重搁在树木枝丫上的冷艳树蟒。眼神慵懒而高贵。',
        funFact: '翡翠树蟒拥有蛇类亲族中极其突出的超长锋利前部尖牙，这对牙齿不仅帮助它们牢牢钩捕住在高树冠层狂风中随风飞舞跳跃的林鸟，其完全无毒，极其温和。',
        diet: '林鸟群、伞树冠层飞鼠蝙蝠',
        conservationStatus: 'LC',
        imageUrl: 'https://images.unsplash.com/photo-1531386151447-fd76ad50012f?auto=format&fit=crop&w=800&q=80', // Green Snake
        behavior: '完全的树栖大师。它们一生中几乎99%的时间都以独有的“马鞍状”盘蛇姿势悬挂在茂密横向树杈上，就连消化、睡觉、产卵都是这般姿势。'
      },
      {
        id: 'iguana_green',
        name: '美洲绿鬣蜥',
        scientificName: 'Iguana iguana',
        category: '侏罗纪遗风',
        description: '拥有一排排微小棘刺、体长能达一米五的巨大食草大鬣蜥。虽然长相极其冷峻威严，宛若活化石，但实际上是个性温柔的“森林素食者”。',
        funFact: '绿鬣蜥的头顶正中央藏有一个微小的粉色透明结构，这被称为“第三只眼”（松果体眼）。尽管看不到复杂的图像，但它极其敏感，能精确探查上方掠过的猛禽红外阴影进行逃生！',
        diet: '大榕树叶、蔷薇科花瓣、多汁草莓果',
        conservationStatus: 'LC',
        imageUrl: 'https://cdn.phototourl.com/free/2026-05-26-7edd2641-fc65-4a05-8933-a56fdd7d1b44.jpg',
        behavior: '极喜在人工加热恒温石台上趴卧享受人造阳光紫外线晒背。'
      }
    ],
    features: {
      activities: ['热带热带雨林红外夜行探秘营', '人工冷雾温湿调节盘控制体验', '神奇兰花生态微园景'],
      tips: ['雨林馆内常年湿度保持于 85% 以上且有不定时的降雨气雾生成，在雨林天梯上行走慢一些，小心防滑哦。'],
      schedule: [
        { time: '13:45', activityName: '树蟒缠绕进食科普讲座', location: '雨林核心藤蔓藤廊', animalName: '斑驳翡翠树蟒' },
        { time: '16:15', activityName: '绿鬣蜥花瓣加餐仪式', location: '恒温暖石区', animalName: '绿鬣蜥“哥斯拉”' }
      ]
    }
  },
  {
    id: 'lawn',
    title: 'Leisure Meadow',
    chineseTitle: '休闲草坪 · 园区风光',
    category: '休闲草坪·园区风光页',
    description: '大片沐浴在和煦金辉下的松软草坪。斑驳的遮阳大树绿荫深浓，精致的法式长椅点缀其间，背景中散放的温驯斑马群、优雅奔跑的瞪羚正悠闲吃着草。',
    details: '占地逾万平米的人文休闲大草坪。这里不仅是游客悠然享受午餐、野餐休憩、听风赏景的绝佳打卡胜地，更是人与自然动物视界交感融合的静谧绿洲。',
    bannerImage: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1600&h=900&q=80',
    color: {
      primary: '#16a34a', // green-600
      bg: '#f0fdf4', // green-50
      text: '#14532d', // green-900
      accent: '#ea580c' // orange-600
    },
    animals: [
      {
        id: 'gazelle_grass',
        name: '汤氏瞪羚',
        scientificName: 'Eudorcas thomsonii',
        category: '草原超跑',
        description: '侧背带有亮眼浓黑褐色条纹的小型灵动瞪羚。它们迈着天生富有弹性的小细腿，偶尔隔着隔离矮灌木向草坪上正在惬意晒太阳的游客温柔打量。',
        funFact: '为了逃避非洲狂奔王猎豹的追捕，汤氏瞪羚的奔跑轨迹是一连串不可思议的高速“Z”字折返，且跳跃高度可达两米半！',
        diet: '短嫩草尖、落叶',
        conservationStatus: 'NT',
        imageUrl: 'https://cdn.phototourl.com/free/2026-05-26-e6ad9644-dfac-40f0-b9fa-d33d13347912.png',
        behavior: '群居，极易受惊。它们甚至能靠单腿极其灵活地腾空“弹跳起飞”，警戒四周。'
      },
      {
        id: 'lynx_snowy',
        name: '欧亚猞猁',
        scientificName: 'Lynx lynx',
        category: '寒苔潜隐尊者',
        description: '宛如用户上传照片：一头长着耳尖两簇标志性黑流苏软耳毛、粗壮的绒毛梅花掌大脚底盘、神态高冷自若、在薄雪落满树丛中优雅端坐着的斑驳大山猫。高冷而优雅。',
        funFact: '猞猁那只可爱又像流苏天线一样的竖立耳毛，其实是它们精准的声学定向天线，如果把这些耳毛剃掉，它们的听力寻找藏匿耗子旅鼠的精密度将直线下降80%！',
        diet: '雷鸟、雪野兔、小赤鹿',
        conservationStatus: 'LC',
        imageUrl: 'https://cdn.phototourl.com/free/2026-05-26-0466a515-aa0c-47fb-899a-8f020b4cf837.jpg',
        behavior: '高超的伏击手，能在厚达半米的松软雪地上像凌波微步一般奔跑，由于脚底像厚实的雪地靴一样，极难陷入雪中。'
      }
    ],
    features: {
      activities: ['落日草地露天交响乐会', '野餐帐篷摄影大赛', '低碳蒲公英风筝放飞点'],
      tips: ['大草坪中央区提供环保草垫租借，享受野餐时请记得使用带有拉链的密闭防风垃圾袋，不要留残渣给贪玩调皮的小瞪羚哦。']
    }
  },
  {
    id: 'arena',
    title: 'Show Arena',
    chineseTitle: '百鸟剧场 · 动物表演场',
    category: '动物表演场·活动专区页',
    description: '扇形露天剧场，环抱层叠的圆形看台，宽敞整洁。头顶是巨幅云系遮阳白篷，周围偶尔飞过几只金黄、绯红的鹦鹉，还有受过自然救治归队的可爱小鹿驻足探脑。',
    details: '国际一流水准动物生态丰容成果展台。全展不含任何强制杂技性或惩罚性驯化动作，旨在向大伙展示野生动物飞翔掠水、寻找地底隐蔽硬壳等天生精湛无比的天赋本领，饱含科普大爱。',
    bannerImage: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1600&h=900&q=80',
    color: {
      primary: '#6d28d9', // violet-700
      bg: '#f5f3ff', // violet-50
      text: '#4c1d95', // violet-900
      accent: '#fbbf24' // amber-400
    },
    animals: [],
    features: {
      activities: ['百鸟飞翔掠水翼风轻拂体验', '海狮智慧拾捡塑料垃圾讲演', '现场最佳观众科普答辩奖'],
      tips: ['表演场演期间在鸟类低空掠过观众头顶时，请不要举起带有亮眼的金属长竹自拍杆或随意挥舞反光纸扇以免碰伤小羽鸟。']
    }
  },
  {
    id: 'science',
    title: 'Science Discovery Hall',
    chineseTitle: '生命奇迹科普厅 · 互动介绍',
    category: '科普展厅·知识介绍页',
    description: '明亮宽敞的现代化室内科普展厅，一面是数米高的巨大通透落地防弹玻璃窗、可以直抵室外葱郁的动物运动区，另一面则是满挂着的生物图文演进、动植物微缩生态展板。环境简约现代，充满学术而温厚的真知氛围。',
    details: '设有多媒体红外肢体交互拼图、神奇动物骸骨高精度3D模型复刻展板、以及自然保护科学VR视界体验区，全方位激发孩子们内心深处探索自然的奇思与梦想。',
    bannerImage: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=1600&h=900&q=80',
    color: {
      primary: '#1e3a8a', // blue-900
      bg: '#eff6ff', // blue-50
      text: '#172554', // blue-950
      accent: '#60a5fa' // blue-400
    },
    animals: [], // This is primarily an exhibition hall
    features: {
      activities: ['动物骸骨高精还原拼图', '“谁吃谁”雨林生态食物网连线', '我是金牌保育员VR体验课'],
      tips: ['展厅中央开设有亲子自然工坊，持票儿童可以免费领取一份可降解的废纸树皮浆画板，跟中外科学家合作制作属于自己的“生态鸟巢”！']
    }
  },
  {
    id: 'polar',
    title: 'Polar Exhibition Zone',
    chineseTitle: '极地展区 · 冰雪寒带',
    category: '极地区·栏目页',
    description: '白雪皑皑，极光漫天。在高度模拟北极生境的冰川馆内，晶莹的冰块耸立在蔚蓝的水池旁，纯白的雪鸮歪头打量，让您感受置身纯净极地的极致清爽与生命奇迹。',
    details: '采用特制双向隔温超高强度防裂防雾玻璃与智能制冷保雪系统，全面模拟极地荒原生态。您不仅可以直视雪鸮的高度静默，更能在冰岩间偶遇巡视的珍奇生灵。',
    bannerImage: 'https://images.unsplash.com/photo-1517783999520-f068d7431a60?auto=format&fit=crop&w=1600&h=900&q=80',
    color: {
      primary: '#0284c7', // sky-600
      bg: '#f0f9ff', // sky-50
      text: '#0c4a6e', // sky-900
      accent: '#38bdf8' // sky-400
    },
    animals: [
      {
        id: 'polar_owl',
        name: '极地雪鸮',
        scientificName: 'Bubo scandiacus (Polar)',
        category: '寒地冰霜精灵',
        description: '白若寒雪，有着稀落黑色斑点眼影，一双亮黄色、深具哲思之美的大眼睛。歪头打量世人，温顺可爱中透着高冷灵巧的气质。',
        funFact: '雪鸮的一生多以极地的北极旅鼠为食。为了在寒冷中保持体温，它们的趾部甚至覆盖着极其厚密的白色“雪鞋”足羽，御寒性能达到满分。',
        diet: '极地旅鼠、海地小鼠、小雪鸡',
        conservationStatus: 'VU',
        imageUrl: 'https://cdn.phototourl.com/free/2026-05-26-99070801-8c23-4dd0-a1f0-f1591c07f0a2.jpg',
        behavior: '日夜双行。拥有高达270度的头部极限扭动和精确到厘米级别的双耳定向捕鼠听力。'
      }
    ],
    features: {
      activities: ['极地冷雾环境体验', '雪地足羽足印科学比对', 'AR极地光影秀'],
      tips: ['极地展区温度通常偏低，请在入口处租用轻便保暖连帽风衣，注意冷热温差，有哮喘和寒冷敏感的幼童请控制游园时间哦。']
    }
  },
  {
    id: 'map',
    title: 'Interactive Panorama & Guide',
    chineseTitle: '园区全景图 · 导览联络',
    category: '联系/园区导览页',
    description: '极其规整的微缩俯瞰等高线导览大图。纵横交错的柏油观光道、五彩树冠林区、明确标注的“草原、百鸟、雨林、萌宠”分区一应俱全，点击地标即可轻松呼唤对应的动物区、或者一键提交与资深巡林保育员的一键会商联络，简单现代。',
    details: '不仅提供高精度、高响应的点击切换展示，底部更直通“全能管家联络中心”。预定入园特制班车、求救突发伤情、预约特需家庭无障碍高尔夫车，贴心守候在您身边。',
    bannerImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&h=900&q=80',
    color: {
      primary: '#0f172a', // slate-900
      bg: '#f8fafc', // slate-50
      text: '#0f172a', // slate-900
      accent: '#10b981' // emerald-500
    },
    animals: []
  }
];

export const ZOO_SHOWS: ZooShow[] = [
  {
    id: 'birds_flying',
    time: '10:15',
    title: '林间飞羽：七彩大鹦鹉与猛禽低空秀',
    description: '红蓝绿闪耀的彩虹大金刚鹦鹉成群自观众头顶数人指尖滑过，展示精湛空中急旋和天生野外识图、吃硬坚果的高超逻辑。',
    duration: '25分钟',
    status: 'upcoming'
  },
  {
    id: 'hippo_watermelon',
    time: '11:30',
    title: '巨口吞天：河马大胃王西瓜丰容挑战',
    description: '近距离看千斤之重的河马“圆圆”表演一口爆裂吞下两个完整大冰镇西瓜，现场专家深入剖析其惊人的颌骨自卫退火与消化科学。',
    duration: '15分钟',
    status: 'upcoming'
  },
  {
    id: 'sealion_ranger',
    time: '14:15',
    title: '海洋精灵：无障碍生活环保垃圾分类大师',
    description: '可爱斑点海狮用灵活动作展示将丢入浅水湖的饮料空瓶、废报纸进行完美归类，用趣味横生的游戏传递深海垃圾减塑大爱。',
    duration: '20分钟',
    status: 'upcoming'
  },
  {
    id: 'tiger_enrich',
    time: '16:00',
    title: '林梢逐影：东北虎立体捕食丰容跳跃',
    description: '东北虎“雷霆”舒展矫健身姿，奔跑一跃至高达五米的人造崖壁高处，凭天生利爪取下包裹肉食的多孔椰子球，彰显野性生机。',
    duration: '20分钟',
    status: 'upcoming'
  }
];

export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  {
    id: 'q1',
    question: '为什么雪鸮（Snowy Owl）在冰天雪地的极地地带歪头歪脑的幅度可以高达 270 度？',
    options: [
      '为了显示自己性格超级软萌，博得天敌好感。',
      '因为它们的眼球是管状的无法在眼眶中旋转，必须靠大幅歪头来定位猎物和聚焦视野。',
      '为了甩掉粘附在两眼和耳朵边缘的融熔飞雪。',
      '以此来活动被冻坏的颈椎软骨。'
    ],
    correctIndex: 1,
    explanation: '正解！猫头鹰的眼球是管状的且被巩膜骨环固定在眼眶内，根本无法像人类一样转动眼球，所以上苍赋予了它们不可思议的 14 节颈椎，使它们能旋转高达 270 度进行广角搜寻！'
  },
  {
    id: 'q2',
    question: '川金丝猴（Golden Monkey）那仿佛害羞了的天蓝色脸庞，以及鼻孔极其朝上的“塌塌鼻子”是怎么进化出来的？',
    options: [
      '由于高山缺氧和强紫外线曝晒导致的皮下毛细血管破裂。',
      '为了防止在零下几十度的极寒冰雪风暴中把宝贵的鼻梁前端冻坏。',
      '为了便于在高高挂起的松萝树梢间喝雨露露水。',
      '这是它们向配偶展示家族纯种度、表示爱意的标识。'
    ],
    correctIndex: 1,
    explanation: '正解！在极其寒冷的极高海拔针叶阔叶林中，高耸外露的肉质鼻梁由于没有骨骼支撑极易冻疮，金丝猴退化掉了鼻梁，使朝天鼻孔贴合在脸上，是极其聪明的耐寒进化！'
  },
  {
    id: 'q3',
    question: '河马（Hippopotamus）在炎炎烈日下皮肤上不断渗漏、流淌出的带血红褐色液体究竟是什么？',
    options: [
      '被蚊虫严重叮咬出的微细伤口血滴。',
      '是一种能够天然杀死细菌、防蚊、并且极高强度吸收紫外线的“血色天然防晒霜”。',
      '体内积水太多而排出体外的微量盐类汗血。',
      '在岸边草堆打滚时不慎挂伤的细小抓痕。'
    ],
    correctIndex: 1,
    explanation: '正解！河马皮肤既没有毛发覆盖也极难产生汗腺，但它们会分泌一种由红红棕色酸性粘稠油性物组成的腺体液体，既是长效杀菌抗炎剂，也是极其优异的红外紫外屏障！'
  },
  {
    id: 'q4',
    question: '网纹长颈鹿那极长的舌头，为什么天然呈让人诧异的暗青色（蓝紫色）？',
    options: [
      '经常吃有剧毒的金合欢树叶导致的色素淤沉。',
      '长颈鹿舌头含铁量是普通偶蹄动物的数十倍。',
      '在非洲一天需要伸出上万次，深沉的暗色能抵御强烈日光暴晒防止舌肌冻伤和晒伤。',
      '这样能极其明显地吓跑攀在金合欢刺叶上的致命火蚁。'
    ],
    correctIndex: 2,
    explanation: '正解！长颈鹿在采食高空树叶时，敏感的舌头会长时间袒露在高强度热带艳阳暴晒之下，暗青色的极高黑色素涂层能有效防止舌头发生晒伤而导致溃疡影响进食。'
  }
];
