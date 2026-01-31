"use client";

import { useState, useEffect } from 'react';

const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // 获取页面滚动信息
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      // 计算滚动进度百分比
      const calculatedProgress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setProgress(calculatedProgress);
    };

    // 添加滚动事件监听器
    window.addEventListener('scroll', handleScroll);
    
    // 初始化时计算一次
    handleScroll();

    // 清理事件监听器
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div 
        className="h-1 bg-neon-green transition-all duration-300 ease-out" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ReadingProgressBar;