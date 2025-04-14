var swiper = new Swiper(".homeSlider", {
  autoHeight: true,
  loop: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  pagination: false,
});

var swiper_product = new Swiper(".productSlider", {
  slidesPerView: 1,
  spaceBetween: 20,
  centeredSlides: true,
  autoHeight: true,
  loop: true,
  breakpoints: {
    450: {
      slidesPerView: 2,
      spaceBetween: 20,
      centeredSlides: true,
      centeredSlides: true,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: false,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 30,
      centeredSlides: false,
    },
  },
});

var swiper_gallery = new Swiper(".gallerySwiper", {
  slidesPerView: 2,
  spaceBetween: 20,
  centeredSlides: true,
  autoHeight: true,
  loop: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  breakpoints: {
    450: {
      slidesPerView: 2,
      spaceBetween: 20,
      centeredSlides: true,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: true,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 30,
      centeredSlides: true,
    },
  },
});

var swiper_album = new Swiper(".albumSwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  autoHeight: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
    renderFraction: function (currentClass, totalClass) {
      return (
        '<span class="' +
        currentClass +
        '"></span>' +
        " / " +
        '<span class="' +
        totalClass +
        '"></span>'
      );
    },
  },
});
