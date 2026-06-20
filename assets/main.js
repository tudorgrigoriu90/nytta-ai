(function () {
  "use strict";

  var RTL_LANGS = ["ar"];
  var STORAGE_KEY = "nytta-lang";

  function applyLang(lang) {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute(
      "dir",
      RTL_LANGS.indexOf(lang) > -1 ? "rtl" : "ltr"
    );
    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      var isCurrent = btn.getAttribute("data-lang") === lang;
      btn.setAttribute("aria-current", isCurrent ? "true" : "false");
    });
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* storage unavailable, ignore */
    }
  }

  function detectInitialLang() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return stored;
    } catch (e) {
      /* ignore */
    }
    var nav = (navigator.language || "sv").slice(0, 2).toLowerCase();
    if (nav === "en") return "en";
    if (nav === "ar") return "ar";
    return "sv";
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(detectInitialLang());

    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLang(btn.getAttribute("data-lang"));
      });
    });

    var toggle = document.querySelector(".mobile-nav-toggle");
    var links = document.querySelector(".nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        var open = links.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
  });
})();
