import { jinSixteenPortraits } from "./series/jin-sixteen-kingdoms/portraits";

export type PersonPortraitData = {
  src: string;
  width: number;
  height: number;
  note: string;
} & (
  | { kind: "referenced"; source: { title: string; url: string } }
  | { kind: "imagined" }
);

export const portraits: Record<string, PersonPortraitData> = {
  ...jinSixteenPortraits,
  "chen-bozong": {
    "src": "/portraits/series/chen-bozong.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "传阎立本《历代帝王图》陈废帝局部（波士顿美术博物馆藏）",
      "url": "https://commons.wikimedia.org/wiki/File:Chen_Feidi_Tang.jpg"
    },
    "note": "依据传世肖像重新创作；画中约17岁，年龄、光影与部分细节为艺术处理。"
  },
  "chen-qian": {
    "src": "/portraits/series/chen-qian.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "传阎立本《历代帝王图》陈文帝局部（波士顿美术博物馆藏）",
      "url": "https://commons.wikimedia.org/wiki/File:Chen_Wendi_Tang.jpg"
    },
    "note": "依据传世肖像重新创作；画中约45岁，年龄、光影与部分细节为艺术处理。"
  },
  "chen-shujian": {
    "src": "/portraits/series/chen-shujian.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约40岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。本图为程序绘制的原创扁平风插画，非 AI 生成。"
  },
  "chen-shuling": {
    "src": "/portraits/series/chen-shuling.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约50岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。本图为程序绘制的原创扁平风插画，非 AI 生成。"
  },
  "wang-sengbian": {
    "src": "/portraits/series/wang-sengbian.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约45岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。本图为程序绘制的原创扁平风插画，非 AI 生成。"
  },
  "wu-mingche": {
    "src": "/portraits/series/wu-mingche.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约55岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。本图为程序绘制的原创扁平风插画，非 AI 生成。"
  },
  "xiao-gang": {
    "src": "/portraits/series/xiao-gang.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约45岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。本图为程序绘制的原创扁平风插画，非 AI 生成。"
  },
  "xiao-mohe": {
    "src": "/portraits/series/xiao-mohe.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约40岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。本图为程序绘制的原创扁平风插画，非 AI 生成。"
  },
  "yang-kan": {
    "src": "/portraits/series/yang-kan.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约45岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。本图为程序绘制的原创扁平风插画，非 AI 生成。"
  },
  "zhang-lihua": {
    "src": "/portraits/series/zhang-lihua.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约28岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。本图为程序绘制的原创扁平风插画，非 AI 生成。"
  },
  "an-chonghui": {
    "src": "/portraits/series/an-chonghui.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约50岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "cao-bin": {
    "src": "/portraits/series/cao-bin.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "《三才图会》曹彬绣像（1609年）",
      "url": "https://commons.wikimedia.org/wiki/File:Cao_Bin_scth.jpg"
    },
    "note": "依据传世肖像重新创作；画中约45岁，年龄、光影与部分细节为艺术处理。"
  },
  "chai-rong": {
    "src": "/portraits/series/chai-rong.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "清人绘柴荣像（《中国历代名人画像谱》）",
      "url": "https://commons.wikimedia.org/wiki/File:Chai_Rong_(Zhou_Shizong).jpg"
    },
    "note": "依据传世肖像重新创作；画中约35岁，年龄、光影与部分细节为艺术处理。"
  },
  "chen-baxian": {
    "src": "/portraits/series/chen-baxian.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约53岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "chen-shubao": {
    "src": "/portraits/series/chen-shubao.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "传阎立本《历代帝王图》陈后主局部",
      "url": "https://commons.wikimedia.org/wiki/File:Chen_Shubao.jpg"
    },
    "note": "依据传世肖像重新创作；画中约35岁，年龄、光影与部分细节为艺术处理。"
  },
  "chen-xu": {
    "src": "/portraits/series/chen-xu.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约43岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "du-chongwei": {
    "src": "/portraits/series/du-chongwei.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约50岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "duan-siping": {
    "src": "/portraits/series/duan-siping.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约43岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "duan-xingzhi": {
    "src": "/portraits/series/duan-xingzhi.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约30岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "duan-zhengchun": {
    "src": "/portraits/series/duan-zhengchun.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约43岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "empress-dugu": {
    "src": "/portraits/series/empress-dugu.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约50岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "empress-feng-wei": {
    "src": "/portraits/series/empress-feng-wei.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约43岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "erzhu-rong": {
    "src": "/portraits/series/erzhu-rong.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约35岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "fan-zhi": {
    "src": "/portraits/series/fan-zhi.webp",
    "width": 1086,
    "height": 1449,
    "kind": "imagined",
    "note": "画中约48岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "feng-dao": {
    "src": "/portraits/series/feng-dao.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "金古良《无双谱》冯道绣像（1694年）",
      "url": "https://commons.wikimedia.org/wiki/File:Feng_Dao%2C_WuShuangPu_(1694%2C_1996).jpg"
    },
    "note": "依据传世肖像重新创作；画中约65岁，年龄、光影与部分细节为艺术处理。"
  },
  "gao-baorong": {
    "src": "/portraits/series/gao-baorong.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约35岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "gao-huan": {
    "src": "/portraits/series/gao-huan.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "《北史演义》高欢绣像（1793年，后世小说插图）",
      "url": "https://commons.wikimedia.org/wiki/File:%E6%B8%A4%E6%B5%B7%E7%8E%8B%E9%AB%98%E6%AD%A1%EF%BC%88%E5%8C%97%E5%8F%B2%E6%BC%94%E7%BE%A9%EF%BC%89.jpg"
    },
    "note": "依据传世肖像重新创作；画中约48岁，年龄、光影与部分细节为艺术处理。参考为后世小说绣像，不作为真实容貌依据。"
  },
  "gao-jixing": {
    "src": "/portraits/series/gao-jixing.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约60岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "gao-shengtai": {
    "src": "/portraits/series/gao-shengtai.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约48岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "gao-wei": {
    "src": "/portraits/series/gao-wei.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约20岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "gao-yang": {
    "src": "/portraits/series/gao-yang.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约28岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "geluofeng": {
    "src": "/portraits/series/geluofeng.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约47岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "guo-chongtao": {
    "src": "/portraits/series/guo-chongtao.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约50岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "guo-wei": {
    "src": "/portraits/series/guo-wei.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "清人绘郭威像（《中国历代名人画像谱》）",
      "url": "https://commons.wikimedia.org/wiki/File:Guo_Wei_(Zhou_Taizu).jpg"
    },
    "note": "依据传世肖像重新创作；画中约48岁，年龄、光影与部分细节为艺术处理。"
  },
  "han-derang": {
    "src": "/portraits/series/han-derang.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约58岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "hou-jing": {
    "src": "/portraits/series/hou-jing.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约45岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "huang-chao": {
    "src": "/portraits/series/huang-chao.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "《残唐五代史演义传》黄巢绣像（后世小说插图）",
      "url": "https://commons.wikimedia.org/wiki/File:%E9%BB%83%E5%B7%A2%EF%BC%88%E6%AE%98%E5%94%90%E4%BA%94%E4%BB%A3%E5%8F%B2%E6%BC%94%E7%BE%A9%E5%82%B3%EF%BC%89.jpg"
    },
    "note": "依据传世肖像重新创作；画中约50岁，年龄、光影与部分细节为艺术处理。参考为后世小说绣像，不作为真实容貌依据。"
  },
  "jing-xiang": {
    "src": "/portraits/series/jing-xiang.webp",
    "width": 1086,
    "height": 1449,
    "kind": "imagined",
    "note": "画中约55岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "jing-yanguang": {
    "src": "/portraits/series/jing-yanguang.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约50岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "kublai": {
    "src": "/portraits/series/kublai.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约38岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "kuchlug": {
    "src": "/portraits/series/kuchlug.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约35岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "li-anquan": {
    "src": "/portraits/series/li-anquan.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约40岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "li-bian": {
    "src": "/portraits/series/li-bian.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约50岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "li-bingchang": {
    "src": "/portraits/series/li-bingchang.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约23岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "li-chong-wei": {
    "src": "/portraits/series/li-chong-wei.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约45岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "li-chuyun": {
    "src": "/portraits/series/li-chuyun.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约43岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "li-congke": {
    "src": "/portraits/series/li-congke.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约48岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "li-cunxu": {
    "src": "/portraits/series/li-cunxu.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "明代绘李存勖像（台北故宫博物院藏）",
      "url": "https://commons.wikimedia.org/wiki/File:Zhuangzong_of_Later_Tang.jpg"
    },
    "note": "依据传世肖像重新创作；画中约38岁，年龄、光影与部分细节为艺术处理。"
  },
  "li-deming": {
    "src": "/portraits/series/li-deming.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约43岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "li-jing": {
    "src": "/portraits/series/li-jing.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "传周文矩《重屏会棋图》李璟局部",
      "url": "https://commons.wikimedia.org/wiki/File:Li_Jing_of_Southern_Tang.jpg"
    },
    "note": "依据传世肖像重新创作；画中约40岁，年龄、光影与部分细节为艺术处理。"
  },
  "li-jingxun": {
    "src": "/portraits/series/li-jingxun.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "依据史料“年九岁”创作儿童形象；容貌、发式与服饰为艺术想象，不据年龄反推精确出生年，亦不添加公主封号。"
  },
  "li-jiqian": {
    "src": "/portraits/series/li-jiqian.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约35岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "li-keyong": {
    "src": "/portraits/series/li-keyong.webp",
    "width": 1086,
    "height": 1449,
    "kind": "referenced",
    "source": {
      "title": "传世李克用像（Wikimedia Commons 收录）",
      "url": "https://commons.wikimedia.org/wiki/File:Li_Keyong.jpg"
    },
    "note": "依据传世肖像重新创作；画中约45岁，年龄、光影与部分细节为艺术处理。"
  },
  "li-liangzuo": {
    "src": "/portraits/series/li-liangzuo.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约19岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "li-min": {
    "src": "/portraits/series/li-min.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约28岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "li-qianshun": {
    "src": "/portraits/series/li-qianshun.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约39岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "li-renxiao": {
    "src": "/portraits/series/li-renxiao.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约49岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "li-siyuan": {
    "src": "/portraits/series/li-siyuan.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "清刻《绣像南北宋志传》唐明宗绣像（美国国会图书馆藏）",
      "url": "https://commons.wikimedia.org/wiki/File:%E5%94%90%E6%98%8E%E5%AE%97.jpg"
    },
    "note": "依据传世肖像重新创作；画中约60岁，年龄、光影与部分细节为艺术处理。参考为后世小说绣像，不作为真实容貌依据。"
  },
  "li-yu": {
    "src": "/portraits/series/li-yu.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "《三才图会》李煜绣像（1609年）",
      "url": "https://commons.wikimedia.org/wiki/File:Li_Yu_scth.jpg"
    },
    "note": "依据传世肖像重新创作；画中约35岁，年龄、光影与部分细节为艺术处理。"
  },
  "li-yuan": {
    "src": "/portraits/series/li-yuan.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "明代《唐高祖立像》局部（台北故宫博物院藏）",
      "url": "https://commons.wikimedia.org/wiki/File:TangGaozu_(cropped).jpg"
    },
    "note": "依据传世肖像重新创作；画中约52岁，年龄、光影与部分细节为艺术处理。参考为后世唐高祖像，本画衣冠按隋末官员身份作艺术处理。"
  },
  "li-yuanhao": {
    "src": "/portraits/series/li-yuanhao.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约35岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "li-zunxu": {
    "src": "/portraits/series/li-zunxu.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约52岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "liu-chang": {
    "src": "/portraits/series/liu-chang.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约27岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "liu-chengyou": {
    "src": "/portraits/series/liu-chengyou.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约19岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "liu-chong": {
    "src": "/portraits/series/liu-chong.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约55岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "liu-jiyuan": {
    "src": "/portraits/series/liu-jiyuan.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约40岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "liu-shao-song": {
    "src": "/portraits/series/liu-shao-song.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约28岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "liu-yan": {
    "src": "/portraits/series/liu-yan.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约45岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "liu-yilong": {
    "src": "/portraits/series/liu-yilong.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约40岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "liu-yu-song": {
    "src": "/portraits/series/liu-yu-song.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约52岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "liu-zhiyuan": {
    "src": "/portraits/series/liu-zhiyuan.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "清人绘刘知远像（《中国历代名人画像谱》）",
      "url": "https://commons.wikimedia.org/wiki/File:Liu_Zhiyuan_(Han_Gaozu).jpg"
    },
    "note": "依据传世肖像重新创作；画中约50岁，年龄、光影与部分细节为艺术处理。"
  },
  "ma-yin": {
    "src": "/portraits/series/ma-yin.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约60岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "meng-chang": {
    "src": "/portraits/series/meng-chang.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约40岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "meng-zhixiang": {
    "src": "/portraits/series/meng-zhixiang.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约58岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "pan-mei": {
    "src": "/portraits/series/pan-mei.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "《敕赐余姚潘许同宗济美谱牒》潘美像（1887年）",
      "url": "https://commons.wikimedia.org/wiki/File:Panmei_yuyao.jpg"
    },
    "note": "依据传世肖像重新创作；画中约48岁，年龄、光影与部分细节为艺术处理。"
  },
  "piluoge": {
    "src": "/portraits/series/piluoge.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约40岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "qian-chu": {
    "src": "/portraits/series/qian-chu.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "钱俶像（浙江省博物馆藏）；摄影：松照庵，CC BY-SA 4.0",
      "url": "https://commons.wikimedia.org/wiki/File:Portrait_of_Qian_Hongchu_King_Zhongyi_of_Wuyue.jpg"
    },
    "note": "依据传世肖像重新创作；画中约45岁，年龄、光影与部分细节为艺术处理。已对来源照片作原创改绘，本改绘按 CC BY-SA 4.0 提供：https://creativecommons.org/licenses/by-sa/4.0/。"
  },
  "qian-liu": {
    "src": "/portraits/series/qian-liu.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "明摹《吴越国王钱氏祖像轴》（浙江省博物馆藏）",
      "url": "https://commons.wikimedia.org/wiki/File:Qian_Liu_(King_Wusu_of_Wuyue).jpg"
    },
    "note": "依据传世肖像重新创作；画中约65岁，年龄、光影与部分细节为艺术处理。"
  },
  "ren-dejing": {
    "src": "/portraits/series/ren-dejing.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约60岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "sang-weihan": {
    "src": "/portraits/series/sang-weihan.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "清《江苏宜兴梅子境桑氏宗谱》桑维翰像",
      "url": "https://commons.wikimedia.org/wiki/File:%E6%A1%91%E7%B6%AD%E7%BF%B0.jpg"
    },
    "note": "依据传世肖像重新创作；画中约45岁，年龄、光影与部分细节为艺术处理。"
  },
  "shi-chonggui": {
    "src": "/portraits/series/shi-chonggui.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约30岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "shi-jingtang": {
    "src": "/portraits/series/shi-jingtang.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "清人绘石敬瑭像（《中国历代名人画像谱》）",
      "url": "https://commons.wikimedia.org/wiki/File:Shi_Jingtang_(Jin_Gaozu).jpg"
    },
    "note": "依据传世肖像重新创作；画中约45岁，年龄、光影与部分细节为艺术处理。"
  },
  "shulu-ping": {
    "src": "/portraits/series/shulu-ping.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约50岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "tuoba-gui": {
    "src": "/portraits/series/tuoba-gui.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约33岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "tuoba-jun": {
    "src": "/portraits/series/tuoba-jun.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约22岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "tuoba-si": {
    "src": "/portraits/series/tuoba-si.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约28岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "tuoba-tao": {
    "src": "/portraits/series/tuoba-tao.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约39岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "wang-jian": {
    "src": "/portraits/series/wang-jian.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "永陵王建石刻坐像；摄影：Kcx36，CC BY-SA 4.0",
      "url": "https://commons.wikimedia.org/wiki/File:%E6%B0%B8%E9%99%B5%E7%8E%8B%E5%BB%BA%E5%83%8F_2024-05-25_01.jpg"
    },
    "note": "依据传世肖像重新创作；画中约65岁，年龄、光影与部分细节为艺术处理。参考石刻坐像造型；文物人物归属存在不同观点。已对来源照片作原创改绘，本改绘按 CC BY-SA 4.0 提供：https://creativecommons.org/licenses/by-sa/4.0/。"
  },
  "wang-pu": {
    "src": "/portraits/series/wang-pu.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约35岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "wang-shenzhi": {
    "src": "/portraits/series/wang-shenzhi.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "名人像册·王审知（费城艺术博物馆藏）",
      "url": "https://commons.wikimedia.org/wiki/File:Portraits_of_Famous_Men_-_Wang_Shenzhi.jpg"
    },
    "note": "依据传世肖像重新创作；画中约55岁，年龄、光影与部分细节为艺术处理。"
  },
  "wang-yanzhang": {
    "src": "/portraits/series/wang-yanzhang.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "《残唐五代史演义传》王彦章绣像（后世小说插图）",
      "url": "https://commons.wikimedia.org/wiki/File:%E7%8E%8B%E5%BD%A5%E7%AB%A0%EF%BC%88%E6%AE%98%E5%94%90%E4%BA%94%E4%BB%A3%E5%8F%B2%E6%BC%94%E7%BE%A9%E5%82%B3%EF%BC%89.jpg"
    },
    "note": "依据传世肖像重新创作；画中约55岁，年龄、光影与部分细节为艺术处理。参考为后世小说绣像，不作为真实容貌依据。"
  },
  "wanyan-aguda": {
    "src": "/portraits/series/wanyan-aguda.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约48岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "wanyan-dading": {
    "src": "/portraits/series/wanyan-dading.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约49岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "wanyan-jing": {
    "src": "/portraits/series/wanyan-jing.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约33岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "wanyan-liang": {
    "src": "/portraits/series/wanyan-liang.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约34岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "wanyan-shouxu": {
    "src": "/portraits/series/wanyan-shouxu.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约32岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "wanyan-wuqimai": {
    "src": "/portraits/series/wanyan-wuqimai.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约52岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "wanyan-xun": {
    "src": "/portraits/series/wanyan-xun.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约53岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "xiao-daocheng": {
    "src": "/portraits/series/xiao-daocheng.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约50岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "xiao-tabuyan": {
    "src": "/portraits/series/xiao-tabuyan.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约45岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "xiao-yan": {
    "src": "/portraits/series/xiao-yan.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约62岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "xiao-yanyan": {
    "src": "/portraits/series/xiao-yanyan.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约49岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "xiao-yi": {
    "src": "/portraits/series/xiao-yi.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约43岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "xu-wen": {
    "src": "/portraits/series/xu-wen.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约55岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "yang-guang": {
    "src": "/portraits/series/yang-guang.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "传阎立本《历代帝王图》隋炀帝局部（波士顿美术博物馆藏）",
      "url": "https://commons.wikimedia.org/wiki/File:Sui_Yangdi_Tang.jpg"
    },
    "note": "依据传世肖像重新创作；画中约40岁，年龄、光影与部分细节为艺术处理。"
  },
  "yang-jian": {
    "src": "/portraits/series/yang-jian.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "18世纪中国历代帝王画像册·隋文帝（British Library，Commons 收录）",
      "url": "https://commons.wikimedia.org/wiki/File:Emperor_Wen_of_sui.jpeg"
    },
    "note": "依据18世纪后世帝王画像重新创作；画中约50岁，年龄、光影与服饰细节为艺术处理，不作为真实容貌依据。"
  },
  "yang-lihua": {
    "src": "/portraits/series/yang-lihua.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约45岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "yang-xingmi": {
    "src": "/portraits/series/yang-xingmi.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约48岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "yang-xuangan": {
    "src": "/portraits/series/yang-xuangan.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约35岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "yang-yong": {
    "src": "/portraits/series/yang-yong.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约35岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "yelu-abaoji": {
    "src": "/portraits/series/yelu-abaoji.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约48岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "yelu-dashi": {
    "src": "/portraits/series/yelu-dashi.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约48岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "yelu-deguang": {
    "src": "/portraits/series/yelu-deguang.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约40岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "yelu-hongji": {
    "src": "/portraits/series/yelu-hongji.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约52岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "yelu-longxu": {
    "src": "/portraits/series/yelu-longxu.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约36岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "yelu-ruan": {
    "src": "/portraits/series/yelu-ruan.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约30岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "yelu-yanxi": {
    "src": "/portraits/series/yelu-yanxi.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约43岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "yelu-zongzhen": {
    "src": "/portraits/series/yelu-zongzhen.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约35岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "yimouxun": {
    "src": "/portraits/series/yimouxun.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约40岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "yuan-hong": {
    "src": "/portraits/series/yuan-hong.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约28岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "yuwen-eying": {
    "src": "/portraits/series/yuwen-eying.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约28岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "yuwen-hu": {
    "src": "/portraits/series/yuwen-hu.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约53岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "yuwen-huaji": {
    "src": "/portraits/series/yuwen-huaji.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约45岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "yuwen-tai": {
    "src": "/portraits/series/yuwen-tai.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "《北史演义》宇文泰绣像（1793年，后世小说插图）",
      "url": "https://commons.wikimedia.org/wiki/File:%E5%AE%87%E6%96%87%E4%B8%9E%E7%9B%B8%E9%BB%91%E7%8D%BA%EF%BC%88%E5%8C%97%E5%8F%B2%E6%BC%94%E7%BE%A9%EF%BC%89.jpg"
    },
    "note": "依据传世肖像重新创作；画中约48岁，年龄、光影与部分细节为艺术处理。参考为后世小说绣像，不作为真实容貌依据。"
  },
  "yuwen-yong": {
    "src": "/portraits/series/yuwen-yong.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "传阎立本《历代帝王图》北周武帝局部（波士顿美术博物馆藏）",
      "url": "https://commons.wikimedia.org/wiki/File:Yen_Li-pen_001.jpg"
    },
    "note": "依据传世肖像重新创作；画中约33岁，年龄、光影与部分细节为艺术处理。"
  },
  "yuwen-yun": {
    "src": "/portraits/series/yuwen-yun.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约20岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "zhang-hao-jin": {
    "src": "/portraits/series/zhang-hao-jin.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约55岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "zhao-guangyi": {
    "src": "/portraits/series/zhao-guangyi.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "宋太宗像（台北故宫博物院藏）",
      "url": "https://commons.wikimedia.org/wiki/File:Taizong_of_Song.jpg"
    },
    "note": "依据传世肖像重新创作；画中约40岁，年龄、光影与部分细节为艺术处理。"
  },
  "zhao-kuangyin": {
    "src": "/portraits/series/zhao-kuangyin.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "宋太祖坐像（台北故宫博物院藏）",
      "url": "https://commons.wikimedia.org/wiki/File:Song_Taizu.jpg"
    },
    "note": "依据传世肖像重新创作；画中约40岁，年龄、光影与部分细节为艺术处理。"
  },
  "zhao-pu": {
    "src": "/portraits/series/zhao-pu.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "清代绘宋丞相赵普像",
      "url": "https://commons.wikimedia.org/wiki/File:%E5%AE%8B%E4%B8%9E%E7%9B%B8%E8%B5%B5%E6%99%AE.jpg"
    },
    "note": "依据传世肖像重新创作；画中约50岁，年龄、光影与部分细节为艺术处理。"
  },
  "zheng-hui-nanzhao": {
    "src": "/portraits/series/zheng-hui-nanzhao.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约54岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "zheng-maisi": {
    "src": "/portraits/series/zheng-maisi.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约46岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。"
  },
  "zhu-wen": {
    "src": "/portraits/series/zhu-wen.webp",
    "width": 1086,
    "height": 1448,
    "kind": "referenced",
    "source": {
      "title": "清人绘朱温像（《中国历代名人画像谱》）",
      "url": "https://commons.wikimedia.org/wiki/File:Zhu_Wen_(Liang_Taizu).jpg"
    },
    "note": "依据传世肖像重新创作；画中约55岁，年龄、光影与部分细节为艺术处理。"
  },
  "zhu-yougui": {
    "src": "/portraits/series/zhu-yougui.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约30岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  },
  "zhu-youzhen": {
    "src": "/portraits/series/zhu-youzhen.webp",
    "width": 1086,
    "height": 1448,
    "kind": "imagined",
    "note": "画中约30岁，为创作设定；容貌、神态及服饰细节为艺术想象。"
  }
};
