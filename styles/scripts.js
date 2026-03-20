// --- 1. Логіка завантаження та переходів сторінок ---
function showPage() {
    document.body.classList.add('loaded');
}

window.addEventListener('load', showPage);
window.addEventListener('pageshow', (event) => {
    if (event.persisted) showPage();
});

setTimeout(() => {
    if (!document.body.classList.contains('loaded')) {
        showPage();
        console.warn("Сайт показано примусово");
    }
}, 3000);

// Плавний вихід при переході по посиланнях
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.hostname !== window.location.hostname || link.hash || link.target === "_blank") return;

        e.preventDefault();
        let target = link.href;
        document.body.classList.remove('loaded');

        setTimeout(() => {
            window.location.href = target;
        }, 500);
    });
});


// --- 3. Акордеон FAQ ---
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const isActive = faqItem.classList.contains('active');

            // Закриваємо інші відкриті блоки (акордеон)
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                    const otherAnswer = item.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = null; // Використовуємо null замість '0' для чистоти стилів
                }
            });

            // Перемикаємо стан поточного блоку
            faqItem.classList.toggle('active');

            if (faqItem.classList.contains('active')) {
                // Використовуємо scrollHeight для точного визначення висоти
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
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
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



/*Активний розділ*/
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section, main > div[id]');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Перевіряємо, чи знаходиться скрол в межах секції (з невеликим відступом 70px)
            if (pageYOffset >= (sectionTop - 70)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active-link');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active-link');
            }
        });
    });
});