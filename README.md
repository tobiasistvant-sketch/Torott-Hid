# A Törött híd · 0.0.4 demó

**XI. osztály · Református vallás · Harag és megbocsátás: morális dilemmák az emberi kapcsolatokban**

Böngészőben futó, magyar nyelvű, részben képregényes döntésjáték Nóra szemszögéből. A demó a történet 0–7. jelenetét és mind az öt különálló befejezést végigjátszhatóvá teszi. A játékos Nóra reakcióiról dönt; Áron önálló szereplő, a bocsánatkérését nem a játékos „jó válaszai” váltják ki.

Ez **kipróbálásra készült dramaturgiai és pedagógiai munkaváltozat**, nem végleges tananyag. A szerző engedélyezte a működő demó programozását és a 0.0.4 kiadás jóváhagyott szövegeinek, valamint meglévő képregényeinek beillesztését. A kumulatív javítási jegyzék és szövegfrissítések az adott jeleneteknél elsőbbséget kapnak a korábbi munkaváltozattal szemben; az eredeti forrásdokumentumok megmaradnak.

## Kipróbálás helyben

A repository gyökeréből:

```sh
python3 -m http.server 8004 --bind 127.0.0.1
```

Nyisd meg a `http://localhost:8004` címet. A futó játék statikus HTML/CSS/JavaScript: nincs fordítás, adatbázis, alkalmazásszerver vagy futásidejű csomagfüggőség. A betűkészletek helyben találhatók.

## Mi működik a demóban?

- Nyitóképernyő és nyolc, sorrendben következő jelenet. A 0–4. jelenet jóváhagyott képregényeket használ; az 5–7. jelenet szöveges marad.
- A forrásból átvett döntési lehetőségek, utánuk olvasható következménnyel és a későbbi jelenetekhez illő változatokkal. **A válaszkártyára egyetlen kattintás rögzíti a választ**, nincs külön „Ezt választom” megerősítő gomb.
- Külön megerősítés a nyilvános megtorlás előtt; az **Átgondolom még** lehetőség visszalépést enged. A közzététel a történet fiktív eseménye: az alkalmazás nem küld üzenetet és nem publikál közösségi oldalra.
- A „Ne írj többet” határ következetes megtartása. Az ezt követő jóvátételi ajánlat nem Áron új magánüzeneteként jelenik meg.
- Öt saját záróoldal: történeti összefoglalás, erkölcsi tisztázás, bibliai útmutatás és magyarázat, két gondolkodtató kérdés, a döntési útvonal visszanézése és újrajátszás.
- Helyi, böngészőlaphoz kötött mentés, újratöltés utáni folytatással. Újrajátszáskor tiszta játékállapot indul.
- Állandó helyen megjelenő **← Előző képernyő** és **Következő képernyő →** gombok a már meglátogatott képernyők közötti mozgáshoz. A képernyőelőzmények újratöltés után is megmaradnak; egy korábbi döntés megváltoztatása új történeti folytatást indít.

Nincs pontozás, erkölcsi rangsor vagy személyes családi történeteket bekérő űrlap. Az R3 és R4 nem „rossz” befejezés; az R5 sem minősíti a játékost rossz embernek. Áron külön POV-ja nem része ennek a demónak. A képi tartalom kizárólag a szerző által már jóváhagyott **21 WebP-ből** áll: a korábbi tizenegy kép megmarad, és tíz meglévő J3/J4 illusztráció kapcsolódik hozzájuk. Az integráció során új illusztráció nem készül.

## A 0.0.4 kiadás tartalma és nyitott feladata

A [J–01–J–12 áttekintés](docs/release-0.0.4.md) minden javításhoz megadja a megvalósítás helyét és az ellenőrzési szempontokat. Az irányadó szövegek a [teljes javítási jegyzékben](docs/01_javitasi_jegyzek_0.0.4_TELJES.md) és a [teljes szövegfrissítésekben](docs/02_szovegfrissitesek_0.0.4_TELJES.md) találhatók.

A 3. jelenet elején a 2. döntéshez, a 4. jelenet elején a 3. döntéshez tartozó négy-négy jóváhagyott monológ egyikét látja a játékos. Mindkét jelenetnek közös nyitóképe és négy külön döntési következményképe van. A J4–D a végleges `04D_ne_irj_tobbet_JOVAHAGYOTT.webp` fájlt használja; Áron nem küld lezáró választ, és a későbbi jelenetek tiszteletben tartják a személyes megkeresés tiltását.

**J–05 továbbra is nyitott:** a 2B kép nagy, üres fehér területének grafikai javítása nincs elkészítve. A jelenlegi kép változatlan marad; a feladat nem tekinthető teljesítettnek.

## Képernyőnavigáció – 0.0.3 demó

A két navigációs gomb már a kezdőképernyőn látszik, a történet tartalma fölött, állandó helyen. Ha nincs korábbi vagy későbbi meglátogatott képernyő, a megfelelő gomb inaktív. A **Következő képernyő →** a már bejárt folytatáshoz tér vissza; az új jeleneteket továbbra is a történet eredeti választásai és **Tovább a történetben** gombja nyitják meg.

Visszalépés után ugyanaz a döntés és következmény áll vissza, amely az adott képernyőhöz tartozott. A döntési képernyőn másik választ is kijelölhetsz: ilyenkor a korábbi folytatás helyett az új választás szerinti út marad érvényes. A navigációs előzmény külön, böngészőlaphoz kötött mentést kap; a játékbeli gombok működéséhez nem szükséges a böngésző History API-ja.

A böngésző Vissza/Előre gombjai is a játék korábban bejárt állapotait követik, amikor a History API elérhető. A böngészőbejegyzések a mentett útvonalhoz tartozó azonosítókat használnak: egy elhagyott döntési ág vagy egy újrajátszás előtti játékállapot nem írhatja felül az aktuális történetet. A játék első előzménybejegyzése előtt az oldal elhagyható.

A hibafeltárás bizonyítékait, a mentési modellt és a megismételhető ellenőrzéseket a [0.0.3 navigációs jegyzet](docs/navigation-0.0.3.md) részletezi. Ez a navigációs működés a 0.0.4 tartalmi és képi frissítése mellett is megmarad. A J–01 és J–02 a korábbi navigációs kiadásban még nem szerepelt; a 0.0.4 beépíti őket.

## Jóváhagyott képregények – 0.0.4 demó

A játék a `design/references/` mappában található **21 változatlan, jóváhagyott WebP-képet** használja. A teljes fájljegyzék a [képek dokumentációjában](design/references/README.md) található. A jelenlegi J3 csomagjegyzék a `design/references/manifest.json`, a J4 jegyzék tényleges helye pedig a [`docs/manifest_J4_0.0.4.json`](docs/manifest_J4_0.0.4.json). A csomagok `kepek/...` elérési útjai helyett a futó alkalmazás a tényleges `design/references/<fájlnév>.webp` útvonalakat használja.

- **0. jelenet:** az ötpanelezett közös képregény az elsődleges megjelenítés.
- **1. jelenet:** a közös folyosói oldal után az eredeti négy választás következik. A kattintás az adott A/B/C/D következményképhez vezet.
- **2. jelenet:** a J–03 felvezetése a közös kép fölött jelenik meg. A kijelölt két fölösleges blokk kimarad; a többi szükséges döntésfüggő szöveg megmarad. Ezután a válaszlehetőségek és a kiválasztott 2A/2B/2C/2D következménykép következik.
- **3. jelenet:** J–06 monológ → külön J–07 narráció → közös nyitókép → döntés → a megfelelő 3A/3B/3C/3D következménykép.
- **4. jelenet:** J–10 monológ → jóváhagyott közös bocsánatkérő kép → döntés → a megfelelő 4A/4B/4C/4D következménykép.
- **5–7. jelenet:** szöveges, új vagy helyettesítő illusztráció nélkül.

A szöveges átirat alapértelmezetten látható, külön lenyitógomb nélkül, és képernyőolvasóval is elérhető. Ugyanaz a párbeszéd egyetlen átiratban szerepel: nincs mellé újabb eredeti párbeszédkártya vagy megismételt válaszidézet. A szükséges, képen nem szereplő döntésfüggő részek külön szöveges elemként maradnak meg. Hibás vagy hiányzó kép esetén automatikusan működő szöveges tartalék jelenik meg; a történet és a választások használhatók maradnak.

A 2B és 2C kép azonos felső narrációja szándékos és jóváhagyott. A 2D kép is elfogadott; ezek feliratait az alkalmazás nem javítja át. A kép–jelenet hozzárendelés a külön `js/comics.js` adatállományban szerkeszthető. A jóváhagyott szövegfrissítéseket a `js/revisions.js` külön kezeli; a döntési állapotgép és az öt lezárás működése megmarad.

### Olvasás és nagyítás telefonon

A képregények a rendelkezésre álló szélességhez igazodnak, az eredeti oldalarány megtartásával; sem panel, sem szövegbuborék nem kerül levágásra. A képre kattintva vagy koppintva külön nagyított nézet nyílik. A nagyítás és kicsinyítés gombjaival, illetve az alapnézet visszaállításával olvashatóbbá tehető a szöveg; a nagyított képen a nézeten belül lehet mozogni. A **Bezárás** vagy az **Escape** visszavisz ugyanahhoz a történeti ponthoz, a döntések és a mentés megváltoztatása nélkül.

Ez nem galéria: csak az aktuális történeti helyzethez tartozó kép töltődik be, a későbbi képregények nem töltődnek le egyszerre. A nagyított kép saját görgethető területet kap, az alapoldal nem görgetődik vízszintesen.

## Tartalmi forrás és a kiegészítések határa

Az eredeti, változatlan munkaforrások:

1. [Nóra POV-forgatókönyve](docs/nora-pov-forgatokonyv.md).
2. [Az öt befejezés reflexiós oldalai](docs/ot-befejezes-reflexios-oldalak.md).
3. [Projektutasítások](AGENTS.md).

A forrásszövegeket a programban forrásfájlra és sorszámra mutató adatok azonosítják. Az új dramaturgiai szövegek külön `js/adaptations.js` állományba kerülnek, saját azonosítóval és eredetjelöléssel. A bibliai magyarázatok új részeit a [reflexiós kiegészítések jegyzéke](docs/reflection-additions.md) is felsorolja; ezek nem szó szerinti bibliai idézetek. A reflexiók pedagógiai kiemeléseit sem tüntetjük fel szentírási idézetként.

A 0.0.4 jóváhagyott, kumulatív változtatásait a `js/revisions.js` külön adatrétege alkalmazza az érintett jelenetekre és következményekre. A régi munkaforrások és az eredeti állapotfüggő adatok megmaradnak; az engedélyezett új megfogalmazásnak elsőbbsége van a megjelenítéskor. A szerkesztői és képi utasítások nem diákoknak szánt történetszövegek.

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
- `js/navigation.js`: a meglátogatott állapotok külön mentett idővonala, a vissza-/előrelépés és az érvényes böngészőbejegyzések azonosítása.
- `js/app.js`: megjelenítés és eseménykezelés; a történeti szöveg adatból érkezik.
- `js/comics.js`: a közös jelenetképek és döntési következményképek külön hozzárendelése, alternatív szövegek és átiratok.
- `js/revisions.js`: a jóváhagyott 0.0.4 felvezetések, monológok és párbeszédek, forrásjelöléssel.
- `design/references/`: a huszonegy jóváhagyott WebP és a szerzői J3 csomagjegyzék.
- `docs/manifest_J4_0.0.4.json`: az öt jóváhagyott J4 kép eredeti csomagjegyzéke.
- `docs/release-0.0.4.md`: a J–01–J–12 pontok megvalósítási és ellenőrzési jegyzéke, benne a nyitott J–05 feladattal.
- `js/version.js`, `package.json`, `package-lock.json`: a `0.0.4` kiadás verzióadatai és fejlesztői tesztkörnyezete.
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

Az állapottesztek az összes elérhető döntés-, közzététel- és korrekciókombinációt, mind az öt végkifejletet, a visszalépést, a mentést és az újrajátszást ellenőrzik. A forráshűségtesztek az eredeti és a jóváhagyott frissítő dokumentumokhoz mérik az átvett szövegeket. A böngészőtesztek a tényleges felületet és a feltételes jeleneteket vizsgálják mobilon és asztali nézetben. A képregény-integráció ellenőrzése kiterjed a huszonegy helyes képelérési útra, a J3/J4 összes előzményfüggő monológjára és döntési ágára, a nagyításra, az alapból látható átiratra, valamint a képhiba utáni tartalékmegjelenítésre. Az 5–7. jelenet és mind az öt befejezés ellenőrzése továbbra is szükséges.

A navigációs tesztek a valóban látható gombokat és inaktív állapotukat, a vissza-/előrelépést, az A döntés B-re cserélését, az újratöltést, a mentett későbbi képernyőket, a böngésző előzményeit és az elhagyott ágak kizárását is vizsgálják. A futtatás tényleges eredményét és az ellenőrzött commitot az átadási beszámoló rögzíti.

## Helyi adatkezelés

A játék az aktuális történetállapotot a `sessionStorage` `torott_hid_demo_v1` kulcsán tárolja. A navigáció a külön `torott_hid_navigation_v1` kulcson őrzi a meglátogatott állapotokat, az aktuális helyet és a bejegyzések azonosítóit, így az előre bejárt képernyők újratöltés után is visszahívhatók. Ezekben is csak a döntési útvonal, a jelenet, a közzétételi megerősítések, a korrekció és a navigáció technikai adatai szerepelnek. Nincs regisztráció, névbekérés, analitika vagy szerveroldali válaszgyűjtés.

A munkamenet a böngészőlaphoz kötött. A böngésző saját lap-helyreállítása egy korábban bezárt munkamenetet is visszaállíthat. Tiltott vagy betelt tároló mellett a játék memóriában tovább használható; sérült mentésnél tiszta állapot indul. Újrajátszáskor csak e játék saját állapota törlődik, más alkalmazások tárolókulcsai megmaradnak.

## GitHub és GitHub Pages

A tartósan ajánlott Pages-beállítás:

1. **Settings → Pages → Build and deployment**.
2. **Source: Deploy from a branch**.
3. **Branch: `main`**, mappa: **`/ (root)`**.

A 0.0.4 integráció előtti ellenőrzésben a tényleges Pages-forrás a `demo/v0.0.1` ág volt, gyökérmappával, és a `235cc6c` commitú 0.0.3 demót szolgálta ki. Ez történeti ágnév, nem az alkalmazás verziószáma; az aktuális alkalmazásverzió **0.0.4 demó**, a `package.json` alapján.

A tartós megoldás a Pages átállítása a `main` ágra, hogy a közzététel közvetlenül a javításokat tartalmazó ágat kövesse. Ha az integráció jogosultsága nem engedi a forrásváltást, a meglévő Pages-beállítás megtartható: ebben az esetben ugyanazt a tesztelt commitot kell fast-forward feltöltéssel a `main` és a `demo/v0.0.1` ágra is eljuttatni. Így a repository és az élő demó azonos kódot kap. Külön Pages-forráság mellett minden későbbi kiadásnál is szükséges az ágak összehangolása; a `main` frissítése önmagában nem frissíti az élő oldalt.

A `.nojekyll` jelzi a közvetlen statikus kiszolgálást; nincs szükség alkalmazásfordításra. A Pages címe: `https://tobiasistvant-sketch.github.io/Torott-Hid/`.

Az egyetlen központi verzióadat a `package.json` `version` mezője. A verziófrissítést az `npm version` végzi a lockfile-lal együtt; a projekt `version` szkriptje ezután automatikusan futtatja a szinkronizálást. A `npm run version:sync` külön is frissíti a generált `js/version.js` fájlt, az oldal címét és leírását, valamint az összes JavaScript- és CSS-hivatkozás verziózott lekérdezési paraméterét. A `npm test` előellenőrzése hibát jelez, ha ezek eltérnek a központi verziótól.

Az aktuális kiszolgált ágat a **Settings → Pages**, a tényleges telepítési eredményt a GitHub **Actions → pages-build-deployment** mutatja. Ellenőrizni kell, hogy a `main`, a tényleges Pages-forráság és a sikeres Pages-build ugyanarra a kiadási commitra mutat-e. Az `index.html` verziózott JavaScript- és CSS-hivatkozásainak is a 0.0.4 kiadást kell kérniük. A közzétételt és az élő oldal tényleges böngészős ellenőrzését külön kell igazolni; hálózati tiltás esetén az utóbbi nem tekinthető elvégzettnek. A ténylegesen választott forráságat, a beállításváltás eredményét és a telepítési állapotot az átadási beszámoló rögzíti.

## Következő szerzői ellenőrzés

A [demójegyzetek szerzői kérdései](docs/demo-notes.md#szerzői-ellenőrzésre-váró-kérdések) alapján érdemes végigjátszani a történetet. Különösen a vissza nem vont nyilvános megtorlás utáni lezárás, a jóvátétel bizonytalan hatásai, az R5 útvonalfüggő összefoglalása és az új bibliai magyarázatok igényelnek tartalmi ellenőrzést. Ez a lista a működő demó továbbfejlesztését szolgálja; nem állítja, hogy a munkaváltozat már végleges tananyag.
