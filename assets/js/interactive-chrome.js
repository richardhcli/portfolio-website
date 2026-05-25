// Transient click feedback for titles and chrome: cyan flash, then blue until reload.

const INTERACTIVE_CHROME_SELECTOR = [
  ".navbar-brand.title",
  ".post-title",
  ".card-title",
  ".profile-sidebar__name",
  "#search-toggle",
  ".search-toggle-mobile",
  "main h1",
  "main h2",
  "main h3",
  "main h4",
  "main h5",
  "main h6",
].join(", ");

const CLICK_FLASH_MS = 150;

const EXCLUDED_ANCESTORS = [
  "pre",
  "code",
  ".nav-link-highlight",
  "blockquote.block-tip",
  "blockquote.block-warning",
  "blockquote.block-danger",
];

let activeElement = null;

const clearClickState = (element) => {
  element.classList.remove("click-flash", "click-active");
};

const isExcluded = (element) => EXCLUDED_ANCESTORS.some((selector) => element.closest(selector));

const handleInteractiveClick = (event) => {
  const element = event.target.closest(INTERACTIVE_CHROME_SELECTOR);
  if (!element || isExcluded(element)) {
    return;
  }

  if (activeElement && activeElement !== element) {
    clearClickState(activeElement);
  }

  element.classList.remove("click-active");
  element.classList.add("click-flash");

  window.setTimeout(() => {
    element.classList.remove("click-flash");
    element.classList.add("click-active");
    activeElement = element;
  }, CLICK_FLASH_MS);
};

document.addEventListener("click", handleInteractiveClick);
