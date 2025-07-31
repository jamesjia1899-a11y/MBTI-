import { useState } from 'react';
import { motion } from 'framer-motion';
import { FortuneCategory, FortuneData, getFortuneEmoji } from '@/data/fortuneData';
import { cn, generateShareLink } from '@/lib/utils';
import { MbtiType } from '@/data/mbtiTypes';

interface FortuneCardProps {
  category: FortuneCategory;
  data: FortuneData;
  onOpenDetail: (category: FortuneCategory, data: FortuneData) => void;
}

function FortuneCard({ category, data, onOpenDetail }: FortuneCardProps) {
  // 根据运势等级获取颜色
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'from-yellow-400 to-orange-300';
      case 'stable': return 'from-blue-400 to-cyan-300';
      case 'poor': return 'from-pink-400 to-red-300';
      default: return 'from-gray-400 to-gray-300';
    }
  };
  
  return (
    <motion.div
      className="group relative rounded-20 overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
      whileHover={{ y: -5 }}
    >
      {/* 卡片背景渐变 */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getLevelColor(data.level)} opacity-20`}></div>
      
      {/* 卡片内容 */}
      <div className="relative p-6 bg-white/80 backdrop-blur-sm h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-800">{data.title}</h3>
          <span className="text-2xl">{getFortuneEmoji(data.level)}</span>
        </div>
        
        <p className="text-gray-600 mb-6 flex-grow">{data.brief}</p>
        
        <button
          onClick={() => onOpenDetail(category, data)}
          className="text-pink-500 font-medium flex items-center group-hover:underline self-start"
        >
          <span>点击卡片查看详细解读</span>
          <i className="fa-solid fa-arrow-right ml-2 text-xs transition-transform group-hover:translate-x-1"></i>
        </button>
      </div>
    </motion.div>
  );
}

interface FortuneDetailModalProps {
  isOpen: boolean;
  data: FortuneData | null;
  onClose: () => void;
}

function FortuneDetailModal({ isOpen, data, onClose }: FortuneDetailModalProps) {
  if (!isOpen || !data) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-20 max-w-md w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">{data.title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <i className="fa-solid fa-times text-xl"></i>
            </button>
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-2xl mr-2">{getFortuneEmoji(data.level)}</span>
            <span className="text-gray-500">
              {data.level === 'excellent' ? '极佳' : data.level === 'stable' ? '平稳' : '欠佳'}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="whitespace-pre-line text-gray-700 leading-relaxed">
            {data.detailed}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-center text-sm text-gray-500 italic">
              你的专属运势，为你量身定制！无论何时查看，今天的运势都将如一。
            </p>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-b-20">
          <button
            onClick={onClose}
            className="w-full py-3 bg-pink-500 text-white rounded-12 font-medium hover:bg-pink-600 transition-colors"
          >
            关闭解读
          </button>
        </div>
      </motion.div>
    </div>
  );
}

interface DailyFortuneProps {
  fortuneData: Record<FortuneCategory, FortuneData>;
  mbtiType: MbtiType;
  onShare: (url: string) => void;
}

export default function DailyFortune({ fortuneData, mbtiType, onShare }: DailyFortuneProps) {
  const [selectedCategory, setSelectedCategory] = useState<FortuneCategory | null>(null);
  const [selectedData, setSelectedData] = useState<FortuneData | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  const handleOpenDetail = (category: FortuneCategory, data: FortuneData) => {
    setSelectedCategory(category);
    setSelectedData(data);
    setIsDetailOpen(true);
  };
  
  // 将对象转换为数组以便渲染
  const fortuneItems = Object.entries(fortuneData);
  
  return (
    <div className="mt-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">你的专属MBTI今日运势来啦！</h2>
        <p className="text-gray-500">根据你的性格特点，为你定制今日全方位运势</p>
      </div>
      
      {/* 运势卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fortuneItems.map(([category, data]) => (
          <FortuneCard
            key={category}
            category={category as FortuneCategory}
            data={data}
            onOpenDetail={handleOpenDetail}
          />
        ))}
      </div>
      
      {/* 分享按钮 */}
      <div className="mt-8 text-center">
        <button
          onClick={() => {
            const url = generateShareLink(mbtiType);
            onShare(url);
          }}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all"
        >
          <i className="fa-solid fa-share-alt mr-2"></i>
          分享今日运势
        </button>
      </div>
      
      {/* 详情模态框 */}
      <FortuneDetailModal
        isOpen={isDetailOpen}
        data={selectedData}
        onClose={() => setIsDetailOpen(false)}
      />
    </div>
  );
}
