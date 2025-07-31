import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MbtiSelector from '@/components/mbti/MbtiSelector';
import DailyFortune from '@/components/fortune/DailyFortune';
import YesNoDecision from '@/components/decision/YesNoDecision';
import FortuneStick from '@/components/stick/FortuneStick';
import FooterDisclaimer from '@/components/common/FooterDisclaimer';
import { useMbti } from '@/hooks/useMbti';
import { getMbtiFromUrl } from '@/lib/utils';
import { generateDailyFortune } from '@/data/fortuneData';

import { cn, isWeChatBrowser } from '@/lib/utils';

export default function Home() {
  const { selectedMbti, isSelecting, setIsSelecting, saveMbtiSelection, clearMbtiSelection, mbtiTypes } = useMbti();
  const [fortuneData, setFortuneData] = useState<any>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  
  // 从URL参数加载MBTI类型
  useEffect(() => {
    const mbtiFromUrl = getMbtiFromUrl();
    if (mbtiFromUrl && mbtiTypes.includes(mbtiFromUrl as any) && !selectedMbti) {
      saveMbtiSelection(mbtiFromUrl as any);
    }
  }, [mbtiTypes, saveMbtiSelection, selectedMbti]);

  // 当MBTI类型选择后生成运势数据
  useEffect(() => {
    if (selectedMbti) {
      setFortuneData(generateDailyFortune(selectedMbti));
    }
  }, [selectedMbti]);
  
  // 处理MBTI选择
  const handleMbtiSelect = (mbti: string) => {
    saveMbtiSelection(mbti as any);
  };
  
  // 显示MBTI选择器
  const showMbtiSelector = () => {
    setIsSelecting(true);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 pt-8 pb-16 px-4 max-w-4xl mx-auto">
      {/* 页面标题 */}
      <header className="text-center mb-10">
        <motion.h1 
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 0.5 }}
           className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-3"
         >
           MBTI万事屋
         </motion.h1>
        <p className="text-gray-600">你的专属MBTI运势占卜</p>
      </header>
      
      {/* 用户信息栏 */}
      {selectedMbti && (
        <div className="flex justify-between items-center mb-10 bg-white rounded-20 shadow-md p-4">
          <div>
            <p className="text-gray-500 text-sm">当前MBTI类型</p>
            <p className="text-2xl font-bold text-gray-800">{selectedMbti}</p>
          </div>
          <button
            onClick={showMbtiSelector}
            className="text-pink-500 text-sm font-medium hover:underline"
          >
            切换类型
          </button>
        </div>
      )}
      
      {/* MBTI选择弹窗 */}
      {isSelecting && (
        <MbtiSelector
          mbtiTypes={mbtiTypes}
          onSelect={handleMbtiSelect}
          onCancel={() => selectedMbti && setIsSelecting(false)}
        />
      )}
      
      {/* 主内容区域 */}
      {selectedMbti && fortuneData && (
        <div className="space-y-6">
           {/* 每日签运 */}
           <DailyFortune 
             fortuneData={fortuneData} 
             mbtiType={selectedMbti!}
             onShare={(url) => {
               setShareUrl(url);
               setShowShareModal(true);
             }}
           />
          
          {/* 日常抉择 YES/NO */}
          <YesNoDecision />
          
          {/* 电子求签 */}
          <FortuneStick mbtiType={selectedMbti} />
        </div>
      )}
       
        {/* 分享模态框 */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-20 p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-center text-gray-800 mb-4">分享你的MBTI运势</h3>
              
              {/* 微信分享提示 */}
              {isWeChatBrowser() ? (
                <div className="mb-6 p-4 bg-green-50 rounded-12 border border-green-100">
                  <div className="flex items-start">
                    <i className="fa-solid fa-weixin text-green-500 text-xl mt-1 mr-3"></i>
                    <div>
                      <p className="font-medium text-green-700 mb-1">微信用户</p>
                      <p className="text-sm text-green-600">点击右上角 <i className="fa-solid fa-ellipsis-v"></i> 选择"分享到朋友圈"或"发送给朋友"</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-6 p-4 bg-blue-50 rounded-12 border border-blue-100">
                  <p className="text-sm text-blue-700">复制链接后，可以粘贴到微信聊天窗口分享给好友</p>
                </div>
              )}
              
              <div className="mb-6">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="w-full px-4 py-3 rounded-12 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                />
              </div>
              
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  alert('链接已复制到剪贴板！');
                  setShowShareModal(false);
                }}
                className="w-full py-3 bg-pink-500 text-white rounded-12 font-medium hover:bg-pink-600 transition-colors mb-4"
              >
                复制链接
              </button>
              
              <button
                onClick={() => setShowShareModal(false)}
                className="w-full py-3 border border-gray-300 text-gray-700 rounded-12 font-medium hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
            </div>
          </div>
        )}
       
       {/* 底部提示语 */}
       <FooterDisclaimer />
     </div>
  );
}
