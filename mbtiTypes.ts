// MBTI类型定义和特点描述
export type MbtiType = 
  | 'INFP' | 'INFJ' | 'ENFP' | 'ENFJ'
  | 'INTJ' | 'INTP' | 'ENTP' | 'ENTJ'
  | 'ISFP' | 'ISTP' | 'ESFP' | 'ESTP'
  | 'ISFJ' | 'ISTJ' | 'ESFJ' | 'ESTJ';

// MBTI类型特点描述
export const mbtiDescriptions: Record<MbtiType, {
  name: string;
  characteristics: string[];
  strengths: string[];
  weaknesses: string[];
}> = {
  INFP: {
    name: "调停者",
    characteristics: ["理想主义", "浪漫", "富有创造力", "内心敏感"],
    strengths: ["富有同理心", "创造力强", "价值观坚定", "有深度"],
    weaknesses: ["过于理想化", "容易受伤", "优柔寡断", "内向"]
  },
  INFJ: {
    name: "提倡者",
    characteristics: ["富有洞察力", "有责任心", "理想主义", "追求意义"],
    strengths: ["有远见", "有同理心", "坚定", "有创造力"],
    weaknesses: ["过于完美主义", "容易倦怠", "难以敞开心扉", "过于理想化"]
  },
  ENFP: {
    name: "竞选者",
    characteristics: ["热情洋溢", "富有想象力", "社交活跃", "灵活多变"],
    strengths: ["热情", "创造力强", "善于沟通", "乐观"],
    weaknesses: ["容易分散注意力", "缺乏耐心", "过于乐观", "容易过度承诺"]
  },
  ENFJ: {
    name: "主人公",
    characteristics: ["富有魅力", "有领导力", "有同理心", "善于沟通"],
    strengths: ["有领导力", "有同理心", "善于沟通", "有责任心"],
    weaknesses: ["过于理想化", "容易过度承诺", "难以拒绝他人", "容易倦怠"]
  },
  INTJ: {
    name: "建筑师",
    characteristics: ["战略思维", "独立", "有远见", "分析型"],
    strengths: ["有远见", "分析能力强", "独立", "果断"],
    weaknesses: ["过于自信", "缺乏耐心", "不善于表达情感", "过于挑剔"]
  },
  INTP: {
    name: "逻辑学家",
    characteristics: ["理性", "好奇心强", "分析型", "创新思维"],
    strengths: ["分析能力强", "逻辑性强", "创新思维", "好奇心强"],
    weaknesses: ["过于理性", "不善于社交", "拖延", "缺乏行动力"]
  },
  ENTP: {
    name: "辩论家",
    characteristics: ["机智", "好奇心强", "善于辩论", "创新思维"],
    strengths: ["机智", "创新思维", "善于辩论", "适应性强"],
    weaknesses: ["过于好辩", "缺乏耐心", "容易分心", "不善于跟进"]
  },
  ENTJ: {
    name: "指挥官",
    characteristics: ["果断", "有领导力", "战略思维", "有决心"],
    strengths: ["有领导力", "果断", "有远见", "有决心"],
    weaknesses: ["过于强势", "缺乏同理心", "不善于倾听", "过于急躁"]
  },
  ISFP: {
    name: " adventurer",
    characteristics: ["灵活", "艺术型", "注重当下", "温和"],
    strengths: ["灵活", "艺术感强", "注重细节", "善于观察"],
    weaknesses: ["过于敏感", "不善于做决定", "不善于表达", "容易拖延"]
  },
  ISTP: {
    name: "鉴赏家",
    characteristics: ["理性", "务实", "动手能力强", "冷静"],
    strengths: ["理性", "务实", "动手能力强", "冷静"],
    weaknesses: ["不善于表达情感", "缺乏耐心", "过于独立", "容易厌倦"]
  },
  ESFP: {
    name: "表演者",
    characteristics: ["热情", "社交活跃", "乐观", "注重当下"],
    strengths: ["热情", "社交能力强", "乐观", "适应性强"],
    weaknesses: ["缺乏规划", "容易冲动", "不善于处理冲突", "容易分心"]
  },
  ESTP: {
    name: "企业家",
    characteristics: ["果断", "务实", "善于应变", "冒险精神"],
    strengths: ["果断", "务实", "善于应变", "行动力强"],
    weaknesses: ["缺乏耐心", "容易冲动", "不善于规划", "过于冒险"]
  },
  ISFJ: {
    name: "守卫者",
    characteristics: ["有责任心", "务实", "忠诚", "有耐心"],
    strengths: ["有责任心", "务实", "忠诚", "有耐心"],
    weaknesses: ["过于谨慎", "不善于拒绝", "容易过度劳累", "缺乏自信"]
  },
  ISTJ: {
    name: " logistician",
    characteristics: ["务实", "有责任心", "有条理", "可靠"],
    strengths: ["务实", "有责任心", "有条理", "可靠"],
    weaknesses: ["过于固执", "缺乏灵活性", "不善于表达情感", "过于严肃"]
  },
  ESFJ: {
    name: "执政官",
    characteristics: ["有责任心", "社交活跃", "有同理心", "传统"],
    strengths: ["有责任心", "社交能力强", "有同理心", "有组织能力"],
    weaknesses: ["过于传统", "不善于处理冲突", "容易过度承诺", "过于在意他人看法"]
  },
  ESTJ: {
    name: "总经理",
    characteristics: ["有领导力", "务实", "有责任心", "果断"],
    strengths: ["有领导力", "务实", "有责任心", "果断"],
    weaknesses: ["过于强势", "缺乏灵活性", "不善于表达情感", "过于传统"]
  }
};

// 获取所有MBTI类型列表
export const mbtiTypes: MbtiType[] = [
  'INFP', 'INFJ', 'ENFP', 'ENFJ',
  'INTJ', 'INTP', 'ENTP', 'ENTJ',
  'ISFP', 'ISTP', 'ESFP', 'ESTP',
  'ISFJ', 'ISTJ', 'ESFJ', 'ESTJ'
];
