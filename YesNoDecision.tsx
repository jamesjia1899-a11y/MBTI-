import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// 结果弹窗组件
interface ResultModalProps {
  isOpen: boolean;
  result: 'yes' | 'no' | null;
  onClose: () => void;
}

function ResultModal({ isOpen, result, onClose }: ResultModalProps) {
  if (!isOpen || !result) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-20 max-w-md w-full p-8 text-center shadow-2xl"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-2">答案揭晓！</h3>
        
        <div className="my-8">
          <div className={cn(
            "text-6xl font-bold py-6 px-8 rounded-full inline-block",
            result === 'yes' 
              ? "bg-green-100 text-green-500 shadow-lg" 
              : "bg-red-100 text-red-500 shadow-lg"
          )}>
            {result.toUpperCase()}！
          </div>
        </div>
        
        <p className="text-gray-600 mb-8">
          无论结果如何，相信你的直觉，做出最适合自己的选择。
        </p>
        
        <button
          onClick={onClose}
          className="w-full py-3 bg-pink-500 text-white rounded-12 font-medium hover:bg-pink-600 transition-colors"
        >
          我知道了
        </button>
      </motion.div>
    </div>
  );
}

// 主组件
export default function YesNoDecision() {
  const [isDeciding, setIsDeciding] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [decisionResult, setDecisionResult] = useState<'yes' | 'no' | null>(null);
  
  // 做出决定
  const makeDecision = () => {
    setIsDeciding(true);
    
    // 模拟决策过程延迟
    setTimeout(() => {
      // 50%概率返回yes或no
      const result = Math.random() > 0.5 ? 'yes' : 'no';
      setDecisionResult(result);
      setIsDeciding(false);
      setIsResultOpen(true);
    }, 2000);
  };
  
  return (
    <div className="mt-16">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">日常抉择 YES/NO</h2>
        <p className="text-center text-gray-600 mb-8 max-w-md mx-auto">
          纠结时刻？让好运为你指引！面对选择，你需要一点小助力吗？
        </p>
        
        <div className="text-center mb-8">
          <p className="text-gray-700 italic mb-6">
            请诚心默念你所困扰的事件三遍，然后点击下方按钮，让命运为你揭晓答案！
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={makeDecision}
              disabled={isDeciding}
              className={cn(
                "px-10 py-4 rounded-full font-bold text-xl transition-all duration-300",
                isDeciding
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                  : "bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg hover:shadow-xl hover:from-green-500 hover:to-blue-600"
              )}
            >
              {isDeciding ? (
                <div className="flex items-center">
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                  <span>思考中...</span>
                </div>
              ) : (
                "获取答案"
              )}
            </button>
          </div>
          
          {/* 决策动画 */}
          {isDeciding && (
            <div className="mt-8">
              <div className="flex justify-center gap-4">
                <motion.div 
                  className="w-12 h-12 rounded-full bg-green-200"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{ 
                    duration: 0.8,
                    repeat: Infinity
                  }}
                ></motion.div>
                <motion.div 
                  className="w-12 h-12 rounded-full bg-red-200"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{ 
                    duration: 0.8,
                    repeat: Infinity,
                    delay: 0.4
                  }}
                ></motion.div>
              </div>
              <p className="mt-4 text-gray-500">正在分析你的问题...</p>
            </div>
          )}
        </div>
      </div>
      
      {/* 结果弹窗 */}
      <ResultModal
        isOpen={isResultOpen}
        result={decisionResult}
        onClose={() => setIsResultOpen(false)}
      />
    </div>
  );
}
