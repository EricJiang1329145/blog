// 鼠标跟随效果
function initMouseFollowEffect() {
    const glassElements = document.querySelectorAll('.glass-effect-animated');
    
    glassElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            element.style.setProperty('--mouse-x', `${x}px`);
            element.style.setProperty('--mouse-y', `${y}px`);
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.setProperty('--mouse-x', '50%');
            element.style.setProperty('--mouse-y', '50%');
        });
    });
}

// 卡片悬停效果
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// 按钮点击效果
function initButtonEffects() {
    const buttons = document.querySelectorAll('.glass-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // 创建点击波纹效果
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 背景图片切换功能
function initBackgroundToggle() {
    const toggle = document.getElementById('background-toggle');
    const body = document.body;
    
    toggle.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('with-background-image');
        } else {
            body.classList.remove('with-background-image');
        }
    });
}

// 初始化所有效果
function initAllEffects() {
    initMouseFollowEffect();
    initCardHoverEffects();
    initButtonEffects();
    initSmoothScroll();
    initBackgroundToggle();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initAllEffects);

// 窗口大小变化时重新计算
window.addEventListener('resize', () => {
    // 可以在这里添加需要在窗口大小变化时重新计算的逻辑
});

// 滚动效果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('body::before');
    const speed = scrolled * 0.5;
    
    // 这里可以添加视差滚动效果
});
