# CODI – A Törött híd 0.0.4 demó: integrációs fejlesztési feladat

**Projekt:** `tobiasistvant-sketch/Torott-Hid`
**Cél:** a 0.0.3 demó működő állapotának megőrzése mellett a 0.0.4 tartalmi/képi frissítéseinek beépítése.

## 0. Mielőtt bármit változtatsz
- A repó aktuális `main` állapotát vizsgáld meg. Ne alapozz feltételezett fájlnevekre, elérési útvonalakra vagy verziószámokra.
- Keresd meg a GitHubon a `docs/01_javitasi_jegyzek_0.0.4_TELJES.md`, `docs/02_szovegfrissitesek_0.0.4_TELJES.md` és `design/references/manifest_J4_0.0.4.json` fájlokat. Ezek az irányadó projekt-specifikációk; a korábbi `docs/0.0.4-fuggo-javitasok-J01-J06.md` és a J3 manifest csak kiegészítő előzmény.
- Vizsgáld meg a jelenleg feltöltött J3 és J4 képeket. A jóváhagyott fájlok tartalmát ne rajzold újra.
- Ellenőrizd a meglévő navigációs/állapotkezelési teszteket és a korábbi 0.0.3 navigációs javításokat. Ne regresszálj.

## 1. Feladatok – mindegyik szükséges
1. Valósítsd meg a dokumentált **J–01–J–12** javításokat, ezek mindegyike külön is ellenőrizhető legyen.
2. A J3 bevezetőjénél az előző J2-választól függően a négy J–06 monológot jelenítsd meg. A J3 narráció és a jóváhagyott közös nyitóképe külön komponensként jelenjen meg.
3. A J3 A/B/C/D ágaihoz a feltöltött, jóváhagyott négy képet rendeld. A megfelelő ágon a megfelelő WebP legyen látható; megtartva az eddigi visszalépési, állapotkezelési logikát.
4. A J4 nyitásakor a J3-as döntéshez illeszkedő négy jóváhagyott J–10 monológ egyikét jelenítsd meg; utána a J4 közös, **jóváhagyott** bocsánatkérő négykockás képet. A jóváhagyott bocsánatkérő szöveget ne írd át.
5. A J4 A/B/C/D következményéhez a négy jóváhagyott WebP-t rendeld, és a dokumentált üzeneteket, visszajelzéseket és állapotkövetkezményeket használd. **J4–D esetén Áron ne küldjön egy további záró választ sem**, és a későbbi jelenetek tiszteljék a személyes megkeresés tiltását.
6. Számold fel a dokumentált indokolatlan ismétléseket, különösen a 2. jelenetben; közben a szöveges átirat hozzáférhető maradjon.
7. A J–05, azaz a J2–B kép nagy üres fehér területének grafikai javítása még **nem kész**. Ne generálj új képet és ne jelöld teljesítettnek. A fennmaradó feladatot egyértelműen jelöld a jelentésben; a többi pontot ettől függetlenül valósítsd meg.

## 2. Elfogadási feltételek
- A J3-as és J4-es döntési ágakból mind a négyet külön-külön be kell járni és képi/szöveges helyességüket ellenőrizni.
- A második jelenetből minden A/B/C/D előzmény esetén a helyes J3-as belső monológ jelenjen meg; ugyanígy a J3 A/B/C/D után a helyes J4-es monológ.
- A döntés megváltoztatása visszalépés után frissítse a megjelenített monológot, képet és következményeket; korábbi döntésből nem szivároghat át szöveg.
- A J3–C ne írjon elő Nórának erkölcsi önvádat; a J3–D a fenyegetés és a tényleges titokközlés között különbséget tartson.
- A J4–C-ben szerepeljen a 'bosszú' szó; J4–D-ben a végleg jóváhagyott, Nóra-profilképes javított kép jelenjen meg.
- A képek őrizzék az arányokat, ne legyenek torzítva vagy levágva, és maradjanak jól használhatók telefonon is.
- A jóváhagyott képekre új címke/szöveg ne kerüljön; különösen ne kerüljön a kép tetejére '4. jelenet' felirat.
- Futtasd a projekt meglévő tesztjeit, valamint ahol lehetséges, böngészős teszteket. Új tesztekkel fedd le az ágkezelést, a regressziót és az állapotmegőrzést.
- Ne módosítsd a szövegek tartalmát saját erkölcsi magyarázattal, ne pontozd a döntéseket.

## 3. Kiadási lépések és jelentés
- Minden változást a repó valós szerkezetéhez illeszkedve végezz. Ha a dokumentum és a forráskód közt ellentmondást találsz, a felhasználó által jóváhagyott friss szöveg és képek élvezzenek elsőbbséget; ne találj ki csendben új mondatokat.
- Emeld a demó verziójelzését **0.0.4 demó**-ra, amennyiben a projektben ténylegesen verziózzák a kijelzőn vagy a metaadatokban.
- Végezz célzott változtatásokat, ne írj újra feleslegesen más jeleneteket, és ne töröld a korábbi 11 képet.
- Készíts részletes zárójelentést: elvégzett J-pontok, GitHub fájlok, tesztek eredménye, fennmaradó hibák (külön J–05), elérhető demó URL.
- A módosításokat ellenőrizhető, áttekinthető commit(ok)ban add át.

**Fontos:** Az elfogadott 5 J4-es képet a `design/references/` alól keresd, a `manifest_J4_0.0.4.json` fájlnév alapján. A fájlok közül a `04D_ne_irj_tobbet_JOVAHAGYOTT.webp` a **végleges javított** változat.
