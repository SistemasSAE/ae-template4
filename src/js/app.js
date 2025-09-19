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

            new Glider(carousel, {
                ...gliderConfig1SlidesBase,
                arrows: {
                    prev: prevButton,
                    next: nextButton,
                },
                dots: dots,
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

    /*----- ----- ----- ----- -----
	# Declaraciones
	----- ----- ----- ----- -----*/

    window.addEventListener('load', () => {
        GliderCreator();
        MenuEstatico();
        Calendario();
    });
    LineaTiempo();
})();
