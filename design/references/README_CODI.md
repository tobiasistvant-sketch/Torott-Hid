# A TÖRÖTT HÍD – 11 JÓVÁHAGYOTT KÉPREGÉNYKÉP

**Minden felsorolt kép a szerző által elfogadott.** Nincs ellenőrzendő alkönyvtár.

## Használat

- A `KEPEK` mappában képenként eredeti PNG és optimalizált WebP van. Weboldalra a WebP használata javasolt, PNG maradjon a forrásarchívumban.
- A képek neve: 2 számjegyű jelenet + szükség esetén döntésbetű (A/B/C/D) + leírás.
- A döntésfüggő Nóra-monológ a 2. jelenet elején külön szöveges elem, majd az általános képregényoldal következik (Ad3 megoldás).
- A 2. jelenet B és C képeinek narrációja szándékosan és jóváhagyottan ugyanaz: „Nóra keményen megfogalmazza fájdalmát.”
- A 2. jelenet D képe a szerző döntése alapján **elfogadott változat**; ne tedd ellenőrzendő mappába.
- Codi/Codex **nem generál képeket**; csak az elkészült és elfogadott képek beillesztése a feladata.

## Beillesztési térkép

| Jelenet | Döntés | Kép (WebP) |
|---|---|---|
| 0 | közös (minden útvonal) | `KEPEK/00_intro/00_jelenet_a_titok_kozosen.webp` |
| 1 | közös (minden útvonal) | `KEPEK/01_folyoso/01_jelenet_a_folyoson_kozosen.webp` |
| 1 | A | `KEPEK/01_folyoso/01A_nyilvanos_szamonkeres_kovetkezmeny.webp` |
| 1 | B | `KEPEK/01_folyoso/01B_elvonulas_kovetkezmeny.webp` |
| 1 | C | `KEPEK/01_folyoso/01C_osztalytarsak_kikerdezese_kovetkezmeny.webp` |
| 1 | D | `KEPEK/01_folyoso/01D_pletyka_leallitasa_kovetkezmeny.webp` |
| 2 | közös (minden útvonal) | `KEPEK/02_uzenet/02_jelenet_aron_elso_uzenete_kozosen.webp` |
| 2 | A | `KEPEK/02_uzenet/02A_soha_nem_bocsatom_meg_kovetkezmeny.webp` |
| 2 | B | `KEPEK/02_uzenet/02B_igeret_szamonkerese_kovetkezmeny.webp` |
| 2 | C | `KEPEK/02_uzenet/02C_idot_ker_kovetkezmeny.webp` |
| 2 | D | `KEPEK/02_uzenet/02D_felejtsuk_el_kovetkezmeny.webp` |

## Helye a játékban

- `00_...`: 0. jelenet képregénye.
- `01_jelenet_...`: 1. jelenet közös képregénye; `01A–01D`: az ott hozott döntés következményképe.
- `02_jelenet_...`: 2. jelenet közös képregénye az előző döntéstől függő Nóra-monológ után; `02A–02D`: a 2. jelenet válaszának megfelelő következménykép.

A `manifest.json` a pontos, géppel olvasható beillesztési térkép.
