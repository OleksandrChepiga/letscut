const SERVER_URL = "https://letscut-ur97.onrender.com";

// 1. Словник опцій для оновлення v1.0.3 (По одній головній фічі)
const extraOptions = {
    'Shorts': { 
        id: 'opt-sub', 
        label: 'Динамічні субтитри (+80 грн)', 
        key: 'Subtitles',
        desc: 'Стилізовані субтитри з анімацією для підвищення утримання глядачів.'
    },
    'Video': { 
        id: 'opt-sfx', 
        label: 'Професійний саунд-дизайн SFX (+150 грн)', 
        key: 'SFX Design',
        desc: 'Додавання звукових ефектів (переходи, акценти) для "живої" картинки.'
    },
    'Unique': { 
        id: 'opt-fast', 
        label: 'Термінове виконання 24г (+50%)', 
        key: 'Fast Delivery',
        desc: 'Ваш проєкт стає пріоритетним і виконується протягом доби.'
    }
};

// Функція генерації ID замовлення
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

    // Елементи форми
    const urlParams = new URLSearchParams(window.location.search);
    const tariffFromUrl = urlParams.get('tariff') || 'Unique';
    const tariffHiddenInput = document.getElementById('tariff-select');
    const tariffDisplay = document.getElementById('tariff-display');
    const optionsContainer = document.getElementById('dynamic-options-container');
    const orderForm = document.getElementById('complex-order-form');
    const sendBtn = document.getElementById('send-btn');
    const btnText = sendBtn ? sendBtn.querySelector('span') : null;

    const tariffNames = {
        'Shorts': 'Shorts (Формат 9/16)',
        'Video': 'Video (Формат 16/9)',
        'Unique': 'Unique (Свій формат)'
    };

    // --- ФУНКЦІЯ РЕНДЕРУ ДИНАМІЧНОГО ЧЕКБОКСА ---
    function renderExtraOption(tariff) {
        if (!optionsContainer) return;
        const opt = extraOptions[tariff];
        
        if (!opt) {
            optionsContainer.innerHTML = '';
            return;
        }

        optionsContainer.innerHTML = `
            <div class="form-group full-width copyright-box">
                <div class="checkbox-container">
                    <input type="checkbox" name="extra_service" id="${opt.id}">
                    <div class="checkbox-text">
                        <p class="checkbox-header">${opt.label}</p>
                        <p class="checkbox-desc">${opt.desc}</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Автозаповнення тарифу при завантаженні
    if (tariffHiddenInput && tariffDisplay) {
        tariffHiddenInput.value = tariffFromUrl;
        tariffDisplay.value = tariffNames[tariffFromUrl] || tariffFromUrl; 
        renderExtraOption(tariffFromUrl); // Малюємо чекбокс відразу
    }

    // Обробка відправки форми
    if (orderForm) {
        orderForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            if (sendBtn) {
                sendBtn.disabled = true;
                if (btnText) btnText.innerText = 'Надсилаємо...';
            }

            const currentOrderID = generateOrderID();
            const currentTariff = document.getElementById('tariff-select').value;
            
            // Перевіряємо, чи вибрана додаткова послуга
            const extraCheck = document.querySelector('input[name="extra_service"]');
            const isExtraSelected = extraCheck && extraCheck.checked;

            const templateParams = {
                order_id: currentOrderID,
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                tariff: currentTariff,
                deadline: document.getElementById('deadline').value,
                link: document.getElementById('link').value,
                music: document.getElementById('music').value || "Не вказано",
                message: document.getElementById('message').value,
                // Нове поле для сервера:
                extra_service: isExtraSelected ? extraOptions[currentTariff].key : "Ні"
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

    // Маска телефону
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
