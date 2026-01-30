'use client';
import React, { useEffect, useRef } from 'react';

const StarBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'star';
      
      // 随机位置
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // 随机大小
      const size = Math.random() * 2 + 1;
      
      // 随机透明度
      const opacity = Math.random() * 0.8 + 0.2;
      
      // 随机动画持续时间
      const duration = Math.random() * 5 + 2;
      
      // 随机缩放
      const scale = Math.random() * 0.5 + 0.5;
      
      // 设置样式
      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.setProperty('--opacity', opacity.toString());
      star.style.setProperty('--duration', `${duration}s`);
      star.style.setProperty('--scale', scale.toString());
      
      container.appendChild(star);

      // 清理函数
      return () => {
        if (container.contains(star)) {
          container.removeChild(star);
        }
      };
    };

    // 创建初始星星
    const stars: (() => void)[] = [];
    for (let i = 0; i < 100; i++) {
      stars.push(createStar());
    }

    // 定时创建新星星
    const interval = setInterval(() => {
      stars.push(createStar());
      // 保持星星数量在合理范围内
      if (stars.length > 150) {
        const removeStar = stars.shift();
        if (removeStar) removeStar();
      }
    }, 500);

    // 清理函数
    return () => {
      clearInterval(interval);
      stars.forEach(removeStar => removeStar());
    };
  }, []);

  return <div className="star-background" ref={containerRef}></div>;
};

export default StarBackground;
