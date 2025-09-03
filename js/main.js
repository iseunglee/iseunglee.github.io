// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    // 현재 페이지에 맞는 네비게이션 활성화
    setActiveNavigation();
    
    // 연락처 폼이 있으면 이벤트 리스너 추가
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // 스크롤 애니메이션
    observeScrollAnimations();
});

// 현재 페이지에 맞는 네비게이션 메뉴 활성화
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// 연락처 폼 제출 처리
function handleContactForm(e) {
    e.preventDefault();
    
    // 폼 데이터 가져오기
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // 실제로는 여기서 서버로 데이터를 전송해야 합니다
    console.log('폼 데이터:', formData);
    
    // 임시 알림
    alert('메시지가 전송되었습니다! (아직 실제로 전송되지는 않습니다)');
    
    // 폼 초기화
    e.target.reset();
}

// 스크롤 애니메이션을 위한 Intersection Observer
function observeScrollAnimations() {
    // 애니메이션을 적용할 요소들
    const animatedElements = document.querySelectorAll('.project-card, .portfolio-item, .post-preview, .skill-category');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});