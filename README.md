# Haufe Shine — Autoaufbereitung

Website für Haufe Shine Autoaufbereitung in Stockstadt am Main.
Statisches HTML, CSS und JavaScript — kein Build-Schritt, keine Abhängigkeiten.

## Aufbau

```
index.html          Startseite (Hero, Leistungen, Ablauf, Projekte, Preise, Über uns, Anfrage, FAQ)
impressum.html      Impressum
datenschutz.html    Datenschutzerklärung
assets/css/style.css
assets/js/main.js
assets/img/         Logo, Hero-Grafik und Projektbilder
```

## Lokal ansehen

```bash
python3 -m http.server 8000
```

Dann http://localhost:8000 im Browser öffnen.

## Was du anpassen solltest

### 1. Eigene Fotos einsetzen

In `assets/img/` liegen Platzhalter als SVG. Ersetze sie durch echte Fotos
(JPG oder WebP) und passe die Dateiendung in `index.html` an:

| Datei | Verwendung | Empfohlenes Format |
|---|---|---|
| `projekt-01.svg` … `projekt-06.svg` | Projektgalerie | 1200 × 900 px, 4:3 |
| `vorher.svg` / `nachher.svg` | Vergleichsregler | 1600 × 900 px, 16:9 |
| `hero-fahrzeug.svg` | Fahrzeug im Hero | freigestelltes PNG mit transparentem Hintergrund |
| `og-bild.jpg` | Vorschaubild beim Teilen | 1200 × 630 px — **fehlt noch** |

Denk daran, auch den `alt`-Text jedes Bildes anzupassen — er beschreibt, was
zu sehen ist, und hilft sowohl blinden Besuchern als auch bei Google.

### 2. Preise prüfen

Die Preise in `index.html` (Abschnitt `#preise`) sind Vorschläge. Trag deine
echten Werte ein oder sag Bescheid, dann passen wir sie gemeinsam an.

### 3. Rechtstexte vervollständigen

In `impressum.html` und `datenschutz.html` sind die offenen Stellen mit
`[eckigen Klammern]` markiert und zusätzlich in einem gold umrandeten Kasten
zusammengefasst. **Vor dem Veröffentlichen ausfüllen** — ein unvollständiges
Impressum kann abgemahnt werden. Offen sind:

- Vor- und Nachname des Inhabers
- Umsatzsteuer-Identifikationsnummer oder Hinweis auf § 19 UStG (Kleinunternehmer)

Lass die Texte vor dem Start einmal von jemandem mit Rechtskenntnis prüfen.

### 4. Anfrageformular

Das Formular öffnet aktuell das E-Mail-Programm des Besuchers mit einer fertig
ausgefüllten Nachricht (`mailto:`). Das funktioniert ohne Server, hat aber zwei
Haken: auf Geräten ohne eingerichtetes Mail-Programm passiert nichts, und die
Anfrage landet nicht automatisch bei dir.

Wenn Anfragen zuverlässig ankommen sollen, brauchst du einen Formular-Dienst
(z. B. Formspree, Web3Forms) oder ein kleines Server-Skript. Sag Bescheid,
dann bauen wir das um.

### 5. Adresse prüfen

Auf dem Flyer steht `Untermainstraße 24, 63811 Stockstadt am Main` — diese
Adresse ist überall auf der Seite eingetragen. Der Google-Maps-Eintrag zeigt
allerdings auf Berlin. Bitte klär, welche Angabe stimmt, und korrigiere sie
gegebenenfalls in `index.html`, `impressum.html`, `datenschutz.html` und im
strukturierten Datenblock (`application/ld+json`) im `<head>` der Startseite.

## Veröffentlichen

Die Seite braucht keinen Build. Alle Dateien auf einen Webspace hochladen —
fertig. Alternativ über GitHub Pages: in den Repository-Einstellungen unter
*Pages* den gewünschten Branch auswählen.

Wenn die Seite unter `haufeshine.com` läuft, in den Pages-Einstellungen die
eigene Domain eintragen und beim Domain-Anbieter den passenden DNS-Eintrag
setzen.

## Farben

Die Palette folgt dem Flyer. Alle Werte stehen als CSS-Variablen ganz oben in
`assets/css/style.css` — dort einmal ändern genügt, die ganze Seite zieht nach.

| Rolle | Wert |
|---|---|
| Grundschwarz | `#050505` |
| Abgesetztes Band | `#0b0b0b` |
| Gold (Kernton) | `#c8942e` |
| Gold hell | `#e3bc6a` |
| Gold dunkel | `#8a651b` |
| Weiß | `#ffffff` |
| Fließtext | `#9c9c9c` |

Bewusst neutrale Graustufen ohne Farbstich — genau wie auf dem Flyer.

## Technische Hinweise

- Die Seite ist bewusst durchgehend dunkel gehalten — Schwarz und Gold sind
  die Markenfarben, ein heller Modus würde diese Wirkung brechen.
- Gestaltet wird über Schwarzraum und Haarlinien, nicht über Rahmen. Der
  einzige echte Rahmen auf der Seite ist das Siegel aus dem Flyer — und genau
  deshalb fällt er auf.
- Schriften kommen von Google Fonts. Wer das vermeiden möchte (Datenschutz),
  kann sie herunterladen und lokal einbinden; die Datenschutzerklärung ist
  dann entsprechend zu kürzen.
- Alle Animationen respektieren `prefers-reduced-motion`.
- Getestet in Chromium bei 390 px und 1440 px Breite, ohne horizontales Scrollen.
