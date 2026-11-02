import type { Narrative } from "@/types/narrative";
import { daliYangRevoltGaoReturnSummary } from "./catalog";

export const daliYangRevoltGaoReturn: Narrative = {
  ...daliYangRevoltGaoReturnSummary,
  "lead": "杨义贞弑君后只维持短暂统治，高氏父子平乱，却没有把政权交回一条安稳的继承轨道。十四年间，寿辉、正明、高升泰接连坐上王位；高氏最终还政段氏，仍掌着王国的权力。",
  "sections": [
    {
      "id": "revolt",
      "title": "四个月，王位三次换了主人",
      "mode": "history",
      "paragraphs": [
        "思廉退位后，廉义继立。1076年大理向宋入贡，《宋史》留下这次往来的记录。1080年杨义贞杀廉义，自立为帝；君主的死亡打断了原有继承，却没有使杨氏坐稳。",
        "高智升命子高升泰起东方爨、僰兵，讨灭杨义贞，拥廉义之侄寿辉。胡蔚本写篡位仅四月，《滇载记》却写四年；这里沿胡蔚本展开短暂篡立，同时保留异文，不把两书记载拼在一起延长战争。",
        "平乱者既掌握兵力，也掌握选择下一位王的能力。高氏父子仍以段氏名义恢复王统，但这次恢复使他们在王廷中更难替代。"
      ],
      "sourceIds": [
        "local-history",
        "song-488",
        "dianzaiji"
      ],
      "transcripts": [
        {
          "file": "大理（下）_clean_v1.md",
          "start": 114,
          "end": 119
        }
      ],
      "interpretation": "杨义贞与杨允贤的父子关系、亲自无帮手行刺及复仇心理未证，不新增。"
    },
    {
      "id": "abdication",
      "title": "日月晦暗之后，寿辉让位",
      "mode": "history",
      "paragraphs": [
        "寿辉即位后，高智升任布燮，高升泰为鄯阐侯。地方史写“日月交晦，星辰昼见”，寿辉因天变禅位于正明。天象被纳入君主退位的解释，王廷的权力也在这一年重新安排。",
        "1081年正明承位，后来又退为僧。高氏从帮助段氏复位，到自己受禅称王，中间并没有一次突然失去军政力量。君主更替与高氏职位同时看，才会看见权力的持续性。"
      ],
      "sourceIds": [
        "local-history"
      ],
      "transcripts": [
        {
          "file": "大理（下）_clean_v1.md",
          "start": 120,
          "end": 127
        }
      ],
      "interpretation": "寿辉与正明的继位采用地方史所记世系。起兵、拥立和官职任用共同显示高氏权力，现代雇佣兵比喻不能概括这种结构。日月交晦属于史书的天象灾异解释，不支持精神疾病诊断。"
    },
    {
      "id": "middle",
      "title": "两年大中国，后理仍有高国主",
      "mode": "history",
      "paragraphs": [
        "1094年高升泰受禅，改国号大中国；1096年病重时，遗命子高泰明还国于段氏。高泰明遵命，立正明之弟段正淳，后理由此开始。地方书将还政描述成遵守遗言，而非一次已被独立验证的全民起义。",
        "还国号，不等于还尽权力。段正淳为王，高泰明任相国，高泰运为栅主，政令仍多出高氏，国人称“高国主”。一个家族可以不戴王冠，继续掌握决定日常政治的职位。",
        "段正淳时代还有赦役、筑城与赴宋求书。地方史记高泰运求得经籍六十九家、药书六十二部；这使后理的开端不止于王位得失，也通向知识、医药与跨境交流。1108年正淳退位为僧，子和誉继立。"
      ],
      "sourceIds": [
        "local-history",
        "dianzaiji"
      ],
      "transcripts": [
        {
          "file": "大理（下）_clean_v1.md",
          "start": 128,
          "end": 139
        },
        {
          "file": "大理（下）_clean_v1.md",
          "start": 151,
          "end": 151
        }
      ],
      "interpretation": "1094—1096采用胡蔚本，滇载记元符二年异文不沿用；高氏人心归附或段氏众望是地方作者解释，不转作精确民意调查。王族婚姻及“赞妻诗”未核定原典出处，不凭流传文本填入正淳作品。"
    }
  ],
  "sources": [
    {
      "id": "local-history",
      "title": "《增订南诏野史》（胡蔚本）",
      "url": "https://zh.wikisource.org/zh-hans/南詔野史_(胡蔚本)",
      "note": "亲读对应诸王条。晚出的地方编纂，含神异、纪年异文，不能一律等同当时实录。"
    },
    {
      "id": "song-488",
      "title": "《宋史》卷488·大理",
      "url": "https://zh.wikisource.org/zh-hans/宋史/卷488",
      "note": "亲读贡使、段和誉册命、往来路线及高宗时贡马条；宋廷册封不等于宋廷实际统治大理。"
    },
    {
      "id": "dianzaiji",
      "title": "杨慎《滇载记》",
      "url": "https://zh.wikisource.org/zh-hans/滇載記",
      "note": "亲读杨义贞、寿辉、正明、高升泰与正淳条；四年及元符二年与胡蔚本冲突，正文保留材料分层。"
    }
  ]
};
