# A Törött híd · 0.0.2 demó

**XI. osztály · Református vallás · Harag és megbocsátás: morális dilemmák az emberi kapcsolatokban**

Böngészőben futó, magyar nyelvű, részben képregényes döntésjáték Nóra szemszögéből. A demó a történet 0–7. jelenetét és mind az öt különálló befejezést végigjátszhatóvá teszi. A játékos Nóra reakcióiról dönt; Áron önálló szereplő, a bocsánatkérését nem a játékos „jó válaszai” váltják ki.

Ez **kipróbálásra készült dramaturgiai és pedagógiai munkaváltozat**, nem végleges tananyag. A szerző engedélyezte a működő demó programozását és a `0.0.2` változathoz jóváhagyott képregények beillesztését; ez a korábbi előkészítési sorrendet a demó céljára felülírja, a forrásszövegek végleges jóváhagyását nem helyettesíti.

## Kipróbálás helyben

A repository gyökeréből:

```sh
python3 -m http.server 8004 --bind 127.0.0.1
```

Nyisd meg a `http://localhost:8004` címet. A futó játék statikus HTML/CSS/JavaScript: nincs fordítás, adatbázis, alkalmazásszerver vagy futásidejű csomagfüggőség. A betűkészletek helyben találhatók.

## Mi működik a demóban?

- Nyitóképernyő és nyolc, sorrendben következő jelenet. A 0–2. jelenet jóváhagyott képregényeket használ, a 3–7. jelenetben a párbeszédek és Nóra belső gondolatai szöveges formában maradnak.
- A forrásból átvett döntési lehetőségek, utánuk olvasható következménnyel és a későbbi jelenetekhez illő változatokkal. **A válaszkártyára egyetlen kattintás rögzíti a választ**, nincs külön „Ezt választom” megerősítő gomb.
- Külön megerősítés a nyilvános megtorlás előtt; az **Átgondolom még** lehetőség visszalépést enged. A közzététel a történet fiktív eseménye: az alkalmazás nem küld üzenetet és nem publikál közösségi oldalra.
- A „Ne írj többet” határ következetes megtartása. Az ezt követő jóvátételi ajánlat nem Áron új magánüzeneteként jelenik meg.
- Öt saját záróoldal: történeti összefoglalás, erkölcsi tisztázás, bibliai útmutatás és magyarázat, két gondolkodtató kérdés, a döntési útvonal visszanézése és újrajátszás.
- Helyi, böngészőlaphoz kötött mentés, újratöltés utáni folytatással. Újrajátszáskor tiszta játékállapot indul.

Nincs pontozás, erkölcsi rangsor vagy személyes családi történeteket bekérő űrlap. Az R3 és R4 nem „rossz” befejezés; az R5 sem minősíti a játékost rossz embernek. Áron külön POV-ja nem része ennek a demónak. A képi tartalom kizárólag a szerző által már jóváhagyott tizenegy WebP-ből áll; az integráció során új illusztráció nem készült.

## Jóváhagyott képregények – 0.0.2 demó

A játék a `design/references/` mappában található **11 változatlan, jóváhagyott WebP-képet** használja. A teljes fájljegyzék a [képek dokumentációjában](design/references/README.md) található. Az eredeti `manifest.json` és `README_CODI.md` a ZIP `KEPEK/...` szerkezetére hivatkozik; a futó alkalmazás ehelyett a tényleges, egyetlen mappában lévő `design/references/<fájlnév>.webp` elérési utakat használja.

- **0. jelenet:** az ötpanelezett közös képregény az elsődleges megjelenítés.
- **1. jelenet:** a közös folyosói oldal után az eredeti négy választás következik. A kattintás az adott A/B/C/D következményképhez vezet.
- **2. jelenet, Ad3 sorrend:** előbb Nóra előző döntéstől függő belső monológja látható külön szövegként, alatta a közös, hárompaneles képregény, majd a válaszlehetőségek és a kiválasztott 2A/2B/2C/2D következménykép. A változó monológ nem kerül rá az állandó képre.
- **3–7. jelenet:** változatlanul szöveges, új vagy helyettesítő illusztráció nélkül.

A képen már szereplő párbeszéd nem ismétlődik közvetlenül hosszú, látható szövegkártyákban. A szükséges, képen nem szereplő döntésfüggő részek külön szöveges elemként maradnak meg. A teljes forrásszöveg továbbra is az adatréteg része; az elérhető **Szöveges átirat** lenyitható billentyűzettel és képernyőolvasóval is. Hibás vagy hiányzó kép esetén automatikusan megjelenik a működő szöveges tartalék, a történet és a választások használhatók maradnak.

A 2B és 2C kép azonos felső narrációja szándékos és jóváhagyott. A 2D kép is elfogadott; ezek feliratait az alkalmazás nem javítja át. A kép–jelenet hozzárendelés a külön `js/comics.js` adatállományban szerkeszthető. A döntési állapotgép, a történetszövegek és az öt lezárás működése nem változik.

### Olvasás és nagyítás telefonon

A képregények a rendelkezésre álló szélességhez igazodnak, az eredeti oldalarány megtartásával; sem panel, sem szövegbuborék nem kerül levágásra. A képre kattintva vagy koppintva külön nagyított nézet nyílik. A nagyítás és kicsinyítés gombjaival, illetve az alapnézet visszaállításával olvashatóbbá tehető a szöveg; a nagyított képen a nézeten belül lehet mozogni. A **Bezárás** vagy az **Escape** visszavisz ugyanahhoz a történeti ponthoz, a döntések és a mentés megváltoztatása nélkül.

Ez nem galéria: csak az aktuális történeti helyzethez tartozó kép töltődik be, a későbbi képregények nem töltődnek le egyszerre. A nagyított kép saját görgethető területet kap, az alapoldal nem görgetődik vízszintesen.

## Tartalmi forrás és a kiegészítések határa

Az eredeti, változatlan munkaforrások:

1. [Nóra POV-forgatókönyve](docs/nora-pov-forgatokonyv.md).
2. [Az öt befejezés reflexiós oldalai](docs/ot-befejezes-reflexios-oldalak.md).
3. [Projektutasítások](AGENTS.md).

A forrásszövegeket a programban forrásfájlra és sorszámra mutató adatok azonosítják. Az új dramaturgiai szövegek külön `js/adaptations.js` állományba kerülnek, saját azonosítóval és eredetjelöléssel. A bibliai magyarázatok új részeit a [reflexiós kiegészítések jegyzéke](docs/reflection-additions.md) is felsorolja; ezek nem szó szerinti bibliai idézetek. A reflexiók pedagógiai kiemeléseit sem tüntetjük fel szentírási idézetként.

A régi R5-összefoglaló felelősségvállalást tagadó mondata nem kerül feltétel nélkül a játékba. A megjelenített összefoglalás a tényleges útvonalhoz igazodik, és megőrzi azt a tényt, hogy Áron a 4. jelenetben elismerte a titoksértést.

A dramaturgiai változatokat, a befejezések demóban alkalmazott szabályait és a szerzői ellenőrzésre váró kérdéseket a [demójegyzetek](docs/demo-notes.md) részletezik.

## Ellenőrizhető útvonal az öt befejezéshez

A betűk az eredeti forgatókönyv A–E lehetőségeire utalnak. A 0. jelenetben nincs döntés; a táblázat az 1–6. jelenet válaszait adja meg. Ezeket a [tesztútvonalak](tests/routes.json) és az állapotteszt is ellenőrzi.

| Befejezés | 1. | 2. | 3. | 4. | 5. | 6. | Külön lépés |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R1 – A híd újjáépül | B | B | A | A | A | A | Nincs közzététel |
| R2 – A híd még épül | C | C | B | B | B | B | Nincs közzététel |
| R3 – Megbocsátás, de külön utakon | D | B | A | C | C | C | Nincs közzététel |
| R4 – A híd lezárva marad | B | C | C | D | C | D | Az 5/C nem elküldött válasz |
| R5 – A híd tovább omlik | A | A | D | B | D | E | Az 5/D és a 6/E után is erősítsd meg a közzétételt |

A végkifejletet nem csak az utolsó gomb határozza meg. Például a barátság felé nyitás R1-hez vagy R2-höz vezethet attól függően, milyen jóvátétel történt korábban. A puszta fenyegetés vagy egy visszavont tervezet nem azonos a végrehajtott megtorlással.

## Fájlok

- `index.html`, `css/styles.css`: a reszponzív felület, a képregény nagyított nézete és a közös alkalmazáscsalád arculata.
- `js/story.js`: a forrásból átvett jelenetek, párbeszédek és választási lehetőségek.
- `js/adaptations.js`: elkülönített dramaturgiai változatok és az aktuális úthoz igazított történeti összefoglalások.
- `js/reflections.js`: az öt külön reflexió; a forrásból átvett részek és az új magyarázatok megkülönböztetésével.
- `js/engine.js`: tiszta állapotgép, események, befejezési szabályok és biztonságos munkamenetmentés.
- `js/app.js`: megjelenítés és eseménykezelés; a történeti szöveg adatból érkezik.
- `js/comics.js`: a közös jelenetképek és döntési következményképek külön hozzárendelése, alternatív szövegek és átiratok.
- `design/references/`: a tizenegy jóváhagyott WebP és a változatlan szerzői beillesztési források.
- `js/version.js`, `package.json`, `package-lock.json`: a `0.0.2` kiadás verzióadatai és fejlesztői tesztkörnyezete.
- `assets/fonts/`: helyi betűkészletek, forrás- és licencadatok.
- `tests/`: forráshűség, állapotgép, reflexiók és a böngészős működés ellenőrzése.

A történet, a döntési logika és a megjelenítés külön réteg. A képregény és a szöveges jelenet ugyanazt a döntési állapotgépet használja; a további jóváhagyott képek később az adatszerkezet bővítésével kapcsolhatók a történethez.

## Tesztelés

A fejlesztői ellenőrzésekhez Node.js 20 vagy újabb, Python 3 és Chromium szükséges:

```sh
npm ci
npm test
npx playwright install chromium
npm run test:browser
```

A felhőkörnyezetben meglévő rendszer-Chromium használható, ha a Playwright-konfiguráció felismeri; ilyenkor a külön letöltés kihagyható.

Az állapottesztek az összes elérhető döntés-, közzététel- és korrekciókombinációt, mind az öt végkifejletet, a visszalépést, a mentést és az újrajátszást ellenőrzik. A forráshűségtesztek közvetlenül az eredeti Markdown-dokumentumokhoz mérik az átvett szövegeket. A böngészőtesztek a tényleges felületet és a feltételes jeleneteket vizsgálják mobilon és asztali nézetben. A képregény-integráció ellenőrzése kiterjed a tizenegy helyes képelérési útra, az Ad3 sorrendre, a nagyításra és visszatérésre, a szöveges átiratra, valamint a képhiba utáni tartalékmegjelenítésre. A 3–7. jelenet és mind az öt befejezés ellenőrzése továbbra is szükséges.

## Helyi adatkezelés

A játék a `sessionStorage` `torott_hid_demo_v1` kulcsát használja. A mentés csak a döntési útvonalat, a jelenetet, a közzétételi megerősítéseket és a korrekció állapotát tartalmazza. Nincs regisztráció, névbekérés, analitika vagy szerveroldali válaszgyűjtés.

A munkamenet a böngészőlaphoz kötött. A böngésző saját lap-helyreállítása egy korábban bezárt munkamenetet is visszaállíthat. Tiltott vagy betelt tároló mellett a játék memóriában tovább használható; sérült mentésnél tiszta állapot indul. Újrajátszáskor csak e játék saját állapota törlődik, más alkalmazások tárolókulcsai megmaradnak.

## GitHub és GitHub Pages

A 0.0.2 képregény-integráció fejlesztési és felülvizsgálati ága: **`feat/comics-v0.0.2`**.

A repository ellenőrzött Pages-beállítása:

1. **Settings → Pages → Build and deployment**.
2. **Source: Deploy from a branch**.
3. **Branch: `demo/v0.0.1`**, mappa: **`/ (root)`**.

A `demo/v0.0.1` ágnév történeti név: nem határozza meg az alkalmazás verziószámát. Az alkalmazás verziója továbbra is **0.0.2 demó**, a `package.json` alapján. A meglévő Pages-konfiguráció megtartásával a tesztelt alkalmazáscommitnak erre a kiszolgálási ágra is el kell jutnia; a fejlesztési ág feltöltése önmagában nem frissíti az élő oldalt.

A `.nojekyll` jelzi a közvetlen statikus kiszolgálást; nincs szükség alkalmazásfordításra. A Pages címe: `https://tobiasistvant-sketch.github.io/Torott-Hid/`.

Az aktuális kiszolgált ágat a **Settings → Pages**, a tényleges telepítési eredményt a GitHub **Actions → pages-build-deployment** mutatja. A 0.0.2 képregény-integráció élő állapota csak a megfelelő commit sikeres buildje és telepítése után igazolható; a ténylegesen ellenőrzött közzétételi állapotot az átadási beszámoló rögzíti.

## Következő szerzői ellenőrzés

A [demójegyzetek szerzői kérdései](docs/demo-notes.md#szerzői-ellenőrzésre-váró-kérdések) alapján érdemes végigjátszani a történetet. Különösen a vissza nem vont nyilvános megtorlás utáni lezárás, a jóvátétel bizonytalan hatásai, az R5 útvonalfüggő összefoglalása és az új bibliai magyarázatok igényelnek tartalmi ellenőrzést. Ez a lista a működő demó továbbfejlesztését szolgálja; nem állítja, hogy a munkaváltozat már végleges tananyag.
