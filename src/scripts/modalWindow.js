(() => {
    const openModalHandler = document.querySelectorAll('.open-modal');
    const closeModalHandler = document.querySelectorAll('.close-modal');
    const modal = document.querySelector('.modal-wrapper');
    const phoneInput = document.querySelector('[data-phone-pattern]');
    const patterPhone = phoneInput.getAttribute('[data-phone-pattern]');
    const feedbackForm = document.querySelector('.feedback-form');

    openModalHandler.forEach((elem) => {
        elem.addEventListener('click', () => {
            modal.classList.add('active');
        })
    });

    closeModalHandler.forEach((elem) => {
        elem.addEventListener('click', () => {
            modal.classList.remove('active');
        })
    });

    feedbackForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formattedPhoneNumber = phoneInput.value.replace(/[\s()-]/g, "");

        if (!validatePhoneNumber(formattedPhoneNumber)) {
            alert('Введите корректный номер телефона.');
            return;
        }

        const firstName = document.getElementById('first-name').value;
        const message = document.getElementById('message').value;

        if (!validateName(firstName)) {
            alert('Введите корректное имя.');
            return;
        }

        if (!validateMessage(message)) {
            alert('Введите корректное сообщение.');
            return;
        }

        const formData = {
            phoneNumber: formattedPhoneNumber,
            firstName: firstName,
            message: message
        };

        sendFormData(formData);
    });


// Маска для телефона
    const applyPhoneMask = (e) => {
        let el = e.target,
            clearVal = el.dataset.phoneClear,
            pattern = el.dataset.phonePattern,
            matrix_def = patterPhone,
            matrix = pattern ? pattern : matrix_def,
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = e.target.value.replace(/\D/g, "");
        if (clearVal !== 'false' && e.type === 'blur') {
            if (val.length < matrix.match(/([\_\d])/g).length) {
                e.target.value = '';
                return;
            }
        }
        if (def.length >= val.length) val = def;
        e.target.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });
    }

// Добавляем маску для поля "Номер телефона"
    for (let ev of ['input', 'blur', 'focus']) {
        phoneInput.addEventListener(ev, applyPhoneMask);
    }

// Валидация номера телефона
    function validatePhoneNumber(phoneNumber) {
        return /^\+7\d{10}$/.test(phoneNumber);
    }

// Валидация имени
    function validateName(name) {
        return /^[A-Za-zА-Яа-яёЁ\s]+$/.test(name);
    }

// Валидация сообщения
    function validateMessage(message) {
        return message !== '';
    }

    function sendFormData(formData) {
        const data = new Blob([JSON.stringify(formData)], {type: 'application/json'});
        window.open(window.URL.createObjectURL(data))
        modal.classList.remove('active');
    }
})()