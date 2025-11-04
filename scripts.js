
        document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.scroll-animate');

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // запускаем анимацию
                obs.unobserve(entry.target);           // больше не трогаем
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(el => observer.observe(el));
});
            
            // Обработчик кнопки "Оставить заявку" в хедере
            const headerButton = document.querySelector('header .btn-primary');
            if (headerButton && headerButton.textContent.includes('Оставить заявку')) {
                headerButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => {
                        document.getElementById('contact-name').focus();
                    }, 500);
                });
            }
            
            // Плавный скролл для фиксированного меню
            const fixedMenuItems = document.querySelectorAll('.fixed-menu-item');
            fixedMenuItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            });
            
            // Intersection Observer для анимаций при прокрутке
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            // Наблюдаем за всеми элементами с классом scroll-animate
            const animateElements = document.querySelectorAll('.scroll-animate');
            animateElements.forEach(el => {
                observer.observe(el);
            });
            
            // Автоматически добавляем классы к элементам
            const sections = document.querySelectorAll('section');
            sections.forEach((section, index) => {
                if (!section.querySelector('h2')) return;
                const h2 = section.querySelector('h2');
                if (!h2.classList.contains('scroll-animate')) {
                    h2.classList.add('scroll-animate', 'animate-fade-up');
                }
            });
            
            // Анимируем карточки товаров
            const cards = document.querySelectorAll('.product-card');
            cards.forEach((card, index) => {
                card.classList.add('scroll-animate', 'animate-fade-up', `delay-${(index % 6) + 1}`);
            });
            
            // Анимируем карточки в секции "О нас"
            const aboutCards = document.querySelectorAll('#about .col-md-6');
            aboutCards.forEach((card, index) => {
                card.classList.add('scroll-animate', 'animate-fade-up', `delay-${index + 1}`);
            });
            
            // Анимируем форму
            const contactFormAnimate = document.querySelector('#contact-form');
            if (contactFormAnimate) {
                contactFormAnimate.classList.add('scroll-animate', 'animate-scale');
            }
            
            // Анимируем контактную информацию
            const contactInfo = document.querySelector('.contact-info');
            if (contactInfo) {
                contactInfo.classList.add('scroll-animate', 'animate-fade-up', 'delay-2');
            }
            
            // Анимируем текстовые блоки в секции "О нас"
            const aboutTexts = document.querySelectorAll('#about p, #about h3, #about h4');
            aboutTexts.forEach((text, index) => {
                text.classList.add('scroll-animate', 'animate-fade-up', `delay-${(index % 4) + 1}`);
            });
            
            // Обработчик кнопок "Купить"
            const buyButtons = document.querySelectorAll('.btn-primary');
            buyButtons.forEach(button => {
                if (button.textContent === 'Купить') {
                    button.addEventListener('click', function(e) {
                        e.preventDefault();
                        const card = this.closest('.card');
                        const productName = card.querySelector('.card-title').textContent;
                        alert(`Товар "${productName}" добавлен в корзину!`);
                    });
                }
            });
            
            // Обработка формы обратной связи
            const contactForm = document.querySelector('#contact-form');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const name = document.querySelector('#contact-name').value.trim();
                    const phone = document.querySelector('#contact-phone').value.trim();
                    const email = document.querySelector('#contact-email').value.trim();
                    const message = document.querySelector('#contact-message').value.trim();
                    
                    // Валидация обязательных полей
                    if (!name || !phone || !email) {
                        alert('Пожалуйста, заполните все обязательные поля!');
                        return;
                    }
                    
                    // Проверка имени
                    if (name.length < 2) {
                        alert('Имя должно содержать минимум 2 символа!');
                        return;
                    }
                    
                    // Проверка email
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(email)) {
                        alert('Пожалуйста, введите корректный email адрес!');
                        return;
                    }
                    
                    // Проверка телефона
                    const phoneRegex = /^[\+]?[7]?[0-9\s\-\(\)]{10,}$/;
                    if (!phoneRegex.test(phone)) {
                        alert('Пожалуйста, введите корректный номер телефона!');
                        return;
                    }
                    
                    // Показываем индикатор загрузки
                    const submitButton = contactForm.querySelector('button[type="submit"]');
                    const originalText = submitButton.innerHTML;
                    submitButton.disabled = true;
                    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right: 8px;"></i> Отправка...';
                    
                    // Имитация отправки
                    setTimeout(() => {
                        const messageText = message ? `\n\nВаше сообщение: ${message}` : '';
                        alert(`Спасибо, ${name}!\n\nВаша заявка успешно отправлена. Мы свяжемся с вами по телефону ${phone} или email ${email} в ближайшее время.${messageText}`);
                        
                        // Очистка формы
                        contactForm.reset();
                        
                        // Восстанавливаем кнопку
                        submitButton.disabled = false;
                        submitButton.innerHTML = originalText;
                    }, 1500);
                });
            }
        });
