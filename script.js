const CONSTANTS = {
  AUTOPLAY_INTERVAL: 4000,
  CLASSES: {
      ACTIVE: 'is-active',
      VISIBLE: 'is-visible'
  }
};

const Slideshow = (function() {
  const slideshow = document.querySelector(".slideshow");
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector(".arrow-prev");
  const nextBtn = document.querySelector(".arrow-next");
  let currentSlide = 0;
  let intervalID;

  function showSlide(n) {
      slides.forEach(slide => slide.classList.remove(CONSTANTS.CLASSES.ACTIVE));
      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide].classList.add(CONSTANTS.CLASSES.ACTIVE);
  }

  nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
  prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));

  const autoPlay = () => {
      intervalID = setInterval(() => {
          showSlide(currentSlide + 1);
      }, CONSTANTS.AUTOPLAY_INTERVAL);
  };

  const stopAutoPlayOnHover = () => {
      slideshow.addEventListener("mouseenter", () => clearInterval(intervalID));
      slideshow.addEventListener("mouseleave", autoPlay);
  };

  return {
      init: function() {
          showSlide(currentSlide);
          autoPlay();
          stopAutoPlayOnHover();
      }
  };
})();

// Initialize on page load
window.addEventListener("load", () => {
  Slideshow.init();
});