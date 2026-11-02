export type JinCityView = "structure" | "today";
export type JinCityEvidence = "考古遗存" | "历史范围" | "文献复原" | "地名联系";

export const jinCitySources = {
  walls: { title: "北京市文物局：金中都城墙考古成果", url: "https://www.beijing.gov.cn/renwen/sy/whkb/202101/t20210113_2218649.html" },
  research: { title: "中国历史研究院：金中都考古与复原研究", url: "https://hrczh.cass.cn/sxqy/kgx/202502/t20250228_5853285.shtml" },
  gates: { title: "中国社会科学院：消失的金中都", url: "https://www.cass.cn/xueshuchengguo/wenzhexuebulishixuebu/202307/t20230728_5671124.shtml" },
  palace: { title: "北京旅游网：完颜亮兴建金中都", url: "https://mp.visitbeijing.com.cn/a1/48AMJEpi3qr" },
  area: { title: "北京市文物局：金中都城址地下文物埋藏区", url: "https://wwj.beijing.gov.cn/bjww/wwjzzcslm/1737418/1738088/1742743/325905854/index.html" },
  water: { title: "北京市文物局：金元两代水关遗址比较", url: "https://wwj.beijing.gov.cn/bjww/362760/362770/326091358/index.html" },
  lotus: { title: "北京市文物局：历史文化名城保护规划", url: "https://wwj.beijing.gov.cn/bjww/362679/362686/622498/" },
  pond: { title: "首都之窗：旧时天桥的两次改造（金鱼池）", url: "https://www.beijing.gov.cn/renwen/sy/whkb/201907/t20190731_1866670.html" },
  newGate: { title: "北京市文旅局：端礼门基址的新发现", url: "https://whlyj.beijing.gov.cn/zwgk/xwzx/hycz/202504/t20250401_4051244.html" },
} as const;

export type JinCityPlace = {
  id: string;
  view: JinCityView;
  label: string;
  evidence: JinCityEvidence;
  lead: string;
  detail: string;
  boundary: string;
  sources: (keyof typeof jinCitySources)[];
};

export const jinCityPlaces: readonly JinCityPlace[] = [
  { id: "outer", view: "structure", label: "外城与街巷", evidence: "考古遗存", lead: "辽南京的旧城，扩展成新的王朝都城。", detail: "外城包围皇城与宫城。城墙、护城河、马面和沿城道路已有考古实证；旧城里坊与扩建区的开放街巷并存，并非一张整齐棋盘。", boundary: "图中城墙为概括轮廓，不表示每一段都已发掘，也不按实际比例绘制。", sources: ["walls", "research"] },
  { id: "palace", view: "structure", label: "皇城与宫城", evidence: "文献复原", lead: "城中再有城，宫殿组织起都城的中心。", detail: "皇城围绕宫城展开。由南向北进入皇城的宣阳门，再至宫城的应天门，串起宫殿空间。宣阳门属于皇城，不能与外城南面的端礼门混为一门。", boundary: "皇城、宫城的相对层次据研究概括；边界和宫殿尺寸不作精确复原。", sources: ["palace", "research"] },
  { id: "axis", view: "structure", label: "金中都中轴", evidence: "文献复原", lead: "从丰宜门向北，城门、道路与宫殿相连。", detail: "金中都以南北向的城市轴线组织礼仪空间，南端是外城正南门丰宜门，向北贯穿宫廷区，通向北面的通玄门。", boundary: "这条轴线位于今日北京城的西南部。元大都另择东北方向建城，不能把金中都中轴直接画在今日故宫中轴线上。", sources: ["palace", "research"] },
  { id: "water", view: "structure", label: "水系与园林", evidence: "历史范围", lead: "城外的水，流经宫苑，再穿过南城墙。", detail: "莲花池是金中都的重要水源，鱼藻池是宫苑水景的一部分。南城垣水关使城内水流向城外护城河；园林与排水共同构成都城的水生活。", boundary: "蓝线只表示西北来水、宫苑用水与南向出城的关系，不代表已经复原的完整河道。", sources: ["lotus", "pond", "water"] },
  { id: "north", view: "structure", label: "北面四门", evidence: "文献复原", lead: "由西向东：会城、通玄、崇智、光泰。", detail: "北墙比其余三面多一门。《金史》所记十三门包含光泰门；会城门的名称也留在今日北京的地名中。", boundary: "城门顺序与方位可以辨认，图上间距只为阅读。地名沿用不能证明整座城门仍在原处。", sources: ["gates"] },
  { id: "east", view: "structure", label: "东面三门", evidence: "文献复原", lead: "由北向南：施仁、宣曜、阳春。", detail: "东墙三门与南、西两面的三门，共同组成都城对外交通的出入口。辨认这些方位，可以避免把中都城门套进明清北京的城门体系。", boundary: "此处不把三座城门与今天的路口逐一对应。", sources: ["gates"] },
  { id: "south", view: "structure", label: "南面三门", evidence: "考古遗存", lead: "由西向东：端礼、丰宜、景风。", detail: "丰宜门居中；水关在丰宜门与景风门之间。2024年考古发现了端礼门基址，城门位置的认识正在随新发现更新。", boundary: "不能继续沿用“只有会城门可以确定位置”的旧说；图中三门仍只示方位，不提供测绘坐标。", sources: ["gates", "water", "newGate"] },
  { id: "west", view: "structure", label: "西面三门", evidence: "文献复原", lead: "由北向南：彰义、颢华、丽泽。", detail: "丽泽是西墙偏南的城门名，今天的丽泽地名使这段城市记忆仍然可辨。城墙遗迹则提供了另一种更直接的证据。", boundary: "今丽泽桥、丽泽路或商务区的范围，都不能直接当作古代丽泽门的门址。", sources: ["gates", "walls"] },
  { id: "guangan", view: "today", label: "广安门与西南二环", evidence: "历史范围", lead: "寻找金中都，要把目光移向今天北京的西南。", detail: "广安门内外及西南二环周边，是理解金中都城址的现代参照。文物部门划定的丰台区金中都埋藏区，东界为西南二环路、北界为丽泽路。", boundary: "这只是丰台区公布的一处地下文物埋藏区，不是金中都全城范围；西南二环也不等于金中都城墙。", sources: ["area", "research"] },
  { id: "lize", view: "today", label: "丽泽与城墙遗址", evidence: "考古遗存", lead: "城市记忆不只留在名字里，也留在夯土里。", detail: "凤凰嘴、万泉寺与高楼村一带保存了金中都南、西城墙的遗迹。2019—2020年的发掘进一步辨明城墙与护城河、道路的关系。", boundary: "“丽泽”是今天辨认这一片区域的线索；已发现的城墙遗迹，并不等于找到了丽泽门。", sources: ["walls", "area"] },
  { id: "shuiguan", view: "today", label: "水关与凉水河", evidence: "考古遗存", lead: "一处城墙下的水关，把古今水系联系起来。", detail: "右安门外发现的金中都南城垣水关，位于今凉水河以北约50米。遗址显示水从北向南穿出城墙，是确认都城南部水系的重要实物。", boundary: "水关是发掘遗址；图中凉水河只作方位参照，不把今天的全部河道等同于金代护城河。", sources: ["water"] },
  { id: "lianhua", view: "today", label: "莲花池", evidence: "历史范围", lead: "先看水源，再理解都城为什么在这里。", detail: "莲花池是金中都开发利用的重要水源地。由城外西北方向供水的关系，让它成为理解宫苑和城市选址的一条线索。", boundary: "今天的公园水岸经历整治，不能将现有湖岸直接作为金代水面边界。", sources: ["lotus", "research"] },
  { id: "yuzao", view: "today", label: "鱼藻池", evidence: "历史范围", lead: "白纸坊桥西北一带，还能追问宫苑的旧迹。", detail: "金中都鱼藻池与太液池的历史记忆，联系着今白纸坊桥西北一带。它与天桥附近后来称作“金鱼池”的水域，是两处不同的地方。", boundary: "图上标的是历史园林的大致方位，不表示恢复了金代池岸，也不代表遗址当前可入内参观。", sources: ["gates", "pond", "area"] },
  { id: "jingfeng", view: "today", label: "景风门站", evidence: "地名联系", lead: "乘车经过的站名，也可以成为认识金中都的入口。", detail: "景风门站重新使用了金中都南面城门的名称。它把一座已经消失的都城带回日常生活，但站名不能当作城门遗址的精确坐标。", boundary: "地名联系与考古确认是不同的证据；查找古门址时仍需结合考古资料。", sources: ["newGate"] },
];

export const jinCityEvents = [
  { year: 1153, id: "jin-moves-zhongdu", title: "迁都燕京，改为中都" },
  { year: 1214, id: "jin-moves-kaifeng", title: "金廷迁都汴京" },
  { year: 1215, id: "jin-zhongdu-falls", title: "中都陷落" },
] as const;
