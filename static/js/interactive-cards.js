// JavaScript для интерактивных карточек

document.addEventListener("DOMContentLoaded", function () {
  // Добавляем класс для анимации к карточкам
  const cards = document.querySelectorAll(".sm-img-wrapp");

  // Добавляем анимацию появления с задержкой для каждой карточки
  cards.forEach((card, index) => {
    card.classList.add("animated-card");
    card.style.animationDelay = `${index * 0.2}s`;

    // Добавляем обработчик клика для увеличения изображения
    card.addEventListener("click", function (e) {
      // Если клик был на ссылке с data-fancybox, не делаем ничего,
      // так как fancybox уже обрабатывает этот клик
      if (e.target.closest("[data-fancybox]")) {
        return;
      }

      // Получаем изображение из карточки
      const img = this.querySelector("img");
      const imgSrc = img.getAttribute("src");

      // Создаем модальное окно
      createModal(imgSrc);
    });
  });

  // Улучшаем поведение слайдера
  if (typeof $.fn.slick !== "undefined") {
    // Проверяем, инициализирован ли уже слайдер
    if ($(".sm-hero__gallery").hasClass("slick-initialized")) {
      // Обновляем настройки существующего слайдера
      $(".sm-hero__gallery").slick("unslick");
    }

    // Инициализируем слайдер с улучшенными настройками
    $(".sm-hero__gallery").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      variableWidth: true,
      autoplay: true,
      autoplaySpeed: 3000,
      prevArrow: $(".sm-prev"),
      nextArrow: $(".sm-next"),
      dots: false,
      infinite: true,
      speed: 500,
      cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            centerMode: false,
            variableWidth: false,
          },
        },
      ],
    });
  }

  // Функция для создания модального окна
  function createModal(imgSrc) {
    // Создаем элементы модального окна
    const modal = document.createElement("div");
    modal.className = "card-modal";

    const modalContent = document.createElement("div");
    modalContent.className = "card-modal-content";

    const img = document.createElement("img");
    img.src = imgSrc;

    const closeBtn = document.createElement("div");
    closeBtn.className = "card-modal-close";
    closeBtn.innerHTML = "×";

    // Собираем модальное окно
    modalContent.appendChild(img);
    modalContent.appendChild(closeBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Добавляем класс active с небольшой задержкой для анимации
    setTimeout(() => {
      modal.classList.add("active");
    }, 10);

    // Обработчик закрытия при клике на кнопку
    closeBtn.addEventListener("click", function () {
      closeModal(modal);
    });

    // Обработчик закрытия при клике вне изображения
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal(modal);
      }
    });

    // Обработчик закрытия при нажатии Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeModal(modal);
      }
    });
  }

  // Функция закрытия модального окна
  function closeModal(modal) {
    modal.classList.remove("active");
    setTimeout(() => {
      document.body.removeChild(modal);
    }, 300);
  }

  // Добавляем улучшенный эффект параллакса при прокрутке для карточек
  window.addEventListener("scroll", function () {
    cards.forEach((card) => {
      const cardTop = card.getBoundingClientRect().top;
      const cardHeight = card.offsetHeight;
      const windowHeight = window.innerHeight;

      // Если карточка видна в окне просмотра
      if (cardTop < windowHeight && cardTop > -cardHeight) {
        // Вычисляем значение для эффекта параллакса с меньшей интенсивностью
        const scrollValue = (cardTop / windowHeight) * 10;

        // Проверяем, наведен ли курсор на карточку
        if (!card.matches(":hover")) {
          // Применяем трансформацию только если нет наведения
          card.style.transform = `translateY(${scrollValue}px)`;
        }
      }
    });
  });

  // Добавляем обработчик для сброса трансформации при наведении
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      // При наведении используем стили из CSS
      this.style.transform = "";
    });

    card.addEventListener("mouseleave", function () {
      // При уходе курсора возвращаем параллакс эффект
      const cardTop = this.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const scrollValue = (cardTop / windowHeight) * 10;

      this.style.transform = `translateY(${scrollValue}px)`;
    });
  });
});
