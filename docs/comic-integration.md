# Képregény-integráció – 0.0.2 demó

A 11 WebP a szerző által jóváhagyott, változatlan kép. Az alkalmazás nem generál, nem szerkeszt, nem vág és nem feliratoz újra illusztrációt. A képek eredeti oldalaránya és teljes vászna megmarad.

Az eredeti [README_CODI.md](../design/references/README_CODI.md) és [manifest.json](../design/references/manifest.json) ZIP-beli `KEPEK/...` hivatkozásait nem kell könyvtárszerkezetként létrehozni. A futásidejű, központi hozzárendelés a [`js/comics.js`](../js/comics.js) fájlban a tényleges `design/references/<fájlnév>.webp` útvonalakat használja.

## Hozzárendelés és szöveges kíséret

| Játékhelyzet | Képazonosító | Eredeti méret | Megjelenítési mód |
| --- | --- | --- | --- |
| 0. jelenet | `scene-0` | 1178 × 1335 | A képregény váltja a hosszú párbeszédkártyákat. |
| 1. jelenet | `scene-1` | 1199 × 1312 | Közös folyosói képregény, utána a választások. |
| 1/A | `scene-1-A` | 1199 × 1312 | Szöveg nélküli kép; az eredeti azonnali következmény szövege is szükséges. |
| 1/B | `scene-1-B` | 1199 × 1312 | Szöveg nélküli kép; az eredeti azonnali következmény szövege is szükséges. |
| 1/C | `scene-1-C` | 1199 × 1312 | A kikérdezés és a válaszok a képen olvashatók. |
| 1/D | `scene-1-D` | 1199 × 1312 | A határ kimondása, az elhallgatás és Nóra magánéletről szóló mondata a képen szerepel. |
| 2. jelenet | `scene-2` | 1122 × 1402 | Ad3: előző döntéstől függő monológ, közös kép, majd szükség esetén a képről hiányzó feltételes mondat. |
| 2/A | `scene-2-A` | 1536 × 1024 | A válaszüzenet és Áron reakciója a képen olvasható. |
| 2/B | `scene-2-B` | 1122 × 1402 | Az ígéret számonkérése és Áron válasza a képen olvasható. |
| 2/C | `scene-2-C` | 1122 × 1402 | Az idő kérése és Áron válasza a képen olvasható. |
| 2/D | `scene-2-D` | 1536 × 1024 | A jóváhagyott felirat, üzenetváltás és Nóra bizonytalansága változatlan. |

A `layout` mező a közös, az Ad3 szerkezetű, a szöveggel kísért néma következményképet és a párbeszédet helyettesítő következményképet különbözteti meg. A 3–7. jelenetekhez nincs képbejegyzés, ezért szövegesek maradnak. Nincsenek helyettesítő képek vagy önálló galériaadatok.

## A 2. jelenet Ad3 sorrendje

A `beforeBlockIds` a meglévő `s2-public`, `s2-pause`, `s2-facts`, `s2-boundary` monológok közül a tényleges előző döntéshez tartozót azonosítja. E szöveg a közös kép **előtt**, külön szövegként marad.

A közös kép már tartalmazza Áron teljes első üzenetét és Nóra „Tanácsot? Engedélyt nem kért tőlem…” kezdetű, állandó gondolatát. Ezek nem igényelnek újabb, alapértelmezetten látható hosszú szövegkártyát.

A korábbi nyilvános számonkérés esetén Áron „Kérlek, ezt ne az egész osztály előtt beszéljük meg.” mondata nincs rajta az állandó képen. A `afterSourceLines: [136]` ezt az eredeti, feltételes forrásrészletet jelöli: a megfelelő útvonalon a kép után külön jelenhet meg. Nem kerül új felirat a képre.

## Átiratok és tartalék szöveg

Minden képhez magyar `alt`, eredeti szélesség/magasság, ellenőrzőösszeg és külön szerkeszthető `transcript` tartozik. Az átirat a jóváhagyott képen olvasható, történetileg lényeges szöveget követi; nem másolja a telefon billentyűzetének vagy kezelőszerveinek minden betűjét. A képen előbb megírt, majd elküldve megismételt azonos üzenet egyszer szerepel az átiratban. A szöveg nélküli képeknél rövid képleírás adja át a látott cselekvést.

A teljes eredeti történetszöveg a `js/story.js` és `js/adaptations.js` adatrétegében változatlanul megmarad. Képhiány esetén ez biztosítja a végigjátszható szöveges tartalékot. Az átirat akadálymentes elérését és a képhiány kezelését a megjelenítési réteg végzi; alaphelyzetben nem kell egyszerre hosszú szövegkártyákat és ugyanazt elmondó képregényt mutatni.

A képregényátirat tudatosan követi a jóváhagyott képi sajátosságokat:

- A 0. jelenet utolsó gondolata a képen „Áronban mindig bízom.”; az eredeti forgatókönyv múlt idejű mondata ettől még változatlanul megmarad a forrásadatokban.
- A 2/A, 2/B és 2/C felső narrációja az elfogadott „Nóra keményen megfogalmazza fájdalmát.” szöveg.
- A 2/D képen látható „Rendben. Nem sürgetlek.” válasz változtatás nélkül szerepel az átiratban.
- Az 1/D képen látható „Ez nem pletyka téma.” megfogalmazás képi szövegét az integráció nem javítja át.

Ezek nem új javítási kérések: a jóváhagyott képek szövegei változatlanok maradnak.

## Adatellenőrzés

```sh
node --test tests/comics.test.js
```

A teszt pontosan 11, a manifesthez illő lapos útvonalat vár; ellenőrzi a WebP-fejlécet, a binárisból kiolvasott eredeti képméretet, a jóváhagyott fájl ellenőrzőösszegét, az egyedi azonosítókat és az alternatív szövegeket. Külön ellenőrzi az Ad3 monológok helyét meghatározó adatokat, a képfeliratok elfogadott sajátosságait és a 3–7. jelenetek szöveges határát. A tényleges képbetöltést, sorrendet, nagyítást és tartalékmegjelenítést a böngészős integrációs tesztek vizsgálják.
