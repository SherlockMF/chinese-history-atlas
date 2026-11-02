import type { HistorySeriesConfig } from "@/types/series";
import { easternJinConfig, jinSixteenConfig, westernJinConfig } from "../jin-sixteen-kingdoms/config";

export const expansionConfigs: HistorySeriesConfig[] = [
  {
    id: "northern-wei", slug: "northern-wei", title: "北魏", subtitle: "从盛乐到洛阳，一个王朝的重塑与分裂",
    timelineMinYear: 386, timelineMaxYear: 534, defaultYear: 494, mapMode: "snapshot",
    featuredPersonId: "yuan-hong", featuredEventId: "wei-moves-luoyang", relatedSiteIds: ["sima-jinlong"],
    trackIds: ["wei-rise", "wei-reform", "wei-crisis", "wei-transition"],
    tracks: [{ id: "wei-rise", label: "拓跋建国", description: "从代北崛起到统一北方" }, { id: "wei-reform", label: "太和改革", description: "制度与都城的重塑" }, { id: "wei-crisis", label: "动乱与分裂", description: "北镇危机和权力转移" }, { id: "wei-transition", label: "东西分裂", description: "通往北齐与北周" }],
  },
  {
    id: "liao", slug: "liao", title: "辽与西辽", subtitle: "从契丹八部到澶渊之盟，再向中亚西行",
    timelineMinYear: 907, timelineMaxYear: 1218, defaultYear: 1005, mapMode: "snapshot",
    featuredPersonId: "xiao-yanyan", featuredEventId: "liao-chanyuan-treaty", relatedSiteIds: ["yelu-yuzhi"],
    trackIds: ["liao-north", "liao-song-peace", "liao-decline", "western-liao"],
    tracks: [{ id: "liao-north", label: "契丹崛起", description: "建国与南下" }, { id: "liao-song-peace", label: "宋辽之间", description: "战争、盟约与长期交往" }, { id: "liao-decline", label: "辽末危机", description: "宫廷冲突与女真兴起" }, { id: "western-liao", label: "西辽", description: "耶律大石与中亚" }],
  },
  {
    id: "jin", slug: "jin", title: "金与金中都", subtitle: "从女真建国到中都繁华，再到蔡州终局",
    cityOverlayId: "jin",
    timelineMinYear: 1114, timelineMaxYear: 1234, defaultYear: 1153, mapMode: "snapshot",
    featuredPersonId: "wanyan-liang", featuredEventId: "jin-moves-zhongdu", relatedSiteIds: ["fangshan-jinling"],
    trackIds: ["jin-rise", "jin-zhongdu", "jin-collapse"],
    tracks: [{ id: "jin-rise", label: "女真建国", description: "反辽与南下" }, { id: "jin-zhongdu", label: "中都时代", description: "迁都、和战与治理" }, { id: "jin-collapse", label: "蒙古南下", description: "迁汴与金朝灭亡" }],
  },
  {
    id: "western-xia", slug: "western-xia", title: "西夏", subtitle: "党项人的河西王国，制度、和战与存亡",
    timelineMinYear: 982, timelineMaxYear: 1227, defaultYear: 1038, mapMode: "snapshot",
    featuredPersonId: "li-yuanhao", featuredEventId: "xia-founded", relatedSiteIds: [],
    trackIds: ["xia-rise", "xia-court", "xia-collapse"],
    tracks: [{ id: "xia-rise", label: "党项建国", description: "夏州势力与元昊称帝" }, { id: "xia-court", label: "制度与政局", description: "外戚、皇权与成文法" }, { id: "xia-collapse", label: "蒙古战争", description: "夹缝中的最后二十年" }],
  },
  {
    id: "dali", slug: "dali", title: "南诏与大理", subtitle: "苍山洱海之间，走出武侠叙事的西南历史",
    timelineMinYear: 738, timelineMaxYear: 1253, defaultYear: 937, mapMode: "snapshot",
    featuredPersonId: "duan-siping", featuredEventId: "dali-founded", relatedSiteIds: [],
    trackIds: ["nanzhao-rise", "nanzhao-transition", "dali-kingdom"],
    tracks: [{ id: "nanzhao-rise", label: "南诏与唐蕃", description: "六诏统一与外交转折" }, { id: "nanzhao-transition", label: "王朝更替", description: "南诏末期与段氏建国" }, { id: "dali-kingdom", label: "大理国", description: "段氏、高氏与蒙古南下" }],
  },
  {
    id: "southern-dynasties", slug: "southern-dynasties", title: "南朝 · 宋齐梁陈", subtitle: "以建康为中心，看江南四朝的兴替与北望",
    timelineMinYear: 420, timelineMaxYear: 589, defaultYear: 548, mapMode: "snapshot",
    featuredPersonId: "xiao-yan", featuredEventId: "hou-jing-rebellion", relatedSiteIds: [],
    trackIds: ["southern-song", "southern-qi", "southern-liang", "southern-chen", "sui-unification"],
    tracks: [{ id: "southern-song", label: "刘宋", description: "开国、北伐与宗室纷争" }, { id: "southern-qi", label: "南齐", description: "萧氏代宋与继承危机" }, { id: "southern-liang", label: "南梁", description: "繁盛与侯景之乱" }, { id: "southern-chen", label: "南陈", description: "江南重建与最后北伐" }, { id: "sui-unification", label: "隋统一", description: "建康失守与南朝结束" }],
  },
  jinSixteenConfig,
  westernJinConfig,
  easternJinConfig,
];

export function expansionConfig(id: string) {
  const config = expansionConfigs.find(item => item.id === id);
  if (!config) throw new Error(`Unknown expansion series: ${id}`);
  return config;
}
