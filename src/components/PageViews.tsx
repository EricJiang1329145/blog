'use client';

import React, { useEffect, useState } from 'react';

/**
 * 页面阅读次数统计组件
 * 使用不蒜子统计文章阅读次数
 */
export default function PageViews() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 简化逻辑，直接设置脚本加载成功
    setScriptLoaded(true);
    setLoading(false);
  }, []);

  return (
    <p className="neon-text-green">
      <span id="busuanzi_value_page_pv"></span>
      <span className="ml-1">次阅读</span>
    </p>
  );
}
