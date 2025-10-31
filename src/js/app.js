(function () {
    /*----- ----- ----- ----- -----
	# Funciones
	----- ----- ----- ----- -----*/

    const GliderCreator = () => {
        const gliderConfig3Slides = {
            slidesToShow: 1,
            slidesToScroll: 1,
            scrollLock: true,
            rewind: true,

            responsive: [
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    },
                },
            ],
        };

        const gliderConfig1Slide = {
            slidesToShow: 1,
            slidesToScroll: 1,
            scrollLock: true,
            rewind: true,
        };

        document.querySelectorAll('.carousel__lista').forEach((carousel) => {
            const container = carousel.closest('.carousel');
            const prevButton = container.querySelector('.carousel__anterior');
            const nextButton = container.querySelector('.carousel__siguiente');
            const dots = container.querySelector('.carousel__indicadores');

            const glider = new Glider(carousel, {
                ...gliderConfig1Slide,
                arrows: {
                    prev: prevButton,
                    next: nextButton,
                },
                dots: dots,
            });

            // Auto-desplazamiento cada 5 segundos
            let autoplay = setInterval(() => {
                glider.scrollItem('next');
            }, 4000);

            // Pausar autoplay al interactuar
            container.addEventListener('mouseenter', () => {
                clearInterval(autoplay);
            });

            // Reanudar autoplay al dejar de interactuar
            container.addEventListener('mouseleave', () => {
                autoplay = setInterval(() => {
                    glider.scrollItem('next');
                }, 4000);
            });
        });

        document.querySelectorAll('.carousel__lista_3').forEach((carousel) => {
            const container = carousel.closest('.carousel');
            const prevButton = container.querySelector('.carousel__anterior');
            const nextButton = container.querySelector('.carousel__siguiente');
            const dots = container.querySelector('.carousel__indicadores');

            const glider = new Glider(carousel, {
                ...gliderConfig3Slides,
                arrows: {
                    prev: prevButton,
                    next: nextButton,
                },
                dots: dots,
            });

            // Auto-desplazamiento cada 5 segundos
            let autoplay = setInterval(() => {
                glider.scrollItem('next');
            }, 4000);

            // Pausar autoplay al interactuar
            container.addEventListener('mouseenter', () => {
                clearInterval(autoplay);
            });

            // Reanudar autoplay al dejar de interactuar
            container.addEventListener('mouseleave', () => {
                autoplay = setInterval(() => {
                    glider.scrollItem('next');
                }, 4000);
            });
        });
    };

    const Calendario = () => {
        const checkCalendario = document.querySelector('.calendar');
        if (document.body.contains(checkCalendario)) {
            const monthYearElement = document.getElementById('monthYear'),
                datesElement = document.getElementById('dates'),
                eventsContainer = document.getElementById('eventsContainer'),
                prevBtn = document.getElementById('prevBtn'),
                nextBtn = document.getElementById('nextBtn');

            let currentDate = new Date();
            const events = [
                {
                    date: '2025-11-04',
                    title: 'Navidad',
                    description: 'Celebración de la Navidad',
                },
                {
                    date: '2025-11-05',
                    title: 'Fin de Año',
                    description: 'Cena de fin de año con familia',
                },
            ];

            const updateCalendar = () => {
                const currentYear = currentDate.getFullYear(),
                    currentMonth = currentDate.getMonth();

                const firstDay = new Date(currentYear, currentMonth, 1),
                    lastDay = new Date(currentYear, currentMonth + 1, 0),
                    totalDays = lastDay.getDate(),
                    firstDayIndex = firstDay.getDay(),
                    lastDayIndex = lastDay.getDay();

                const monthYearString = currentDate.toLocaleString('default', {
                    month: 'long',
                    year: 'numeric',
                });
                monthYearElement.textContent = monthYearString;

                let datesHTML = '';

                for (let i = firstDayIndex; i > 0; i--) {
                    const prevDate = new Date(currentYear, currentMonth, -i + 1);
                    datesHTML += `<div class="calendar__date inactive">${prevDate.getDate()}</div>`;
                }

                for (let i = 1; i <= totalDays; i++) {
                    const date = new Date(currentYear, currentMonth, i);
                    const formattedDate = date.toISOString().split('T')[0];
                    const hasEvent = events.some((event) => event.date === formattedDate);
                    const activeClass =
                        date.toDateString() === new Date().toDateString() ? 'active' : '';
                    const eventClass = hasEvent ? 'event' : '';
                    datesHTML += `<div class="calendar__date ${activeClass} ${eventClass}" data-date="${formattedDate}">${i}</div>`;
                }

                for (let i = 1; i <= 6 - lastDayIndex; i++) {
                    const nextDate = new Date(currentYear, currentMonth + 1, i);
                    datesHTML += `<div class="calendar__date inactive">${nextDate.getDate()}</div>`;
                }

                datesElement.innerHTML = datesHTML;

                attachDateClickListeners();
            };

            const attachDateClickListeners = () => {
                const dateElements = document.querySelectorAll('.calendar__date');
                dateElements.forEach((dateElement) => {
                    dateElement.addEventListener('click', () => {
                        const selectedDate = dateElement.getAttribute('data-date');
                        showEvents(selectedDate);
                    });
                });
            };

            const formatDate = (dateString) => {
                const date = new Date(dateString);
                const day = String(date.getDate() + 1);
                const month = String(date.getMonth() + 1); // Los meses comienzan desde 0
                const year = String(date.getFullYear()); // Año completo (YYYY)
                return `${day}/${month}/${year}`;
            };

            const showEvents = (date) => {
                const filteredEvents = events.filter((event) => event.date === date);
                eventsContainer.innerHTML = '';

                if (filteredEvents.length === 0) {
                    eventsContainer.innerHTML =
                        '<p class="m-0 fw-bold">No hay eventos para este día.</p>';
                } else {
                    filteredEvents.forEach((event) => {
                        eventsContainer.innerHTML += `
                        <div class="calendar__event">
                            <p class="calendar__event-date">${formatDate(event.date)}</p>
                            <p class="calendar__event-title">${event.title}</p>
                            <p class="calendar__event-description">${
                                event.description
                            }</p>
                        </div>`;
                    });
                }
            };

            prevBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                updateCalendar();
            });

            nextBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                updateCalendar();
            });

            updateCalendar();
        }
    };

    const LineaTiempo = () => {
        const checkLineaTiempo = document.querySelector('.timeline');
        if (document.body.contains(checkLineaTiempo)) {
            // Animación para la línea de tiempo
            document.addEventListener('DOMContentLoaded', function () {
                const timelineItems = document.querySelectorAll('.timeline__item');

                // Configuración del Intersection Observer
                const observerOptions = {
                    root: null,
                    rootMargin: '0px',
                    threshold: 0.2,
                };

                const observer = new IntersectionObserver((entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('in-view');
                            observer.unobserve(entry.target); // Deja de observar después de activarse
                        }
                    });
                }, observerOptions);

                // Observar cada elemento de la línea de tiempo
                timelineItems.forEach((item) => {
                    observer.observe(item);
                });

                // Opcional: Reanimar elementos al hacer scroll hacia arriba
                let lastScrollY = window.scrollY;
                window.addEventListener('scroll', () => {
                    const currentScrollY = window.scrollY;

                    // Si el usuario hace scroll hacia arriba
                    if (currentScrollY < lastScrollY) {
                        timelineItems.forEach((item) => {
                            const rect = item.getBoundingClientRect();
                            // Si el elemento está en el viewport
                            if (rect.top < window.innerHeight && rect.bottom > 0) {
                                item.classList.add('in-view');
                            }
                        });
                    }

                    lastScrollY = currentScrollY;
                });
            });
        }
    };

    const FuncionesFormulario = () => {
        const checkForm = document.querySelector('#loginForm');
        if (document.body.contains(checkForm)) {
            const passwordToggle = document.getElementById('passwordToggle');
            const passwordInput = document.getElementById('password');

            passwordToggle.addEventListener('click', () => {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    passwordToggle.innerHTML = '<i class="far fa-eye-slash"></i>';
                } else {
                    passwordInput.type = 'password';
                    passwordToggle.innerHTML = '<i class="far fa-eye"></i>';
                }
            });

            // Generador de CAPTCHA
            function generateCaptcha() {
                const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
                let captcha = '';
                for (let i = 0; i < 5; i++) {
                    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                return captcha;
            }

            // Actualizar CAPTCHA
            function updateCaptcha() {
                const captchaText = document.getElementById('captchaText');
                captchaText.textContent = generateCaptcha();
            }

            // Botón para actualizar CAPTCHA
            const refreshCaptcha = document.getElementById('refreshCaptcha');
            refreshCaptcha.addEventListener('click', updateCaptcha);

            // Inicializar CAPTCHA
            updateCaptcha();
        }
    };

    const BotonScrollTop = () => {
        const checkBoton = document.querySelector('.btnScrollTop');
        if (document.body.contains(checkBoton)) {
            window.addEventListener('scroll', () => {
                if (
                    document.body.scrollTop > 20 ||
                    document.documentElement.scrollTop > 20
                ) {
                    checkBoton.classList.remove('d-none');
                    checkBoton.classList.add('d-block');
                } else {
                    checkBoton.classList.remove('d-block');
                    checkBoton.classList.add('d-none');
                }
            });

            checkBoton.addEventListener('click', () => {
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            });
        }
    };

    const LightBox = () => {
        const checkGaleria = document.getElementById('lightboxImage');
        if (document.body.contains(checkGaleria)) {
            // JavaScript para manejar la navegación en el Lightbox
            const images = document.querySelectorAll('.gallery img');
            const lightboxImage = document.getElementById('lightboxImage');
            let currentIndex = 0;

            // Función para actualizar la imagen del lightbox
            const updateLightboxImage = (index) => {
                lightboxImage.src = images[index].src;
                currentIndex = index;
            };

            // Abre el modal y muestra la imagen seleccionada
            images.forEach((image, index) => {
                image.addEventListener('click', () => {
                    updateLightboxImage(index);
                });
            });

            // Navegación hacia la derecha
            document.getElementById('nextBtn').addEventListener('click', () => {
                if (currentIndex < images.length - 1) {
                    updateLightboxImage(currentIndex + 1);
                } else {
                    updateLightboxImage(0); // Vuelve al inicio si está en la última imagen
                }
            });

            // Navegación hacia la izquierda
            document.getElementById('prevBtn').addEventListener('click', () => {
                if (currentIndex > 0) {
                    updateLightboxImage(currentIndex - 1);
                } else {
                    updateLightboxImage(images.length - 1); // Vuelve a la última imagen si está en la primera
                }
            });
        }
    };

    const CifrasIncremento = () => {
        const checkCifras = document.getElementById('cifras');
        if (document.body.contains(checkCifras)) {
            // Función para animar los contadores
            function animateCounters() {
                const counters = document.querySelectorAll('.stat-number');
                const speed = 200; // Velocidad de incremento (menor = más rápido)

                counters.forEach((counter) => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    const increment = target / speed;
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.ceil(current);
                            setTimeout(updateCounter, 1);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCounter();
                });
            }

            // Detectar cuando la sección Cifras está en el viewport
            function isElementInViewport(el) {
                const rect = el.getBoundingClientRect();
                return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <=
                        (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <=
                        (window.innerWidth || document.documentElement.clientWidth)
                );
            }

            // Verificar si la sección está visible al cargar la página
            document.addEventListener('DOMContentLoaded', function () {
                const cifrasSection = document.getElementById('cifras');

                // Función para verificar visibilidad
                function checkVisibility() {
                    if (isElementInViewport(cifrasSection)) {
                        animateCounters();
                        // Remover el event listener después de activar la animación una vez
                        window.removeEventListener('scroll', checkVisibility);
                    }
                }

                // Verificar al cargar y al hacer scroll
                checkVisibility();
                window.addEventListener('scroll', checkVisibility);
            });
        }
    };

    const PopUpInfo = () => {
        const checkInicio = document.getElementById('VentanaInicio');
        if (document.body.contains(checkInicio)) {
            Swal.fire({
                imageUrl: './src/images/logotipo.png',
                imageHeight: 100,
                imageAlt: 'Logo colegio',
                html: `
                        <p class="fw-bold">Clubes escolares</p>
                        <a
                            href="#"
                            class="btn btn-primary text-white fw-bold rounded-pill w-100 mb-3"
                            >Club de naciones unidas - Masmum BQTO</a
                        >
                        <a
                            href="#"
                            class="btn btn-primary text-white fw-bold rounded-pill w-100 mb-3"
                            >Club de periodismo y redes sociales</a
                        >
                        <a
                            href="#"
                            class="btn btn-primary text-white fw-bold rounded-pill w-100 mb-3"
                            >Club de ajedrez</a
                        >
                        <a
                            href="#"
                            class="btn btn-primary text-white fw-bold rounded-pill w-100 mb-3"
                            >Club de matematicas</a
                        >
                    `,
                showCloseButton: true,
                showConfirmButton: false,
                customClass: {
                    actions: 'w-100 justify-content-end px-4',
                    popup: 'rounded-4',
                },
            });
        }
    };

    /*----- ----- ----- ----- -----
	# Declaraciones
	----- ----- ----- ----- -----*/

    window.addEventListener('load', () => {
        BotonScrollTop();
        GliderCreator();
        Calendario();
        FuncionesFormulario();
        LightBox();
        PopUpInfo();
    });
    LineaTiempo();
    CifrasIncremento();
})();
