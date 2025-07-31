import { useState } from 'react';
import { MbtiType } from '@/data/mbtiTypes';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface MbtiSelectorProps {
  mbtiTypes: MbtiType[];
  onSelect: (mbti: MbtiType) => void;
  onCancel: () => void;
}

export default function MbtiSelector({ mbtiTypes, onSelect, onCancel }: MbtiSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<MbtiType | null>(null);
  
  // 过滤MBTI类型
  const filteredTypes = mbtiTypes.filter(type => 
    type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="bg-white rounded-20 p-6 w-full max-w-md shadow-xl"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-pink-500">选择你的MBTI类型</h2>
        <p className="text-center text-gray-600 mb-6">请选择你的MBTI类型，解锁今日专属运势！</p>
        
        {/* 搜索框 */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="搜索MBTI类型（如INFP、ESTJ）..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-12 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all"
          />
          <i className="fa-solid fa-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
        
        {/* MBTI类型网格 */}
        <div className="grid grid-cols-4 gap-3 mb-6 max-h-80 overflow-y-auto pr-2">
          {filteredTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={cn(
                "py-2 px-3 rounded-12 text-sm font-medium transition-all",
                selectedType === type
                  ? "bg-pink-500 text-white shadow-md transform scale-105"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              )}
            >
              {type}
            </button>
          ))}
        </div>
        
        {/* 按钮组 */}
        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="px-6 py-3 rounded-12 border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button
            onClick={() => selectedType && onSelect(selectedType)}
            disabled={!selectedType}
            className={cn(
              "px-6 py-3 rounded-12 font-medium transition-all",
              selectedType
                ? "bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg hover:shadow-xl hover:from-pink-500 hover:to-purple-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            )}
          >
            确认选择
          </button>
        </div>
      </motion.div>
    </div>
  );
}
