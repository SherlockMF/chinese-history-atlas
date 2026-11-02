import type { Narrative } from "@/types/narrative";
import { xiaTongwanCitySummary } from "./catalog";

export const xiaTongwanCity: Narrative = {
  ...xiaTongwanCitySummary,
  "lead": "赫连勃勃把都城叫作统万，想从这里统领天下。天下没有照他的愿望永远归一，白色的城墙却留下来了。几百年后，它成了夏州首领拒绝换防的底气。",
  "sections": [
    {
      "id": "name-and-wall",
      "title": "统万，不只是一个地名",
      "mode": "history",
      "paragraphs": [
        "东晋十六国时期，赫连勃勃建立大夏，选择在朔方水北、黑水之南营建都城。413年起，叱干阿利主持工程，征发岭北各族十万人。城名是勃勃自己赋予的：他要统一天下、君临万邦，便称之为统万。名字先把帝王的愿望刻在了地图上。",
        "遗址如今在陕西靖边红墩界镇白城则村，城墙色白，俗称白城子。遗址公园公布的城体材料为石英砂、黏土、生石灰等混合夯筑，层次规整、致密。残存城垣、隅台和马面，仍能让人看出这不是只留地基的城市。古人的筑城技术和材料，与后来的维修、增建，共同决定了它怎样留到今天。"
      ],
      "sourceIds": [
        "jinshu-130",
        "tongwan-park"
      ],
      "transcripts": [
        {
          "file": "西夏01_clean_v1.md",
          "start": 66,
          "end": 71
        }
      ],
      "interpretation": "游牧与城市不能绝对对立；不把现存所有墙体都断为413年一次完工。"
    },
    {
      "id": "two-tests",
      "title": "锥入城墙，箭射铠甲",
      "mode": "history",
      "paragraphs": [
        "《晋书》写叱干阿利残忍刻暴：蒸土筑城，锥刺入一寸，就杀筑城者，并把死者筑进墙中。勃勃却认为这种作法是忠于自己，继续把工程交给他。坚城的故事，在这部史书里首先是一场施加于工匠的暴力。",
        "兵器另有一道致命的验收。箭射不穿铠甲，杀造弓的人；射穿了，又杀造甲的人。书中随后写百炼钢刀和大夏龙雀的铭文，把名器的光彩与数千工匠被杀并列。无论弓甲谁胜，工匠总有一方要死，这才是记载中令人不寒而栗的地方。"
      ],
      "sourceIds": [
        "jinshu-130"
      ],
      "transcripts": [
        {
          "file": "西夏01_clean_v1.md",
          "start": 72,
          "end": 73
        }
      ],
      "interpretation": "史籍分别记锥验墙、箭验甲，不能混作刀刺墙；记数不是现代工程实测。"
    },
    {
      "id": "city-after-king",
      "title": "另一批人，把旧城变成了自己的城",
      "mode": "history",
      "paragraphs": [
        "大夏王朝消失以后，统万城仍作为夏州治所进入隋唐的政治地图。党项迁居陕北有多次、不同部落的过程，平夏部后来在这里发展。夏州的名称、定难军的治所与李氏的地方权力相连，是西夏国号与早期根据地之间的一条历史线索，不能据此把赫连勃勃的大夏和后来的西夏当成同一个国家。",
        "这座城也并非几百年无人改变的空壳。考古队长邢福来介绍，东城大型夯土建筑压在唐代地层之上，所出陶瓷多属五代、北宋；据此将建筑及东城经营联系于唐末五代定难军。后来的首领不只借用古城，还投入财力扩展自己的治所。933年后唐军围夏州百余日不下，城壁与被袭的粮道一起，让这座城市再次左右了战争。"
      ],
      "sourceIds": [
        "tongwan-interview",
        "xintangshu-221",
        "wudai-40"
      ],
      "transcripts": [
        {
          "file": "西夏01_clean_v1.md",
          "start": 73,
          "end": 77
        },
        {
          "file": "西夏01_clean_v1.md",
          "start": 66,
          "end": 66
        },
        {
          "file": "西夏01_clean_v1.md",
          "start": 69,
          "end": 69
        }
      ],
      "interpretation": "“唐迁置留下必然隐患”为节目回顾性解读；中山国插叙不倒推党项定居。"
    }
  ],
  "sources": [
    {
      "id": "jinshu-130",
      "title": "《晋书》卷130：赫连勃勃载记",
      "url": "https://zh.wikisource.org/wiki/晉書/卷130",
      "note": "实读营城、蒸土锥验、射甲验工和龙雀条；两种验工分叙。"
    },
    {
      "id": "tongwan-park",
      "title": "统万城国家考古遗址公园：遗址风貌",
      "url": "https://tongwanchengyizhi.com/portal/news/detail/id/36.html",
      "note": "实读遗址风貌位置、颜色、材料及夯筑条。"
    },
    {
      "id": "tongwan-interview",
      "title": "邢福来：统万城考古访谈",
      "url": "https://tongwanchengyizhi.com/portal/news/detail/id/28.html",
      "note": "实读2019年采访中的东城地层与营建时代判断；属考古队研究判断。"
    },
    {
      "id": "xintangshu-221",
      "title": "《新唐书》卷221上：党项",
      "url": "https://zh.wikisource.org/wiki/新唐書/卷221上",
      "note": "实读多次迁置和平夏部条。"
    },
    {
      "id": "wudai-40",
      "title": "《新五代史》卷40：李仁福",
      "url": "https://zh.wikisource.org/wiki/新五代史/卷40",
      "note": "实读933年围夏州及城壁、粮运条。"
    }
  ]
};
