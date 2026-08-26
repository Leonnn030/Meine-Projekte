# HAUFE SHINE

Website für **HAUFE SHINE** — mobile Premium-Autoaufbereitung in Berlin.
Statisches HTML, CSS und JavaScript, kein Build-Schritt, keine Abhängigkeiten.

## Aufbau

```
index.html          Startseite
impressum.html      Impressum
datenschutz.html    Datenschutzerklärung
assets/css/style.css
assets/js/main.js
assets/img/         Logo, Hero-Grafik, Fahrzeugbilder
assets/video/       Aufbereitungsvideos (MP4 + WebM)
```

Seitenstruktur: Hero → Statement → Leistungen (3 Pakete + Zusatzleistungen) →
We come to you → Results → Clients → Kontakt → FAQ → Abschluss-CTA.

## Lokal ansehen

```bash
python3 -m http.server 8000
```

## Farben

Die Palette stammt vom Flyer. Alle Werte stehen als CSS-Variablen oben in
`assets/css/style.css`; dort einmal ändern genügt.

| Rolle | Token | Wert |
|---|---|---|
| Grundschwarz | `--ink` / `--background-primary` | `#050505` |
| Abgesetztes Band | `--ink-raised` / `--background-secondary` | `#0b0b0b` |
| Fläche | `--ink-panel` / `--surface` | `#111111` |
| Gold (Kernton) | `--gold` / `--brand-primary` | `#c8942e` |
| Gold hell | `--gold-light` / `--brand-accent` | `#e3bc6a` |
| Gold dunkel | `--gold-deep` / `--brand-secondary` | `#8a651b` |
| Weiß | `--white` / `--text-primary` | `#ffffff` |
| Fließtext | `--muted` / `--text-secondary` | `#9c9c9c` |
| Haarlinie | `--line-soft` / `--border-hairline` | `#191919` |

Neutrale Graustufen ohne Farbstich, wie auf dem Flyer.

## Offene Punkte

### 1. Preise fehlen

In den drei Paketen steht `——` statt eines Betrags. Sobald die Preise
feststehen, in `index.html` im Abschnitt `#leistungen` ersetzen und den
Hinweiskasten darunter (`<p class="pending">`) entfernen.

### 2. Impressum unvollständig

In `impressum.html` und `datenschutz.html` sind offene Stellen mit
`[eckigen Klammern]` markiert. Es fehlen:

- Vor- und Nachname des Inhabers
- **Ladungsfähige Berliner Anschrift** — auch ein rein mobiler Betrieb
  braucht eine; ein Postfach genügt nicht
- Umsatzsteuer-Identifikationsnummer oder Hinweis auf § 19 UStG

Telefonnummer und E-Mail stammen vom Flyer und sind belegt.

### 3. Fotos fehlen

In `assets/img/` liegen Platzhalter (`work-*.svg`) für sechs Fahrzeuge, die
in den bisherigen Aufnahmen erkennbar waren. Ersetze sie durch echte Fotos
(JPG oder WebP) und passe die Dateiendung in `index.html` an.

| Datei | Fahrzeug | Verwendung | Format |
|---|---|---|---|
| `work-m4.svg` | BMW M4 | Results, groß | 1600 × 1000, 16:10 |
| `work-a-klasse-rot.svg` | Mercedes A-Klasse rot | Results, hochkant | 900 × 1200, 3:4 |
| `work-cla.svg` | Mercedes CLA | Results | 1200 × 900, 4:3 |
| `work-x3.svg` | BMW X3 | Results | 1200 × 900, 4:3 |
| `work-sq8.svg` | Audi SQ8 | Case Marlo | hochkant, 9:16 |
| `work-gle-amg.svg` | Mercedes-AMG GLE 63 | Case Bane | 1600 × 1000, 16:10 |
| `og-bild.jpg` | — | Vorschau beim Teilen | 1200 × 630 — **fehlt** |

Auch die `alt`-Texte anpassen, sobald die echten Bilder drin sind.

Für den Hero fehlt weiterhin eine **Außenaufnahme**. Alle bisherigen Fotos
sind Innenraumaufnahmen; aktuell steht dort eine gezeichnete Fahrzeuggrafik.

### 4. Kundennennung freigeben lassen

Die Cases nennen **Marlo** (Audi SQ8) und **Bane** (Mercedes-AMG GLE 63)
namentlich. Vor dem Veröffentlichen eine schriftliche Freigabe beider
einholen — bei bekannten Personen greift das Persönlichkeitsrecht.

### 5. Anfrageformular

Das Formular öffnet das E-Mail-Programm des Besuchers (`mailto:`). Das
funktioniert ohne Server, aber Anfragen landen nicht automatisch im
Postfach. Für zuverlässigen Empfang einen Formular-Dienst (Formspree,
Web3Forms) oder ein kleines Server-Skript ergänzen. WhatsApp ist aktuell
der verlässlichste Kanal und deshalb überall prominent verlinkt.

## Videos

`assets/video/marlo-sq8.mp4` (900 KB) mit `marlo-sq8.webm` als Fallback.
Beide ohne Tonspur, weil Autoplay nur stumm erlaubt ist.

Videos laden mit `preload="none"` und starten erst, wenn sie im sichtbaren
Bereich sind; verlassen sie ihn, pausieren sie wieder. Neue Videos nach
demselben Muster einbinden:

```bash
ffmpeg -i original.mov -an -c:v libx264 -crf 28 -preset slow \
  -movflags +faststart -pix_fmt yuv420p ausgabe.mp4
ffmpeg -i ausgabe.mp4 -frames:v 1 -ss 4 -q:v 4 poster.jpg
```

Am `<video>`-Element `data-inview-video` setzen, dann übernimmt
`assets/js/main.js` den Rest.

## Veröffentlichen

Kein Build nötig — alle Dateien auf einen Webspace hochladen. Alternativ
GitHub Pages: in den Repository-Einstellungen unter *Pages* den Branch
auswählen und die eigene Domain eintragen.

## Technische Hinweise

- Durchgehend dunkel gehalten: Schwarz und Gold sind die Markenfarben.
- Gestaltet über Schwarzraum und Haarlinien, nicht über Rahmen. Der einzige
  Rahmen ist das Siegel aus dem Flyer — deshalb fällt er auf.
- Ein Vorher/Nachher-Regler ist bewusst **nicht** eingebaut, solange keine
  passenden Bildpaare vorliegen. Die Struktur lässt sich später ergänzen.
- Alle Animationen respektieren `prefers-reduced-motion`.
- Strukturierte Daten als `AutoDetailing` (schema.org) im `<head>`.
- Textkontraste liegen über 7:1, getestet bei 390 px und 1440 px.
