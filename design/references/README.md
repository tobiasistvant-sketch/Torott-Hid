# Jóváhagyott képregények – 0.0.4 demó

A szerző mind a **21 alábbi WebP-képet jóváhagyta**. A korábbi tizenegy kép megmarad; a 0.0.4 kiadás öt J3 és öt J4 képpel bővíti a hozzárendelést. A játék ezeket a meglévő fájlokat használja, változatlan képi tartalommal és feliratokkal. Az integráció nem jár képgenerálással, képszerkesztéssel vagy újrarajzolással.

## Tényleges fájlhelyek és hozzárendelés

Minden futás közben használt kép ebben az egyetlen mappában van: `design/references/`. A jelenlegi [szerzői beillesztési útmutató](README_CODI.md) és [J3 manifest](manifest.json) a feltöltött J3 csomaghoz tartozik. A J4 manifest tényleges helye a repositoryban [`docs/manifest_J4_0.0.4.json`](../../docs/manifest_J4_0.0.4.json). A csomagok `kepek/...` könyvtárait nem szabad az alkalmazás tényleges elérési útjaiba másolni. A szerzői forrásfájlokat az integráció nem írja át.

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
| 3 | közös jelenet | [03_jelenet_kozosen_nyito_kepregeny.webp](03_jelenet_kozosen_nyito_kepregeny.webp) |
| 3 | A következménye | [03A_szembesites_kovetkezmeny.webp](03A_szembesites_kovetkezmeny.webp) |
| 3 | B következménye | [03B_meghallgatas_kovetkezmeny.webp](03B_meghallgatas_kovetkezmeny.webp) |
| 3 | C következménye | [03C_beszelgetes_elutasitasa_kovetkezmeny.webp](03C_beszelgetes_elutasitasa_kovetkezmeny.webp) |
| 3 | D következménye | [03D_fenyegetes_kovetkezmeny.webp](03D_fenyegetes_kovetkezmeny.webp) |
| 4 | közös jelenet | [04_kozos_bocsanatkeres.webp](04_kozos_bocsanatkeres.webp) |
| 4 | A következménye | [04A_fajdalom_es_felelosseg.webp](04A_fajdalom_es_felelosseg.webp) |
| 4 | B következménye | [04B_idokeres.webp](04B_idokeres.webp) |
| 4 | C következménye | [04C_bosszu_es_baratsag.webp](04C_bosszu_es_baratsag.webp) |
| 4 | D következménye | [04D_ne_irj_tobbet_JOVAHAGYOTT.webp](04D_ne_irj_tobbet_JOVAHAGYOTT.webp) |

A hozzárendelés és a megjelenítési metaadatok központi helye a [`js/comics.js`](../../js/comics.js). A közös jelenetkép, a döntéshez kapcsolódó következménykép, a képen kívüli változó szöveg és a kép nélküli jelenet külön kezelhető. Az 5–7. jelenethez nincs jóváhagyott kép, ezért azok szövegesek maradnak.

## Képen kívüli narrációk és monológok

Az 1. és 2. jelenet új felvezetése a közös kép fölött szerepel. A 2. jelenetből a J–03-ban kijelölt két fölösleges blokk kimarad; a többi szükséges döntésfüggő rész megmarad.

A 3. jelenetben először a J2 döntés szerinti J–06 monológ, aztán külön J–07 narráció, majd a közös nyitókép látható. A 4. jelenetben a J3 döntéshez tartozó J–10 monológot követi a közös bocsánatkérő kép. Mindkét jelenetben az eredeti döntési kártyák választják ki a megfelelő A/B/C/D következményképet.

A változó monológot nem szerkesztjük rá az állandó képre. A képben nem szereplő, megértéshez szükséges feltételes szöveg külön elemként marad meg. A 2B és 2C kép azonos felső narrációja szándékos és jóváhagyott; a 2D kép szintén elfogadott. Ezeken az alkalmazás nem végez szöveges javítást. **A 2B nagy, üres fehér területének javítása (J–05) külön, nyitott grafikai feladat marad.**

A J4–D kizárólag a végleges `04D_ne_irj_tobbet_JOVAHAGYOTT.webp` fájlt használja. A képhez kapcsolódó történeti állapotban Áron nem küld újabb záró választ.

## Olvasás, átirat és képhiba

Ahol a képregény tartalmazza a párbeszédet, az a fő képi megjelenítés. A J–01 szerint a hozzá tartozó szöveges átirat alapértelmezetten látható, külön lenyitógomb nélkül, képernyőolvasóval is elérhetően. A párbeszéd az átiratban egyetlen szöveges példányban szerepel; ezen felül nem követi vagy előzi meg ugyanannak az eredeti, hosszú párbeszédkártyája vagy megismételt válaszidézete.

A kép hiánya vagy hibás elérési útja automatikus szöveges tartalékmegjelenítést indít. A jelenet megérthető és a döntés kiválasztható marad. A képekhez tartozó alternatív szövegek a külön metaadatban találhatók.

## Mobilos nagyítás

A kép szélességhez igazodik, az eredeti oldalaránnyal; nincs panel- vagy buborékvágás. Kattintás vagy koppintás nagyított nézetet nyit. A nagyítás, kicsinyítés és alapnézet-visszaállítás gombjai segítik az olvasást; nagyításkor a kép saját területén belül lehet mozogni. A bezárógomb és az **Escape** ugyanahhoz a történeti helyzethez vezet vissza, a döntések és a mentés módosítása nélkül. Az alapoldal nem kap vízszintes görgetést.

Csak az aktuális jelenethez vagy következményhez szükséges kép töltődik be. A rendszer nem galéria és nem tölti le előre egyszerre a későbbi képregényeket.

Az arculati alapokat a [grafikai útmutató](../STYLE_GUIDE.md), a történet és a tesztelés használatát a [projekt README](../../README.md) írja le.
