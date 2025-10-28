(function () {
    /*----- ----- ----- ----- -----
	# Funciones
	----- ----- ----- ----- -----*/

    const GliderCreator = () => {
        const gliderConfig3Slides = {
            slidesToShow: 1,
            slidesToScroll: 1,
            scrollLock: true,

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

        const gliderConfig1SlidesBase = {
            slidesToShow: 1,
            slidesToScroll: 1,
            scrollLock: true,
        };

        document.querySelectorAll('.carousel__lista').forEach((carousel) => {
            const container = carousel.closest('.carousel');
            const prevButton = container.querySelector('.carousel__anterior');
            const nextButton = container.querySelector('.carousel__siguiente');
            const dots = container.querySelector('.carousel__indicadores');

            const glider = new Glider(carousel, {
                ...gliderConfig1SlidesBase,
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

    const MenuEstatico = () => {
        const navbar = document.getElementById('mainNavbar');
        if (document.body.contains(navbar)) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 120) {
                    navbar.classList.remove('d-none');
                } else {
                    navbar.classList.add('d-none');
                }
            });
        }
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
                    date: '2025-04-25',
                    title: 'Navidad',
                    description: 'Celebración de la Navidad',
                },
                {
                    date: '2025-04-30',
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

    const GaleriaFotos = () => {
        const checkGaleriaFotos = document.querySelector('#albumes');
        if (document.body.contains(checkGaleriaFotos)) {
            // Filtros de galería
            const filterButtons = document.querySelectorAll('.btn-filter');
            const albumCards = document.querySelectorAll('.album-card');

            filterButtons.forEach((button) => {
                button.addEventListener('click', () => {
                    // Quitar clase activa de todos los botones
                    filterButtons.forEach((btn) => btn.classList.remove('active'));

                    // Añadir clase activa al botón clicado
                    button.classList.add('active');

                    const filter = button.getAttribute('data-filter');

                    // Filtrar álbumes
                    albumCards.forEach((card) => {
                        if (
                            filter === 'all' ||
                            card.getAttribute('data-category') === filter
                        ) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });

            // Datos de las fotos
            const photos = [
                {
                    id: 1,
                    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                    title: 'Estudiantes en laboratorio',
                    date: '15 Junio, 2025',
                    description:
                        'Alumnos de secundaria realizando experimentos en nuestro moderno laboratorio de ciencias.',
                    album: 'Vida Estudiantil',
                },
                {
                    id: 2,
                    url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                    title: 'Partido de fútbol',
                    date: '20 Mayo, 2025',
                    description:
                        'Equipo de fútbol del colegio durante el torneo intercolegial regional.',
                    album: 'Eventos Deportivos',
                },
                {
                    id: 3,
                    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                    title: 'Ceremonia de graduación',
                    date: '12 Abril, 2025',
                    description:
                        'Promoción 2025 durante la ceremonia de graduación en el auditorio principal.',
                    album: 'Actos Académicos',
                },
                {
                    id: 4,
                    url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                    title: 'Presentación teatral',
                    date: '8 Marzo, 2025',
                    description:
                        "Obra teatral 'El Quijote' interpretada por el grupo de teatro estudiantil.",
                    album: 'Festival Cultural',
                },
                {
                    id: 5,
                    url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                    title: 'Robótica educativa',
                    date: '25 Febrero, 2025',
                    description:
                        'Equipo de robótica presentando su proyecto en la Feria de Ciencias anual.',
                    album: 'Feria de Ciencias',
                },
                {
                    id: 6,
                    url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                    title: 'Baloncesto escolar',
                    date: '15 Enero, 2025',
                    description:
                        'Partido de baloncesto durante el torneo intercolegial regional.',
                    album: 'Torneo Intercolegial',
                },
                {
                    id: 7,
                    url: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                    title: 'Estudiante en clase',
                    date: '10 Junio, 2025',
                    description:
                        'Estudiante resolviendo problemas matemáticos en el aula de clases.',
                    album: 'Vida Estudiantil',
                },
                {
                    id: 8,
                    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80',
                    title: 'Premiación académica',
                    date: '5 Abril, 2025',
                    description:
                        'Entrega de reconocimientos a los estudiantes con mejor desempeño académico.',
                    album: 'Actos Académicos',
                },
                {
                    id: 9,
                    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
                    title: 'Orquesta estudiantil',
                    date: '3 Marzo, 2025',
                    description:
                        'Concierto de la orquesta juvenil durante el Festival Cultural anual.',
                    album: 'Festival Cultural',
                },
            ];

            const showPhotoWithSwal = (index) => {
                const photo = photos[index];
                const isFirst = index === 0;
                const isLast = index === photos.length - 1;

                Swal.fire({
                    html: `
                        <div class='swal-gallery-container'>
                            <div class='swal-gallery-header'>
                                <h4 class='swal-gallery-title'>${photo.title}</h4>
                                <p class='swal-gallery-subtitle'>
                                    ${photo.date} - ${photo.album}
                                </p>
                            </div>

                            <div class='swal-gallery-content'>
                                <button
                                    class="swal-nav-button swal-prev-button ${
                                        isFirst ? 'swal-nav-disabled' : ''
                                    }"
                                    ${isFirst ? 'disabled' : ''}
                                >
                                    <i class='fas fa-chevron-left'></i>
                                </button>

                                <div class='swal-image-container'>
                                    <img
                                        src='${photo.url}'
                                        alt='${photo.title}'
                                        class='swal-gallery-image'
                                    />
                                </div>

                                <button
                                    class="swal-nav-button swal-next-button ${
                                        isLast ? 'swal-nav-disabled' : ''
                                    }"
                                    ${isLast ? 'disabled' : ''}
                                >
                                    <i class='fas fa-chevron-right'></i>
                                </button>
                            </div>

                            <div class='swal-gallery-footer'>
                                <p class='swal-gallery-description'>${
                                    photo.description
                                }</p>
                                <div class='swal-gallery-counter'>
                                    ${index + 1} / ${photos.length}
                                </div>
                            </div>
                        </div>
                        `,
                    showCloseButton: true,
                    showConfirmButton: false,

                    customClass: {
                        popup: 'custom-swal-popup',
                        closeButton: 'custom-swal-close',
                        htmlContainer: 'swal-html-container',
                    },
                    didOpen: () => {
                        // Event listeners para los botones personalizados
                        const prevButton = document.querySelector('.swal-prev-button');
                        const nextButton = document.querySelector('.swal-next-button');

                        if (prevButton && !isFirst) {
                            prevButton.addEventListener('click', () => {
                                Swal.close();
                                showPhotoWithSwal(index - 1);
                            });
                        }

                        if (nextButton && !isLast) {
                            nextButton.addEventListener('click', () => {
                                Swal.close();
                                showPhotoWithSwal(index + 1);
                            });
                        }

                        // Navegación con teclado
                        document.addEventListener('keydown', handleKeyNavigation);
                    },
                    willClose: () => {
                        document.removeEventListener('keydown', handleKeyNavigation);
                    },
                });

                const handleKeyNavigation = (e) => {
                    if (e.key === 'ArrowLeft' && !isFirst) {
                        Swal.close();
                        showPhotoWithSwal(index - 1);
                    } else if (e.key === 'ArrowRight' && !isLast) {
                        Swal.close();
                        showPhotoWithSwal(index + 1);
                    } else if (e.key === 'Escape') {
                        Swal.close();
                    }
                };
            };

            // 🔥 CORRECCIÓN: Selectores correctos para los botones "Ver Álbum"
            document.querySelectorAll('.album-card .btn-primary').forEach((button) => {
                button.addEventListener('click', function (e) {
                    e.preventDefault();

                    const albumId = this.getAttribute('data-album-id');
                    let currentPhotoIndex = 0;

                    // Encontrar la primera foto del álbum seleccionado
                    if (albumId) {
                        const albumTitle =
                            this.closest('.card-body').querySelector(
                                '.card-text',
                            ).textContent;
                        const albumPhotos = photos.filter(
                            (photo) => photo.album === albumTitle,
                        );
                        if (albumPhotos.length > 0) {
                            currentPhotoIndex = photos.findIndex(
                                (p) => p.id === albumPhotos[0].id,
                            );
                        }
                    }

                    showPhotoWithSwal(currentPhotoIndex);
                });
            });

            // 🔥 CORRECCIÓN: Selector para las fotos individuales en "Todas las Fotos"
            document
                .querySelectorAll('.photo__overlay')
                .forEach((photoElement, index) => {
                    photoElement.addEventListener('click', function (e) {
                        e.preventDefault();

                        // Obtener el título de la foto para encontrar su índice en el array
                        const photoTitle =
                            this.querySelector('.photo__title').textContent.trim();
                        const currentPhotoIndex = photos.findIndex(
                            (p) => p.title === photoTitle,
                        );

                        if (currentPhotoIndex !== -1) {
                            showPhotoWithSwal(currentPhotoIndex);
                        } else {
                            // Si no encuentra por título, usar el índice del elemento
                            showPhotoWithSwal(index);
                        }
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

    /*----- ----- ----- ----- -----
	# Declaraciones
	----- ----- ----- ----- -----*/

    window.addEventListener('load', () => {
        GliderCreator();
        MenuEstatico();
        Calendario();
        GaleriaFotos();
        FuncionesFormulario();
    });
    LineaTiempo();
})();
