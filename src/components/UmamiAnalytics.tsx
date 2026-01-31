import React, { useState, useEffect } from 'react';
import { UmamiClient } from '@umami/api-client';

interface UmamiAnalyticsProps {
  websiteId: string;
  apiUrl: string;
  apiToken: string;
}

const UmamiAnalytics: React.FC<UmamiAnalyticsProps> = ({ websiteId, apiUrl, apiToken }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 初始化 Umami 客户端
        const client = new UmamiClient({
          baseUrl: apiUrl,
          token: apiToken,
        });

        // 获取网站统计数据
        const stats = await client.websiteStats(websiteId, {
          startAt: Date.now() - 30 * 24 * 60 * 60 * 1000, // 过去30天
          endAt: Date.now(),
        });

        // 获取页面访问数据
        const pages = await client.websitePages(websiteId, {
          startAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
          endAt: Date.now(),
          limit: 5,
        });

        // 获取来源数据
        const sources = await client.websiteSources(websiteId, {
          startAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
          endAt: Date.now(),
          limit: 5,
        });

        setData({
          stats,
          pages,
          sources,
        });
      } catch (err) {
        console.error('Error fetching Umami data:', err);
        setError('获取数据分析数据失败，请检查配置');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();

    // 每5分钟刷新一次数据
    const interval = setInterval(fetchAnalyticsData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [websiteId, apiUrl, apiToken]);

  if (loading) {
    return (
      <div className="text-foreground/70 text-center py-12">
        <p>加载数据分析中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-foreground/70 text-center py-12">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-foreground/70 text-center py-12">
        <p>暂无数据分析数据</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 概览统计 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card-bg/50 p-4 rounded-lg border border-neon-green/10">
          <p className="text-sm text-foreground/50">总访问量</p>
          <p className="text-2xl font-bold neon-text-green">
            {data.stats.pageviews || 0}
          </p>
        </div>
        <div className="bg-card-bg/50 p-4 rounded-lg border border-neon-green/10">
          <p className="text-sm text-foreground/50">独立访客</p>
          <p className="text-2xl font-bold neon-text-purple">
            {data.stats.visitors || 0}
          </p>
        </div>
      </div>

      {/* 热门页面 */}
      <div>
        <h4 className="text-sm font-medium mb-3 text-foreground/70">热门页面</h4>
        <div className="space-y-2">
          {data.pages.map((page: any, index: number) => (
            <div key={index} className="flex justify-between items-center bg-card-bg/50 p-3 rounded-lg border border-neon-green/10">
              <span className="text-sm truncate max-w-[150px]">
                {page.page || '/'}
              </span>
              <span className="text-sm font-medium neon-text-green">
                {page.pageviews || 0}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 流量来源 */}
      <div>
        <h4 className="text-sm font-medium mb-3 text-foreground/70">流量来源</h4>
        <div className="space-y-2">
          {data.sources.map((source: any, index: number) => (
            <div key={index} className="flex justify-between items-center bg-card-bg/50 p-3 rounded-lg border border-neon-green/10">
              <span className="text-sm truncate max-w-[150px]">
                {source.source || '直接访问'}
              </span>
              <span className="text-sm font-medium neon-text-purple">
                {source.pageviews || 0}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UmamiAnalytics;