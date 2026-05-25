(function () {
  "use strict";

  function initProjectTimeline() {
    const items = document.querySelectorAll(".project-timeline-item");
    if (!items.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      items.forEach((item) => item.classList.add("project-timeline-item-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("project-timeline-item-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    items.forEach((item) => observer.observe(item));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProjectTimeline);
  } else {
    initProjectTimeline();
  }
})();
