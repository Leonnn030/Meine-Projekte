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

### 1. Preise sind Vorschläge

Die Beträge in `index.html` (Abschnitt `#leistungen`) sind hergeleitet, nicht
freigegeben — erkennbar am Hinweis „Vorschlag" an jedem Paketpreis.

| Paket | Vorschlag | Dauer |
|---|---|---|
| Basic | ab 149 € | 2–3 Stunden |
| Komplett | ab 349 € | 5–7 Stunden |
| Premium | ab 749 € | 1–2 Tage |

Herleitung: Der Wettbewerber Zera Detailing verlangt stationär 79/99/139 €
für reine Innenraumpakete. HAUFE SHINE bietet mobilen Komplettservice für
hochwertige Fahrzeuge — Anfahrt, autarkes Arbeiten und Zielgruppe
rechtfertigen ein deutlich höheres Niveau. Wer sich preislich neben einen
günstigen Anbieter stellt, wird auch so wahrgenommen.

Nach der Freigabe: Beträge ersetzen, die drei `<span class="tag-draft">`
entfernen, den Hinweis `<p class="pending">` darunter löschen sowie den
Satz über der Zusatzleistungstabelle streichen.

### 2. Impressum: zwei Angaben fehlen

Anschrift (Ritterfelddamm 93, 14089 Berlin), Telefon und E-Mail stehen.
In `impressum.html` und `datenschutz.html` fehlen noch:

- Vor- und Nachname des Inhabers
- Umsatzsteuer-Identifikationsnummer — oder, bei Kleinunternehmerstatus,
  der Hinweis auf § 19 UStG statt einer Nummer

Beide Stellen sind mit `[eckigen Klammern]` markiert.

### 3. Bildmaterial

Die Seite zeigt ausschließlich echtes Material. Weil keine Fotodateien
vorlagen, stammen alle Standbilder aus dem Schaumwäsche-Video des Audi SQ8
— an den schärfsten Stellen entnommen, moderat hochskaliert und
nachgeschärft. Die Quelle ist nur 464 × 832 Pixel, deshalb sind die Bilder
auf 742 Pixel Breite begrenzt.

| Datei | Motiv | Entnommen bei |
|---|---|---|
| `sq8-aussen.jpg` | Fahrzeug nach der Aufbereitung | 11,2 s |
| `detail-felge.jpg` | Felge mit rotem Bremssattel | 6,1 s |
| `detail-emblem.jpg` | S-line-Emblem, Lackspiegelung | 9,2 s |
| `prozess-felge.jpg` | Felge wird von Hand gereinigt | 7,1 s |
| `prozess-schaum.jpg` | Front unter Schaum | 4,1 s |
| `sq8-innenraum.jpg` | Sitz mit Rautensteppung | 5,1 s |
| `sq8-cockpit.jpg` | Cockpit mit Ambientebeleuchtung | 10,7 s |

Neue Bilder nach demselben Muster gewinnen:

```bash
ffmpeg -ss <sekunde> -i video.mov -frames:v 1 \
  -vf "scale=iw*1.6:ih*1.6:flags=lanczos,unsharp=5:5:0.55:3:3:0.25" \
  -q:v 3 assets/img/name.jpg
```

**Kennzeichen:** Auf `sq8-aussen.jpg` war das Kennzeichen lesbar und wurde
unkenntlich gemacht — ein Kfz-Kennzeichen ist ein personenbezogenes Datum.
Das Schaumwäsche-Video endet bei 10,8 Sekunden, weil danach die Frontansicht
mit lesbarem Kennzeichen folgt. **Bei neuem Material immer prüfen.**

Sobald echte Fotos vorliegen, ersetzen sie die Videostandbilder direkt —
gleiche Dateinamen genügen. Besonders wertvoll wäre eine helle
Außenaufnahme bei Tageslicht für den Hero; dort steht bislang eine
gezeichnete Fahrzeuggrafik.

Für diese Fahrzeuge fehlt jedes Material: BMW M4, BMW X3 M Sport,
Mercedes CLA, Mercedes A-Klasse, Mercedes-AMG GLE 63.

### 4. Anfrageformular

Das Formular öffnet das E-Mail-Programm des Besuchers (`mailto:`). Das
funktioniert ohne Server, aber Anfragen landen nicht automatisch im
Postfach. Für zuverlässigen Empfang einen Formular-Dienst (Formspree,
Web3Forms) oder ein kleines Server-Skript ergänzen. WhatsApp ist aktuell
der verlässlichste Kanal und deshalb überall prominent verlinkt.

## Videos

| Datei | Inhalt | Größe | Platz |
|---|---|---|---|
| `marlo-sq8.*` | Schaumwäsche des Audi SQ8 | 900 KB | Case Marlo |
| `marlo-sq8-ergebnis.*` | SQ8 fertig, Berliner Straße und Halle | 1,1 MB | Case Marlo |
| `interieur-berlin.*` | Innenraum-Detailing, Lenkrad unter Schutzfolie | 809 KB | Results |

Das Schaumwäsche-Video ist auf 10,8 Sekunden gekürzt (Kennzeichen im
Anschluss), das Innenraumvideo auf 12 Sekunden. Zusammen belegen alle drei
2,4 MB als MP4 — nichts davon lädt beim Seitenaufruf.

Jedes Video liegt als MP4 (H.264) und WebM (VP9) vor, alle ohne Tonspur,
weil Autoplay nur stumm erlaubt ist. Beim `interieur-berlin`-Video wurde der
obere Rand beschnitten — dort war ein Instagram-Standortsticker eingebrannt.

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
- Strukturierte Daten als `AutoDetailing` (schema.org) im `<head>`, mit
  vollständiger Anschrift und Einsatzgebieten. Adresse, Name und Telefon
  stimmen auf Startseite, Fußzeile und Impressum überein — Google bewertet
  diese Übereinstimmung für die lokale Suche.
- Textkontraste liegen über 7:1, getestet bei 390 px und 1440 px.
