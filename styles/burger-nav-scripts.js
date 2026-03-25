document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.getElementById('burger-btn');
    const navMenu = document.getElementById('nav-menu');

    if (!burgerBtn || !navMenu) return;

    const navLinks = document.querySelectorAll('#nav-menu .nav__link');

    const toggleMenu = () => {
        navMenu.classList.toggle('nav__menu--active');
        burgerBtn.classList.toggle('nav__burger--open');
    };

    burgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('nav__menu--active');
            burgerBtn.classList.remove('nav__burger--open');
        });
    });

    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('nav__menu--active') && !navMenu.contains(e.target)) {
            navMenu.classList.remove('nav__menu--active');
            burgerBtn.classList.remove('nav__burger--open');
        }
    });
});

window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');

    if (!preloader) return;

    setTimeout(() => {
        preloader.classList.add('preloader-hidden');

        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 300);
});
