# A Törött híd · v1.0 · Fejlesztés alatt

**XI. osztály · Református vallás · Harag és megbocsátás: morális dilemmák az emberi kapcsolatokban**

Magyar nyelvű, böngészőben futó erkölcsi döntésjáték Nóra szemszögéből. A játékos Nóra szavait, reakcióit és határait választja meg; Áron önálló szereplő. A történet a 0–6. jeleneten vezet át az öt különálló R-befejezés egyikéhez. A kiadás státusza **Fejlesztés alatt**.

## Kipróbálás

A repository gyökeréből:

```sh
python3 -m http.server 8004 --bind 127.0.0.1
```

Nyisd meg a `http://localhost:8004` címet. A GitHub Pages címe: **https://tobiasistvant-sketch.github.io/Torott-Hid/**. A futó játék statikus HTML/CSS/JavaScript; nincs alkalmazásfordítás, adatbázis vagy futásidejű csomagfüggőség. A betűkészletek helyben találhatók. A közzétett változatot a Pages sikeres telepítési commitja igazolja, nem egy helyi szerver elindítása.

## Mi működik a v1.0 kiadásban?

- A 0–6. jelenet képregényes megjelenítése, kattintás nélkül látható, hozzáférhető szöveges átirattal és képhiba esetén működő szöveges tartalékkal.
- Egykattintásos válaszkártyák, döntésfüggő felvezetések, monológok és következmények. A korábbi választások befolyásolják a későbbi képet és a befejezést.
- J4–D után a J5 nyitása osztálytárstól származó közvetett információt mutat. Áron nem kezdeményez új személyes üzenetet. Nóra új, korlátozott kapcsolatfelvétele különbözik ettől a tiltott megkereséstől.
- J5–D kiválasztásakor a fiktív történetben valóban megtörténik a közzététel. Nincs piszkozat, második megerősítés vagy a választást minősítő figyelmeztetés. A játék maga nem küld üzenetet és nem publikál külső szolgáltatásba.
- J6–E a jóváhagyott osztály előtti vita; nem újabb titok közzététele. A J6 mind az öt választása elérhető marad, J5–D után is.
- A kezdőoldal H0 hídképe és az öt R-kimenet saját hídillusztrációja. Nincs folyamatos hídmérő vagy hídanimáció a J0–J6 között.
- Öt külön záróoldal történeti összefoglalással, erkölcsi és bibliai reflexióval, a jóváhagyott R-kérdésekkel, döntési útvonallal és újrajátszással.
- A 0.0.3 kiadásból megőrzött **← Előző képernyő** és **Következő képernyő →** gombok, böngésző Vissza/Előre kezelés, újratöltés utáni folytatás és tiszta újrakezdés.

Nincs pontozás, erkölcsi rangsor, analitika vagy személyes családi élményeket bekérő űrlap. R3 és R4 nem erkölcsi kudarc, R5 sem minősíti a játékost rossz embernek. A megbocsátás nem jelent automatikus kibékülést vagy teljes bizalmat.

## Tartalmi forrás és képanyag

A [v1.0 integrációs jegyzék](docs/release-v1.0.md) külön sorban követi a J–01–J–20 pontokat, a nyitott szerzői döntéseket és az ellenőrzést. Az irányadó források:

- [Kumulatív javítási jegyzék](docs/01_javitasi_jegyzek_0.0.4_TELJES.md).
- [Pontos szövegfrissítések](docs/02_szovegfrissitesek_0.0.4_TELJES.md).
- [R-képernyők reflexiós kérdései](docs/04_R_reflexios_kerdesek.md).
- [J5/J6/híd csomagjegyzék](docs/manifest_J5_J6_HID_0.0.4.json), továbbá a korábbi J3/J4 jegyzékek.

A fájlnevekben megmaradó `0.0.4` dokumentumtörténeti azonosító; az alkalmazás aktuális megjelenített kiadása **v1.0**. Az eredeti forgatókönyvek és korábbi változásjegyzékek változatlanul megmaradnak. A friss, kumulatív szövegek elsőbbségét a külön `js/revisions.js` réteg biztosítja.

Összesen **39 meglévő WebP** kapcsolódik az alkalmazáshoz: a korábbi 21 kép, 12 új J5/J6 képregény és 6 hídillusztráció. A [teljes képfájljegyzék](design/references/README.md) a tényleges `design/references/<fájlnév>.webp` útvonalakat sorolja fel. A J5/J6/híd manifest tényleges helye **`docs/manifest_J5_J6_HID_0.0.4.json`**, nem a feladatleírásban jelzett `design/references/` könyvtár. A csomagok `kepek/...` útvonalai nem a játék futásidejű elérési útjai.

A J5/J6 képregények jóváhagyottak. A hat hídkép a felhasználó integrációs kérése alapján szerepel a játékban, **egyedi végleges vizuális jóváhagyásuk még nyitott**. Könnyen cserélhető metaadatként maradnak a központi hozzárendelésben. A kiadás nem generál, rajzol újra, vág vagy feliratoz át képet.

**J–05 nyitott:** nincs jóváhagyott cserekép a J2–B nagy fehér területének javítására. A jelenlegi fájl változatlan marad. **J–20 szintén nyitott:** a J5–D utáni J6 A/B/C-zárolás és az R4/R5 plusz gomb nincs aktiválva. A [kiadási jegyzék](docs/release-v1.0.md#nyitott-tervek-konkrét-javaslatok-aktiválás-nélkül) rövid, ellenőrizhető javaslatot ad hozzájuk.

## Navigáció és adatkezelés

A két játékbeli gomb a már meglátogatott állapotokat járja be; nem lép át még meg nem hozott döntésen. A határon inaktívvá válik. Korábbi döntés megváltoztatásakor a régi folytatás helyett az új választás szerinti út marad érvényes. A gombokhoz nincs szükség a böngésző History API-jára; elérhető API mellett a böngésző saját Vissza/Előre gombjai is a megtekintett képernyőket követik. A történet első előzménybejegyzése előtt az oldal elhagyható.

Az aktuális állapot a `sessionStorage` `torott_hid_demo_v1`, a képernyőelőzmény a `torott_hid_navigation_v1` kulcsán marad. Ezek történeti belső kulcsnevek, nem alkalmazásfeliratok. A játék nem ír a `localStorage`-ba, és nem küldi szerverre a döntéseket. Ezért a láblécben szereplő **Nincs pontozás. A döntéseid ezen a böngészőlapon maradnak.** tájékoztatás megfelel a működésnek. A böngésző saját lap-helyreállítása visszahozhatja a munkamenetet.

Az állapotformátum v2 a J5–D megtörtént közlését és a J6–E vitáját külön kezeli. Korábbi mentésből egy el nem küldött J5–D tervezet nem válhat utólag közléssé: az érintett mentés az 5. döntéshez tér vissza, az előző választások megőrzésével. Az egykori J6–E közzétételi/megerősítési állapot a 6. döntéshez tér vissza. A változatlan jelentésű régi útvonalak megőrizhetők. Tiltott vagy betelt tároló mellett a játék memóriában használható; sérült mentésnél tiszta állapot indul. Újrakezdéskor más alkalmazások tárolóadatai megmaradnak.

A régi kiadásból már létező, kifejezetten választandó J6 korrekció nem automatikus visszavonás, és nem az új R4/R5-gombterv. A tényleges J5–D közlés tényét nem törli; a felhasználó által még nem véglegesített új helyreállító út nem kerül a játékba.

## Verzió, státusz és lábléc

A csomag szemantikus verziója `1.0.0`; a felhasználói megjelenítés **v1.0**, a státusz **Fejlesztés alatt**. A verzió központi forrása a `package.json`; a meglévő `npm version`/`npm run version:sync` folyamat szinkronizálja a generált metaadatokat, az HTML-t és a JavaScript/CSS-hivatkozásokat. A verzióellenőrzés a tesztek előfeltétele.

Az alsó tájékoztató után, normál, 400-as betűsúllyal és visszafogott láblécstílussal ez a két sor szerepel:

```text
Koncepció és fejlesztés: Tóbiás István Tamás
MI-támogatott fejlesztés · v1.0 · Fejlesztés alatt
```

A státuszcsere a jelenlegi felületet érinti. A régi kiadások történeti dokumentációját nem írja át, és nem indokolja az egész arculat áttervezését.

## Tesztelés

```sh
npm ci
npm test
npx playwright install chromium
npm run test:browser
```

A tesztekhez Node.js 20 vagy újabb, Python 3 és Chromium szükséges. A konfiguráció által felismert rendszer-Chromium mellett a külön böngészőletöltés kihagyható.

A logikai tesztek az állapotkezelést, az öt befejezést, a korábbi mentések migrációját, a forráshűséget és a képek hozzárendelését vizsgálják. A böngészős ellenőrzés kiterjed a J4(A–D) → J5(A–D) → J6(A–E) **80 kombinációjára**, a megjelenő monológokra, képekre és R-kimenetre, a navigációra, az újratöltésre, az újrakezdésre, a billentyűzetre és az adattárolási határokra. A v1.0-hoz kapcsolódó ellenőrzések a [`tests/integration-v1.spec.cjs`](tests/integration-v1.spec.cjs) fájlban követhetők; a korábbi J0–J4 és navigációs regressziók megmaradnak.

A tesztek tényleges számát és eredményét az adott futás kimenete és az átadási beszámoló igazolja. Az ellenőrzési terv nem helyettesíti a sikeres futtatást.

## GitHub Pages és kiadási ellenőrzés

A Pages címe: **https://tobiasistvant-sketch.github.io/Torott-Hid/**. A kiszolgálási ágat a **Settings → Pages**, a tényleges telepítést az **Actions → pages-build-deployment** mutatja. A korábbi konfiguráció a történeti nevű `demo/v0.0.1` ágat használta. Külön kiszolgálási ág esetén ugyanannak a tesztelt commitnak a `main` és a tényleges Pages-forráságra is el kell jutnia; a `main` frissítése önmagában nem bizonyítja az élő változat frissülését.

Kiadás után össze kell vetni a branch SHA-kat és a sikeres Pages-build commitját. Az élő oldal böngészős ellenőrzése külön lépés: hálózati tiltás esetén nem tekinthető elvégzettnek. A végleges commit-/PR-azonosítót, a teszteredményeket, a telepítés és az élő ellenőrzés tényleges állapotát az átadási beszámoló rögzíti.
