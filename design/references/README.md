# Jóváhagyott képregények – 0.0.2 demó

A szerző mind a **11 alábbi WebP-képet jóváhagyta**. A játék ezeket a meglévő fájlokat használja, változatlan képi tartalommal és feliratokkal. Az integráció nem jár képgenerálással, képszerkesztéssel vagy újrarajzolással.

## Tényleges fájlhelyek és hozzárendelés

Minden futás közben használt kép ebben az egyetlen mappában van: `design/references/`. A [szerzői beillesztési útmutató](README_CODI.md) és a [manifest](manifest.json) eredetileg a ZIP `KEPEK/...` könyvtárait nevezi meg; ezt a csomagszerkezetet nem szabad az alkalmazás elérési útjaiba másolni. Az eredeti két forrásfájl változatlan marad.

| Jelenet | Döntés | A játék által használt WebP |
| --- | --- | --- |
| 0 | közös jelenet | [00_jelenet_a_titok_kozosen.webp](00_jelenet_a_titok_kozosen.webp) |
| 1 | közös jelenet | [01_jelenet_a_folyoson_kozosen.webp](01_jelenet_a_folyoson_kozosen.webp) |
| 1 | A következménye | [01A_nyilvanos_szamonkeres_kovetkezmeny.webp](01A_nyilvanos_szamonkeres_kovetkezmeny.webp) |
| 1 | B következménye | [01B_elvonulas_kovetkezmeny.webp](01B_elvonulas_kovetkezmeny.webp) |
| 1 | C következménye | [01C_osztalytarsak_kikerdezese_kovetkezmeny.webp](01C_osztalytarsak_kikerdezese_kovetkezmeny.webp) |
| 1 | D következménye | [01D_pletyka_leallitasa_kovetkezmeny.webp](01D_pletyka_leallitasa_kovetkezmeny.webp) |
| 2 | közös jelenet | [02_jelenet_aron_elso_uzenete_kozosen.webp](02_jelenet_aron_elso_uzenete_kozosen.webp) |
| 2 | A következménye | [02A_soha_nem_bocsatom_meg_kovetkezmeny.webp](02A_soha_nem_bocsatom_meg_kovetkezmeny.webp) |
| 2 | B következménye | [02B_igeret_szamonkerese_kovetkezmeny.webp](02B_igeret_szamonkerese_kovetkezmeny.webp) |
| 2 | C következménye | [02C_idot_ker_kovetkezmeny.webp](02C_idot_ker_kovetkezmeny.webp) |
| 2 | D következménye | [02D_felejtsuk_el_kovetkezmeny.webp](02D_felejtsuk_el_kovetkezmeny.webp) |

A hozzárendelés és a megjelenítési metaadatok központi helye a [`js/comics.js`](../../js/comics.js). A közös jelenetkép, a döntéshez kapcsolódó következménykép, a képen kívüli változó szöveg és a kép nélküli jelenet külön kezelhető. A 3–7. jelenethez nincs jóváhagyott kép, ezért azok szövegesek maradnak.

## A 2. jelenet Ad3 sorrendje

1. Nóra előző döntésétől függő belső monológ külön szöveges elemként jelenik meg.
2. Ez alatt következik a közös, hárompaneles képregény Áron első üzenetével.
3. Az eredeti döntési kártyák közül egy kattintással választhat a játékos.
4. A megfelelő 2A/2B/2C/2D következménykép következik.

A változó monológot nem szerkesztjük rá az állandó képre. A képben nem szereplő, megértéshez szükséges feltételes szöveg külön elemként marad meg. A 2B és 2C kép azonos felső narrációja szándékos és jóváhagyott; a 2D kép szintén elfogadott. Ezeken az alkalmazás nem végez szöveges javítást.

## Olvasás, átirat és képhiba

Ahol a képregény tartalmazza a párbeszédet, az a fő vizuális megjelenítés. Nem követi vagy előzi meg ugyanannak a teljes párbeszédnek az indokolatlanul megismételt, hosszú szövegkártyája. A szöveges források az adatrétegben megmaradnak; a lenyitható **Szöveges átirat** billentyűzettel és képernyőolvasóval is elérhető.

A kép hiánya vagy hibás elérési útja automatikus szöveges tartalékmegjelenítést indít. A jelenet megérthető és a döntés kiválasztható marad. A képekhez tartozó alternatív szövegek a külön metaadatban találhatók.

## Mobilos nagyítás

A kép szélességhez igazodik, az eredeti oldalaránnyal; nincs panel- vagy buborékvágás. Kattintás vagy koppintás nagyított nézetet nyit. A nagyítás, kicsinyítés és alapnézet-visszaállítás gombjai segítik az olvasást; nagyításkor a kép saját területén belül lehet mozogni. A bezárógomb és az **Escape** ugyanahhoz a történeti helyzethez vezet vissza, a döntések és a mentés módosítása nélkül. Az alapoldal nem kap vízszintes görgetést.

Csak az aktuális jelenethez vagy következményhez szükséges kép töltődik be. A rendszer nem galéria és nem tölti le előre egyszerre a későbbi képregényeket.

Az arculati alapokat a [grafikai útmutató](../STYLE_GUIDE.md), a történet és a tesztelés használatát a [projekt README](../../README.md) írja le.
