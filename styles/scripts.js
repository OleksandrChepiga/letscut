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