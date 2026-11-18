# A Törött híd – 0.0.4 demó: integrációs jegyzék

A kiadás a működő 0.0.3 navigáció mellé építi be a jóváhagyott szöveg- és képfrissítéseket. A javítások alább külön ellenőrizhetők. **J–05 grafikai feladata továbbra is nyitott.** Az öt befejezés szabályai, a korábbi tizenegy kép és a 0.0.3 képernyőelőzmény-kezelése megmarad.

## Irányadó források és tényleges fájlhelyek

- [Teljes J–01–J–12 javítási jegyzék](01_javitasi_jegyzek_0.0.4_TELJES.md).
- [Teljes, jóváhagyott szövegfrissítések](02_szovegfrissitesek_0.0.4_TELJES.md).
- [J3 képcsomag jegyzéke](../design/references/manifest.json).
- [J4 képcsomag jegyzéke](manifest_J4_0.0.4.json).

A J4 manifest a repositoryban ténylegesen a **`docs/manifest_J4_0.0.4.json`** fájlban található, nem a feladatleírásban jelzett `design/references/` alatt. A benne felsorolt öt jóváhagyott WebP viszont mind a `design/references/` mappában van. A csomagjegyzékek `kepek/jelenet_03/` és `kepek/jelenet_04/` útvonalai nem futásidejű GitHub-elérési utak. A központi kép–jelenet hozzárendelés a tényleges `design/references/<fájlnév>.webp` fájlokat tölti be; nem készül új képmásolat vagy helyettesítő illusztráció.

Az eredeti munkaforgatókönyv és a régebbi függő javítási jegyzet megmarad. A megjelenített friss tartalomnál a felhasználó új, kifejezett jóváhagyása és a fenti kumulatív dokumentumok az irányadók. A szerkesztői megjegyzések és képi instrukciók nem jelennek meg a diákok történetszövegében.

## J–01–J–12: megvalósítás és külön ellenőrzés

| Pont | Beépített változás / fennmaradó feladat | GitHub-fájlok | Ellenőrzési szempont |
| --- | --- | --- | --- |
| J–01 | A képregények szöveges átirata alapból látható; nincs külön lenyitógomb. Egy átirat szerepel, mellé nem kerül még egyszer az eredeti teljes párbeszédkártya vagy válaszidézet. | [`js/app.js`](../js/app.js), [`css/styles.css`](../css/styles.css) | Betöltés után a szöveg kattintás nélkül olvasható és képernyőolvasóval elérhető; nincs átiratot nyitó `details`/`summary` vezérlő. |
| J–02 | Az 1. jelenet jóváhagyott felvezetése külön narrációként, a kép fölé kerül. | [`js/revisions.js`](../js/revisions.js), [`js/comics.js`](../js/comics.js) | A teljes előírt bekezdés egyszer látható, és megelőzi a folyosói képet. |
| J–03 | A 2. jelenet új felvezetést kap. Az ott kijelölt `s2-public` gondolat és Áron „Kérlek, ezt ne az egész osztály előtt beszéljük meg.” üzenete kimarad a megjelenítésből. A többi állapotfüggő adat megmarad. | [`js/revisions.js`](../js/revisions.js), [`js/comics.js`](../js/comics.js), [`js/app.js`](../js/app.js) | Az előző döntések mindegyikével ellenőrizhető az új bekezdés és a két eltávolított blokk hiánya; az eredeti forrásadatok nem törlődnek. |
| J–04 | A 2A következmény mellől eltűnik a külön megismételt elutasító idézet. A kép és annak hozzáférhető átirata megmarad. | [`js/comics.js`](../js/comics.js), [`js/app.js`](../js/app.js) | A következményen nincs az átiraton kívüli, önálló válaszidézet; a kép eredeti. |
| **J–05** | **NYITOTT: a 2B illusztráció nagy, üres fehér területe még nincs javítva.** A meglévő WebP változatlan marad; új kép nem készül. | [`02B_igeret_szamonkerese_kovetkezmeny.webp`](../design/references/02B_igeret_szamonkerese_kovetkezmeny.webp) | Az eredeti fájl ellenőrzőösszege változatlan. Ez a kiadás nem jelölheti teljesítettnek a grafikai javítást. |
| J–06 | A 3. jelenetben a 2A/2B/2C/2D döntéshez tartozó négy teljes, jóváhagyott monológ közül a megfelelő jelenik meg. | [`js/revisions.js`](../js/revisions.js) | Mind a négy előzmény külön bejárása; visszalépés és másik döntés után a monológ cserélődik, a korábbi szöveg eltűnik. |
| J–07 | A 3. jelenet sorrendje: monológ → külön narrált átvezetés → jóváhagyott közös nyitókép → döntés → választott következménykép. | [`js/revisions.js`](../js/revisions.js), [`js/comics.js`](../js/comics.js), [`js/app.js`](../js/app.js) | A monológ és narráció külön szöveges elem, nem a kép része vagy ráhelyezett felirat. |
| J–08 | A jóváhagyott képekre nem kerül új szereplőnév, gondolatcímke vagy jelenetcím. | [`js/comics.js`](../js/comics.js), [`js/app.js`](../js/app.js) | A képfájlok változatlanok; a felületi és akadálymentes címkék a képen kívül maradnak. |
| J–09 | A 3A/3B/3C/3D választások saját jóváhagyott következményképet és szöveget kapnak. A 3C nem sugall utólagos önvádat; a 3D fenyegetését nem tekintjük végrehajtott titokközlésnek. | [`js/revisions.js`](../js/revisions.js), [`js/comics.js`](../js/comics.js) | Mind a négy ág képe és párbeszéde külön ellenőrizhető; a 3D önmagában nem állít közzétételi állapotot. |
| J–10 | A 4. jelenet elején a 3A/3B/3C/3D választás szerinti négy jóváhagyott monológ közül egy jelenik meg. | [`js/revisions.js`](../js/revisions.js) | Mind a négy előzmény külön bejárása; döntéscsere, újratöltés és előrelépés után sem szivárog át másik monológ. |
| J–11 | A J–10 monológ után a jóváhagyott közös bocsánatkérő kép és pontos szöveges változata következik. Áron felelősségvállalása független Nóra előző választásától. | [`04_kozos_bocsanatkeres.webp`](../design/references/04_kozos_bocsanatkeres.webp), [`js/revisions.js`](../js/revisions.js), [`js/comics.js`](../js/comics.js) | A teljes jóváhagyott bocsánatkérés változatlan; a képre nem kerül „4. jelenet” felirat vagy új címke. |
| J–12 | A 4A/4B/4C/4D választásokhoz a négy jóváhagyott következménykép tartozik. 4C-ben megmarad a „bosszú” szó. 4D-ben a végleges javított kép szerepel, és Áron nem válaszol, még „Rendben”-nel sem. | [`js/revisions.js`](../js/revisions.js), [`js/comics.js`](../js/comics.js), [`04D_ne_irj_tobbet_JOVAHAGYOTT.webp`](../design/references/04D_ne_irj_tobbet_JOVAHAGYOTT.webp) | Mind a négy ág külön ellenőrzése; 4D után az 5–6. jelenetben sincs új, Áron által kezdeményezett személyes üzenet. |

## Képi és tartalmi felépítés

A korábbi tizenegy kép mellett a 3. és 4. jelenet öt-öt jóváhagyott WebP-je vesz részt a történetben: összesen **21 változatlan fájl**. A [teljes képfájljegyzék](../design/references/README.md) megadja a pontos hozzárendelést. Az 5–7. jelenet szöveges marad.

A jóváhagyott új felvezetések, a nyolc döntésfüggő monológ és az új párbeszédek a külön [`js/revisions.js`](../js/revisions.js) rétegben kapnak forrásjelölést. A korábbi történetadatokat nem kell felülírni ahhoz, hogy az új, jóváhagyott szöveg elsőbbséget kapjon a megjelenítésben. Az átirat egyetlen, alapból látható szöveges példányt biztosít a képhez; az ezen felüli ismétlődő párbeszédkártyák és idézetek maradnak el. A képen kívüli, állapotfüggő monológok külön szövegként maradnak.

A képek az eredeti oldalaránnyal és teljes vászonnal jelennek meg, vágás és torzítás nélkül. A korábbi nagyított nézet, a visszatérés és az aktuális képre korlátozott betöltés megmarad. Képhiba esetén az adott jelenethez vagy választáshoz tartozó, jóváhagyott szöveges tartalék használható.

## Navigáció és állapotmegőrzés

A 0.0.3 kiadás külön képernyőelőzménye és az engine döntési szabályai megmaradnak. A **← Előző képernyő** és **Következő képernyő →** a már bejárt állapotokat járja be. Korábbi döntés megváltoztatásakor a következő monológ, kép és következmény az új állapotból számolódik; a régi folytatás nem írhatja felül.

Az aktuális játékállapot továbbra is a `torott_hid_demo_v1`, a képernyőelőzmény a `torott_hid_navigation_v1` munkamenetkulcson marad. A böngésző Vissza/Előre, az újratöltés, a régi ágak kizárása, a tiltott tároló melletti működés és az újrajátszás regressziós ellenőrzése továbbra is része a teszteknek. A J4–D személyes megkeresési határa az eredeti `noContact` szabályt használja; nem kerül be új pontozás vagy erkölcsi rangsor.

## Megismételhető tesztelés

```sh
npm ci
npm test
npx playwright install chromium
npm run test:browser
```

Rendszer-Chromium használatakor a külön böngészőletöltés kihagyható. A [`tests/revisions.test.js`](../tests/revisions.test.js) a friss szövegek és a kumulatív dokumentumok kapcsolatát, a [`tests/comics.test.js`](../tests/comics.test.js) a képfájlokat és hozzárendeléseket ellenőrzi. A [`tests/integration-004.spec.cjs`](../tests/integration-004.spec.cjs) a 0.0.4 javításait böngészőben járja be; a korábbi böngészős és navigációs tesztek továbbra is lefutnak. A J–05 változatlan fájljának ellenőrzése a nyitott grafikai feladat megőrzését igazolja, nem annak kijavítását.

A tényleges tesztszámot, eredményeket és az ellenőrzött commitot a kiadás futtatási kimenete és az átadási beszámoló rögzíti. A szerzői specifikációk „még nem beépített” megjegyzései, a J3 manifest `integration_status: "not_integrated"` és a J4 manifest `game_modified: false` mezői a feltöltött forráscsomag történeti állapotát írják le, ezért az integráció nem írja át őket. A megvalósítási állapotot ez a kiadási jegyzék, a forráskód és a tényleges futtatási eredmények együtt rögzítik; a csomagjelzők önmagukban nem igazolják az integráció vagy a tesztelés eredményét.

## Ellenőrzött helyi eredmény

A 2026. november 18-i integráció ellenőrzése:

- `npm test`: **52 sikeres teszt**, hiba nélkül; forráshűség, állapotgép, öt befejezés, navigáció, képek és jóváhagyott szövegfrissítések.
- `CI=1 npm run test:browser`: **148 sikeres teszt**, hiba nélkül; 74 asztali és 74 mobil eset. Ebből 44 új ellenőrzés a 0.0.4 integrációt vizsgálja.
- Tényleges alkalmazásmegjelenítés: mind a tíz új kép 320, 390, 768 és 1440 px szélességen, **40 sikeres esetben**. Az átirat látható, nincs torzulás, levágás, vízszintes túlcsordulás vagy JavaScript-hiba. A nagyítás és bezárás megőrzi az állapotot, előzménylistát, URL-t és fókuszt.
- Mind a 21 képfájl és az eredeti döntési/navigációs kód ellenőrzőösszege változatlan. A J–05 grafikai hiba továbbra is nyitott.

Ezek helyi ellenőrzési eredmények; a GitHub Actions és a Pages tényleges telepítési eredményét az átadási beszámoló külön igazolja.

## Kiadás és demó

A célverzió **0.0.4 demó**, központi forrása a `package.json`. Az `npm version` a lockfile-t is frissíti; a meglévő verziószinkronizáló a `js/version.js`, az oldal metaadatai és a JavaScript/CSS-hivatkozások verzióját tartja összhangban.

Demó URL: **https://tobiasistvant-sketch.github.io/Torott-Hid/**.

Az integráció előtti ellenőrzésben a Pages a `demo/v0.0.1` ágat használta, és a `235cc6c` commitú 0.0.3 demót szolgálta ki. Külön kiszolgálási ág megtartásakor az új, tesztelt commitnak a `main` és a tényleges Pages-forráságra is el kell jutnia. A feltöltés után a branch SHA-kat és a sikeres Pages-build commitját össze kell vetni. Az élő oldal tényleges böngészős ellenőrzése külön lépés; hálózati tiltás esetén nem tekinthető elvégzettnek.

A végső commitazonosítót, a feltöltés, a telepítés és az élő ellenőrzés tényleges eredményét az átadási beszámoló közli. Ez a jegyzék nem állít előre közzétételi vagy tesztsikert.
