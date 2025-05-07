document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;

    document
      .querySelectorAll(".jsScroll__scrolled")
      .forEach(function (section) {
        const speed = 0.3;
        const yPos = -(scrollPosition * speed);
        section.style.backgroundPosition = `50% ${yPos}px`;
      });

    document.querySelectorAll(".sm-img-wrapp img").forEach(function (img) {
      const rect = img.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const viewportHeight = window.innerHeight;
      const distanceFromCenter = centerY - viewportHeight / 2;
      const parallaxValue = distanceFromCenter * 0.05;

      img.style.transform = `translateY(${-parallaxValue}px)`;
    });
  });

  const fixCardDisplay = function () {
    const cards = document.querySelectorAll(".sm-img-wrapp");

    cards.forEach((card) => {
      card.style.display = "block";
      card.style.opacity = "1";
    });

    cards.forEach((card) => {
      const dateSpan = card.querySelector("span");
      if (dateSpan) {
        dateSpan.style.bottom = "15px";
        dateSpan.style.left = "50%";
        dateSpan.style.transform = "translateX(-50%)";
        dateSpan.style.width = "120px";
        dateSpan.style.textAlign = "center";
      }
    });
  };

  fixCardDisplay();

  document.querySelectorAll(".sm-img-wrapp").forEach((card) => {
    card.addEventListener("click", function (e) {
      if (e.target.closest("[data-fancybox]")) {
        return;
      }

      const img = this.querySelector("img");
      const imgSrc = img.getAttribute("src");

      createModal(imgSrc);
    });
  });

  function createModal(imgSrc) {
    const modal = document.createElement("div");
    modal.className = "card-modal";

    const modalContent = document.createElement("div");
    modalContent.className = "card-modal-content";

    const img = document.createElement("img");
    img.src = imgSrc;

    const closeBtn = document.createElement("div");
    closeBtn.className = "card-modal-close";
    closeBtn.innerHTML = "×";

    modalContent.appendChild(img);
    modalContent.appendChild(closeBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    setTimeout(() => {
      modal.classList.add("active");
    }, 10);

    closeBtn.addEventListener("click", function () {
      closeModal(modal);
    });

    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  }

  function closeModal(modal) {
    modal.classList.remove("active");
    setTimeout(() => {
      document.body.removeChild(modal);
    }, 300);
  }

  const animateBanners = function () {
    const banners = document.querySelectorAll(".sm-banner ul");

    banners.forEach((banner) => {
      const originalContent = banner.innerHTML;
      banner.innerHTML = originalContent + originalContent;

      banner.style.animation = "moveLeftToRight 30s linear infinite";
      banner.style.display = "flex";
      banner.style.whiteSpace = "nowrap";
    });
  };

  animateBanners();

  function updateCountdown() {
    let countdownSection = document.querySelector(".wedding-countdown");

    if (!countdownSection) {
      countdownSection = document.createElement("section");
      countdownSection.className =
        "wedding-countdown sm-edit jsScroll__scrolled";
      countdownSection.setAttribute("data-jsscroll", "");
      countdownSection.setAttribute("data-jsscroll-slide-top", "");

      const countdownContainer = document.createElement("div");
      countdownContainer.className = "countdown-container";

      // Создаем элементы для дней, часов, минут и секунд
      const units = ["дней", "часов", "минуты", "секунды"];
      const ids = ["days", "hours", "minutes", "seconds"];

      for (let i = 0; i < 4; i++) {
        const unitContainer = document.createElement("div");
        unitContainer.className = "countdown-unit";

        const number = document.createElement("div");
        number.className = "countdown-number";
        number.id = ids[i];

        const label = document.createElement("div");
        label.className = "countdown-label";
        label.textContent = units[i];

        unitContainer.appendChild(number);
        unitContainer.appendChild(label);
        countdownContainer.appendChild(unitContainer);
      }

      countdownSection.appendChild(heading);
      countdownSection.appendChild(countdownContainer);

      const dateSection = document.querySelector(".sm-date");
      if (dateSection && dateSection.nextElementSibling) {
        dateSection.parentNode.insertBefore(
          countdownSection,
          dateSection.nextElementSibling
        );
      } else if (dateSection) {
        dateSection.parentNode.appendChild(countdownSection);
      } else {
        document.body.appendChild(countdownSection);
      }
    }

    const weddingDate = new Date(2024, 6, 29);

    const now = new Date();

    const diff = weddingDate - now;

    if (diff <= 0) {
      document.getElementById("days").textContent = "00";
      document.getElementById("hours").textContent = "00";
      document.getElementById("minutes").textContent = "00";
      document.getElementById("seconds").textContent = "00";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").textContent = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").textContent = seconds
      .toString()
      .padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
});

const style = document.createElement("style");
style.textContent = `
@keyframes moveLeftToRight {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
}

.wedding-countdown {
    padding: 50px 0;
    text-align: center;
    background-color: #f9f7f5;
}

.wedding-countdown h3 {
    font-size: 2.5rem;
    margin-bottom: 30px;
    color: #333;
}

.countdown-container {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin: 0 auto;
    max-width: 800px;
}

.countdown-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.countdown-number {
    font-size: 4rem;
    font-weight: bold;
    color: #333;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
}

.countdown-label {
    font-size: 1.2rem;
    color: #666;
}

@media (max-width: 768px) {
    .countdown-container {
        flex-wrap: wrap;
    }

    .countdown-number {
        width: 80px;
        height: 80px;
        font-size: 2.5rem;
    }
}
`;

document.head.appendChild(style);
