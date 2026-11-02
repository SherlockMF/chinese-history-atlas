import fs from "node:fs";
import ts from "typescript";

const root = "docs/research/portraits/series";
const jobs = JSON.parse(fs.readFileSync(`${root}/jobs.json`, "utf8"));
const ages = {
  "northern-wei": [28, 33, 28, 39, 22, 43, 45, 35],
  liao: [49, 36, 58, 35, 52, 43, 48, 45, 35],
  jin: [34, 48, 52, 49, 33, 53, 32, 55],
  "western-xia": [35, 35, 43, 19, 23, 39, 49, 60, 40, 52],
  dali: [43, 40, 47, 40, 54, 46, 48, 43, 30, 38],
  "southern-dynasties": [62, 52, 40, 28, 50, 45, 43, 53, 43],
};
const attire = {
  "northern-wei": "北魏五世纪衣冠语汇，结合人物所处的平城或洛阳时期、鲜卑与汉式礼服传统，避免明清制式",
  liao: "十至十二世纪契丹衣饰语汇，圆领窄袖长袍、织锦缘饰与适量皮毛，头饰简洁；汉臣可采用辽代汉官衣冠，不画清代辫发",
  jin: "十二至十三世纪女真金朝衣饰语汇，窄袖袍服和有节制的纹饰，后期皇帝可有汉式礼服元素，不用清代龙袍和辫发",
  "western-xia": "十一至十三世纪党项西夏衣饰语汇，圆领袍服、织锦边缘和朴素束带，参考西夏供养人服饰的一般结构，不作精确复原，不画清代服饰",
  dali: "八至十三世纪云南南诏大理衣饰语汇，地区性的包帛头饰或冠帽、交领织纹袍服；不能套用明清戏服或武侠造型",
  "southern-dynasties": "五至六世纪南朝衣冠语汇，宽袖交领袍与相称的冠帻、层叠领口，材质朴雅，不用唐代以后夸大幞头或明清服饰",
};
const faces = ["修长脸形，眉眼疏朗，神态审慎", "略宽额头，浓眉，坚定眼神", "椭圆脸形，柔和眉弓，神态内敛", "颧骨分明，眉峰明显，沉毅的神态", "较圆的年轻面部，眉眼清朗", "瘦长面庞，细长眉眼，神态克制", "宽阔脸形，眼神温和而专注", "棱角分明的面庞，紧抿双唇，神态警觉"];
const females = new Set(["empress-feng-wei", "xiao-yanyan", "xiao-tabuyan"]);
const colors = ["墨青与米白", "深赭与灰蓝", "灰绿与浅褐", "暗紫与米灰", "墨蓝与低饱和朱砂", "茶褐与淡金"];
const researched = [];
for (const [series, representatives] of Object.entries(ages)) {
  const file = `data/series/expansion/${series}.ts`;
  const source = ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
  let index = 0;
  const visit = (node) => {
    if (ts.isCallExpression(node) && node.expression.getText(source) === "person") {
      const args = node.arguments;
      const id = args[0].text;
      const name = args[1].text;
      const roles = args[3].elements.map((item) => item.text);
      const summary = args[5].text;
      const age = representatives[index++];
      if (!age) throw new Error(`Missing age: ${id}`);
      if (jobs.some((job) => job.id === id)) return;
      const gender = females.has(id) ? "女性，发髻与符合身份的精简冠饰，无胡须" : "男性，髭须与年龄相称";
      const costume = id === "kublai" ? "1253年尚为蒙古宗王的服装：草原窄袖袍、腰带及软帽，不用后来元帝御容的年老形象" : attire[series];
      const prompt = `为历史网站创作${name}独立人物画像。输入图片仅为朱温系列风格样图，参考画法、配色、纸感与构图，勿复制朱温的脸型、胡须、冠帽和红绿衣服组合。本人物未采用传世本人肖像，容貌及服饰细节为艺术想象。身份：${roles.join("、")}。生平依据：${summary}。代表年龄约${age}岁，年龄为艺术设定。${gender}；${faces[(index - 1) % faces.length]}，自然写实人体比例、面部立体光影与年龄感。服饰取${costume}，身份相宜，主色${colors[(index - 1) % colors.length]}，不混用各朝冠帽，不加文字和身份符号。采用已批准样图的统一水彩手绘风格：细腻水彩笔触、淡墨轮廓与纸绢质感，低饱和色调及少量金色，简洁暖纸白背景。竖幅3:4，单人半身胸像，身体略侧而脸朝向观者，完整头饰，面部清晰且适合缩小作头像，无文字、无边框、无水印。`;
      jobs.push({ id, name, representativeAge: age, prompt, reference: null, note: `画中约${age}岁，为创作设定；未采用传世本人肖像，容貌、神态及服饰细节为艺术想象。` });
      researched.push({ id, name, series, roles, summary, sourceFile: file, representativeAge: age, referenceDecision: "本批采用艺术想象；未将现代影视形象或未经核验的网络肖像用作本人参考。" });
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  if (index !== representatives.length) throw new Error(`Person count mismatch: ${series}`);
}
fs.writeFileSync(`${root}/jobs.json`, `${JSON.stringify(jobs, null, 2)}\n`);
fs.writeFileSync(`${root}/expansion-research.json`, `${JSON.stringify(researched, null, 2)}\n`, { flag: "wx" });
console.log(JSON.stringify({ added: researched.length, total: jobs.length }));
