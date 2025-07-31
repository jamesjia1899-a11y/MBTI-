import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 生成分享链接
export function generateShareLink(mbtiType: string): string {
  // 在实际应用中，这里可以添加更多需要分享的参数
  const baseUrl = window.location.origin;
  return `${baseUrl}?mbti=${encodeURIComponent(mbtiType)}`;
}

// 解析URL参数获取MBTI类型
export function getMbtiFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get('mbti');
}

// 检测是否在微信浏览器中
export function isWeChatBrowser(): boolean {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes('micromessenger');
}
