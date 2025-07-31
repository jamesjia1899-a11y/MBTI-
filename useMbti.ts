import { useState, useEffect } from 'react';
import { MbtiType, mbtiTypes } from '@/data/mbtiTypes';

// 自定义Hook：管理MBTI类型选择和存储
export function useMbti() {
  const [selectedMbti, setSelectedMbti] = useState<MbtiType | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  
  // 从localStorage加载保存的MBTI类型
  useEffect(() => {
    const savedMbti = localStorage.getItem('selectedMbti') as MbtiType;
    if (savedMbti && mbtiTypes.includes(savedMbti)) {
      setSelectedMbti(savedMbti);
    } else {
      setIsSelecting(true);
    }
  }, []);
  
  // 保存MBTI类型到localStorage
  const saveMbtiSelection = (mbti: MbtiType) => {
    if (mbtiTypes.includes(mbti)) {
      setSelectedMbti(mbti);
      setIsSelecting(false);
      localStorage.setItem('selectedMbti', mbti);
      return true;
    }
    return false;
  };
  
  // 清除选择的MBTI类型
  const clearMbtiSelection = () => {
    setSelectedMbti(null);
    setIsSelecting(true);
    localStorage.removeItem('selectedMbti');
  };
  
  return {
    selectedMbti,
    isSelecting,
    setIsSelecting,
    saveMbtiSelection,
    clearMbtiSelection,
    mbtiTypes
  };
}
