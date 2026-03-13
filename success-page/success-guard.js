// Перевірка: чи прийшов користувач після відправки форми
if (sessionStorage.getItem('orderSubmitted') !== 'true') {
    // Якщо мітки немає — повертаємо на головну
    window.location.href = '/';
} else {
    // Якщо мітка є — видаляємо її, щоб не можна було зайти знову через історію/оновлення
    sessionStorage.removeItem('orderSubmitted');
}