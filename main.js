document.addEventListener('DOMContentLoaded', () => {
    const eyeIcon = document.querySelector('.eye-icon');
    const passwordInput = document.querySelector('input[type="password"]');
    const idInput = document.querySelector('input[type="text"]');
    const form = document.querySelector('.login-form');
    const submitBtn = document.querySelector('.btn-submit');
    
    // Til uchun tarjimalar
    const translations = {
        uz: {
            title: "Spacega xush kelibsiz",
            offerText: "Offerta imzolash",
            student: "O'quvchiman",
            parent: "Ota-onaman",
            idPlaceholder: "Modme Id yoki telefon raqam",
            passwordPlaceholder: "Parol",
            qrText: "QR code orqali kirish",
            submit: "Tasdiqlash",
            loading: "Yuklanmoqda...",
            error: "Xatolik yuz berdi. Qaytadan urinib ko'ring",
            success: "Muvaffaqiyatli kirdingiz!",
            validation: "Iltimos, barcha maydonlarni to'g'ri to'ldiring!"
        },
        ru: {
            title: "Добро пожаловать в Space",
            offerText: "Подписать оферту",
            student: "Я ученик",
            parent: "Я родитель",
            idPlaceholder: "Modme Id или номер телефона",
            passwordPlaceholder: "Пароль",
            qrText: "Войти через QR код",
            submit: "Подтвердить",
            loading: "Загрузка...",
            error: "Произошла ошибка. Попробуйте снова",
            success: "Вы успешно вошли!",
            validation: "Пожалуйста, правильно заполните все поля!"
        },
        en: {
            title: "Welcome to Space",
            offerText: "Sign the offer",
            student: "I'm a student",
            parent: "I'm a parent",
            idPlaceholder: "Modme Id or phone number",
            passwordPlaceholder: "Password",
            qrText: "Login with QR code",
            submit: "Submit",
            loading: "Loading...",
            error: "An error occurred. Please try again",
            success: "Successfully logged in!",
            validation: "Please fill all fields correctly!"
        }
    };

    // Til o'zgartirish funksiyasi
    function changeLang(lang) {
        // Tugmalarni yangilash
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Matnlarni yangilash
        const t = translations[lang];
        document.querySelector('h1').textContent = t.title;
        document.querySelector('.offer-text').textContent = t.offerText;
        document.querySelector('.btn-secondary').textContent = t.student;
        document.querySelector('.btn-primary').textContent = t.parent;
        document.querySelector('input[type="text"]').placeholder = t.idPlaceholder;
        document.querySelector('input[type="password"]').placeholder = t.passwordPlaceholder;
        document.querySelector('.qr-text').textContent = t.qrText;
        document.querySelector('.btn-submit').textContent = t.submit;

        // Tilni saqlash
        localStorage.setItem('preferredLanguage', lang);
    }

    // Til tanlash tugmalariga event listener qo'shish
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => changeLang(btn.dataset.lang));
    });

    // Saqlangan tilni yuklash
    const savedLang = localStorage.getItem('preferredLanguage') || 'uz';
    changeLang(savedLang);
    
    // Parolni ko'rsatish/yashirish funksiyasi
    eyeIcon.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        eyeIcon.textContent = type === 'password' ? '👁' : '👁‍🗨';
    });
    
    // Input maydonlarini tekshirish
    function validateInputs() {
        const isIdValid = idInput.value.trim().length >= 3;
        const isPasswordValid = passwordInput.value.value.trim().length >= 6;
        
        submitBtn.disabled = !(isIdValid && isPasswordValid);
        submitBtn.style.opacity = submitBtn.disabled ? '0.5' : '1';
        
        return isIdValid && isPasswordValid;
    }
    
    // Input o'zgarishlarini kuzatish
    [idInput, passwordInput].forEach(input => {
        input.addEventListener('input', validateInputs);
    });
    
    // Forma yuborilganda
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const currentLang = localStorage.getItem('preferredLanguage') || 'uz';
        const t = translations[currentLang];
        
        if (!validateInputs()) {
            alert(t.validation);
            return;
        }
        
        submitBtn.textContent = t.loading;
        submitBtn.disabled = true;
        
        try {
            // API call simulation
            setTimeout(() => {
                alert(t.success);
                submitBtn.textContent = t.submit;
                submitBtn.disabled = false;
            }, 1500);
            
        } catch (error) {
            alert(t.error);
            submitBtn.textContent = t.submit;
            submitBtn.disabled = false;
        }
    });
    
    // Boshlang'ich validatsiya
    validateInputs();
});