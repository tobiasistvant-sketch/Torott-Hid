# A Törött híd – 0.0.3 demó: navigáció

Ez a javítás a képernyők közötti mozgást és a mentett előzményeket rendezi. A történet forrásszövegei, választásai, következményei, öt befejezése és a tizenegy jóváhagyott képregény változatlan. A J–01 átirat-megjelenítési és a J–02 felvezetőszöveg-módosítás nincs végrehajtva.

## A hibafeltárás eredménye

Az induló állapotot a GitHub API, a `main` kódja és elkülönített Playwright-futtatás alapján ellenőriztük.

| Tünet vagy kockázat | Azonosított ok és bizonyíték |
| --- | --- |
| Az élő demóban nem látszanak a `main` ágon létrehozott gombok. | A Pages a `demo/v0.0.1` ágat használta, és a sikeres közzététel a `caa92711dcf645ac9a5f4d8efd4eb88d281601e1` commitot szolgálta ki. A `main` eközben már `0807c0f1559b4f8bfdb4388045ef8c91960efdec` volt. A `main` JavaScript-hivatkozásának módosítása nem érte el a Pages forráságát. |
| A navigációs és a képregényes fejlesztés különböző ágakon maradt. | A két commit története eltért; a `main` indexe nem töltötte be a `js/comics.js` fájlt. A 0.0.3 javításnak mindkét fejlesztést meg kell őriznie. |
| A `main` utolsó böngészőtesztje sikertelen. | Az Actions `44346260980` futásában a logikai tesztek és a böngésző telepítése sikeres, a böngészőteszt-lépés sikertelen volt. A `main` navigációs tesztjeinek helyi reprodukciójában négy teszt sikeres, kettő ugyanazon elavult állításon hibázott: a `tests/browser.spec.cjs:294` nulla „Következő” gombot várt, miközben a felület egy inaktív gombot jelenített meg. Az új követelmény szerint a gomb látható és inaktív állapota helyes. |
| Újratöltéskor nem marad meg a teljes bejárt út és a későbbi képernyők listája. | A korábbi `screenTrail` és `screenPosition` csak memóriában élt. Az engine mentése az aktuális történetállapotot tartalmazta; az ebből újraépített előzmény nem azonos a ténylegesen bejárt teljes idővonallal. |
| Egy korábbi döntés megváltoztatása után régi folytatás térhet vissza. | A korábbi `popstate` kezelés elfogadta az alkalmazásjelölővel ellátott, normalizálható állapotpillanatképet akkor is, ha az elhagyott ághoz vagy korábbi újrajátszáshoz tartozott. Az aktuális útvonallal való azonosságot nem ellenőrizte. |

A régi Actions-napló és a feltöltött teszteredmények letöltését a környezet hálózati tiltása akadályozta. A fenti teszthibát ezért a pontos `main` commit elkülönített, valódi Chromium-futtatásával reprodukáltuk. Az élő Pages-cím közvetlen lekérését is `CONNECT tunnel 403` tiltás akadályozta; a helyi böngészőteszt és a Pages API ellenőrzése önmagában nem jelent élő böngészős tesztet.

## Használat

1. A két gomb a történeti tartalom fölött, a kezdőképernyőn is látható. Kezdetben mindkettő inaktív.
2. A **Belépek Nóra történetébe** a 0. jelenetet nyitja meg. A **Tovább a történetben** az 1. jelenetre visz.
3. A **← Előző képernyő** a korábban megtekintett állapotot, a **Következő képernyő →** a már megtekintett későbbi állapotot állítja vissza. Utóbbi nem lép át még be nem járt döntéseken.
4. Döntés után visszaléphetsz a választáshoz, és másik választ adhatsz. Az új választás új folytatást indít; a korábbi ág későbbi állapotai kiesnek az érvényes idővonalból.
5. Az újratöltés a jelenlegi helyet és a megőrzött korábbi/későbbi képernyőket is visszaállítja, ha a böngésző munkamenettárolója elérhető.
6. Az újrajátszás új, tiszta játékmenetet indít, saját előzményazonosítóval. Más alkalmazások tárolókulcsait nem törli.

## Mentési és böngészőelőzmény-modell

A `js/engine.js` továbbra is a történet döntési szabályait és az aktuális játékállapot normalizálását végzi. A külön `js/navigation.js` kezeli a meglátogatott képernyők állapotpillanatképeit, az idővonal aktuális helyét és az azonosítókat. A navigáció adatai a külön `sessionStorage` `torott_hid_navigation_v1` kulcson maradnak meg, az engine változatlan `torott_hid_demo_v1` mentése mellett.

A játékbeli gombok a saját idővonalon mozognak. A böngésző History API-ja kiegészítő lehetőség: hibája vagy tiltása nem kapcsolja ki a játékbeli vissza-/előrelépést. A böngészőbejegyzés a játékmenet `runId` és a meglátogatott állapot `entryId` azonosítóját hordozza. Visszaállításkor ezeknek az aktuális mentett idővonalhoz kell tartozniuk; tetszőleges régi állapotpillanatkép nem írhatja felül a játékot.

Új választáskor az idővonal későbbi része levágódik. Újrajátszáskor a játékmenet azonosítója is új lesz, ezért a régi böngészőbejegyzések nem támaszthatják fel az elhagyott játékot. A böngésző saját előzményeit a weboldal nem tudja tetszőlegesen törölni: az érvénytelen bejegyzésekből nem állít vissza régi történetállapotot. A navigáció nem zárja a felhasználót a játékba; az első játékbejegyzés előtti oldalra vissza lehet lépni.

A korábbi verzióból megmaradt, egyetlen érvényes játékállapotból a rendszer a döntések alapján rekonstruálja az ahhoz vezető előzményt. Ez migrációs tartalék: a korábban nem mentett, alternatív vagy visszavont látogatások pontos története nem állítható vissza. Ha az előzmény nem következtethető ki, az érvényes régi állapot önmagában marad használható, kitalált döntések hozzáadása nélkül. Az új mentések már a tényleges idővonalat tartalmazzák. Tiltott vagy betelt tároló esetén a játék és a navigáció memóriában használható tovább, újratöltés utáni megőrzés nélkül.

## Megismételhető ellenőrzés

```sh
npm ci
npm test
npx playwright install chromium
npm run test:browser
```

A konfigurációban megadott rendszer-Chromium mellett a külön böngészőletöltés kihagyható. A teljes tesztszámot és eredményt az adott futtatás kimenete mutatja; ez a dokumentum nem helyettesíti a futtatási jegyzőkönyvet.

A kötelező navigációs ellenőrzési út:

1. Kezdőképernyő: mindkét gomb látható, az Előző inaktív.
2. Belépés → 0. jelenet → 1. jelenet; Előzővel vissza a 0.-ra, Következővel ismét az 1.-re.
3. Az 1. jelenetben A választás → A következmény; vissza a döntéshez → B választás → B következmény.
4. Újratöltés után B és a hozzá tartozó következmény marad meg. Visszalépés és újabb újratöltés után a már bejárt későbbi képernyő is visszahívható.
5. Ugyanezek a lépések a böngésző Vissza/Előre gombjaival; az elhagyott A ág nem írhatja felül a B útját.
6. Újrajátszás után régi böngészőbejegyzés nem állíthatja vissza az előző játékot.
7. History API nélkül is működnek a játékbeli gombok. Az első előzmény előtt az oldal elhagyható; nincs végtelen előzményciklus.
8. A fő ellenőrzések megismétlése mobilon, valamint mind az öt befejezés és a képregények korábbi tesztjeinek futtatása.

## Kiadás és a valóban kiszolgált változat

A célverzió **0.0.3 demó**. Központi forrása a `package.json`. Az `npm version` a `package-lock.json` fájlt is frissíti, és a projekt `version` szkriptjén keresztül futtatja a `scripts/sync-version.cjs` eszközt. A `npm run version:sync` külön is használható: a generált `js/version.js`, az `index.html` címe és verzióleírása mellett az összes JavaScript- és CSS-hivatkozás is `?v=0.0.3` jelölést kap. A `npm test` előellenőrzése a szinkront is vizsgálja.

A 0.0.3 javítás előtti ellenőrzéskor a tényleges Pages-forrás `demo/v0.0.1` volt, gyökérmappával. A történeti ágnév nem az alkalmazás verziója. **A tartósan ajánlott beállítás a `main` ág és a `/ (root)` mappa**, hogy a repository főága és a közzététel forrása ne váljon ismét külön.

A kiadás során ugyanazt a tesztelt commitot kell fast-forward feltöltéssel a `main` és a meglévő Pages-forráságra eljuttatni; ezt követően a forrásváltás megkísérelhető. Ha az integráció jogosultsága nem engedi a Pages átállítását, a meglévő `demo/v0.0.1` forrás marad használható. Az azonos commit a két ágon ebben az esetben is kizárja a kiadott kód eltérését. Amíg külön forráság marad, a későbbi kiadásoknál is szükséges az ágak összehangolása.

Ellenőrzéskor a `main`, a tényleges Pages-forráság és a sikeres Pages-build commitja egyezzen meg; ezenfelül az élő oldal betöltött JavaScriptjét és a két gomb valódi működését is meg kell nézni, ha a hálózat ezt lehetővé teszi. A beállításváltás puszta megkísérlése nem igazolja, hogy a Pages már a `main` ágat használja.

A tényleges commitazonosítót, a teszteredményeket, a kiválasztott Pages-forráságat, a beállításváltás eredményét, a GitHub Pages telepítési állapotát és az esetleges élő ellenőrzési akadályt az átadási beszámoló rögzíti. A puszta feltöltés vagy helyi teszt nem igazolja a közzétételt.
