import type { Narrative } from "@/types/narrative";
import { tianzuoCaptivitySummary } from "./catalog";

export const tianzuoCaptivity: Narrative = {
  ...tianzuoCaptivitySummary,
  "lead": "雪落在逃亡的路上。天祚帝没有御寒之物，近侍把貂裘帽让给他，又拿出炒粮与枣；皇帝想睡片刻，侍从便跪坐给他倚靠。曾经供他游猎的广大国土，已经缩成了寻找下一处住处的路。",
  "sections": [
    {
      "id": "last-flight",
      "title": "雪中还留下了马蹄印",
      "mode": "history",
      "paragraphs": [
        "《辽史》记 1125 年天祚遭遇金军，拒收近侍献上的珠帽、换马脱身，缺衣绝粮地奔向天德。一户人家识破了他的偵骑伪装，叩马而哭，仍偷偷收留。此时还有愿意救皇帝的人，却已没有足以保护他的朝廷。二月，完颜娄室等俘获天祚，辽朝在原有疆域上的帝国统治至此终结。",
        "宋金的记录把擒获地点、来归或被获的过程写得不尽相同：金本纪称余睹谷，辽本纪称应州新城东。可以确定的是，被俘、押往金境与降封不是一个瞬间，辽本纪八月才记“至金”、封海滨王。"
      ],
      "sourceIds": [
        "liao30",
        "jin3"
      ],
      "transcripts": [
        {
          "file": "辽05_clean_v1.md",
          "start": 170,
          "end": 172
        },
        {
          "file": "辽05_clean_v1.md",
          "start": 186,
          "end": 186
        }
      ]
    },
    {
      "id": "letter-and-war",
      "title": "皇兄之礼，已经不是兄弟盟约",
      "mode": "history",
      "paragraphs": [
        "《三朝北盟会编》收录《北征纪实》，说宋方以僧人传递绢书，往来后改作诏书，许诺天祚来归可受皇兄之礼，位居燕、越二王之上，提供宅第千间与女乐三百人。这里的“来中国”是宋方自称，女乐是乐伎；礼遇的许诺同时要求来降，旧日两国兄弟的名分已经换成安置亡君的条件。",
        "同卷也保存童贯拒收天祚来归、告知金方藏身处的报功表。彼此相反的文字，不能拼成毫无矛盾的一场密信戏。金方对宋的指责，还包括接纳张觉、收容逃民与土地交割争执；《北盟》卷二十二记宗翰听取叛军报告、窥见宋方虚实后决定入侵。1125 年十月金廷下令伐宋，靖康之变的原因远比一封信复杂。"
      ],
      "sourceIds": [
        "beimeng21",
        "beimeng22",
        "jin3"
      ],
      "transcripts": [
        {
          "file": "辽05_clean_v1.md",
          "start": 172,
          "end": 174
        }
      ]
    },
    {
      "id": "meeting-tradition",
      "title": "“皇天，皇天”：话本留白",
      "mode": "literary-tradition",
      "paragraphs": [
        "《大宋宣和遗事》贞集另有一场令人难忘的相逢：海滨侯耶律延禧与赵氏亡君同住小室，女真人在旁看守。后来延禧执对方的手私语，赵氏亡君拱手加额，连呼“皇天，皇天”，再因告密而被分居。书没有写出私语的内容，留白成了故事最动人的部分。",
        "但此时话本叙述的“帝”是宋钦宗，而不是此前已经写过死亡的徽宗。全书的金朝年号和宋代纪年也多有错乱。这是一则亡国文学中的惺惺相惜，不能据它确认两位皇帝真的在北京说过哪句话。"
      ],
      "sourceIds": [
        "xuanhe"
      ],
      "transcripts": [
        {
          "file": "辽05_clean_v1.md",
          "start": 175,
          "end": 178
        },
        {
          "file": "辽05_clean_v1.md",
          "start": 206,
          "end": 206
        }
      ],
      "interpretation": "耳语本身在话本中也没有正文，不补猜测，不将相逢确认为可考史实。"
    },
    {
      "id": "death-tradition",
      "title": "爱打猎的皇帝，死在怎样的故事里",
      "mode": "literary-tradition",
      "paragraphs": [
        "《辽史》说天祚以病终，年五十四；没有明写病死的具体年。《北盟》所收《茆斋自叙》则说降封后踰年而死。两条记载应保留各自的时间信息。皇统年间改封、归葬，属于身后待遇，并不表示那时还活着。",
        "贞集的另一个结局更残酷：海陵王令耶律延禧与宋钦宗习练、比赛马球，预置胡骑，射杀延禧，钦宗落马后也被害。传世文本把这段写在正隆六年春，即 1161 年，既不符合病终的正史框架，也不是把天祚扮作猎物射杀的现场记录。讲述者可以感受它的报应意味；判断历史，则必须把喜欢一个结局与相信它确曾发生分开。"
      ],
      "sourceIds": [
        "liao30",
        "beimeng21",
        "xuanhe"
      ],
      "transcripts": [
        {
          "file": "辽05_clean_v1.md",
          "start": 179,
          "end": 185
        }
      ],
      "interpretation": "第一段为史载病终，第二段为话本异说；海陵王猎杀及反射数名金军未核得同一原文，未添入。"
    }
  ],
  "sources": [
    {
      "id": "liao30",
      "title": "《遼史》卷30",
      "url": "https://zh.wikisource.org/zh-hant/遼史/卷30",
      "note": "被俘、海滨王、病终年龄及身后归葬。"
    },
    {
      "id": "jin3",
      "title": "《金史》卷3",
      "url": "https://zh.wikisource.org/zh-hant/金史/卷3",
      "note": "1125擒辽主与伐宋诏令。"
    },
    {
      "id": "beimeng21",
      "title": "《三朝北盟會編》卷021",
      "url": "https://zh.wikisource.org/zh-hant/三朝北盟會編/卷021",
      "note": "同卷收北征纪实招纳许诺、童贯表拒收及茆斋自叙踰年死，互有歧异。"
    },
    {
      "id": "beimeng22",
      "title": "《三朝北盟會編》卷022",
      "url": "https://zh.wikisource.org/zh-hant/三朝北盟會編/卷022",
      "note": "宗翰与马扩争土地、张觉及接纳逃民、叛军泄露虚实。"
    },
    {
      "id": "xuanhe",
      "title": "《大宋宣和遗事》贞集",
      "url": "https://zh.wikisource.org/zh-hant/大宋宣和遗事贞集",
      "note": "亲读亡君北徙、同室私语及正隆六年马球遇害段，按话本分层。"
    }
  ]
};
