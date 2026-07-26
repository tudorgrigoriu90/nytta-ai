(function () {
  "use strict";

  var RTL_LANGS = ["ar"];
  var STORAGE_KEY = "nytta-lang";

  var PAGE_META = {
    en: {
      title: "Nytta AI — AI Consulting for Small Business",
      description: "Nytta AI helps small businesses add AI to their daily work. Free first analysis — you get a written plan either way. Call or WhatsApp +46 707 97 55 92."
    },
    sv: {
      title: "Nytta AI — AI-rådgivning för småföretag",
      description: "Nytta AI hjälper småföretag att använda AI i det dagliga arbetet. Kostnadsfri första analys — ni får en skriftlig plan oavsett. Ring eller WhatsApp +46 707 97 55 92."
    },
    ar: {
      title: "Nytta AI — استشارات الذكاء الاصطناعي للشركات الصغيرة",
      description: "تساعد Nytta AI الشركات الصغيرة على إضافة الذكاء الاصطناعي إلى عملها اليومي. التحليل الأول مجاني. اتصل أو واتساب ‎+46 707 97 55 92."
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

(function () {
  var POPUP_COOKIE = "nytta-popup-dismissed";
  var popup = document.getElementById("partner-popup");
  var closeBtn = document.getElementById("popup-close");
  if (!popup) return;

  function getCookie(name) {
    var match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
    return match ? match[1] : null;
  }

  function setCookie(name, days) {
    var expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + "=1; expires=" + expires + "; path=/; SameSite=Lax";
  }

  function showPopup() {
    if (getCookie(POPUP_COOKIE)) return;
    popup.hidden = false;
    popup.offsetHeight;
    popup.classList.add("is-visible");
  }

  function hidePopup() {
    popup.classList.remove("is-visible");
    setCookie(POPUP_COOKIE, 30);
    setTimeout(function () { popup.hidden = true; }, 300);
  }

  var timer = setTimeout(showPopup, 30000);

  document.addEventListener("mouseleave", function (e) {
    if (e.clientY < 10) { clearTimeout(timer); showPopup(); }
  });

  closeBtn.addEventListener("click", hidePopup);

  popup.addEventListener("click", function (e) {
    if (e.target === popup) hidePopup();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !popup.hidden) hidePopup();
  });
})();
