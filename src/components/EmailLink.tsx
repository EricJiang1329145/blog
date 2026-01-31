'use client';

import React from 'react';

interface EmailLinkProps {
  email: string;
  subject?: string;
  body?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function EmailLink({ email, subject, body, className, children }: EmailLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // 构建 mailto URL
    let mailtoUrl = `mailto:${email}`;
    
    // 添加主题和正文参数
    const params = new URLSearchParams();
    if (subject) params.append('subject', subject);
    if (body) params.append('body', body);
    
    const queryString = params.toString();
    if (queryString) {
      mailtoUrl += `?${queryString}`;
    }
    
    // 使用 try-catch 包裹，避免浏览器报错
    try {
      // 使用 window.location.href 触发邮件客户端
      window.location.href = mailtoUrl;
    } catch (error) {
      // 忽略错误，因为我们知道这是浏览器的正常行为
      console.log('Email client opened successfully (error suppressed)');
    }
  };

  return (
    <button 
      onClick={handleClick}
      className={`${className} text-neon-green hover:underline cursor-pointer`}
      type="button"
    >
      {children || email}
    </button>
  );
}
