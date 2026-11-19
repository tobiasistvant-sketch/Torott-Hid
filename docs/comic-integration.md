# Képregény- és hídintegráció – v1.0

A kiadás a meglévő 39 WebP-t illeszti a történethez: 33 képregényes jelenet-/következményképet és 6 hídillusztrációt. A korábbi 21 J0–J4 kép megmarad; a J5/J6 tizenkét jóváhagyott képe kapcsolódik hozzájuk. A hat híd a felhasználó integrációs kérése alapján szerepel, **egyedi végleges vizuális jóváhagyásra váró** sorozatként. Az alkalmazás nem generál, nem szerkeszt, nem vág és nem feliratoz újra képet.

A futásidejű hozzárendelés a [`js/comics.js`](../js/comics.js), a jóváhagyott szövegfrissítések a [`js/revisions.js`](../js/revisions.js) fájlban szerkeszthetők. A [teljes képjegyzék](../design/references/README.md) mind a 39 állományt felsorolja mérettel, tényleges elérési úttal és jóváhagyási státusszal. A J3 [manifestje](../design/references/manifest.json) mellett a J4 és J5/J6/híd jegyzék tényleges helye [`docs/manifest_J4_0.0.4.json`](manifest_J4_0.0.4.json), illetve [`docs/manifest_J5_J6_HID_0.0.4.json`](manifest_J5_J6_HID_0.0.4.json). A csomagok `kepek/...` útvonalai helyett a futó játék a `design/references/<fájlnév>.webp` állományokat használja.

## Képválasztás és képen kívüli tartalom

| Helyzet | Megjelenítés |
| --- | --- |
| J0 | Közös titokmegosztó képregény, látható átirattal. |
| J1 | Jóváhagyott felvezetés → közös folyosói kép → A/B/C/D választás → saját következménykép. |
| J2 | Jóváhagyott felvezetés és megőrzött szükséges feltételes szöveg → közös üzenetkép → választás → saját következménykép. A kijelölt két fölösleges blokk kimarad. |
| J3 | J2 szerinti J–06 monológ → külön J–07 narráció → közös kép → választás → 3A/3B/3C/3D kép. |
| J4 | J3 szerinti J–10 monológ → közös bocsánatkérő kép → választás → 4A/4B/4C/végleges 4D kép. |
| J5 | J4 szerinti J–13 monológ → ABC esetén közvetlen Áron-üzenet / D esetén közvetett osztálytársi hír → választás → 5A/5B/5C/5D kép. |
| J6 | J5 szerinti narráció → belső monológ → közös, felirat nélküli osztálytermi kép → öt választás → 6A/6B/6C/6D/6E kép. |
| Kezdőoldal | H0 ép híd, Nóra és Áron a két parton; nincs új didaktikus képaláírás. |
| R1–R5 | Az adott befejezés hídillusztrációja és a dokumentumból átvett reflexiós kérdés. Külön új képregény nem jelenik meg. |

A közös jelenetkép, a J5 külön változata, a döntési következmény és a híd külön metaadat. A híd nem állapotmérő: a J0–J6 alatt nincs folyamatos hídjelzés vagy átvezető animáció. A változó narráció és monológ nem kerül rá a statikus képre.

A J5 alapképe a `scenes[5]`, a kapcsolatfelvételi tiltás utáni változat a `sceneVariants[5].noContact` bejegyzés. A J6 közös képe a `scenes[6]`. A hat híd a `bridges.H0` és `bridges.R1`–`bridges.R5` kulcsokon cserélhető; azonosítóik `bridge-H0`, illetve `bridge-R1`–`bridge-R5`.

A `beforeBlockIds` azonosítja a közös kép előtt, külön szövegként megmaradó blokkokat. J5 és J6 a korábbi döntésből választja ki a megfelelő tartalmat; visszalépés és új választás után a kép, a monológ és a következmény az új állapotból számolódik. Az eredeti `js/story.js` és `js/adaptations.js` forrásréteg nem veszti el a történeti szöveget, de a megjelenítésben a friss, jóváhagyott tartalom élvez elsőbbséget.

## Szándékos állapotváltozás és kapcsolatfelvételi határ

J5–D választása valódi fiktív közlés, nem piszkozat. A régi megerősítő panel és a figyelmeztető belső gondolat nem jelenik meg. J6–E nyilvános vita, nem új titok publikálása. Az R-kimenet a teljes döntéstörténetet használja; a J5–D tényét nem lehet egy utolsó címkével eltüntetni. A régebbi kiadásból létező, kifejezett J6 korrekció külön cselekvés, nem új vagy automatikus R-oldali jóváírás.

J4–D után a J5 közös nyitása közvetett hír: Áron nem küld személyes üzenetet. Ha a játékos a jóváhagyott J5 A/B/C válaszok egyikével Nóra új, korlátozott kapcsolatfelvételét választja, az annak megfelelő válasz különbözik a tiltott, Áron által kezdeményezett megkereséstől. E határt a nyitóképek, a szöveg és az állapot együtt tartja meg.

A J–20 szerinti J5–D → J6 A/B/C-zárolás és az R4/R5 új plusz gomb nincs aktiválva; mind az öt J6 választás megmarad. Az új történeti szál vagy automatikus helyreállítás nem része ennek a kiadásnak.

## Átirat, képhiba és képi sajátosságok

Minden képregényhez magyar alternatív leírás, eredeti méret, ellenőrzőösszeg és szerkeszthető átirat tartozik. Az átirat a történetileg lényeges képi szöveget közvetíti, a telefon kezelőszerveinek betűit nem másolja. A képen megírt, majd elküldve megismételt üzenet egy szöveges példányban szerepel. Az átirat alapból látható, képernyőolvasóval elérhető; nincs külön lenyitás. Ezen felül nem jelenik meg második teljes párbeszédkártya vagy ismételt válaszidézet.

Képhiba esetén az adott jelenethez vagy választáshoz tartozó, aktuális szöveges tartalék marad használható; a döntések és a mentés nem változnak. A híd helyzetét alternatív leírás közvetíti; nem találunk ki pótló illusztrációt vagy új erkölcsi feliratot.

A korábbi képi sajátosságok megmaradnak: a J0 „Áronban mindig bízom.” gondolata, a J2 A/B/C azonos felső narrációja, a J2D elfogadott „Rendben. Nem sürgetlek.” válasza és a J1D „Ez nem pletyka téma.” mondata nem kap önkényes javítást. A J4D a végleges `04D_ne_irj_tobbet_JOVAHAGYOTT.webp`; Áron azon nem válaszol. A J3C önvád nélküli, a J3D fenyegetése nem lesz automatikusan közzététel.

**J–05 nyitott:** a J2B nagy fehér területének kijavítására nincs jóváhagyott cserekép; a fájl változatlan.

## Mobil és adatellenőrzés

A képek eredeti oldalarányukkal, teljes vászonnal jelennek meg, panelek és szövegbuborékok levágása nélkül. A képregény nagyítható; saját görgethető nézete bezárás után visszaadja a történeti állapotot és fókuszt. Az alapoldal nem kap vízszintes görgetést. A későbbi képek nem töltődnek le előre egyszerre.

```sh
node --test tests/comics.test.js tests/revisions.test.js
npm run test:browser
```

Az adatellenőrzés a korábbi és új fájlokat, a manifesteket, méreteket, ellenőrzőösszegeket, alternatív szöveget, jóváhagyási státuszt és a kép előtti blokkokat vizsgálja. A böngészőtesztek a valódi képbetöltést, a 80 J4→J5→J6 kombinációt, az átiratot, képhibát, nagyítást, navigációt, R-képet és láblécet ellenőrzik. A végrehajtott futás számát és eredményét a [v1.0 kiadási jegyzék](release-v1.0.md), illetve az átadási beszámoló külön rögzíti; a felsorolás önmagában nem tesztsiker.
