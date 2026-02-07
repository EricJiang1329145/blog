// 按钮波纹效果实现
export function initButtonRipple() {
    const buttons = document.querySelectorAll('.btn-strong-interactive');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e: Event) => {
            // 创建波纹元素
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const mouseEvent = e as MouseEvent;
            const x = mouseEvent.clientX - rect.left - size / 2;
            const y = mouseEvent.clientY - rect.top - size / 2;
            
            // 设置波纹样式
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');
            
            // 添加波纹到按钮
            button.appendChild(ripple);
            
            // 动画结束后移除波纹
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// 脚注点击事件处理
export function initFootnoteEffects() {
    if (typeof window === 'undefined') return;
    
    const footnoteButtons = document.querySelectorAll('.footnote-button');
    
    footnoteButtons.forEach(button => {
        button.addEventListener('click', (e: Event) => {
            e.preventDefault();
            
            const footnoteId = button.getAttribute('data-footnote-id');
            if (!footnoteId) return;
            
            // 查找对应的工具提示
            const tooltip = document.getElementById(`footnote-tooltip-${footnoteId}`);
            if (!tooltip) return;
            
            // 切换工具提示显示/隐藏
            if (tooltip.style.display === 'block') {
                tooltip.style.display = 'none';
            } else {
                // 隐藏所有其他脚注工具提示
                document.querySelectorAll('.footnote-tooltip').forEach(el => {
                    (el as HTMLElement).style.display = 'none';
                });
                
                // 显示当前脚注工具提示
                tooltip.style.display = 'block';
                
                // 填充脚注内容
                const footnoteDefinition = document.getElementById(`footnote-${footnoteId}`);
                if (footnoteDefinition) {
                    tooltip.innerHTML = footnoteDefinition.innerHTML;
                }
            }
        });
    });
    
    // 点击其他地方关闭脚注工具提示
    document.addEventListener('click', (e: Event) => {
        if (!(e.target as HTMLElement).closest('.footnote-ref')) {
            document.querySelectorAll('.footnote-tooltip').forEach(el => {
                (el as HTMLElement).style.display = 'none';
            });
        }
    });
}

// 初始化所有按钮效果
export function initAllButtonEffects() {
    // 等待 DOM 加载完成
    if (typeof window !== 'undefined') {
        const initEffects = () => {
            initButtonRipple();
            initFootnoteEffects();
        };
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initEffects);
        } else {
            initEffects();
        }
    }
}
