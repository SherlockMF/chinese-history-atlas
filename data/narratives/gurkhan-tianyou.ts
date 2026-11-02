import type { Narrative } from "@/types/narrative";
import { gurkhanTianyouSummary } from "./catalog";

export const gurkhanTianyou: Narrative = {
  ...gurkhanTianyouSummary,
  "lead": "新来的人越来越多，王号却不够解释新局面。天佑皇帝、延庆、菊儿汗：这些称呼来自不同政治传统，又被同一个统治者放在一起。西行远离五京，他仍要把自己说成能够承接辽朝的人。",
  "sections": [
    {
      "id": "two-titles",
      "title": "辽朝的皇帝，中亚的菊儿汗",
      "mode": "history",
      "paragraphs": [
        "《辽史》说大石即位，汉名号为天佑皇帝，另一名号写作葛儿罕，通常称菊儿汗，改元延庆；后迁政治中心，改元康国。志费尼把菊儿汗解释为汗中之汗，译者与语言研究也讨论“普遍的汗”等译法。这个名号有跨部族统治的含义，不能据它断言臣民已经全是某一种突厥族群。",
        "两种名号共同服务于统治：皇帝、年号、官属、印信表达辽朝政治延续，汗的称号面对草原与中亚的政治环境。这里有继承，也有选择性的调整；把它理解为完全复制五京制度，或完全改作当地汗国，都漏掉了一半。"
      ],
      "sourceIds": [
        "liao30",
        "juvaini",
        "biran"
      ],
      "transcripts": [
        {
          "file": "西辽_clean_v1.md",
          "start": 69,
          "end": 75
        }
      ]
    },
    {
      "id": "chronology",
      "title": "建国不是只有一次敲锣",
      "mode": "history",
      "paragraphs": [
        "1124 年大石离开天祚、在北方立官聚兵，是政权形成的一个起点；向叶密里及楚河流域移动、采用帝号，则是后续巩固。以 1132 年称帝作为建国标志，是一种常见年表整理，不能与 1124 年起算的西辽历史混成同一天发生的事件。",
        "《辽史》称帝段的甲辰纪年、人物年龄、战役次序存在难题，中亚材料也没有逐年对应的完整记录。这样的缺口，并不取消大石建国这一事实，却让精确到某城某日的加冕场面失去把握。读者可以沿着几个节点看国家怎样成形，而不必相信一次仪式创造了其全部疆域。"
      ],
      "sourceIds": [
        "liao30",
        "unesco"
      ],
      "transcripts": [
        {
          "file": "西辽_clean_v1.md",
          "start": 69,
          "end": 69
        },
        {
          "file": "西辽_clean_v1.md",
          "start": 76,
          "end": 78
        },
        {
          "file": "辽05_clean_v1.md",
          "start": 192,
          "end": 192
        }
      ],
      "interpretation": "1132为常见整理而非无争议的现场纪年；本篇不确定称帝地点为叶密里。"
    },
    {
      "id": "khitai-name",
      "title": "契丹之名，走得比军队更远",
      "mode": "history",
      "paragraphs": [
        "在中亚文献中，这个政权被称作黑契丹，后来中国史家称西辽。统治者保留辽朝传统，不意味着所有外部作者都用同一个国号；“黑”的族名修饰含义也有不同解释，不能单用现代颜色经验来决定。",
        "契丹、Khitai 及其相关形式，早在辽朝与欧亚各地交往中已经传播，西辽又使这个名称在中亚持续活跃。于是一个族名、王朝名，逐渐成为某些语言指称中国的词。它的传播是跨时代、跨语言的过程，既不是仅由西辽一朝发明，也不是所有外国人都如此称呼中国。"
      ],
      "sourceIds": [
        "biran",
        "unesco"
      ],
      "transcripts": [
        {
          "file": "西辽_clean_v1.md",
          "start": 73,
          "end": 74
        },
        {
          "file": "西辽_clean_v1.md",
          "start": 76,
          "end": 79
        }
      ]
    }
  ],
  "sources": [
    {
      "id": "liao30",
      "title": "《遼史》卷30",
      "url": "https://zh.wikisource.org/zh-hant/遼史/卷30",
      "note": "汉、契丹双名号、延庆康国及纪年次序问题。"
    },
    {
      "id": "juvaini",
      "title": "志费尼《世界征服者史》，Boyle 英译第一卷",
      "url": "https://archive.org/details/historyoftheworl011691mbp",
      "note": "亲读 pp.354—362（西辽诸汗）及 pp.61—70（屈出律），包括译者校注；成书晚于建国，世系、数量、纪年不能不加校读。"
    },
    {
      "id": "biran",
      "title": "Michal Biran：Turkishness and Islam among the Qara Khitai（2005）",
      "url": "https://isamveri.org/pdfdrg/D220240/2005/2005_BIRANM.pdf",
      "note": "亲读论文 pp.295—304，区分辽朝典章、游牧身份、属国关系与蒙古时代的融合。"
    },
    {
      "id": "unesco",
      "title": "D. Sinor：《The Kitan and the Kara Khitay》，UNESCO 中亚文明史 IV/1",
      "url": "https://unesdoc.unesco.org/in/rest/annotationSVC/DownloadWatermarkedAttachment/attach_import_ee5bd446-a11d-4a1a-b6ac-64b945c80037?_=111664engo.pdf",
      "note": "亲读 pp.232—248 的相关部分；早期西征路线与年表仅属重建，作者明确提示汉文与穆斯林史源互有冲突。"
    }
  ]
};
