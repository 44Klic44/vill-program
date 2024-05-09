document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;

  // смена даты старта
  var Data = new Date();
  let Month = Data.getMonth();
  let Day = Data.getDate();
  let monthLength = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };
  let monthName = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  let dateBtnText = document.querySelector(".start-date");

  dateBtnText.innerHTML = "Стартует " + Day + "&nbsp;" + monthName[Month];

  //   Инфо попап
  const popupTrigger = document.querySelector(".info-btn");
  const popup = document.querySelector(".info-popup");
  const closeBtn = document.querySelector(".info-popup__close");
  const overlay = document.querySelector(".info-popup__overlay");

  popupTrigger.addEventListener("click", () => {
    popup.classList.add("popup--opened");
    body.style.overflow = "hidden";
  });
  closeBtn.addEventListener("click", () => {
    popup.classList.remove("popup--opened");
    body.style.overflow = "scroll";
  });
  overlay.addEventListener("click", () => {
    popup.classList.remove("popup--opened");
    body.style.overflow = "scroll";
  });

  //   Бургер меню
  const menuTrigger = document.querySelector(".burder-btn");
  const menu = document.querySelector(".mobile-menu");
  const menuOverlay = document.querySelector(".mobile-menu__overlay");
  const mobileMenuLinks = document.querySelectorAll(".mobile-nav a");

  menuTrigger.addEventListener("click", () => {
    menuTrigger.classList.toggle("menu--opened");
    menu.classList.toggle("menu--opened");
    body.style.overflow = "hidden";
  });
  menuOverlay.addEventListener("click", () => {
    menuTrigger.classList.toggle("menu--opened");
    menu.classList.remove("menu--opened");
    body.style.overflow = "scroll";
  });
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuTrigger.classList.toggle("menu--opened");
      menu.classList.remove("menu--opened");
      body.style.overflow = "scroll";
    });
  });

  //   Форма регистрации
  const step1 = document.querySelector(".registration__step-1");
  const step2 = document.querySelector(".registration__step-2");
  const progressBtn = document.querySelector(".progress-load");
  const formBtn = document.querySelector(".form-btn");

  const userName = document.querySelector(".user-name");
  const userPhone = document.querySelector(".user-phone");
  const userEmail = document.querySelector(".user-email");

  //   GetCourse form
  const gcForm = document.querySelector(".lt-normal-form");
  const gcName = gcForm.querySelector('input[placeholder="Имя"]');
  const gcPhone = gcForm.querySelector('input[placeholder="Телефон"]');
  const gcEmail = gcForm.querySelector('input[placeholder="E-mail"]');
  const gcMainButton = gcForm.querySelector("button");

  let clickCOunter = 0;
  formBtn.addEventListener("click", (e) => {
    e.preventDefault();
    step1.style.display = "none";
    step2.style.display = "block";
    progressBtn.style.width = "100%";
    clickCOunter++;

    if (clickCOunter > 1) {
      gcName.value = userName.value;
      gcPhone.value = userPhone.value;
      gcEmail.value = userEmail.value;
      gcMainButton.click();
    }
  });
  // Анимация блоков
  const animatedCards = document.querySelectorAll(".animated-card");

  window.addEventListener("scroll", function () {
    animatedCards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      if (
        cardRect.top <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        cardRect.bottom >= 0
      ) {
        card.classList.add("fadeInUp");
      }
    });
  });

  //   Видимиость кнопки прокрутки наверх
  const upBtn = document.querySelector(".up-btn");
  function toggleUpButtonVisibility() {
    const firstBlock = document.querySelector(".header");
    const firstBlockHeight = firstBlock.clientHeight;
    const scrollPosition = window.scrollY || window.pageYOffset;

    if (scrollPosition > firstBlockHeight) {
      upBtn.style.opacity = "1";
    } else {
      upBtn.style.opacity = "0";
    }
  }

  window.addEventListener("scroll", toggleUpButtonVisibility);

  toggleUpButtonVisibility();
  class Slider {
    constructor(slider, autoplay = true) {
      // элемент div.carousel
      this.slider = slider;
      // все кадры (слайды)
      this.allFrames = slider.querySelectorAll(".carousel-item");
      // цепочка кадров
      this.frameChain = slider.querySelector(".carousel-slides");
      // кнопка «вперед»
      this.nextButton = slider.querySelector(".carousel-next");
      // кнопка «назад»
      this.prevButton = slider.querySelector(".carousel-prev");

      this.index = 0; // индекс кадра, который сейчас в окне просмотра
      this.length = this.allFrames.length; // сколько всего есть кадров
      this.autoplay = autoplay; // включить автоматическую прокрутку?
      this.paused = false; // чтобы можно было выключать автопрокрутку

      this.init(); // инициализация слайдера
    }

    init() {
      this.dotButtons = this.dots(); // создать индикатор текущего кадра

      // все кадры должны быть одной ширины, равной ширине окна просмотра;
      // если кадров три, то ширина каждого кадра будет 100/3 = 33.33333%
      // от ширины контейнера .carousel-slides, то есть 900 пикселей
      this.allFrames.forEach(
        (frame) => (frame.style.width = 100 / this.length + "%")
      );
      // ширина цепочки кадров должна равна ширине всех кадров, то есть
      // 900*3 = 2700 пикселей; но удобнее задать в процентах от родителя,
      // если кадров три, то ширина контейнера кадров будет 100*3 = 300%
      this.frameChain.style.width = 101 * this.length + "%";

      this.nextButton.addEventListener("click", (event) => {
        // клик по кнопке «вперед»
        event.preventDefault();
        this.next();
      });

      this.prevButton.addEventListener("click", (event) => {
        // клик по кнопке «назад»
        event.preventDefault();
        this.prev();
      });

      // клики по кнопкам индикатора текущего кадра
      this.dotButtons.forEach((dot) => {
        dot.addEventListener("click", (event) => {
          event.preventDefault();
          const index = this.dotButtons.indexOf(event.target);
          if (index === this.index) return;
          this.goto(index);
        });
      });

      if (this.autoplay) {
        // включить автоматическую прокрутку?
        this.play();
        // когда мышь над слайдером — останавливаем автоматическую прокрутку
        this.slider.addEventListener("mouseenter", () =>
          clearInterval(this.paused)
        );
        // когда мышь покидает пределы слайдера — опять запускаем прокрутку
        this.slider.addEventListener("mouseleave", () => this.play());
      }
    }

    // перейти к кадру с индексом index
    goto(index) {
      // изменить текущий индекс...
      if (index > this.length - 1) {
        this.index = 0;
      } else if (index < 0) {
        this.index = this.length - 1;
      } else {
        this.index = index;
      }
      // ...и выполнить смещение
      this.move();
    }

    // перейти к следующему кадру
    next() {
      this.goto(this.index + 1);
    }

    // перейти к предыдущему кадру
    prev() {
      this.goto(this.index - 1);
    }

    // рассчитать и выполнить смещение
    move() {
      // на сколько нужно сместить, чтобы нужный кадр попал в окно
      const offset = (100 / this.length) * this.index;
      this.frameChain.style.transform = `translateX(-${offset}%)`;
      this.dotButtons.forEach((dot) => dot.classList.remove("active"));
      this.dotButtons[this.index].classList.add("active");
    }

    // запустить автоматическую прокрутку
    play() {
      this.paused = setInterval(() => this.next(), 99000);
    }

    // создать индикатор текущего слайда
    dots() {
      const ol = document.createElement("ol");
      ol.classList.add("carousel-indicators");
      const children = [];
      for (let i = 0; i < this.length; i++) {
        let li = document.createElement("li");
        if (i === 0) li.classList.add("active");
        ol.append(li);
        children.push(li);
      }
      this.slider.prepend(ol);
      return children;
    }
  }

  /*Анимация*/
  function onEntry(entry) {
    entry.forEach((change) => {
      if (change.isIntersecting) {
        change.target.classList.add("element-show");
      }
    });
  }

  let options = {
    threshold: [0.5],
  };
  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll(".element-animation");

  for (let elm of elements) {
    observer.observe(elm);
  }
  new Slider(document.querySelector(".carousel"));
});
