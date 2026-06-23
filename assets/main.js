(function () {
  "use strict";

  var RTL_LANGS = ["ar"];
  var STORAGE_KEY = "nytta-lang";

  var PAGE_META = {
    en: {
      title: "Nytta AI — AI Consulting for Small Business",
      description: "Nytta AI helps small businesses add AI to their daily work. Free first analysis — you get a written plan either way. Call or WhatsApp +46 70 797 65 92."
    },
    sv: {
      title: "Nytta AI — AI-rådgivning för småföretag",
      description: "Nytta AI hjälper småföretag att använda AI i det dagliga arbetet. Kostnadsfri första analys — ni får en skriftlig plan oavsett. Ring eller WhatsApp +46 70 797 65 92."
    },
    ar: {
      title: "Nytta AI — استشارات الذكاء الاصطناعي للشركات الصغيرة",
      description: "تساعد Nytta AI الشركات الصغيرة على إضافة الذكاء الاصطناعي إلى عملها اليومي. التحليل الأول مجاني. اتصل أو واتساب ‎+46 70 797 65 92."
    }
  };

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
    var meta = PAGE_META[lang] || PAGE_META.sv;
    document.title = meta.title;
    var descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute("content", meta.description);
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
