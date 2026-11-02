import type { Narrative } from "@/types/narrative";
import { emilFirstWesternCampaignSummary } from "./catalog";

export const emilFirstWesternCampaign: Narrative = {
  ...emilFirstWesternCampaignSummary,
  "lead": "大石得到高昌国王的宴请，也得到马、驼和羊。通道打开，不等于前方都是欢迎。西方有自己的君主、部族与冲突，一支从辽朝走来的军队，必须重新认识它们。",
  "sections": [
    {
      "id": "new-neighbours",
      "title": "狮子、驼号背后，是两个喀喇汗政治中心",
      "mode": "history",
      "paragraphs": [
        "喀喇汗王朝的伊斯兰化不是唐朝把一群突厥人打走以后立刻发生的结果。11 世纪形成的东西分治，有各自的继承、城邑与部族关系；狮子汗、博格拉汗等称号，也不能简单用作所有时期两国唯一的官名。东部的八剌沙衮与喀什、西部的撒马尔罕等城，比一条整齐的东西界线更能呈现其政治地理。",
        "志费尼记西来契丹人在叶密里河畔筑城，许多突厥人聚来；他写作时仍见遗迹。叶密里在今新疆额敏一带，大石建立城邑，可以集中人口与物资，并不证明一个翰林天生不会游牧。他自己与后来统治集团仍维持骑马、畜牧与猎骑生活。"
      ],
      "sourceIds": [
        "juvaini",
        "unesco",
        "biran"
      ],
      "transcripts": [
        {
          "file": "西辽_clean_v1.md",
          "start": 46,
          "end": 53
        },
        {
          "file": "辽05_clean_v1.md",
          "start": 190,
          "end": 191
        }
      ]
    },
    {
      "id": "uighur-corridor",
      "title": "一封借道书，换来了三日宴饮",
      "mode": "history",
      "paragraphs": [
        "《辽史》保留大石给回鹘王毕勒哥的书：援引太祖与回鹘的旧交，说要西至大食，请其借道。毕勒哥迎至邸，宴三日，并给六百马、一百驼、三千羊。这里的“西至大食”是政治和地理愿景，不能当作一份已经确定攻打某位哈里发的作战命令。",
        "借道合作是一次真实的资源交换。毕勒哥是否暗自打算旁观两强相斗，史书没有替他保留内心独白。对他而言，允许一支新势力过境，与永久无条件臣服也不是完全相同的决定。"
      ],
      "sourceIds": [
        "liao30",
        "unesco"
      ],
      "transcripts": [
        {
          "file": "西辽_clean_v1.md",
          "start": 54,
          "end": 58
        }
      ]
    },
    {
      "id": "first-setback",
      "title": "迎接过他们的人，也把他们的将领交给金",
      "mode": "history",
      "paragraphs": [
        "汉文与中亚史源对早期路线并不一致。研究重建中，一路西辽军在喀什附近遭东喀喇汗军击败，准确年份也有分歧；这场失利提醒大石，辽宋战场上的经验并不能直接换成天山另一侧的胜利。",
        "1131 年九月，《金史》记和州回鹘把大石之党撒八、迪里、突迭交给金廷。这是将领被捕、地方势力转向的硬证据，却不足以还原大石本人遭毕勒哥辱骂、一路追杀的每个动作。大石仍有重新招集当地人口、寻找西部立足点的机会，迁徙并没有就此结束。汉文记载并未从西辽历史中消失；《辽史》与《金史》保存契丹官名和人名，中亚史家再用自己的语言转录，同一人遂可能有不同写法。"
      ],
      "sourceIds": [
        "jin3",
        "unesco",
        "juvaini"
      ],
      "transcripts": [
        {
          "file": "西辽_clean_v1.md",
          "start": 58,
          "end": 62
        },
        {
          "file": "西辽_clean_v1.md",
          "start": 68,
          "end": 68
        }
      ],
      "interpretation": "初次西征失利的日期和路线在研究中歧异；不将节目对白或地形饮食猜测写为已证战报。"
    },
    {
      "id": "eastern-pressure",
      "title": "沙漠不是地图上的一条空白",
      "mode": "history",
      "paragraphs": [
        "金朝仍把大石视为威胁。《金史》粘割韩奴传记 1130 年派余睹、石家奴、拔离速追讨，征兵诸部，诸部不从，石家奴到兀纳水而还；余睹又报告大石在和州，金朝向西夏问询。这条记录说明金方既用兵，也通过邻国搜寻消息。它不足以证明宗翰先围破可敦、再一路追到叶密里的一条完整路线。距离、畜力、向导与粮草，使向西北深入远比地图上追一条箭头困难。",
        "大石西移也不等于他从此与金各守一边、永无复辽之念。后来 1134 年，他还派萧斡里剌等向东出兵，只是未能取得成果。两国的距离限制了战争，不能把这种限制写成一次永久停战条约。"
      ],
      "sourceIds": [
        "liao30",
        "unesco",
        "jin121"
      ],
      "transcripts": [
        {
          "file": "西辽_clean_v1.md",
          "start": 63,
          "end": 68
        }
      ],
      "interpretation": "余睹围攻、宗翰兵数与可敦弃城的单一路线未核定；1134年东征另有明确列传记载。"
    }
  ],
  "sources": [
    {
      "id": "juvaini",
      "title": "志费尼《世界征服者史》，Boyle 英译第一卷",
      "url": "https://archive.org/details/historyoftheworl011691mbp",
      "note": "亲读 pp.354—362（西辽诸汗）及 pp.61—70（屈出律），包括译者校注；成书晚于建国，世系、数量、纪年不能不加校读。"
    },
    {
      "id": "unesco",
      "title": "D. Sinor：《The Kitan and the Kara Khitay》，UNESCO 中亚文明史 IV/1",
      "url": "https://unesdoc.unesco.org/in/rest/annotationSVC/DownloadWatermarkedAttachment/attach_import_ee5bd446-a11d-4a1a-b6ac-64b945c80037?_=111664engo.pdf",
      "note": "亲读 pp.232—248 的相关部分；早期西征路线与年表仅属重建，作者明确提示汉文与穆斯林史源互有冲突。"
    },
    {
      "id": "biran",
      "title": "Michal Biran：Turkishness and Islam among the Qara Khitai（2005）",
      "url": "https://isamveri.org/pdfdrg/D220240/2005/2005_BIRANM.pdf",
      "note": "亲读论文 pp.295—304，区分辽朝典章、游牧身份、属国关系与蒙古时代的融合。"
    },
    {
      "id": "liao30",
      "title": "《遼史》卷30",
      "url": "https://zh.wikisource.org/zh-hant/遼史/卷30",
      "note": "毕勒哥借道、赠物与后来东征。"
    },
    {
      "id": "jin3",
      "title": "《金史》卷3",
      "url": "https://zh.wikisource.org/zh-hant/金史/卷3",
      "note": "1131和州回鹘献撒八、迪里、突迭。"
    },
    {
      "id": "jin121",
      "title": "《金史》卷121",
      "url": "https://zh.wikisource.org/zh-hant/金史/卷121",
      "note": "粘割韩奴传记1130余睹等追讨、诸部不从、石家奴兀纳水返，以及对夏问询；与辽史西行次序分开。"
    }
  ]
};
