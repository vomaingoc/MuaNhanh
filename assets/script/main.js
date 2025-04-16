document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  // Sticky Header
  const stickyHeader = $(".sticky_header");
  window.addEventListener("scroll", () => {
    stickyHeader?.classList.toggle("is_sticky", window.scrollY > 0);
  });

  // Side Social + Catalogue
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

  // Chat launcher show after scroll 1/3
  let isChatVisible = false;
  const showChatOnScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const threshold =
      (document.documentElement.scrollHeight - window.innerHeight) / 3;
    if (!isChatVisible && scrollY > threshold) {
      chatLauncher?.classList.add("show");
      isChatVisible = true;
      window.removeEventListener("scroll", showChatOnScroll);
    }
  };
  window.addEventListener("scroll", showChatOnScroll);

  // Mobile Filter Modal
  window.toggleFilterMobile = () => {
    const modal = $("#modal-filter");
    if (modal) {
      modal.classList.toggle("hidden");
      modal.classList.toggle("block");
    }
  };

  window.handleCloseModalFilter = () => {
    const modal = $("#modal-filter");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("block");
    }
  };

  // Accordion
  window.toggleAccordion = (index, fixed = false) => {
    const prefix = fixed ? "Fixed" : "";
    const content = $(`#content${prefix}-${index}`);
    const icon = $(`#icon${prefix}-${index}`);
    if (content) {
      const isHidden = content.classList.contains("hidden");
      content.classList.toggle("hidden", !isHidden);
      content.classList.toggle("flex", isHidden);
      content.classList.toggle("flex-col", isHidden);
    }
    if (icon)
      icon.style.transform = content?.classList.contains("hidden")
        ? "rotate(0deg)"
        : "rotate(180deg)";
  };

  // Tab Switcher
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

  // Toggle Mobile Menu
  window.toggleMenu = () => {
    ["#burgerMenu", "#nav-overlay", "#mobileMenu"].forEach((id) => {
      document.querySelector(id)?.classList.toggle("open");
    });
    document.body.classList.toggle("show-menu");
  };

  $$("#mobileMenu a").forEach((a) => {
    a.addEventListener("click", () => {
      a.classList.toggle("active");
      const submenu = a.parentElement?.querySelector("ul");
      submenu?.classList.toggle("hidden");
    });
  });

 

  // Switch Rent/Sell
  const optionRent = $("#option-rent"),
    optionSell = $("#option-sell"),
    switchBtn = $("#switch-button");

  optionRent?.addEventListener("click", () => {
    switchBtn.style.left = "8px";
    optionRent.classList.add("text-white");
    optionRent.classList.remove("text-gray-500");
    optionSell.classList.remove("text-white");
    optionSell.classList.add("text-gray-500");
  });

  optionSell?.addEventListener("click", () => {
    switchBtn.style.left = "calc(100% - 98px)";
    optionSell.classList.add("text-white");
    optionSell.classList.remove("text-gray-500");
    optionRent.classList.remove("text-white");
    optionRent.classList.add("text-gray-500");
  });
});
 
const formatCurrency = (val) => {
  if (val >= 1_000_000_000) {
    const ty = Math.floor(val / 1_000_000_000);
    const trieu = Math.floor((val % 1_000_000_000) / 1_000_000);
    return trieu ? `${ty} tỷ ${trieu} triệu` : `${ty} tỷ`;
  }
  if (val >= 1_000_000) return `${Math.floor(val / 1_000_000)} triệu`;
  return `${val}`;
};

const formatNumber = (num) => num.toLocaleString();

document.querySelectorAll(".price-form").forEach((form) => {
  const minSlider = form.querySelector(".min-slider");
  const maxSlider = form.querySelector(".max-slider");
  const minText = form.querySelector(".min-text");
  const maxText = form.querySelector(".max-text");
  const minInput = form.querySelector(".min-input");
  const maxInput = form.querySelector(".max-input");
  const progress = form.querySelector(".slider-progress");
  const radios = form.querySelectorAll('input[type="radio"]');

  const update = () => {
    let minValue = +minSlider.value;
    let maxValue = +maxSlider.value;

    if (minValue >= maxValue) {
      minValue = maxValue - 1e6;
      minSlider.value = minValue;
    }

    const minPercent = (minValue / 1e11) * 100;
    const maxPercent = (maxValue / 1e11) * 100;

    progress.style.left = `${minPercent}%`;
    progress.style.width = `${maxPercent - minPercent}%`;

    minText.textContent = formatCurrency(minValue);
    maxText.textContent = formatCurrency(maxValue);
    minInput.value = formatNumber(minValue);
    maxInput.value = formatNumber(maxValue);
  };

  minSlider.addEventListener("input", update);
  maxSlider.addEventListener("input", update);
  update();

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      let minValue = 0;
      let maxValue = 1e11;

      switch (radio.value) {
        case "under1ty":
          minValue = 0;
          maxValue = 1e9;
          break;
        case "500m-5ty":
          minValue = 5e8;
          maxValue = 5e9;
          break;
        case "5-15ty":
          minValue = 5e9;
          maxValue = 15e9;
          break;
        case "over15ty":
          minValue = 15e9;
          maxValue = 1e11;
          break;
        default:
          minValue = 0;
          maxValue = 1e11;
      }

      minSlider.value = minValue;
      maxSlider.value = maxValue;
      update();
    });
  });
});

// const track = document.querySelector('.slider-track');
//   const minSlider = track.querySelector('.min-slider');
//   const maxSlider = track.querySelector('.max-slider');
//   const progress = track.querySelector('.slider-progress');
//   const maxRange = 100000000000;

//   const minInput = document.querySelector('.min-input');
//   const maxInput = document.querySelector('.max-input');
//   const minLabel = document.querySelector('.min-label');
//   const maxLabel = document.querySelector('.max-label');

//   const formatCurrency = (val) => {
//     if (val >= 1_000_000_000) {
//       const ty = Math.floor(val / 1_000_000_000);
//       const trieu = Math.floor((val % 1_000_000_000) / 1_000_000);
//       return trieu ? `${ty} tỷ ${trieu} triệu` : `${ty} tỷ`;
//     }
//     if (val >= 1_000_000) return `${Math.floor(val / 1_000_000)} triệu`;
//     return `${val}`;
//   };

//   const update = () => {
//     let minVal = parseInt(minSlider.value);
//     let maxVal = parseInt(maxSlider.value);
//     if (minVal > maxVal) [minVal, maxVal] = [maxVal, minVal];

//     const trackWidth = track.offsetWidth;
//     const minPercent = minVal / maxRange;
//     const maxPercent = maxVal / maxRange;

//     const leftPx = minPercent * trackWidth;
//     const rightPx = maxPercent * trackWidth;

//     progress.style.left = `${leftPx}px`;
//     progress.style.width = `${rightPx - leftPx}px`;

//     minInput.value = minVal.toLocaleString();
//     maxInput.value = maxVal.toLocaleString();
//     minLabel.textContent = formatCurrency(minVal);
//     maxLabel.textContent = formatCurrency(maxVal);
//   };

//   minSlider.addEventListener('input', update);
//   maxSlider.addEventListener('input', update);
//   window.addEventListener('resize', update);
//   update();