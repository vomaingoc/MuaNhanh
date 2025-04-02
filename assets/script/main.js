function toggleMenu() {
  $("#burgerMenu, #nav-overlay, #mobileMenu").toggleClass("open");
}
$("#mobileMenu a").click(function () {
  var _li = $(this).parent();
  var _submenu = _li.find("ul").first();
  $(this).toggleClass("active");

  if (_submenu.hasClass("hidden")) {
    _submenu.removeClass("hidden");
  } else {
    _submenu.addClass("hidden");
  }
});
function resizeNav() {
  // Set the circle radius to the length of the window diagonal,
  // this way we're only making the circle as big as it needs to be.
  var radius = Math.sqrt(
    Math.pow(window.innerHeight, 2) + Math.pow(window.innerWidth, 2)
  );
  var diameter = radius * 2;
  $("#nav-overlay").width(diameter);
  $("#nav-overlay").height(diameter);
  $("#nav-overlay").css({ "margin-top": -radius, "margin-left": -radius });
}

// Set up click and window resize callbacks, then init the nav.
$(document).ready(function () {
  $(window).resize(resizeNav);
  resizeNav();
});

// handle nav tab news
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

if (tabButtons) {
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.getAttribute("data-tab");

      // Ẩn tất cả nội dung
      tabContents.forEach((content) => content.classList.add("hidden"));
      // Hiện tab tương ứng
      document.getElementById(tab).classList.remove("hidden");

      // Xóa class active của tất cả button
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      // Thêm class active vào button đang chọn
      button.classList.add("active");
    });
  });
}

//handle nav tab vision
const tabButtonVision = document.querySelectorAll(".tab-button--vision");
const tabContentVision = document.querySelectorAll(".tab-content--vision");

if (tabButtonVision) {
  tabButtonVision.forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.getAttribute("data-tab");

      // Ẩn tất cả nội dung
      tabContentVision.forEach((content) => content.classList.add("hidden"));
      // Hiện tab tương ứng
      document.getElementById(tab).classList.remove("hidden");

      // Xóa class active của tất cả button
      tabButtonVision.forEach((btn) => btn.classList.remove("active"));
      // Thêm class active vào button đang chọn
      button.classList.add("active");
    });
  });
}
function formatCurrency(value) {
  if (value >= 1_000_000_000) {
    let ty = Math.floor(value / 1_000_000_000); // Lấy số tỷ
    let trieu = (value % 1_000_000_000) / 1_000_000; // Lấy số triệu còn lại
    return trieu > 0 ? `${ty} tỷ ${trieu} triệu` : `${ty} tỷ`;
  } else if (value >= 1_000_000) {
    return `${value / 1_000_000} triệu`;
  } else {
    return `${value}`;
  }
}
function formatNumberWithRegex(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// range slider desktop
const minSlider = document.getElementById("minSlider");
const maxSlider = document.getElementById("maxSlider");
const minValue = document.getElementById("minValue");
const maxValue = document.getElementById("maxValue");
const minValueInput = document.getElementById("minValueInput");
const maxValueInput = document.getElementById("maxValueInput");
const progress = document.getElementById("progress");

function updateSlider() {
  if (minSlider && maxSlider) {
    let min = parseInt(minSlider.value);
    let max = parseInt(maxSlider.value);

    if (min >= max) {
      minSlider.value = max - 1000000;
      min = parseInt(minSlider.value);
    }
    minValue.textContent = formatCurrency(min);
    maxValue.textContent = formatCurrency(max);
    minValueInput.value = formatNumberWithRegex(min);
    maxValueInput.value = formatNumberWithRegex(max);
    let minPercent = (min / 8000000000) * 100;
    let maxPercent = (max / 8000000000) * 100;

    progress.style.left = minPercent + "%";
    progress.style.width = maxPercent - minPercent + "%";
  }
}
if (minSlider && maxSlider) {
  minSlider.addEventListener("input", updateSlider);
  maxSlider.addEventListener("input", updateSlider);
}
updateSlider();

// range slider mobile
const minSlider_mb = document.getElementById("minSlider_mb");
const maxSlider_mb = document.getElementById("maxSlider_mb");
const minValue_mb = document.getElementById("minValue_mb");
const maxValue_mb = document.getElementById("maxValue_mb");
const minValueInput_mb = document.getElementById("minValueInput_mb");
const maxValueInput_mb = document.getElementById("maxValueInput_mb");
const progress_mb = document.getElementById("progress_mb");

function updateSliderMobile() {
  if (minSlider_mb && maxSlider_mb) {
    let min = parseInt(minSlider_mb.value);
    let max = parseInt(maxSlider_mb.value);

    if (min >= max) {
      minSlider_mb.value = max - 1000000;
      min = parseInt(minSlider_mb.value);
    }
    minValue_mb.textContent = formatCurrency(min);
    maxValue_mb.textContent = formatCurrency(max);
    minValueInput_mb.value = formatNumberWithRegex(min);
    maxValueInput_mb.value = formatNumberWithRegex(max);
    let minPercent = (min / 8000000000) * 100;
    let maxPercent = (max / 8000000000) * 100;

    progress_mb.style.left = minPercent + "%";
    progress_mb.style.width = maxPercent - minPercent + "%";
  }
}
if (minSlider_mb && maxSlider_mb) {
  minSlider_mb.addEventListener("input", updateSliderMobile);
  maxSlider_mb.addEventListener("input", updateSliderMobile);
}
updateSliderMobile();

var menutop_sticky = $(".sticky_header");
if (menutop_sticky.length) {
  $(window).scroll(function () {
    if ($(window).scrollTop() > 0) {
      menutop_sticky.addClass("is_sticky");
    } else {
      menutop_sticky.removeClass("is_sticky");
    }
  });
}

var side_social = $(".side-social");
var side_catalogue = $(".side-catalogue");
if (side_social.length) {
  $(window).scroll(function () {
    var top_title = $(".intro-section").offset().top;
    var end_article = $(".end-article").offset().top;
    if ($(window).scrollTop() > top_title) {
      side_social.addClass("md:block");
      side_catalogue.addClass("md:block");
    } else {
      side_social.removeClass("md:block");
      side_catalogue.removeClass("md:block");
    }

    if ($(window).scrollTop() + side_social.height() > end_article) {
      side_social.removeClass("md:block");
      side_catalogue.removeClass("md:block");
    }
  });
}

$(".chat-launcher").on("click", function () {
  $(".chat-launcher").toggleClass("active");
  $(".list-socials").toggleClass("active");
});

function toggleAccordion(index) {
  const content = document.getElementById("content-" + index);
  const icon = document.getElementById("icon-" + index);

  if (content.classList.contains("hidden")) {
    content.classList.remove("hidden");
    content.classList.add("flex");
    content.classList.add("flex-col");
    icon.style.transform = "rotate(180deg)";
  } else {
    content.classList.add("hidden");
    icon.style.transform = "rotate(0deg)";
  }
}

function toggleAccordionFixed(index) {
  const content = document.getElementById("contentFixed-" + index);
  const icon = document.getElementById("iconFixed-" + index);

  if (content.classList.contains("hidden")) {
    content.classList.remove("hidden");
    content.classList.add("flex");
    content.classList.add("flex-col");
    icon.style.transform = "rotate(180deg)";
  } else {
    content.classList.add("hidden");
    icon.style.transform = "rotate(0deg)";
  }
}

function toggleFilterMobile() {
  var modal = $("#modal-filter");
  if (modal.hasClass("hidden")) {
    modal.removeClass("hidden");
    modal.addClass("block");
  } else {
    modal.addClass("hidden");
    modal.removeClass("block");
  }
}

function handleCloseModalFilter() {
  $("#modal-filter").addClass("hidden");
  $("#modal-filter").removeClass("block");
}

// Handle switch button
const switchButton = document.getElementById("switch-button");
const optionRent = document.getElementById("option-rent");
const optionSell = document.getElementById("option-sell");

if (optionRent) {
  optionRent.addEventListener("click", () => {
    switchButton.style.left = "8px";
    optionRent.classList.add("text-white");
    optionRent.classList.remove("text-gray-500");
    optionSell.classList.add("text-gray-500");
    optionSell.classList.remove("text-white");
  });
}
if (optionSell) {
  optionSell.addEventListener("click", () => {
    switchButton.style.left = "calc(100% - 98px)";
    optionSell.classList.add("text-white");
    optionSell.classList.remove("text-gray-500");
    optionRent.classList.add("text-gray-500");
    optionRent.classList.remove("text-white");
  });
}
