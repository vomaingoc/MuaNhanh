// Utility Functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Toggle Menu
function toggleMenu() {
  ["#burgerMenu", "#nav-overlay", "#mobileMenu"].forEach((id) => {
    document.querySelector(id)?.classList.toggle("open");
  });
}

// Toggle Submenu in Mobile
$$("#mobileMenu a").forEach((a) => {
  a.addEventListener("click", () => {
    a.classList.toggle("active");
    const submenu = a.parentElement.querySelector("ul");
    submenu?.classList.toggle("hidden");
  });
});

// Resize Nav Overlay
function resizeNav() {
  const radius = Math.hypot(window.innerWidth, window.innerHeight);
  const diameter = radius * 2;
  const overlay = $("#nav-overlay");
  if (overlay) {
    overlay.style.width = `${diameter}px`;
    overlay.style.height = `${diameter}px`;
    overlay.style.marginTop = `-${radius}px`;
    overlay.style.marginLeft = `-${radius}px`;
  }
}
window.addEventListener("resize", resizeNav);
document.addEventListener("DOMContentLoaded", resizeNav);

// Generic Tab Switcher
function setupTabs(buttonSelector, contentSelector) {
  const buttons = $$(buttonSelector);
  const contents = $$(contentSelector);

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      contents.forEach((el) => el.classList.add("hidden"));
      document.getElementById(tab)?.classList.remove("hidden");

      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}
setupTabs(".tab-button", ".tab-content");
setupTabs(".tab-button--vision", ".tab-content--vision");

// Format Utilities
const formatCurrency = (value) => {
  if (value >= 1_000_000_000)
    return `${Math.floor(value / 1e9)} tỷ ${
      (value % 1e9) / 1e6 || ""
    } triệu`.trim();
  if (value >= 1_000_000) return `${value / 1_000_000} triệu`;
  return `${value}`;
};
const formatNumberWithRegex = (number) => number.toLocaleString();

// Generic Range Slider Setup
function setupRangeSlider(
  minId,
  maxId,
  valMinId,
  valMaxId,
  inputMinId,
  inputMaxId,
  progressId
) {
  const minSlider = $(minId);
  const maxSlider = $(maxId);
  const minValue = $(valMinId);
  const maxValue = $(valMaxId);
  const minInput = $(inputMinId);
  const maxInput = $(inputMaxId);
  const progress = $(progressId);

  const update = () => {
    if (!minSlider || !maxSlider) return;
    let min = +minSlider.value;
    let max = +maxSlider.value;

    if (min >= max) (min = max - 1e6), (minSlider.value = min);
    minValue.textContent = formatCurrency(min);
    maxValue.textContent = formatCurrency(max);
    minInput.value = formatNumberWithRegex(min);
    maxInput.value = formatNumberWithRegex(max);
    const minPercent = (min / 8e9) * 100;
    const maxPercent = (max / 8e9) * 100;
    progress.style.left = `${minPercent}%`;
    progress.style.width = `${maxPercent - minPercent}%`;
  };

  minSlider?.addEventListener("input", update);
  maxSlider?.addEventListener("input", update);
  update();
}

setupRangeSlider(
  "#minSlider",
  "#maxSlider",
  "#minValue",
  "#maxValue",
  "#minValueInput",
  "#maxValueInput",
  "#progress"
);
setupRangeSlider(
  "#minSlider_mb",
  "#maxSlider_mb",
  "#minValue_mb",
  "#maxValue_mb",
  "#minValueInput_mb",
  "#maxValueInput_mb",
  "#progress_mb"
);

// Sticky Header
const stickyHeader = $(`.sticky_header`);
window.addEventListener("scroll", () => {
  if (stickyHeader) {
    stickyHeader.classList.toggle("is_sticky", window.scrollY > 0);
  }
});

// Side Social + Catalogue Toggle on Scroll
const sideSocial = $(".side-social");
const sideCatalogue = $(".side-catalogue");
const introSection = $(".intro-section");
const endArticle = $(".end-article");

window.addEventListener("scroll", () => {
  const show = window.scrollY > (introSection?.offsetTop || 0);
  const hide =
    window.scrollY + (sideSocial?.offsetHeight || 0) >
    (endArticle?.offsetTop || Infinity);

  [sideSocial, sideCatalogue].forEach((el) =>
    el?.classList.toggle("md:block", show && !hide)
  );
});

// Chat Launcher
const chatLauncher = $(".chat-launcher");
chatLauncher?.addEventListener("click", () => {
  chatLauncher.classList.toggle("active");
  $(".list-socials")?.classList.toggle("active");
});

// Accordion
function toggleAccordion(index, fixed = false) {
  const prefix = fixed ? "Fixed" : "";
  const content = document.getElementById(`content${prefix}-${index}`);
  const icon = document.getElementById(`icon${prefix}-${index}`);

  if (content?.classList.contains("hidden")) {
    content.classList.remove("hidden");
    content.classList.add("flex", "flex-col");
    icon.style.transform = "rotate(180deg)";
  } else {
    content?.classList.add("hidden");
    icon.style.transform = "rotate(0deg)";
  }
}

// Modal Filter Toggle
function toggleFilterMobile() {
  const modal = $("#modal-filter");
  modal?.classList.toggle("hidden");
  modal?.classList.toggle("block");
}

function handleCloseModalFilter() {
  const modal = $("#modal-filter");
  modal?.classList.add("hidden");
  modal?.classList.remove("block");
}

// Switch Button
const optionRent = $("#option-rent");
const optionSell = $("#option-sell");
const switchButton = $("#switch-button");

optionRent?.addEventListener("click", () => {
  switchButton.style.left = "8px";
  optionRent.classList.add("text-white");
  optionRent.classList.remove("text-gray-500");
  optionSell.classList.add("text-gray-500");
  optionSell.classList.remove("text-white");
});

optionSell?.addEventListener("click", () => {
  switchButton.style.left = "calc(100% - 98px)";
  optionSell.classList.add("text-white");
  optionSell.classList.remove("text-gray-500");
  optionRent.classList.add("text-gray-500");
  optionRent.classList.remove("text-white");
});
