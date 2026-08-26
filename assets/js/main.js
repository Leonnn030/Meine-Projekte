/* ==========================================================================
   HAUFE SHINE — Verhalten der Seite
   Kein Framework, keine externen Abhängigkeiten.
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------------
     Kopfzeile: Hintergrund einblenden, sobald gescrollt wird
     ---------------------------------------------------------------------- */
  var header = document.querySelector(".site-header");

  if (header) {
    var updateHeader = function () {
      header.classList.toggle("is-stuck", window.scrollY > 24);
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  /* ------------------------------------------------------------------------
     Mobiles Menü
     ---------------------------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("hauptnavigation");

  if (toggle && nav) {
    var setMenu = function (open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.querySelector(".sr-only").textContent = open ? "Menü schließen" : "Menü öffnen";
      document.body.style.overflow = open ? "hidden" : "";
    };

    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------------
     Aktiven Menüpunkt markieren
     ---------------------------------------------------------------------- */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav a[href^="#"]:not([data-nav-cta])')
  );

  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle(
            "is-active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(function (section) { spy.observe(section); });
  }

  /* ------------------------------------------------------------------------
     Inhalte beim Scrollen einblenden
     ---------------------------------------------------------------------- */
  var revealTargets = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealer = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });

    revealTargets.forEach(function (el) { revealer.observe(el); });
  }

  /* ------------------------------------------------------------------------
     Videos: erst laden und abspielen, wenn die Karte im Bild ist
     ---------------------------------------------------------------------- */
  var videos = document.querySelectorAll("[data-inview-video]");

  if (videos.length && "IntersectionObserver" in window && !reduceMotion) {
    var videoSpy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var video = entry.target;

        if (entry.isIntersecting) {
          // Bei preload="none" hat der Browser die Quelle noch nicht
          // ausgewählt — load() holt das nach, bevor play() greift.
          if (video.preload === "none") {
            video.preload = "auto";
            video.load();
          }
          var start = video.play();
          // Manche Browser lehnen Autoplay ab — dann bleibt das Poster stehen.
          if (start && start.catch) start.catch(function () {});
        } else if (!video.paused) {
          video.pause();
        }
      });
    }, { threshold: 0.4 });

    videos.forEach(function (video) { videoSpy.observe(video); });
  }

  /* ------------------------------------------------------------------------
     Mobiler Sticky-CTA: erscheint nach dem Hero, tritt am Seitenende zurück
     ---------------------------------------------------------------------- */
  var stickyCta = document.querySelector("[data-sticky-cta]");
  var hero = document.querySelector(".hero");
  var closing = document.querySelector(".closing");

  if (stickyCta && hero) {
    var updateSticky = function () {
      var heroVorbei = window.scrollY > hero.offsetHeight * 0.75;
      var amAbschluss = closing
        ? closing.getBoundingClientRect().top < window.innerHeight * 0.9
        : false;

      stickyCta.classList.toggle("is-shown", heroVorbei && !amAbschluss);
    };

    updateSticky();
    window.addEventListener("scroll", updateSticky, { passive: true });
    window.addEventListener("resize", updateSticky, { passive: true });
  }

  /* ------------------------------------------------------------------------
     Paketauswahl aus der Preistabelle ins Formular übernehmen
     ---------------------------------------------------------------------- */
  var paketFeld = document.getElementById("paket");

  document.querySelectorAll("[data-paket]").forEach(function (link) {
    link.addEventListener("click", function () {
      if (paketFeld) paketFeld.value = link.dataset.paket;
    });
  });

  /* ------------------------------------------------------------------------
     Anfrageformular
     ---------------------------------------------------------------------- */
  var form = document.getElementById("anfrageformular");

  if (form) {
    var EMPFAENGER = "haufeshine@outlook.de";
    var status = form.querySelector(".form__status");

    var meldungen = {
      name:         "Bitte gib deinen Namen an.",
      email:        "Bitte gib eine gültige E-Mail-Adresse an.",
      nachricht:    "Bitte beschreibe dein Anliegen kurz.",
      einwilligung: "Bitte bestätige die Datenschutzerklärung."
    };

    var zeigeFehler = function (feldName, text) {
      var ausgabe = form.querySelector('[data-error-for="' + feldName + '"]');
      var eingabe = form.elements[feldName];
      var huelle = eingabe && eingabe.closest(".field");

      if (ausgabe) ausgabe.textContent = text || "";
      if (huelle) huelle.classList.toggle("is-invalid", Boolean(text));
    };

    var istEmail = function (wert) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(wert.trim());
    };

    var pruefe = function () {
      var fehler = [];

      Object.keys(meldungen).forEach(function (feldName) {
        var feld = form.elements[feldName];
        if (!feld) return;

        var leer = feld.type === "checkbox" ? !feld.checked : !feld.value.trim();
        var ungueltig = leer || (feldName === "email" && !istEmail(feld.value));

        zeigeFehler(feldName, ungueltig ? meldungen[feldName] : "");
        if (ungueltig) fehler.push(feld);
      });

      return fehler;
    };

    ["input", "change"].forEach(function (name) {
      form.addEventListener(name, function (event) {
        var feldName = event.target.name;
        if (feldName && meldungen[feldName]) pruefe();
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Spam-Falle: von Menschen nie ausgefüllt
      if (form.elements.website && form.elements.website.value) return;

      var fehler = pruefe();

      if (fehler.length) {
        fehler[0].focus();
        if (status) {
          status.hidden = false;
          status.textContent = "Bitte prüfe die markierten Felder.";
        }
        return;
      }

      var daten = new FormData(form);
      var leistungen = daten.getAll("leistung");

      var zeilen = [
        "Name: " + daten.get("name"),
        "E-Mail: " + daten.get("email"),
        "Telefon: " + (daten.get("telefon") || "—"),
        "Fahrzeug: " + (daten.get("fahrzeug") || "—"),
        "Wunschpaket: " + (daten.get("paket") || "noch offen"),
        "Leistungen: " + (leistungen.length ? leistungen.join(", ") : "—"),
        "",
        "Nachricht:",
        daten.get("nachricht")
      ];

      var betreff = "Anfrage Autoaufbereitung – " + daten.get("name");

      window.location.href =
        "mailto:" + EMPFAENGER +
        "?subject=" + encodeURIComponent(betreff) +
        "&body=" + encodeURIComponent(zeilen.join("\n"));

      if (status) {
        status.hidden = false;
        status.textContent =
          "Dein E-Mail-Programm öffnet sich mit der fertigen Anfrage. " +
          "Falls nichts passiert, schreib uns direkt an " + EMPFAENGER + ".";
      }
    });
  }

  /* ------------------------------------------------------------------------
     Jahreszahl in der Fußzeile
     ---------------------------------------------------------------------- */
  document.querySelectorAll("[data-jahr]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

}());
