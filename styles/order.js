const SERVER_URL = "https://letscut-ur97.onrender.com"; // Перевір, щоб це було посилання з твого Render

function generateOrderID() {
    const now = new Date();
    const datePart = now.getFullYear().toString().slice(-2) + 
                     (now.getMonth() + 1).toString().padStart(2, '0') + 
                     now.getDate().toString().padStart(2, '0');
    return `LC-${datePart}-${Math.floor(100 + Math.random() * 900)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    // Будимо сервер
    fetch(`${SERVER_URL}/ping`).catch(() => {});

    const orderForm = document.getElementById('complex-order-form');
    const sendBtn = document.getElementById('send-btn');
    const btnText = sendBtn ? sendBtn.querySelector('span') : null;

    if (orderForm) {
        orderForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            if (sendBtn) {
                sendBtn.disabled = true;
                if (btnText) btnText.innerText = 'Надсилаємо...';
            }

            // Збираємо дані точно по твоїх ID
            const currentOrderID = generateOrderID();
            const copyrightCheck = document.getElementById('copyright-check');
            
            const templateParams = {
                order_id: currentOrderID,
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                tariff: document.getElementById('tariff-select').value, // Було tariff, стало tariff-select
                deadline: document.getElementById('deadline').value,
                link: document.getElementById('link').value,
                music: document.getElementById('music').value || "Не вказано",
                message: document.getElementById('message').value,
                copyright_transfer: (copyrightCheck && copyrightCheck.checked) ? "Так (+5%)" : "Ні"
            };

            try {
                const response = await fetch(`${SERVER_URL}/send-order`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(templateParams)
                });

                if (response.ok) {
                    sessionStorage.setItem('orderSubmitted', 'true');
                    sessionStorage.setItem('lastOrderID', currentOrderID);
                    window.location.href = '/success'; 
                } else {
                    throw new Error('Помилка сервера');
                }
            } catch (err) {
                alert('Сталася помилка. Сервер прокидається (це займає до 1 хв). Спробуйте ще раз.');
                if (sendBtn) {
                    sendBtn.disabled = false;
                    if (btnText) btnText.innerText = 'Надіслати';
                }
            }
        });
    }

    // Твій код маски телефону (залишаємо без змін)
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); 
            if (value.length > 9) value = value.slice(0, 9);
            let formattedValue = '';
            if (value.length > 0) formattedValue += '(' + value.substring(0, 2);
            if (value.length >= 2) formattedValue += ') ';
            if (value.length > 2) formattedValue += value.substring(2, 5);
            if (value.length > 5) formattedValue += ' ' + value.substring(5, 7);
            if (value.length > 7) formattedValue += ' ' + value.substring(7, 9);
            e.target.value = formattedValue;
        });
    }
});
