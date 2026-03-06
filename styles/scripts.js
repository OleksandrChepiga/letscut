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

// --- 2. Логіка активних пунктів меню та Модального вікна (об'єднано) ---
document.addEventListener("DOMContentLoaded", function() {
    
    // Активне посилання в меню
    const currentPath = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath === linkPath || (currentPath === "" && linkPath === "index.html")) {
            link.classList.add('active');
        }
    });

    // МОДАЛЬНЕ ВІКНО
    const modal = document.getElementById("orderModal");
    const openBtns = document.querySelectorAll(".open-modal");
    const closeBtn = document.querySelector(".modal-close");

    if (!modal) return; // Запобіжник, якщо на сторінці немає модалки

    function openModal(e) {
        if (e) e.preventDefault();
        modal.classList.add("active");
        document.body.style.overflow = "hidden"; 
    }

    function closeModal() {
        modal.classList.remove("active");
        document.body.style.overflow = ""; 
    }

    // Відкриття при кліку на будь-яку кнопку "Замовити"
    openBtns.forEach(btn => btn.addEventListener("click", openModal));

    // Закриття на хрестик
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    // Закриття при кліку на фон (оверлей)
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    // Закриття при натисканні Escape (дуже зручно)
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');

            // Закриваємо інші відкриті блоки (акордеон)
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.maxHeight = '0';
                }
            });

            // Перемикаємо стан поточного блоку
            faqItem.classList.toggle('active');

            if (faqItem.classList.contains('active')) {
                // Встановлюємо точну висоту контенту для плавної анімації
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                // Повертаємо в нуль
                answer.style.maxHeight = '0';
            }
        });
    });
});

const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    // Якщо прокрутили більше ніж на 300px — показуємо кнопку
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    // Плавне повернення до блоку #hero
    document.getElementById('hero').scrollIntoView({
        behavior: 'smooth'
    });
});

// 1. Ініціалізація (обов'язково на самому початку)
(function() {
    emailjs.init("cIo6JxlEn9768loOM");
})();

document.addEventListener('DOMContentLoaded', function() {
    const selectWrapper = document.getElementById('serviceSelect');
    const trigger = selectWrapper.querySelector('.custom-select-trigger');
    const options = selectWrapper.querySelectorAll('.custom-option');
    const hiddenInput = document.getElementById('serviceInput');
    const triggerText = trigger.querySelector('span');
    const form = document.getElementById('order-form');

    // Відкриття/Закриття
    trigger.addEventListener('click', function() {
        selectWrapper.classList.toggle('open');
    });

    // Вибір опції
    options.forEach(option => {
        option.addEventListener('click', function() {
            const val = this.getAttribute('data-value');
            if(val !== "") {
                triggerText.innerText = this.innerText;
                hiddenInput.value = val;
                options.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
            }
            selectWrapper.classList.remove('open');
        });
    });

    // Закриття при кліку зовні
    window.addEventListener('click', function(e) {
        if (!selectWrapper.contains(e.target)) {
            selectWrapper.classList.remove('open');
        }
    });

    // Відправка форми через EmailJS
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Перевірка на обраний тариф
        if (!hiddenInput.value) {
            alert('Будь ласка, оберіть тариф!');
            return;
        }

        const btn = document.getElementById('submit-btn');
        const originalText = btn.textContent;

        btn.textContent = 'Відправка...';
        btn.disabled = true;

        emailjs.sendForm('service_4htf3z6', 'template_ffoio0q', this)
            .then(function() {
                alert('Дякую! Ваша заявка отримана.');
                btn.textContent = originalText;
                btn.disabled = false;
                form.reset();
                triggerText.innerText = 'Оберіть тариф...';
                hiddenInput.value = '';
            }, function(error) {
                alert('Помилка: ' + JSON.stringify(error));
                btn.textContent = originalText;
                btn.disabled = false;
            });
    });
});