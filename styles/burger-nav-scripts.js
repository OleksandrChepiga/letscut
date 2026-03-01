document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.getElementById('burger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('#nav-menu a');

    // Функція відкриття/закриття
    const toggleMenu = () => {
        navMenu.classList.toggle('active');
        burgerBtn.classList.toggle('open');
    };

    // Клік по бургеру
    burgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Закриваємо меню при натисканні на будь-яке посилання
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            burgerBtn.classList.remove('open');
        });
    });

    // Закриваємо меню при кліку в будь-якому місці екрана за межами меню
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            burgerBtn.classList.remove('open');
        }
    });
});

window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    
    // Додаємо невелику затримку (наприклад, 300мс), щоб перехід був плавнішим
    setTimeout(() => {
        preloader.classList.add('preloader-hidden');
        
        // Повністю видаляємо його з коду через 0.5с (після завершення анімації)
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 300);
});