# Képregény-integráció – 0.0.4 demó

A 21 WebP a szerző által jóváhagyott, változatlan kép. A 0.0.2 kiadás tizenegy képe megmarad, a 0.0.4 további öt J3 és öt J4 képet kapcsol a játékhoz. Az alkalmazás nem generál, nem szerkeszt, nem vág és nem feliratoz újra illusztrációt. A képek eredeti oldalaránya és teljes vászna megmarad.

A jelenlegi [README_CODI.md](../design/references/README_CODI.md) és [manifest.json](../design/references/manifest.json) a J3 csomag forrása; a J4 jegyzék a repositoryban ténylegesen a [`docs/manifest_J4_0.0.4.json`](manifest_J4_0.0.4.json). A csomagok `kepek/...` útvonalait nem kell könyvtárszerkezetként létrehozni. A futásidejű, központi hozzárendelés a [`js/comics.js`](../js/comics.js) fájlban a tényleges `design/references/<fájlnév>.webp` útvonalakat használja. A kumulatív tartalmi előírásokat és a nyitott J–05 feladatot a [0.0.4 integrációs jegyzék](release-0.0.4.md) részletezi.

## Hozzárendelés és szöveges kíséret

| Játékhelyzet | Képazonosító | Eredeti méret | Megjelenítési mód |
| --- | --- | --- | --- |
| 0. jelenet | `scene-0` | 1178 × 1335 | A képregény váltja a hosszú párbeszédkártyákat. |
| 1. jelenet | `scene-1` | 1199 × 1312 | Közös folyosói képregény, utána a választások. |
| 1/A | `scene-1-A` | 1199 × 1312 | Szöveg nélküli kép; az eredeti azonnali következmény szövege is szükséges. |
| 1/B | `scene-1-B` | 1199 × 1312 | Szöveg nélküli kép; az eredeti azonnali következmény szövege is szükséges. |
| 1/C | `scene-1-C` | 1199 × 1312 | A kikérdezés és a válaszok a képen olvashatók. |
| 1/D | `scene-1-D` | 1199 × 1312 | A határ kimondása, az elhallgatás és Nóra magánéletről szóló mondata a képen szerepel. |
| 2. jelenet | `scene-2` | 1122 × 1402 | Új J–03 felvezetés és a megőrzött szükséges döntésfüggő rész a közös kép előtt; a kijelölt két extra blokk kimarad. |
| 2/A | `scene-2-A` | 1536 × 1024 | A válaszüzenet és Áron reakciója a képen olvasható. |
| 2/B | `scene-2-B` | 1122 × 1402 | Az ígéret számonkérése és Áron válasza a képen olvasható. |
| 2/C | `scene-2-C` | 1122 × 1402 | Az idő kérése és Áron válasza a képen olvasható. |
| 2/D | `scene-2-D` | 1536 × 1024 | A jóváhagyott felirat, üzenetváltás és Nóra bizonytalansága változatlan. |
| 3. jelenet | `scene-3` | 1448 × 1086 | J–06 monológ és külön J–07 narráció után a közös kép, majd a választások. |
| 3/A | `scene-3-A` | 1536 × 1024 | A számonkérés és Nóra elfordulása a jóváhagyott képen szerepel. |
| 3/B | `scene-3-B` | 1536 × 1024 | Nóra elmondja a fájdalmát, Áron meghallgatja. |
| 3/C | `scene-3-C` | 1536 × 1024 | A beszélgetés elutasítása; nincs külön, önvádat sugalló utólagos monológ. |
| 3/D | `scene-3-D` | 1536 × 1024 | Fenyegetés, még nem tényleges titokközlés. |
| 4. jelenet | `scene-4` | 1448 × 1086 | J–10 monológ után a közös, jóváhagyott bocsánatkérő kép. |
| 4/A | `scene-4-A` | 1122 × 1402 | Nóra nem vállalja át a jóvátétel megtervezését. |
| 4/B | `scene-4-B` | 1536 × 1024 | Időkérés, Áron nem sürgeti; új monológ nélkül. |
| 4/C | `scene-4-C` | 1536 × 1024 | A „bosszú” szó megmarad, a jövőbeli barátságról Nóra dönthet. |
| 4/D | `scene-4-D` | 1536 × 1024 | A végleges `04D_ne_irj_tobbet_JOVAHAGYOTT.webp`; Áron nem küld záró választ. |

A `layout` mező a közös, a képen kívüli szöveggel kísért, a néma következményképet és a párbeszédet helyettesítő következményképet különbözteti meg. Az 5–7. jelenetekhez nincs képbejegyzés, ezért szövegesek maradnak. Nincsenek helyettesítő képek vagy önálló galériaadatok.

## Képen kívüli szöveg és a 0.0.4 pontosításai

A `beforeBlockIds` azokat a narrációkat és döntésfüggő monológokat azonosítja, amelyeknek a közös kép **előtt**, külön szövegként kell maradniuk. A 0.0.4 új szövegeit és a szándékos kivételeket a [`js/revisions.js`](../js/revisions.js) kezeli; nem kell törölni a régi forrásadatokat.

A 2. jelenet közös képe már tartalmazza Áron teljes első üzenetét és Nóra „Tanácsot? Engedélyt nem kért tőlem…” kezdetű, állandó gondolatát. Ezek a kép egyetlen szöveges átiratában elérhetők; ezen felül nem jelennek meg még egyszer külön eredeti párbeszédkártyákban.

A J–03 szerint a 2. jelenetből kimarad a `s2-public` gondolat és Áron „Kérlek, ezt ne az egész osztály előtt beszéljük meg.” mondata. A korábbi `afterSourceLines: [136]` megjelenítési szabály ezért nem érvényes erre a jelenetre. A többi szükséges döntésfüggő szöveg megmarad, és az új J–03 felvezetés a kép fölött szerepel.

A 3. jelenetben a J–06 monológot a külön J–07 narráció, a közös nyitókép és a választások követik. A 4. jelenetben a J–10 monológ után a J–11 közös bocsánatkérő kép következik. Egyik monológ sem kerül rá a képre; a képeket az alkalmazás nem látja el új címmel vagy szereplőnévvel.

## Átiratok és tartalék szöveg

Minden képhez magyar `alt`, eredeti szélesség/magasság, ellenőrzőösszeg és külön szerkeszthető `transcript` tartozik. Az átirat a jóváhagyott képen olvasható, történetileg lényeges szöveget követi; nem másolja a telefon billentyűzetének vagy kezelőszerveinek minden betűjét. A képen előbb megírt, majd elküldve megismételt azonos üzenet egyszer szerepel az átiratban. A szöveg nélküli képeknél rövid képleírás adja át a látott cselekvést.

A teljes eredeti történetszöveg a `js/story.js` és `js/adaptations.js` adatrétegében változatlanul megmarad. A jóváhagyott friss jelenetek és következmények a `js/revisions.js` külön rétegéből kapják a tartalmat, képhiba esetén is. A J–01 szerint az átirat alapból látható és képernyőolvasóval hozzáférhető, külön lenyitás nélkül. Az átiraton felül nem kerül mellé második teljes párbeszédkártya vagy ismételt válaszidézet.

A képregényátirat tudatosan követi a jóváhagyott képi sajátosságokat:

- A 0. jelenet utolsó gondolata a képen „Áronban mindig bízom.”; az eredeti forgatókönyv múlt idejű mondata ettől még változatlanul megmarad a forrásadatokban.
- A 2/A, 2/B és 2/C felső narrációja az elfogadott „Nóra keményen megfogalmazza fájdalmát.” szöveg.
- A 2/D képen látható „Rendben. Nem sürgetlek.” válasz változtatás nélkül szerepel az átiratban.
- Az 1/D képen látható „Ez nem pletyka téma.” megfogalmazás képi szövegét az integráció nem javítja át.

Ezek nem új javítási kérések: a jóváhagyott képek szövegei változatlanok maradnak.

**J–05 nyitott:** a 2/B kép nagy, üres fehér területe még nem kapott jóváhagyott grafikai javítást. A 0.0.4 integráció ezt a fájlt is változatlanul hagyja.

## Adatellenőrzés

```sh
node --test tests/comics.test.js
```

A teszt a korábbi tizenegy és a J3/J4 csomagok öt-öt képét, összesen 21 lapos útvonalat ellenőriz; vizsgálja a WebP-fejlécet, a binárisból kiolvasott eredeti képméretet, a jóváhagyott fájl ellenőrzőösszegét, az egyedi azonosítókat és az alternatív szövegeket. Külön ellenőrzi a képen kívüli monológok helyét meghatározó adatokat, a képfeliratok elfogadott sajátosságait és az 5–7. jelenetek szöveges határát. A tényleges képbetöltést, a nyolc új előzményfüggő monológot és nyolc következményágat, a nagyítást és a tartalékmegjelenítést a böngészős integrációs tesztek vizsgálják. A tényleges futtatási eredményeket az átadási beszámoló rögzíti.
