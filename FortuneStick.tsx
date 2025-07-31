import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FortuneStickLevel, getRandomFortuneStick, getRandomPositiveMessage } from '@/data/stickData';
import { MbtiType } from '@/data/mbtiTypes';
import { cn } from '@/lib/utils';

// 签运等级样式映射
const levelStyles: Record<FortuneStickLevel, {
  textColor: string;
  bgColor: string;
  emoji: string;
}> = {
  '大吉': {
    textColor: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    emoji: '🎉'
  },
  '中吉': {
    textColor: 'text-green-600',
    bgColor: 'bg-green-50',
    emoji: '😊'
  },
  '小吉': {
    textColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    emoji: '🙂'
  },
  '大凶': {
    textColor: 'text-red-600',
    bgColor: 'bg-red-50',
    emoji: '😱'
  },
  '中凶': {
    textColor: 'text-orange-600',
    bgColor: 'bg-orange-50',
    emoji: '😟'
  },
  '小凶': {
    textColor: 'text-purple-600',
    bgColor: 'bg-purple-50',
    emoji: '😕'
  }
};

// 签文结果组件
interface StickResultProps {
  isOpen: boolean;
  stickData: any;
  mbtiType: MbtiType;
  onClose: () => void;
}

function StickResult({ isOpen, stickData, mbtiType, onClose }: StickResultProps) {
  if (!isOpen || !stickData) return null;
  
  const { level, text, interpretation } = stickData;
  const style = levelStyles[level];
  const positiveMessage = getRandomPositiveMessage();
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-20 max-w-md w-full max-h-[85vh] overflow-y-auto"
      >
        {/* 签运等级 */}
        <div className={`${style.bgColor} p-4 text-center`}>
          <h3 className={`text-2xl font-bold ${style.textColor} flex items-center justify-center`}>
            <span>今日签运：{level}</span>
            <span className="ml-2 text-3xl">{style.emoji}</span>
          </h3>
        </div>
        
        {/* 签文内容 */}
        <div className="p-8">
          <div className="text-center mb-8">
            <p className="text-2xl font-serif italic text-gray-700 leading-relaxed">"{text}"</p>
          </div>
          
          <div className="space-y-6 mb-8">
            <div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">签文含义：</h4>
              <p className="text-gray-600 leading-relaxed">{interpretation(mbtiType).meaning}</p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">个性化深度阐述：</h4>
              <p className="text-gray-600 leading-relaxed">{interpretation(mbtiType).elaboration}</p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">专属建议：</h4>
              <p className="text-gray-600 leading-relaxed">{interpretation(mbtiType).advice}</p>
            </div>
          </div>
          
          {/* 赠言 */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 text-center">
            <h4 className="text-xl font-bold text-pink-600 mb-2">{positiveMessage}</h4>
            <p className="text-sm text-gray-500 italic">愿这个词语为你今日带来力量！</p>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-b-20">
          <button
            onClick={onClose}
            className="w-full py-3 bg-pink-500 text-white rounded-12 font-medium hover:bg-pink-600 transition-colors"
          >
            收起签文
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// 摇签动画组件
function ShakingAnimation({ isActive }: { isActive: boolean }) {
  if (!isActive) return null;
  
  return (
    <div className="flex justify-center items-center h-40 my-8">
      <motion.div
        animate={{
          rotate: [0, 15, -15, 15, -15, 0],
          scale: [1, 1.1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
        className="text-center"
      >
        <div className="w-24 h-24 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4 shadow-lg">
          <i className="fa-solid fa-scroll text-4xl text-yellow-600"></i>
        </div>
        <p className="text-xl font-medium text-gray-700">正在摇签中...</p>
      </motion.div>
    </div>
  );
}

// 锦囊组件
function FortuneBag({ onClick, isActive }: { onClick: () => void; isActive: boolean }) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "mx-auto w-32 h-40 cursor-pointer transition-all duration-300",
        isActive ? "animate-pulse" : "hover:scale-105"
      )}
    >
      <motion.div
        whileHover={{ y: -10 }}
        whileTap={{ y: 5 }}
      >
        {/* 锦囊图像 */}
        <div className="relative">
          {/* 锦囊主体 */}
          <div className="w-full h-32 bg-gradient-to-b from-orange-400 to-orange-600 rounded-t-3xl rounded-b-2xl shadow-lg"></div>
          
          {/* 锦囊结 */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-orange-500 rounded-full shadow-md"></div>
          
          {/* 锦囊绳 */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-yellow-700"></div>
          
          {/* "解"字 */}
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-white font-bold text-2xl">
            解
          </div>
        </div>
        
        {/* 提示文字 */}
        <p className="text-center mt-2 text-gray-700 font-medium">点击锦囊，查看你的今日好签！</p>
      </motion.div>
    </div>
  );
}

// 主组件
interface FortuneStickProps {
  mbtiType: MbtiType;
}

export default function FortuneStick({ mbtiType }: FortuneStickProps) {
  const [isShaking, setIsShaking] = useState(false);
  const [fortuneStick, setFortuneStick] = useState<any>(null);
  const [isResultOpen, setIsResultOpen] = useState(false);
  
  // 求签函数
  const requestFortune = () => {
    setIsShaking(true);
    
    // 模拟摇签过程
    setTimeout(() => {
      const newStick = getRandomFortuneStick();
      setFortuneStick(newStick);
      setIsShaking(false);
    }, 2000);
  };
  
  // 查看签文
  const viewFortune = () => {
    if (fortuneStick) {
      setIsResultOpen(true);
    }
  };
  
  // 关闭签文
  const closeResult = () => {
    setIsResultOpen(false);
  };
  
  return (
    <div className="mt-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">电子求签</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          想知道今日指引？摇一摇，求支专属签！心之所向，签之所至，点击求签，得今日指引。
        </p>
      </div>
      
      <div className="max-w-md mx-auto">
        {/* 求签按钮 */}
        {!isShaking && !fortuneStick && (
          <div className="text-center">
            <button
              onClick={requestFortune}
              className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-yellow-500 hover:to-orange-600"
            >
              点击求签
            </button>
          </div>
        )}
        
        {/* 摇签动画 */}
        <ShakingAnimation isActive={isShaking} />
        
        {/* 锦囊 */}
        <AnimatePresence>
          {!isShaking && fortuneStick && (
            <FortuneBag 
              onClick={viewFortune} 
              isActive={!isResultOpen} 
            />
          )}
        </AnimatePresence>
      </div>
      
      {/* 签文结果弹窗 */}
      <StickResult
        isOpen={isResultOpen}
        stickData={fortuneStick}
        mbtiType={mbtiType}
        onClose={closeResult}
      />
    </div>
  );
}
