import type { Narrative } from "@/types/narrative";
import { eastwardCampaignFailsSummary } from "./catalog";

export const eastwardCampaignFails: Narrative = {
  ...eastwardCampaignFailsSummary,
  "lead": "誓师的祭品仍是青牛白马，旗帜下的军队已在远离旧都的西方。大石向将士说，这里不是祖祖辈辈居住的土地。新都已经可以安身，故国却还在誓词里等待收复。",
  "sections": [
    {
      "id": "oath-and-orders",
      "title": "七万骑兵，要怎样穿过沙漠",
      "mode": "history",
      "paragraphs": [
        "《辽史》将东征记于康国元年，常用重建年表将它放在 1134 年。六院司大王萧斡里剌任兵马都元帅，萧查剌阿不为副，耶律燕山任都部署，耶律铁哥任都监，率七万骑东行。这个数字是汉文史书的记载，不应当作已由多种独立军籍证实的精确实数。",
        "誓词先追溯太祖、太宗创业，再批评后代君主沉迷游乐、不问国政，解释自己带部众到朔漠是为了恢复帝业。大石随后另叮嘱斡里剌：赏罚可信，与士卒共甘苦，选择水草立营，估量敌情前进，不要自行招致败亡。恢复故国的激情之外，文本同时写出补给和谨慎。",
        "史书给这支大军的结局只有很短的一句：行万余里无所得，牛马多死，勒兵而还。没有攻城战果，也没有可据的决战场面。远距离骑兵要同时养人、马与运输牲畜，路线水草和补给确实是重大限制；究竟在哪一段、因何天气损失多少，现存记载没有展开。"
      ],
      "sourceIds": [
        "liao30",
        "unesco"
      ],
      "transcripts": [
        {
          "file": "西辽_clean_v1.md",
          "start": 101,
          "end": 104
        }
      ]
    },
    {
      "id": "heaven-and-distance",
      "title": "“皇天弗顺，数也”",
      "mode": "history",
      "paragraphs": [
        "部队回来，大石说：“皇天弗顺，数也！”史家把失败归于天命的感叹留下来。它可以让读者感到复国希望的落空，却不能证明大石在那一刻已经立下永远放弃东归的另一道诏令。西方政权继续经营，东方目标已难实现。",
        "金方对大石的追索也应按年代读。《金史》记天会八年，即 1130 年，派余睹、石家奴、拔离速追击，北方诸部不愿配合，石家奴至兀纳水后返回；余睹又报告大石在和州，金朝向夏询问。它发生在通常所定 1134 年东征之前，不能写成大石刚来打、熙宗因酗酒恼怒便派粘罕对攻的一幕。",
        "金朝后来仍搜集西方情报，1144 年又派粘割韩奴前往招抚。这些是持续的外交与边境关注，不等于金军已经深入虎思斡鲁朵。沙漠与跨度限制双方，但“双方远征同年同时失败”不是这些记录共同证明的事实。"
      ],
      "sourceIds": [
        "liao30",
        "jin121"
      ],
      "transcripts": [
        {
          "file": "西辽_clean_v1.md",
          "start": 105,
          "end": 107
        }
      ],
      "interpretation": "补给约束及复国受挫为基于记载的编辑分析；不虚构大石内心彻底心死或永不东归。"
    }
  ],
  "sources": [
    {
      "id": "liao30",
      "title": "《遼史》卷30",
      "url": "https://zh.wikisource.org/zh-hant/遼史/卷30",
      "note": "亲读大石、塔不烟、夷列、普速完、直鲁古全部纪事及校勘记；西迁段叙事次序和绝对纪年不能直接拼合。"
    },
    {
      "id": "jin121",
      "title": "《金史》卷121",
      "url": "https://zh.wikisource.org/zh-hant/金史/卷121",
      "note": "亲读粘割韩奴全传：1130追索、1144遣使、后来的商人及归附者报告；后裔仍称大石的解释不能略去。"
    },
    {
      "id": "unesco",
      "title": "UNESCO 中亚文明史 IV/1：喀喇汗与契丹两章",
      "url": "https://unesdoc.unesco.org/in/rest/annotationSVC/DownloadWatermarkedAttachment/attach_import_ee5bd446-a11d-4a1a-b6ac-64b945c80037?_=111664engo.pdf",
      "note": "亲读 pp.138—140、238—247，比较卡特万、葛逻禄迁置及不同建国／摄政年表；不把作者对东征动机的猜测当史实。"
    }
  ]
};
