# A Törött híd · v1.0 – teljes integrációs jegyzék

**Aktív státusz: Fejlesztés alatt.** A v1.0 a meglévő játék továbbfejlesztése. A korábbi J0–J4 képanyag és a 0.0.3 navigáció megmarad; a jóváhagyott J5/J6 tartalom és a feltöltött hídsorozat egészíti ki. **J–05 grafikai feladata és J–20 két felvetése továbbra is nyitott.** A hat híd integrálása nem jelenti azok egyenkénti, végleges vizuális jóváhagyását.

## Forráshierarchia és feltárt eltérések

1. A felhasználó v1.0 integrációs utasítása adja az aktuális verziót, státuszt és a még nem aktiválható tervek határát.
2. A [kumulatív J–01–J–20 jegyzék](01_javitasi_jegyzek_0.0.4_TELJES.md), a [pontos szövegfrissítések](02_szovegfrissitesek_0.0.4_TELJES.md) és az [R-kérdések](04_R_reflexios_kerdesek.md) az aktuális tartalmi források.
3. A [J5/J6/híd manifest](manifest_J5_J6_HID_0.0.4.json), a [J4 manifest](manifest_J4_0.0.4.json) és a [J3 manifest](../design/references/manifest.json) a feltöltött képcsomagokat azonosítja. Az eredeti forgatókönyvek és történeti jegyzetek megmaradnak.

A J5/J6/híd manifest tényleges helye **`docs/manifest_J5_J6_HID_0.0.4.json`**, nem a feladatban jelzett `design/references/` alatti út. A J4 jegyzék is a `docs/` könyvtárban van. Valamennyi WebP a `design/references/` mappában található; a manifestek `kepek/...` elérési útjai csomagon belüli utak. A korábbi fájlnevekben és forrásfejlécekben megmaradó `0.0.4`, valamint a feltöltéskori „még nem beépített” jelzések történeti állapotot jelölnek, nem az aktuális felület verzióját vagy státuszát.

A jóváhagyott monológok és a régi időbélyegek között tartalmi eltérés marad: J3 eredeti időpontja kedd, J4-é csütörtök, miközben a J4-monológok „Tegnap”-pal kezdődnek. A kiadás nem talál ki új mondatot vagy dátumot; a pontos szerzői egyeztetés nyitott. A 2B grafikai javításához jóváhagyott új állomány nem található.

A feltöltött J6- és hídképekben Áron felsője szürke, míg a korábbi karakterleírás kék felsőt említ. Az R2 hídképen olívazöld nadrág látható a többi hídkép kék farmerje helyett. A megadott képek változatlanul kerülnek a hozzárendelésbe; ezeket a képi eltéréseket az egyedi vizuális áttekintéskor lehet tisztázni, újrarajzolás nélkül.

## J–01–J–20 követési táblázat

| Pont | Megvalósítás / státusz | Fájl és ellenőrizhető viselkedés |
| --- | --- | --- |
| J–01 | Alapból látható átirat, nyitókapcsoló nélkül; nincs második teljes párbeszédkártya. | [`js/app.js`](../js/app.js), [`css/styles.css`](../css/styles.css); látható és képernyőolvasóval elérhető szöveg. |
| J–02 | Jóváhagyott J1 felvezetés a kép előtt. | [`js/revisions.js`](../js/revisions.js); pontos, önálló narráció. |
| J–03 | J2 felvezetés, a két kijelölt extra blokk elhagyása; a szükséges feltételes tartalom megmarad. | [`js/revisions.js`](../js/revisions.js), [`js/comics.js`](../js/comics.js); minden J1-előzménnyel ellenőrizhető. |
| J–04 | A J2A külön megismételt válaszidézete elmarad. | [`js/comics.js`](../js/comics.js), [`js/app.js`](../js/app.js); a kép és egy átirat megmarad. |
| **J–05** | **NYITOTT: a J2B fehér területének grafikai javításához nincs jóváhagyott csere.** | [`02B_igeret_szamonkerese_kovetkezmeny.webp`](../design/references/02B_igeret_szamonkerese_kovetkezmeny.webp) változatlan. |
| J–06 | Négy teljes J3-monológ a J2 A/B/C/D alapján. | [`js/revisions.js`](../js/revisions.js); ágváltás után nincs régi szövegátszivárgás. |
| J–07 | J3-monológ → narráció → közös kép → döntés → következmény. | A narráció és a kép külön komponens. |
| J–08 | A képekre nem kerül új név-, jelenet- vagy erkölcsi címke. | A bináris képek változatlanok; a felületi címkék a képen kívül maradnak. |
| J–09 | Saját 3A/3B/3C/3D kép; 3C önvád nélkül, 3D fenyegetésként. | [`js/comics.js`](../js/comics.js), [`js/revisions.js`](../js/revisions.js), [`js/engine.js`](../js/engine.js). |
| J–10 | Négy J4-monológ a J3 választásából. | A jóváhagyott teljes szövegek változatlanok. |
| J–11 | Közös, jóváhagyott J4 bocsánatkérés. | [`04_kozos_bocsanatkeres.webp`](../design/references/04_kozos_bocsanatkeres.webp); nincs új cím a képen. |
| J–12 | Négy J4 következmény; 4C-ben „bosszú”, 4D-ben végleges kép és nincs Áron-válasz. | [`04D_ne_irj_tobbet_JOVAHAGYOTT.webp`](../design/references/04D_ne_irj_tobbet_JOVAHAGYOTT.webp); kapcsolatfelvételi határ megmarad. |
| J–13 | Négy J5 nyitómonológ a J4 A/B/C/D alapján. | [`js/revisions.js`](../js/revisions.js); nincs egy közösre rövidítés. |
| J–14 | Két J5 nyitókép: ABC után közvetlen üzenet, D után osztálytársi hír. | [`05_kozos_ABC_aron_uzenete.webp`](../design/references/05_kozos_ABC_aron_uzenete.webp), [`05_kulon_D_kozvetett_hir.webp`](../design/references/05_kulon_D_kozvetett_hir.webp). |
| J–15 | Jóváhagyott 5A/5B/5C képek és pontos párbeszédek. | Nóra kezdeményezhet korlátozott kapcsolatfelvételt; ez nem kéretlen Áron-üzenet. |
| J–16 | 5D választásakor megtörtént közlés, megerősítő panel vagy piszkozat nélkül. | [`js/engine.js`](../js/engine.js), [`05D_bosszu_kozzetetel.webp`](../design/references/05D_bosszu_kozzetetel.webp); a későbbi állapot és R-kimenet figyelembe veszi. |
| J–17 | J5 A/B/C/D szerinti narráció és belső monológ a J6 előtt. | [`js/revisions.js`](../js/revisions.js); sorrendjük narráció → monológ → közös kép. |
| J–18 | Közös J6 osztályterem, öt külön következménykép; 6E vita, nem titokközlés. | [`js/comics.js`](../js/comics.js), [`js/engine.js`](../js/engine.js); mind az öt választás aktív marad. |
| J–19 | H0 a kezdőlapon, R1–R5 saját hídja az R-oldalakon, pontos R-kérdésekkel. | Nincs jelenetek közötti hídmérő/animáció. A hat híd egyedi végleges jóváhagyása nyitott. |
| **J–20** | **NYITOTT TERV: J5D után J6 A/B/C zárolása és az R4/R5 új plusz gomb.** | Nincs aktiválva; az alábbi javaslat nem kódszabály és nem új történeti ág. |

## Új assetek pontos útvonalai

A korábbi 21 J0–J4 fájl teljes listája a [39 képes jegyzékben](../design/references/README.md) található; egyik sem törlődik vagy íródik felül. Az új csomag 18 állománya:

| Hely | Változat | Fájl | Méret | Jóváhagyási státusz |
| --- | --- | --- | --- | --- |
| J5 | közös, J4 A/B/C után | [design/references/05_kozos_ABC_aron_uzenete.webp](../design/references/05_kozos_ABC_aron_uzenete.webp) | 1122 × 1402 | jóváhagyott képregény |
| J5 | külön, J4 D után | [design/references/05_kulon_D_kozvetett_hir.webp](../design/references/05_kulon_D_kozvetett_hir.webp) | 1122 × 1402 | jóváhagyott képregény |
| J5 | A | [design/references/05A_lilivel_beszel.webp](../design/references/05A_lilivel_beszel.webp) | 1122 × 1402 | jóváhagyott képregény |
| J5 | B | [design/references/05B_osztaly_elott_felelosseg.webp](../design/references/05B_osztaly_elott_felelosseg.webp) | 1122 × 1402 | jóváhagyott képregény |
| J5 | C | [design/references/05C_segites_elutasitasa.webp](../design/references/05C_segites_elutasitasa.webp) | 1122 × 1402 | jóváhagyott képregény |
| J5 | D | [design/references/05D_bosszu_kozzetetel.webp](../design/references/05D_bosszu_kozzetetel.webp) | 1122 × 1402 | jóváhagyott képregény |
| J6 | közös | [design/references/06_kozos_osztalyterem.webp](../design/references/06_kozos_osztalyterem.webp) | 1671 × 941 | jóváhagyott képregény |
| J6 | A | [design/references/06A_ujrakezdes.webp](../design/references/06A_ujrakezdes.webp) | 1199 × 1312 | jóváhagyott képregény |
| J6 | B | [design/references/06B_bizonytalan_kozeledes.webp](../design/references/06B_bizonytalan_kozeledes.webp) | 1536 × 1024 | jóváhagyott képregény |
| J6 | C | [design/references/06C_megbocsatas_kulon_utak.webp](../design/references/06C_megbocsatas_kulon_utak.webp) | 1245 × 1263 | jóváhagyott képregény |
| J6 | D | [design/references/06D_szemelyes_kapcsolat_lezarasa.webp](../design/references/06D_szemelyes_kapcsolat_lezarasa.webp) | 1239 × 1270 | jóváhagyott képregény |
| J6 | E | [design/references/06E_nyilvanos_szembesites.webp](../design/references/06E_nyilvanos_szembesites.webp) | 1246 × 1263 | jóváhagyott képregény |
| kezdőoldal | híd | [design/references/H0_fokepernyo_ep_hid.webp](../design/references/H0_fokepernyo_ep_hid.webp) | 1536 × 1024 | egyedi végleges vizuális jóváhagyásra vár |
| R1 | híd | [design/references/R1_a_hid_ujjaepul.webp](../design/references/R1_a_hid_ujjaepul.webp) | 1536 × 1024 | egyedi végleges vizuális jóváhagyásra vár |
| R2 | híd | [design/references/R2_a_hid_meg_epul.webp](../design/references/R2_a_hid_meg_epul.webp) | 1536 × 1024 | egyedi végleges vizuális jóváhagyásra vár |
| R3 | híd | [design/references/R3_megbocsatas_kulon_utakon.webp](../design/references/R3_megbocsatas_kulon_utakon.webp) | 1536 × 1024 | egyedi végleges vizuális jóváhagyásra vár |
| R4 | híd | [design/references/R4_lezart_hid.webp](../design/references/R4_lezart_hid.webp) | 1536 × 1024 | egyedi végleges vizuális jóváhagyásra vár |
| R5 | híd | [design/references/R5_osszeomlott_hid.webp](../design/references/R5_osszeomlott_hid.webp) | 1536 × 1024 | egyedi végleges vizuális jóváhagyásra vár |

A képekre nem kerül kitalált didaktikus felirat. Az R-oldalra hídillusztráció kerül, külön új képregény nem. A hat híd metaadatában az `awaiting_individual_approval` státusz megmarad; integrálásuk a teljes csomagra adott felhasználói kérésen alapul.

## v1.0, státusz és lábléc

A csomag szemantikus verziója `1.0.0`, a felhasználói változatjelzés **v1.0**. A jelenlegi alkalmazás megnevezésében a korábbi státusz helyett pontosan **Fejlesztés alatt** szerepel. A történeti változásnaplók és forrásfájlok megmaradnak. Az `npm run version:sync` a központi verzióból frissíti a származtatott metaadatot és HTML-hivatkozásokat.

A meglévő **XI. osztály · Református vallás** és **Nincs pontozás. A döntéseid ezen a böngészőlapon maradnak.** tájékoztatás alatt pontosan ez a két sor szerepel:

```text
Koncepció és fejlesztés: Tóbiás István Tamás
MI-támogatott fejlesztés · v1.0 · Fejlesztés alatt
```

A két szerzői sor normál, 400-as betűsúlyú; nincs `strong`, `b`, kiemelő keret, badge vagy gomb. Kisebb, semleges, de megfelelő kontrasztú szövegként olvasható. E stílusváltozás a láblécre korlátozódik.

## Állapot, migráció és történeti következmény

A v2 állapotformátumban J5–D megtörtént közzététel, J6–E pedig nyilvános konfliktus. A 6/E nem állít új titokközlési jelzőt. A teljes döntéstörténet és az előző jóvátétel továbbra is számít az R1–R5 kiválasztásánál. A J5–D ténye nem tűnik el pusztán attól, hogy a játékos később más hangú utolsó választ ad.

A korábbi kiadásban már szereplő, kifejezetten választandó J6 korrekció megmarad; nem új helyreállító gomb, nem automatikus visszavonás, és nem az R4/R5 plusz gomb terve. A megtörtént közlés tényét nem törli. J–20 szerinti új zárolást vagy rejtett döntést a kiadás nem vezet be.

A mentés továbbra is helyi `sessionStorage`: `torott_hid_demo_v1` és `torott_hid_navigation_v1`. A belső, történeti kulcsnév nem felhasználói státusz. A játék nem használ szerveroldali válaszgyűjtést, és nem ír a `localStorage`-ba. Újrakezdéskor más alkalmazások adatai megmaradnak.

Régi mentés migrációjakor a J5–D el nem küldött tervezete nem válhat utólag közzététellé: az 5. döntéshez tér vissza, a korábbi döntések megőrzésével. A régi J6–E közzétételi/megerősítési állapot a 6. döntéshez tér vissza. A változatlan jelentésű korábbi állapotok megtarthatók. A képernyőelőzmény az új, érvényes állapotból épül újra, így elhagyott vagy régi jelentésű ág nem írhatja felül az aktuális történetet.

## Nyitott tervek: konkrét javaslatok aktiválás nélkül

**J5–D → J6 A/B/C zárolás:** későbbi jóváhagyás esetén A/B/C maradjon látható, de inaktív; D/E maradjon választható. Az ok magyarázatát és képernyőolvasós jelölését előbb szerzőileg pontosítani kell, a fókusz ne akadjon használhatatlan kártyán. Külön döntést igényel, hogyan viszonyuljon a korábban meglévő, kifejezett J6 korrekcióhoz. **Jelenleg mind az öt lehetőség aktív, a korlátozás nincs bekapcsolva.**

**R4/R5 plusz gomb:** javasolt, tisztázandó cél a már meglévő **A döntési útvonalad** blokk megmutatása ugyanazon R-oldalon. Lehetséges felirat: **Visszanézem a döntési útvonalam**. Ez olvasási/navigációs művelet lenne, állapotváltozás, automatikus visszavonás vagy új befejezés nélkül; újrajátszásra a meglévő gomb maradna. A cél, végleges felirat és működés szerzői döntésre vár. **Új R4/R5 gomb nincs implementálva.**

További nyitott tételek: a J2B grafikai csere, a hat híd egyedi végleges vizuális áttekintése és a J3/J4 időrendi eltérés szerzői pontosítása. A kiadás ezekhez nem talál ki új képet vagy történetszöveget.

## Megismételhető ellenőrzés és átadás

```sh
npm ci
npm test
npx playwright install chromium
npm run test:browser
```

A logikai tesztek a friss állapotformátumot, migrációt, valódi közzétételt, nyilvános vitát, teljes döntéstörténetet, forráshűséget és képfájlokat ellenőrzik. A [`tests/integration-v1.spec.cjs`](../tests/integration-v1.spec.cjs) a J4(A–D) → J5(A–D) → J6(A–E) **80 kombinációját** vizsgálja asztali és mobil nézetben, a tényleges monológot, képet, üzenetet és R-kimenetet is. A korábbi J0–J4, navigációs és átirat-regressziók megmaradnak. A lábléc pontos szövegét, normál betűsúlyát és olvashatóságát, a képarányokat, nagyítást, képhibát, session/local storage határait, közvetlen belépést, billentyűzetet, újratöltést és újrakezdést is ellenőrizni kell.

Ellenőrzött eredmények a kiadott kódhoz:

- `npm test`: **70 sikeres teszt**, köztük 8080 teljes döntési útvonal és a régi mentések migrációja.
- `CI=1 npm run test:browser`: **198 sikeres böngészőteszt**, asztali és mobil nézetben. A teljes 80 J4/J5/J6 kombináció mindkét nézetben ellenőrizve.
- **72 sikeres vizuális állapotellenőrzés**: mind a 18 új kép 320, 390, 768 és 1440 px szélességen; helyes képarány, működő nagyítás és változatlan navigáció.
- **8 sikeres lábléc-/témaellenőrzés**: pontos szövegek, 400-as betűsúly, legalább 13 px-es szerzői szöveg és megfelelő kontraszt világos/sötét rendszerbeállítás mellett.
- Mind az **51 védett forrásfájl**, köztük mind a **39 WebP-kép**, változatlan ellenőrzőösszeggel rendelkezik. A tesztelt alkalmazáskód az eredmények keletkezése óta nem változott.

A commit-/PR-azonosítót, a GitHub Actions és a Pages telepítés tényleges eredményét az átadási beszámoló külön rögzíti. A helyi sikeres teszt önmagában nem állítás az élő oldal böngészős ellenőrzéséről.

GitHub Pages URL: **https://tobiasistvant-sketch.github.io/Torott-Hid/**. A tényleges forráságat és a telepített commitot a Pages-beállítás és a sikeres Actions-futás mutatja. Külön forráság esetén a `main` és a Pages-ág ugyanazt a tesztelt commitot kapja. Az élő oldal böngészős ellenőrzése külön lépés; hálózati tiltás esetén azt nem lehet elvégzettnek jelölni.
