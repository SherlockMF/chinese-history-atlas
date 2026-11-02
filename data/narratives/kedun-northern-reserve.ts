import type { Narrative } from "@/types/narrative";
import { kedunNorthernReserveSummary } from "./catalog";

export const kedunNorthernReserve: Narrative = {
  ...kedunNorthernReserveSummary,
  "lead": "中京、燕京相继失去之后，向北逃走看似离故国更远。可敦城却有另一套家底：辽朝过去为西北边防经营的驻军、宫卫与部族，未与五京同时瓦解。大石要做的，是把这些分散的力量重新说服到一起。",
  "sections": [
    {
      "id": "old-garrison",
      "title": "城不是临时找到的避难所",
      "mode": "history",
      "paragraphs": [
        "可敦城通常定位于今蒙古国鄂尔浑河一带，不在内蒙古西部。《辽史》地理志称镇州“本古可敦城”，1004 年皇太妃奏置，抽选诸部二万余骑作屯军，并安置渤海、女真、汉人流配之家七百余户。镇、防、维三州的军民，兼有守边与生产的职责。",
        "最特别的是命令：凡有征讨，不得抽移。西北诸部反复叛服，驻兵如此遥远，往返与补给都要付出代价；辽臣萧韩家奴曾批评筑可敦后徭役加重、急警难救。帝国的边防资产，背后同样是民户长期承担的负担。"
      ],
      "sourceIds": [
        "liao37",
        "liao103",
        "unesco"
      ],
      "transcripts": [
        {
          "file": "西辽_clean_v1.md",
          "start": 23,
          "end": 25
        },
        {
          "file": "西辽_clean_v1.md",
          "start": 37,
          "end": 39
        },
        {
          "file": "辽05_clean_v1.md",
          "start": 187,
          "end": 188
        }
      ]
    },
    {
      "id": "palace-and-princess",
      "title": "永兴宫的军队，也跟随过一位女性",
      "mode": "history",
      "paragraphs": [
        "太宗的国阿辇斡鲁朵，又称永兴宫。宫卫拥有附属州县、户口和骑军；皇帝死后奉护陵寝，遇征调则丁壮出兵。它不是一群只听某个王子私人命令的家丁。穆宗与景宗相继在位时，太宗一系宗王及其婚姻，仍在政治中占有位置。",
        "宫卫背后还有一段皇位更替的故事。罨撒葛是太宗之子、穆宗同母弟；969 年景宗即位，他逃往沙沱。《辽史》皇子表说他因惧而逃，后来被召还、释罪；景宗本纪记他当年三月入朝，四月进封齐王。972 年去世后，又追赠皇太叔。从逃走到重新入朝，优待宗王也是新君处理旧有力量的一种方式；史书没有说这是用一场私下对白换回整支宫卫。",
        "《契丹国志》后妃传说，萧绰有两位姐姐，长姐嫁齐王，丈夫死后自称齐妃、领兵屯西边。这个姊妹关系使宫廷婚姻和边防连在一起。它还讲述齐妃与番奴相爱、获准结婚而后图谋出奔的波折；这是宋人所记另一层宫廷故事，不能把其中三万兵与地理志二万余屯军直接混作同一数字。",
        "994 年，圣宗命皇太妃领乌古等部兵与永兴宫军，撫定西边，萧挞凛督军事；997 年又记太妃献西边捷。边防建设确实有皇太妃的参与。但“可敦”可作女性贵族称号，地理志又明说古城；不能因为这次经营，就断定城名始创于齐妃，或把二万余骑都算成她丈夫留下的一支军队。"
      ],
      "sourceIds": [
        "liao31",
        "liao13",
        "liao37",
        "liao8",
        "liao64",
        "qidan13"
      ],
      "transcripts": [
        {
          "file": "西辽_clean_v1.md",
          "start": 26,
          "end": 38
        }
      ],
      "interpretation": "罨撒葛逃返、封齐王和追赠据《辽史》；齐妃姊妹与婚姻叙事另据《契丹国志》。两书的称号、驻军数字分开使用，不补召还拟对白或认定带走全部永兴宫军。"
    },
    {
      "id": "seven-eighteen",
      "title": "七州十八部，先把人与马重新聚起来",
      "mode": "history",
      "paragraphs": [
        "《辽史》大石传记他北行，获白达达首领赠马四百、驼二十、羊若干，再至可敦召集七州、十八部首领。他以祖先创业与天祚受辱号召共济艰难，所得精兵万余，随后整器甲、立官属。列传留下的演说，是恢复合法性与组织联盟的政治语言。",
        "这些首领在边远地区生活，并不意味着他们对朝廷失败毫无所知。愿意继续效忠，可能牵涉旧有名分、地方力量和新的安全安排。原有驻军二万余骑与大石此时所得万余精兵，是不同时间、不同口径，不能相加成一个毫无损耗的固定军团。"
      ],
      "sourceIds": [
        "liao30",
        "jin3"
      ],
      "transcripts": [
        {
          "file": "西辽_clean_v1.md",
          "start": 39,
          "end": 41
        },
        {
          "file": "辽05_clean_v1.md",
          "start": 188,
          "end": 188
        }
      ]
    },
    {
      "id": "failed-allies",
      "title": "故国的旗号，也需要新的落脚地",
      "mode": "history",
      "paragraphs": [
        "大石继续沿用辽的名分，希望联合周边力量恢复旧境；宋与西夏的动向，却不会只围绕这一愿望。西夏逐步向金称臣，宋金争盟、金军南侵又改变了北方秩序。与旧友联系的机会，随着形势迅速缩小。",
        "可敦能让他重建指挥，却不能无期限解决人口、牲畜与疆土的需求。大石最终向西寻找新的资源；其复辽口号与建立新政权的行动可以同时存在，不宜把后来成功倒写为他最初已画好的一张地图。"
      ],
      "sourceIds": [
        "liao30",
        "jin3",
        "unesco"
      ],
      "transcripts": [
        {
          "file": "西辽_clean_v1.md",
          "start": 42,
          "end": 45
        },
        {
          "file": "辽05_clean_v1.md",
          "start": 189,
          "end": 189
        }
      ],
      "interpretation": "联系宋夏及复辽目标的政治背景承接；具体出使名单、使期未核，未造往返对白。"
    }
  ],
  "sources": [
    {
      "id": "liao37",
      "title": "《遼史》卷37",
      "url": "https://zh.wikisource.org/zh-hant/遼史/卷37",
      "note": "镇州古可敦城、1004设州、屯军与流户。"
    },
    {
      "id": "liao31",
      "title": "《遼史》卷31",
      "url": "https://zh.wikisource.org/zh-hant/遼史/卷31",
      "note": "国阿辇斡鲁朵即太宗永兴宫及宫卫军户。"
    },
    {
      "id": "liao13",
      "title": "《遼史》卷13",
      "url": "https://zh.wikisource.org/zh-hant/遼史/卷13",
      "note": "994皇太妃领乌古与永兴宫军、997献捷。"
    },
    {
      "id": "liao103",
      "title": "《遼史》卷103",
      "url": "https://zh.wikisource.org/zh-hant/遼史/卷103",
      "note": "萧韩家奴论西戍代价、可敦徭役与遥远救援。"
    },
    {
      "id": "liao30",
      "title": "《遼史》卷30",
      "url": "https://zh.wikisource.org/zh-hant/遼史/卷30",
      "note": "大石赠马、可敦会盟、七州十八部与精兵万余。"
    },
    {
      "id": "jin3",
      "title": "《金史》卷3",
      "url": "https://zh.wikisource.org/zh-hant/金史/卷3",
      "note": "大石自王、官属万马及夏金关系。"
    },
    {
      "id": "unesco",
      "title": "D. Sinor：《The Kitan and the Kara Khitay》，UNESCO 中亚文明史 IV/1",
      "url": "https://unesdoc.unesco.org/in/rest/annotationSVC/DownloadWatermarkedAttachment/attach_import_ee5bd446-a11d-4a1a-b6ac-64b945c80037?_=111664engo.pdf",
      "note": "亲读 pp.232—248 的相关部分；早期西征路线与年表仅属重建，作者明确提示汉文与穆斯林史源互有冲突。"
    },
    {
      "id": "liao8",
      "title": "《遼史》卷8",
      "url": "https://zh.wikisource.org/zh-hant/遼史/卷8",
      "note": "969罨撒葛逃亡、入朝进齐王，972薨与追赠皇太叔。"
    },
    {
      "id": "liao64",
      "title": "《遼史》卷64",
      "url": "https://zh.wikisource.org/zh-hant/遼史/卷64",
      "note": "太宗诸子、穆宗同母弟；景宗即位后因惧逃、召还释罪。"
    },
    {
      "id": "qidan13",
      "title": "《契丹國志》卷十三",
      "url": "https://zh.wikisource.org/zh-hant/契丹國志/卷十三",
      "note": "景宗后两位姐姐、长姐嫁齐王，以及齐妃领兵和婚姻叙事；与辽本纪分层使用。"
    }
  ]
};
