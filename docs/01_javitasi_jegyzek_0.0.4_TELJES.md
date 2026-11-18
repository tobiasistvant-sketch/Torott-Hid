# A Törött híd – 0.0.4 demó – javítási jegyzék

Dátum: 2026. november 18.
Állapot: munkajegyzék, **a játékba még nem beépített** módosítások.
A „demó” megnevezés megmarad. A verzió tényleges frissítése a későbbi fejlesztési lépés része.
A „J–” azonosító javítási sorszám; a „3A–3D” a **3. jelenet döntési ágát** jelenti.

## J–01 – Szöveges átirat
A „Szöveg átirat” gomb eltávolítása. A képregények szöveges átirata alapértelmezetten, külön kattintás nélkül legyen elérhető és látható. Az átirat megjelenítésekor kerülni kell a képen már látható dialógusok szükségtelen vizuális duplikálását; a pontos megoldás a későbbi beépítés során ellenőrizendő.

## J–02 – Az 1. jelenet felvezetése
A képregény FÖLÉ, önálló narrációként:
> Hétfő reggel Nóra a szokásos módon érkezik az iskolába. A szombati beszélgetés után megkönnyebbült, hogy végre megoszthatta valakivel, ami otthon történik. Ám amikor végigsétál a folyosón, akaratlanul is meghallja két osztálytársa beszélgetését. A saját családjáról beszélnek…

## J–03 – A 2. jelenet felvezetése és hibás extra blokkjai
### J–03/A – Felvezető
A képregény FÖLÉ, nem a képre:
> Nóra még mindig a folyosón történteken gondolkodik. Nehezen tudja elhinni, hogy Áron megszegte az ígéretét. A telefonja egyszer csak jelez: üzenete érkezett. Áron írt neki…

### J–03/B – Külön szövegek eltávolítása
A jelenetben külön megjelenő két blokk NE jelenjen meg ott:
- **Nóra · belső gondolat:** „A folyosón mindenki felénk fordult. Jó volt végre kimondani, de most még nehezebb megszólalnom.”
- **Áron · üzenet:** „Kérlek, ezt ne az egész osztály előtt beszéljük meg.”

Fontos: csak az ottani, nem kívánt megjelenítést szüntessük meg, ne töröljük válogatás nélkül az egész történet állapotfüggő adatkezelését.

## J–04 – A 2. jelenet A döntése: felesleges ismétlés
A következménynél a külön kiírt „Ezt soha nem bocsátom meg neked!” mondat eltávolítása. A képregény és rajta az üzenet változatlan.

## J–05 – A 2. jelenet B döntése: grafikai hiba
A nagy, üres fehér rész eltávolítása a 2B illusztrációról.
**Külön grafikai javítás**, később készül el. A javítandó 2B kép nem része ennek a négy új, 3. jelenetbeli képet tartalmazó csomagnak.

## J–06 – A 3. jelenet nyitó, döntésfüggő belső monológjai
A 2. jelenetben hozott döntésnek megfelelően négy külön változat marad. A kidolgozott teljes szövegek a `02_szovegfrissitesek.md` fájlban találhatók.
Ezek a későbbi beépítéshez megőrzött, még külön véglegesítésre alkalmas javaslatok; a 2C szövegét a felhasználó kifejezetten kiválasztotta.

## J–07 – A 3. jelenet nyitásának képernyősorrendje
1. **Feedback:** a J–06 szerinti, előző döntéstől függő belső monológ.
2. **Narrált felvezetés:** külön szövegként, a közös képregény FÖLÖTT:
> Áron az udvar szélén megállítja Nórát. Nem ér hozzá, nem állja el az útját. Nóra eldöntheti, hogy most akar-e beszélgetni.
3. **Közös 3. jelenetbeli képregény:** Áron ajánlata és Nóra gondolata – a `03_jelenet_kozosen_nyito_kepregeny.webp` képfájl mellékelve.
4. **Döntési lehetőségek**.
5. **Választott 3A–3D ág:** megfelelő jóváhagyott következménykép.

## J–08 – Szereplők nevei a képregényen
Általános, felhasználó által megerősített képi szabály:
**Beszédbuborékok elé ne írjunk „Nóra:” vagy „Áron:” címkét, gondolatfelhőre ne írjunk „Nóra · belső gondolat” címkét.** A buborék csúcsa és a kompozíció mutatja, ki beszél.
A 3A–3D elfogadott képek ezt a vizuális szabályt követik (a szereplő neve a narráció részeként természetesen előfordulhat).

## J–09 – A 3. jelenet négy következményképének beillesztése
- **3A:** számonkérés, Nóra elfordul; jóváhagyva.
- **3B:** Nóra elmondja fájdalmát, Áron meghallgatja; jóváhagyva.
- **3C:** Nóra elutasítja a beszélgetést, Áron tiszteletben tartja; jóváhagyva. **Nincs későbbi önvádat sugalló belső monológ.**
- **3D:** Nóra Áron titkának felfedésével fenyeget; Áron megijed és elfordul; jóváhagyva. **A fenyegetés még nem valósult meg.**

A felhasználó kifejezetten jóváhagyta mind a négy kész képet. Az eredeti PNG-k és a WebP-változatok a `kepek/jelenet_03/` mappában találhatók.

## Az ellenőrzéshez
- A 0.0.4 nem jelenti azt, hogy a javításokat már alkalmaztuk.
- A korábbi 0.0.3 navigációs fejlesztés elkülönül ettől a jegyzéktől.
- Codi-prompt **most még nem készült**. A későbbi beépítéskor a fenti pontok és a képfájlok alapján kell dolgozni.


## J–10 – J4: négy döntésfüggő bevezető belső monológ – JÓVÁHAGYVA
A 3. jelenet A/B/C/D opciója alapján eltérő Nóra-monológ jelenjen meg a 4. jelenet elején. A szövegek teljes terjedelmükben a `02_szovegfrissitesek_0.0.4_TELJES.md` dokumentumban szerepelnek. **Mind a négyet a felhasználó elfogadta.** Ne vonjuk őket össze, és ne keverjük össze a J–06 (J3-hoz tartozó) monológokkal.

## J–11 – J4 közös bocsánatkérő üzenete és képe – JÓVÁHAGYVA
A J4-es négy lehetséges bevezető monológ után következzen a **közös** négykockás, színesceruza-hatású illusztráció. A narrációban Áron csütörtök délután ír, elismeri, hogy megszegte az ígéretét, és nem vár azonnali választ/megbocsátást. Nóra gondolata: az elismerés ellenére a fájdalom nem szűnik meg. **Ne jelenjen meg jelenetcím a képen**. A jóváhagyott kép neve `04_kozos_bocsanatkeres.webp`. A kép tartalmazza a telefonszöveget és a belső gondolatot, ezért kerülni kell a szükségtelen duplikációt; a J–01 szerinti szöveges átirat hozzáférhetősége továbbra is elvárás.

## J–12 – J4–A/B/C/D: négy jóváhagyott következménykép
- **J4–A:** Nóra megköszöni a felelősség elismerését; Áron a pletykáról kérdez; Nóra nem vállalja át a jóvátétel megtervezését; Áron átgondolja, mit tehet. Kép: `04A_fajdalom_es_felelosseg.webp`.
- **J4–B:** Nóra időt kér a megbocsátáshoz, Áron nem sürgeti; összekuporodott, térdeire támaszkodó testtartás, később csend. Kép: `04B_idokeres.webp`.
- **J4–C:** megmarad a **bosszú** szó az eredeti válaszban; Nóra morcos/dacos, nem depressziós; Áron nem dönti el helyette, lesznek-e még barátok. Kép: `04C_bosszu_es_baratsag.webp`.
- **J4–D:** Nóra megtiltja a további személyes üzeneteket; Áron **nem ír vissza, még egy „Rendben”-t sem**. A legutoljára javított kép egyértelműen különbözteti meg a két telefont: Nóra lila tokos készülékét és Áron sötét tokos készülékét; Áron telefonján Nóra neve és profilképe van. Kép: `04D_ne_irj_tobbet_JOVAHAGYOTT.webp`.

A fenti öt J4-kép jóváhagyott, ne regeneráljuk őket önkényesen. A későbbi állapotkezelésnél és továbbhaladásnál az eredeti döntési gráf és a szereplők határai maradjanak érvényben.

## Feltöltési megjegyzés
A korábbi J3-s csomag öt képét **nem kell újra feltölteni**. Ez az új, kiegészítő csomag kizárólag az új J4-képeket tartalmazza, a dokumentumok viszont teljes, kumulatív kiadásban szerepelnek.
