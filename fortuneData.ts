import { MbtiType } from './mbtiTypes';

// 运势等级类型
export type FortuneLevel = 'excellent' | 'stable' | 'poor';

// 运势类型
export type FortuneCategory = 'love' | 'money' | 'travel' | 'health';

// 运势数据接口
export interface FortuneData {
  level: FortuneLevel;
  title: string;
  brief: string;
  detailed: string;
}

// 获取运势等级对应的emoji
export function getFortuneEmoji(level: FortuneLevel): string {
  switch (level) {
    case 'excellent': return '🌟';
    case 'stable': return '😌';
    case 'poor': return '😥';
  }
}

// 获取运势等级对应的中文描述
export function getFortuneLevelText(level: FortuneLevel): string {
  switch (level) {
    case 'excellent': return '极佳';
    case 'stable': return '平稳';
    case 'poor': return '欠佳';
  }
}

// 获取运势类别对应的中文标题
export function getCategoryTitle(category: FortuneCategory): string {
  switch (category) {
    case 'love': return '今日恋爱运';
    case 'money': return '今日财运';
    case 'travel': return '今日出行运';
    case 'health': return '今日健康运';
  }
}

// 生成每日运势数据
export function generateDailyFortune(mbtiType: MbtiType): Record<FortuneCategory, FortuneData> {
  // 基于MBTI类型和当前日期生成伪随机数种子
  const seed = mbtiType.length + new Date().getDate();
  
  // 简单的伪随机数生成函数
  const getRandom = (max: number, min = 0, seed: number): number => {
    const num = Math.sin(seed) * 10000;
    return Math.floor((num - Math.floor(num)) * (max - min + 1)) + min;
  };
  
  // 随机选择运势等级
  // 随机选择运势等级
  const getRandomLevel = (): FortuneLevel => {
    const levels: FortuneLevel[] = ['excellent', 'stable', 'poor'];
    return levels[Math.floor(Math.random() * levels.length)];
  };
  
  // 生成恋爱运
  const loveSeed = seed + 1;
  const loveLevel = getRandomLevel(loveSeed);
  let loveBrief = '';
  let loveDetailed = '';
  
  switch (mbtiType) {
    case 'INFP':
      loveBrief = '浪漫细胞活跃，适合表达情感';
      loveDetailed = '今日你的浪漫细胞格外活跃，适合与伴侣分享内心深处的想法，能让感情升温；单身者可能会在不经意间遇到与你灵魂共鸣的人。你的理想主义特质将帮助你看到关系中美好的可能性。';
      break;
    case 'ISTJ':
      loveBrief = '务实可靠，适合稳定关系';
      loveDetailed = '今日你的务实特质将有助于关系稳定发展，虽然不擅长浪漫表达，但你的可靠和责任感会让伴侣感到安心。适合讨论未来计划，展现你的长期承诺。';
      break;
    case 'ENFP':
      loveBrief = '热情洋溢，社交魅力提升';
      loveDetailed = '今日你的热情和魅力将成为关系中的催化剂，与伴侣的互动会充满活力和新鲜感。单身者有机会在社交场合遇到有趣的人，你的好奇心和热情会给人留下深刻印象。';
      break;
    case 'ESTJ':
      loveBrief = '有责任感，关系管理良好';
      loveDetailed = '今日你的组织能力和责任感将帮助你有效管理感情关系，适合解决任何悬而未决的问题。你的直接沟通方式虽然有时显得强硬，但能有效消除误解，增进理解。';
      break;
    default:
      loveBrief = '情感稳定，关系和谐';
      loveDetailed = '今日你的情感状态稳定，适合与伴侣进行有深度的交流。无论是讨论未来计划还是分享日常琐事，都能增进彼此的理解和感情。保持开放的心态，倾听对方的需求。';
  }
  
  // 生成财运
  const moneySeed = seed + 2;
  const moneyLevel = getRandomLevel(moneySeed);
  let moneyBrief = '';
  let moneyDetailed = '';
  
  switch (mbtiType) {
    case 'INFP':
      moneyBrief = '创意带来机会，避免冲动消费';
      moneyDetailed = '今日你的创造力可能会带来意想不到的赚钱机会，特别是与艺术或创意相关的项目。但要注意避免基于情感的冲动消费，制定简单的预算可以帮助你保持财务平衡。';
      break;
    case 'ISTJ':
      moneyBrief = '财务规划能力强，稳健收益';
      moneyDetailed = '今日你的财务规划能力将为你带来稳健收益，适合审视现有投资组合，不宜盲目追求高风险项目。你的耐心和细致使你能够发现潜在的财务优化空间。';
      break;
    case 'ENFP':
      moneyBrief = '新机会出现，保持灵活';
      moneyDetailed = '今日可能会出现意想不到的财务机会，特别是通过社交网络或新认识的人。保持开放和灵活的态度，但在承诺前花时间评估每个机会的可行性，避免过度承诺。';
      break;
    case 'ESTJ':
      moneyBrief = '管理能力强，财务状况稳定';
      moneyDetailed = '今日你的组织和管理能力将帮助你保持财务稳定，适合处理账单、预算和长期财务规划。你的务实思维使你能够做出明智的财务决策，避免不必要的风险。';
      break;
    default:
      moneyBrief = '财务状况稳定，理性决策';
      moneyDetailed = '今日你的财务状况总体稳定，适合进行理性的财务决策。避免冲动消费，优先考虑必要开支和长期储蓄目标。保持平衡的财务观念将有助于你实现财务稳定。';
  }
  
  // 生成出行运
  const travelSeed = seed + 3;
  const travelLevel = getRandomLevel(travelSeed);
  let travelBrief = '';
  let travelDetailed = '';
  
  switch (mbtiType) {
    case 'INFP':
      travelBrief = '适合安静环境，内省之旅';
      travelDetailed = '今日适合前往安静、自然的环境，如公园或郊外。这样的环境能激发你的创造力和内省能力，帮助你整理思绪。短途旅行或独自漫步都能带给你心灵的平静和灵感。';
      break;
    case 'ISTJ':
      travelBrief = '计划周密，出行顺利';
      travelDetailed = '今日你的计划性将确保出行顺利，提前检查路线和准备必需品能避免大多数问题。适合进行有明确目的和时间表的出行，意外情况较少，一切都将按计划进行。';
      break;
    case 'ENFP':
      travelBrief = '社交机会多，惊喜之旅';
      travelDetailed = '今日是拓展社交圈的好时机，约会或短途旅行都能带给你意外惊喜，结识有趣的新朋友。保持灵活的计划，给自己留出即兴探索的空间，会有令人愉快的发现。';
      break;
    case 'ESTJ':
      travelBrief = '高效出行，目标明确';
      travelDetailed = '今日你的组织能力将使出行高效而有成果，无论是商务出行还是个人事务，都能明确目标并高效完成。提前规划和准备将确保一切顺利，避免不必要的延误。';
      break;
    default:
      travelBrief = '出行顺利，注意安全';
      travelDetailed = '今日出行总体顺利，适合短途旅行或日常通勤。注意交通状况，保持灵活的时间安排。无论是工作出行还是休闲活动，保持积极心态将使体验更加愉快。建议在出行前检查天气预报，准备必要的物品。如果是通勤，尝试提前10分钟出发，避免匆忙带来的压力。旅途中留意周围环境，你可能会发现平时忽略的美丽细节。带上水和小点心保持能量，特别是在下午时段。如果可能，选择靠窗的位置，欣赏风景可以提升心情。'
  }
  
  // 生成健康运
  const healthSeed = seed + 4;
  const healthLevel = getRandomLevel(healthSeed);
  let healthBrief = '';
  let healthDetailed = '';
  
  switch (mbtiType) {
    case 'INFP':
      healthBrief = '情绪敏感，注意内心平衡';
      healthDetailed = '今日你的情绪可能较为敏感，注意内心平衡。适合进行温和的活动如瑜伽、散步或创意写作，帮助释放情绪。避免过度思考，给自己留出放松和恢复的时间。';
      break;
    case 'ISTJ':
      healthBrief = '注重规律，保持健康习惯';
      healthDetailed = '今日你的自律性将帮助你维持健康习惯，坚持常规锻炼和均衡饮食。注意避免过度工作导致疲劳，合理安排休息时间，保持身体和心理的平衡状态。';
      break;
    case 'ENFP':
      healthBrief = '精力充沛，社交活动有益';
      healthDetailed = '今日你的精力较为充沛，适度的社交活动对你的心理健康有益。尝试新的户外活动或运动，既能释放能量又能提升情绪。注意不要过度消耗精力，留出恢复时间。';
      break;
    case 'ESTJ':
      healthBrief = '高效锻炼，注重成果';
      healthDetailed = '今日适合进行有明确目标的锻炼，如设定距离或重量目标的训练。你的决心和毅力将帮助你达成健身目标，但要注意不要过度训练，适当休息同样重要。';
      break;
    case 'INFJ':
      healthBrief = '注意情绪波动，冥想有益';
      healthDetailed = '留意情绪波动，今日适合通过冥想或温和运动来平衡内心，避免过度思考带来疲惫。你的直觉会告诉你身体需要什么，听从这些信号，给自己足够的休息和自我关怀时间。';
      break;
    default:
      healthBrief = '身心平衡，适度活动';
      healthDetailed = '今日适合保持身心平衡，进行适度的身体活动和心理放松。注意饮食均衡，保证充足水分摄入，避免过度劳累。简单的自我关怀活动将有助于维持整体健康状态。';
  }
  
  return {
    love: {
      level: loveLevel,
      title: getCategoryTitle('love'),
      brief: loveBrief,
      detailed: `${mbtiType} - ${getCategoryTitle('love')} 深度解析\n\n${loveDetailed}`
    },
    money: {
      level: moneyLevel,
      title: getCategoryTitle('money'),
      brief: moneyBrief,
      detailed: `${mbtiType} - ${getCategoryTitle('money')} 深度解析\n\n${moneyDetailed}`
    },
    travel: {
      level: travelLevel,
      title: getCategoryTitle('travel'),
      brief: travelBrief,
      detailed: `${mbtiType} - ${getCategoryTitle('travel')} 深度解析\n\n${travelDetailed}`
    },
    health: {
      level: healthLevel,
      title: getCategoryTitle('health'),
      brief: healthBrief,
      detailed: `${mbtiType} - ${getCategoryTitle('health')} 深度解析\n\n${healthDetailed}`
    }
  };
}
