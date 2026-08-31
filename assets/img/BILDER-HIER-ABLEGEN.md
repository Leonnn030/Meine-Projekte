# Fotos in diesem Ordner

Alle Bilder liegen mit festen Dateinamen hier. Wer eines austauschen will,
lädt einfach eine neue Datei mit **demselben Namen** hoch — die Seite zieht
sie automatisch, am Code muss nichts geändert werden.

Auf der Seite steht grundsätzlich nur, was es auch wirklich gibt. Es sind
keine leeren Bildkästen mehr eingebaut. Wer ein weiteres Foto zeigen will,
legt es hier ab und ergänzt eine Kachel in `index.html` — im Ergebnis-Band
(`.band__liste`) oder im Reiter „Privat & Flotten“ (`.arbeiten`).

## Belegt

| Dateiname | Motiv | Wo es erscheint |
|---|---|---|
| `marlo-portrait.jpg` | Spotify-Profil Marlo | Kunden, Reiter „Artists“ |
| `sq8-innenraum.jpg` | Audi SQ8, Rautensteppung | Galerie Marlo + Ergebnis-Band |
| `sq8-cockpit.jpg` | Audi SQ8, Türansicht mit Ambientelicht | Galerie Marlo + Ergebnis-Band |
| `bane-portrait.jpg` | Spotify-Profil Bane | Kunden, Reiter „Artists“ |
| `gle-cockpit.jpg` | Mercedes-AMG GLE, Cockpit | Galerie Bane |
| `gle-sitze.jpg` | Mercedes-AMG GLE, Sitz und AMG-Einstieg | Galerie Bane + Ergebnis-Band |
| `a-klasse-rot.jpg` | Mercedes A-Klasse, rotes Leder | Ergebnis-Band + Reiter „Privat & Flotten“ |
| `bmw-m4.jpg` | BMW M4, Carbon-Schalensitze | Ergebnis-Band + Reiter „Privat & Flotten“ |
| `bmw-x3.jpg` | BMW X3 M Sport | Ergebnis-Band + Reiter „Privat & Flotten“ |
| `mercedes-cla.jpg` | Mercedes CLA, rote Ziernähte | Ergebnis-Band + Reiter „Privat & Flotten“ |

Dazu die vier Standbilder `*-poster.jpg`, die vor dem jeweiligen Video liegen,
bis es startet, und `og-bild.jpg` als Vorschaubild beim Teilen.

## Videos

| Datei | Motiv | Wo |
|---|---|---|
| `hero-sq8.*` | Audi SQ8, Schaumwäsche | Hintergrund der Startfläche, weich und stumm |
| `marlo-sq8.*` | Audi SQ8, Schaumwäsche (voller Clip) | Galerie Marlo |
| `marlo-sq8-ergebnis.*` | Audi SQ8, fertig, Berliner Straße | Galerie Marlo |
| `bane-gle.*` | Mercedes-AMG GLE | Galerie Bane |
| `interieur-berlin.*` | Innenraum-Detailing | Reiter „Privat & Flotten" |

## Logo

| Dateiname | Was |
|---|---|
| `logo.svg` | Das Logo vom Flyer. **SVG bevorzugt** — dann bleibt es auf jedem Bildschirm scharf. Notfalls `logo.png` mit durchsichtigem Grund, mindestens 1200 Pixel breit; dann in `index.html`, `impressum.html` und `datenschutz.html` die drei Stellen `src="assets/img/logo.svg"` auf `.png` ändern. |

Sobald die Datei hier liegt, erscheint sie automatisch an allen vier Stellen
(Kopfzeile, Fußzeile, Impressum, Datenschutz). Bis dahin steht dort die
gezeichnete Marke.

## Noch frei

Der Bereich **Vorher / Nachher** wartet auf zwei Bildpaare. Gebraucht wird
jeweils dasselbe Fahrzeug, aus möglichst derselben Position:

| Dateiname | Motiv |
|---|---|
| `vorher-1.jpg` | Fahrzeug 1, vor der Aufbereitung |
| `nachher-1.jpg` | Fahrzeug 1, nach der Aufbereitung |
| `vorher-2.jpg` | Fahrzeug 2, vor der Aufbereitung |
| `nachher-2.jpg` | Fahrzeug 2, nach der Aufbereitung |

Sobald die vier Dateien hier liegen, werden sie in `index.html` im Abschnitt
`#vergleich` eingetragen — die leeren Flächen verschwinden dann.

## Hinweise

- **JPG**, lange Kante 1200–1600 Pixel. Größer bringt nichts und macht die
  Seite nur langsam.
- **Hochkant** passt am besten: sowohl das Ergebnis-Band als auch die
  Galerien arbeiten mit 3 : 4.
- **Kennzeichen** vorher unkenntlich machen — ein Kfz-Kennzeichen ist ein
  personenbezogenes Datum.
