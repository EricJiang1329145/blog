// 浏览量统计功能

// 获取当前日期的格式化字符串（YYYY-MM-DD）
export function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0];
}

// 页面浏览量类型定义
export interface PageViews {
  [page: string]: number;
  total: number;
}

// 增加页面浏览量
export async function incrementPageView(page: string = 'home'): Promise<void> {
  // 仅在生产环境中运行（Cloudflare Workers）
  if (typeof process === 'undefined' || process.env.NODE_ENV === 'production') {
    try {
      // 检查 BLOG_STATS 是否存在（仅在 Cloudflare Workers 环境中）
      if (typeof (globalThis as any).env?.BLOG_STATS === 'undefined') {
        console.log('BLOG_STATS KV namespace not available');
        return;
      }

      const KV = (globalThis as any).env.BLOG_STATS;
      const date = getCurrentDate();
      const key = `pageviews:${date}`;

      // 获取当前浏览量数据
      const data = await KV.get(key, 'json') as PageViews || { total: 0 };

      // 更新页面浏览量
      if (!data[page]) {
        data[page] = 0;
      }
      data[page]++;
      data.total++;

      // 保存更新后的数据
      await KV.put(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error incrementing page view:', error);
    }
  }
}

// 获取页面浏览量
export async function getPageView(page: string = 'home'): Promise<number> {
  try {
    // 检查 BLOG_STATS 是否存在
    if (typeof (globalThis as any).env?.BLOG_STATS === 'undefined') {
      console.log('BLOG_STATS KV namespace not available');
      return 0;
    }

    const KV = (globalThis as any).env.BLOG_STATS;
    const date = getCurrentDate();
    const key = `pageviews:${date}`;

    // 获取当前浏览量数据
    const data = await KV.get(key, 'json') as PageViews || { total: 0 };

    return data[page] || 0;
  } catch (error) {
    console.error('Error getting page view:', error);
    return 0;
  }
}

// 获取每日总浏览量
export async function getDailyTotalPageViews(): Promise<number> {
  try {
    // 检查 BLOG_STATS 是否存在
    if (typeof (globalThis as any).env?.BLOG_STATS === 'undefined') {
      console.log('BLOG_STATS KV namespace not available');
      return 0;
    }

    const KV = (globalThis as any).env.BLOG_STATS;
    const date = getCurrentDate();
    const key = `pageviews:${date}`;

    // 获取当前浏览量数据
    const data = await KV.get(key, 'json') as PageViews || { total: 0 };

    return data.total || 0;
  } catch (error) {
    console.error('Error getting daily total page views:', error);
    return 0;
  }
}

// 获取特定日期的浏览量数据
export async function getPageViewsByDate(date: string): Promise<PageViews> {
  try {
    // 检查 BLOG_STATS 是否存在
    if (typeof (globalThis as any).env?.BLOG_STATS === 'undefined') {
      console.log('BLOG_STATS KV namespace not available');
      return { total: 0 };
    }

    const KV = (globalThis as any).env.BLOG_STATS;
    const key = `pageviews:${date}`;

    // 获取指定日期的浏览量数据
    const data = await KV.get(key, 'json') as PageViews || { total: 0 };

    return data;
  } catch (error) {
    console.error('Error getting page views by date:', error);
    return { total: 0 };
  }
}
