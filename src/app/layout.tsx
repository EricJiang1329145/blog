import type { Metadata } from "next";
import Link from "next/link";
import StarBackground from "../components/StarBackground";
import BackToTopButton from "../components/BackToTopButton";
import Navigation from "../components/Navigation";
import "./globals.css";

export const metadata: Metadata = {
	title: "Neon Cosmos",
	description: "探索技术、数学与太空的奇妙世界",
	keywords: ["博客", "技术", "数学", "太空", "Next.js", "TypeScript"],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="zh-CN">
			<head>
				<script defer src="https://cloud.umami.is/script.js" data-website-id="b572d3db-28bf-4534-b2ed-6ccbfe769302"></script>
			</head>
			<body className="min-h-screen">
				<StarBackground />
				
				{/* 导航栏 */}
				<Navigation />
				
				
				{/* 主要内容 */}
				<main className="container mx-auto px-4 pt-24 pb-16">
					{children}
				</main>
				
				{/* 页脚 */}
				<footer className="bg-nav-bg/90 backdrop-blur-md border-t border-neon-green/20 py-8">
					<div className="container mx-auto px-4 text-center">
						<p className="text-foreground/70">
							© {new Date().getFullYear()} Neon Cosmos. 探索技术、数学与太空的奇妙世界.
						</p>
					</div>
				</footer>

				<BackToTopButton />

				{/* 复制按钮脚本 - 只在客户端执行 */}
				<script dangerouslySetInnerHTML={{
					__html: `
						if (typeof window !== 'undefined') {
							window.addEventListener('DOMContentLoaded', function() {
								const copyButtons = document.querySelectorAll('.copy-button');
								copyButtons.forEach(button => {
									button.addEventListener('click', function() {
										const code = this.getAttribute('data-code');
										if (!code) return;

										const decodedCode = decodeURIComponent(code);
										const originalContent = this.innerHTML;

										navigator.clipboard.writeText(decodedCode)
											.then(() => {
												// 显示复制成功
												this.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> 复制成功';
												this.classList.add('copied');

												// 2秒后恢复
												setTimeout(() => {
													this.innerHTML = originalContent;
													this.classList.remove('copied');
												}, 2000);
											})
											.catch(err => {
												console.error('复制失败:', err);
												this.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg> 复制失败';
												this.classList.add('copied');
												setTimeout(() => {
													this.innerHTML = originalContent;
													this.classList.remove('copied');
												}, 2000);
											});
									});
								});

								// 脚注功能
								const footnoteButtons = document.querySelectorAll('.footnote-button');
								footnoteButtons.forEach(button => {
									button.addEventListener('click', function(e) {
										e.preventDefault();
										const footnoteId = this.getAttribute('data-footnote-id');
										if (!footnoteId) return;

										const tooltip = document.getElementById('footnote-tooltip-' + footnoteId);
										const footnoteDefinition = document.getElementById('footnote-' + footnoteId);
										if (!tooltip || !footnoteDefinition) return;

										// 显示脚注内容
										tooltip.innerHTML = footnoteDefinition.innerHTML;
										tooltip.style.display = tooltip.style.display === 'block' ? 'none' : 'block';

										// 点击其他地方关闭脚注
										document.addEventListener('click', function closeFootnote(event) {
											if (!button.contains(event.target) && !tooltip.contains(event.target)) {
												tooltip.style.display = 'none';
												document.removeEventListener('click', closeFootnote);
											}
										});
									});
								});
							});
						}
					`
				}} />

				{/* 不蒜子统计代码 - 只在客户端执行 */}
				<script dangerouslySetInnerHTML={{
					__html: `
						if (typeof window !== 'undefined') {
							// 不蒜子统计功能
							class BusuanziLoader {
								constructor() {
									this.retryCount = 0;
									this.maxRetries = 3;
									this.retryDelay = 1000;
									this.isLoaded = false;
								}

								// 初始化
								init() {
									// 先尝试显示缓存数据
									this.showCachedData();

									// 当DOM加载完成后加载不蒜子
									window.addEventListener('DOMContentLoaded', () => {
										this.loadScript();
									});

									// 监听不蒜子初始化完成事件
									window.addEventListener('busuanzi:init', () => {
										console.log('不蒜子初始化完成');
										this.isLoaded = true;
										this.cacheData();
									});

									// 定期检查并更新数据
									setInterval(() => {
										if (this.isLoaded) {
											this.cacheData();
										}
									}, 60000); // 每分钟更新一次缓存
								}

								// 加载脚本
								loadScript() {
									const script = document.createElement('script');
									script.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
									script.defer = true; // 使用defer确保DOM解析完成后执行
									script.onload = () => {
										console.log('不蒜子脚本加载成功');
										this.isLoaded = true;
										// 给脚本一点时间初始化
										setTimeout(() => {
											this.cacheData();
										}, 500);
									};
									script.onerror = () => {
										console.error('不蒜子脚本加载失败，尝试备用地址');
										this.tryFallback();
									};
									document.head.appendChild(script);
								}

								// 尝试备用地址
								tryFallback() {
									const fallbackScript = document.createElement('script');
									fallbackScript.src = 'https://cdn.jsdelivr.net/npm/busuanzi.pure@2.3.0/busuanzi.pure.mini.js';
									fallbackScript.defer = true;
									fallbackScript.onload = () => {
										console.log('不蒜子备用脚本加载成功');
										this.isLoaded = true;
										setTimeout(() => {
											this.cacheData();
										}, 500);
									};
									fallbackScript.onerror = () => {
										console.error('不蒜子备用脚本加载失败');
										this.retry();
									};
									document.head.appendChild(fallbackScript);
								}

								// 重试机制
								retry() {
									if (this.retryCount < this.maxRetries) {
										this.retryCount++;
										const delay = this.retryDelay * Math.pow(2, this.retryCount - 1);
										console.log('不蒜子加载失败，' + delay + 'ms 后重试 (' + this.retryCount + '/' + this.maxRetries + ')');
										setTimeout(() => {
											this.loadScript();
										}, delay);
									} else {
										console.error('不蒜子加载失败，已达到最大重试次数');
										// 显示缓存数据或默认值
										this.showCachedData();
									}
								}

								// 缓存数据
								cacheData() {
									try {
										const sitePv = document.getElementById('busuanzi_value_site_pv')?.textContent;
										const siteUv = document.getElementById('busuanzi_value_site_uv')?.textContent;
										const pagePv = document.getElementById('busuanzi_value_page_pv')?.textContent;

										if (sitePv || siteUv || pagePv) {
											const data = {
												sitePv,
												siteUv,
												pagePv,
												timestamp: Date.now()
											};
											localStorage.setItem('busuanzi_cache', JSON.stringify(data));
										}
									} catch (error) {
										console.error('缓存不蒜子数据失败:', error);
									}
								}

								// 显示缓存数据
								showCachedData() {
									try {
										const cached = localStorage.getItem('busuanzi_cache');
										if (cached) {
											const data = JSON.parse(cached);
											const now = Date.now();
											// 缓存有效期24小时
											if (now - data.timestamp < 24 * 60 * 60 * 1000) {
												if (data.sitePv && document.getElementById('busuanzi_value_site_pv')) {
													document.getElementById('busuanzi_value_site_pv').textContent = data.sitePv;
												}
												if (data.siteUv && document.getElementById('busuanzi_value_site_uv')) {
													document.getElementById('busuanzi_value_site_uv').textContent = data.siteUv;
												}
												if (data.pagePv && document.getElementById('busuanzi_value_page_pv')) {
													document.getElementById('busuanzi_value_page_pv').textContent = data.pagePv;
												}
											}
										}
									} catch (error) {
										console.error('读取缓存数据失败:', error);
									}
								}
							}

							// 初始化不蒜子加载器
							const busuanziLoader = new BusuanziLoader();
							busuanziLoader.init();
						}
					`
				}} />
			</body>
		</html>
	);
}
