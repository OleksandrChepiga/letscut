// --- 1. Логіка завантаження та переходів сторінок ---
function showPage() {
    document.body.classList.add('loaded');
}

if (document.readyState === 'complete') {
    showPage();
} else {
    window.addEventListener('load', showPage);
}

window.addEventListener('pageshow', (event) => {
    if (event.persisted) showPage();
});

setTimeout(() => {
    if (!document.body.classList.contains('loaded')) {
        showPage();
    }
}, 1500);

document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.hostname !== window.location.hostname || link.hash || link.target === "_blank") return;

        e.preventDefault();
        const target = link.href;
        document.body.classList.remove('loaded');

        setTimeout(() => {
            window.location.href = target;
        }, 500);
    });
});


// --- 3. Акордеон FAQ ---
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq__question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq__answer');
            const isActive = faqItem.classList.contains('faq__item--active');

            document.querySelectorAll('.faq__item').forEach(item => {
                if (item !== faqItem && item.classList.contains('faq__item--active')) {
                    item.classList.remove('faq__item--active');
                    const otherAnswer = item.querySelector('.faq__answer');
                    otherAnswer.style.maxHeight = null;
                }
            });

            faqItem.classList.toggle('faq__item--active');

            if (faqItem.classList.contains('faq__item--active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });
});


// --- 4. Кнопка "Нагору" ---
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('back-to-top--show');
        } else {
            backToTopBtn.classList.remove('back-to-top--show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}


// --- 5. Анімації при скролі (Animate.css + IntersectionObserver) ---
(function initScrollAnimations() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const elements = document.querySelectorAll('[data-animate]');
    if (!elements.length) return;

    if (prefersReduced) {
        elements.forEach(el => el.style.opacity = '');
        return;
    }

    elements.forEach(el => {
        el.style.opacity = '0';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            const animClass = el.dataset.animate;
            const delay = Number(el.dataset.delay) || 0;

            setTimeout(() => {
                el.style.opacity = '';
                el.classList.add('animate__animated', 'animate__fast', animClass);
            }, delay);

            observer.unobserve(el);
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -48px 0px',
    });

    elements.forEach(el => observer.observe(el));
})();


// --- 6. Активний розділ у навігації ---
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section, main > div[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 70)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('nav__link--active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('nav__link--active');
            }
        });
    });
});
