# CODI – A Törött híd: R1–R5 tartalomcsere és kétféle lenyitható panel

## ELSŐDLEGES SZABÁLY: takarékos, célzott feladat
A megadott, már GitHubon található `docs/Torott_Hid_R1_R5_Bovitett_IGEVERSEKKEL_CODINAK.md` az EGYETLEN új, hiteles tartalomforrás. Használd közvetlenül; **ne kutass a neten Biblia-szöveg után**, ne találj ki szöveget, ne fogalmazd át a jóváhagyott leírásokat. A Biblia-versek felhasználó által biztosított szövegei benne vannak a dokumentumban.

**Idő/keretkímélés:** Ne indíts alügynököt / párhuzamos ügynököt, teljes projekt-átvilágítást, böngészős E2E futtatást, screenshot-készítést, vizuális auditot, új dokumentációt, új képkonverziót, általános refaktort, függőségfrissítést, CI-folyamatot vagy ismételt tesztkört. Ne végezz feladatidegen javításokat. A meglévő kód célzott megtekintése és a szükséges fájlok módosítása elegendő. Csak egy gyors, releváns ellenőrzést végezz (pl. érintett JavaScript-fájlok szintaxisa vagy rövid célzott teszt); ha nem indul vagy túl költséges, jelentsd és ne erőltesd. A GitHub automatikus CI-ja a commit után természetesen lefuthat; külön ne indíts teszteket emiatt.

## Megvalósítandó módosítások – KIZÁRÓLAG EZEK

1. **R1–R5 teljes szövegcsere:** Az öt lezárás `Mit tanulhatunk ebből?` és `Bibliai iránytű` jelenlegi tartalmát cseréld le **teljes egészében, szóról szóra** a csatolt Markdownban megadott új szövegre. Ne fűzd hozzá a régit, ne maradjanak régi bibliai magyarázatok. Az igeverseket pontosan a megfelelő magyarázat mellé illeszd: R1–R5 mindegyikén három igehely. A feltöltésből korrigált R3/Ef 4,32 változat az érvényes.

2. **Bibliai igeversenként lenyíló elem:** Mind az öt R-oldalon a `Bibliai iránytű` alatt **mindhárom igehely hivatkozása/címe és saját részletes magyarázata azonnal, folyamatosan olvasható**. Maga a Biblia-idézet alaphelyzetben rejtett, és egy külön, a cím mellett / közvetlenül alatta megjelenő `Az igevers elolvasása` gombbal nyitható/csukható. Három különálló lenyíló egység minden R-oldalon (összesen 15). Használhatsz natív HTML `<details><summary>` megoldást minimális CSS-sel; az igehely neve és a magyarázat NEM kerülhet a lenyíló belsejébe. A lenyíló megoldás billentyűzettel és mobilon is használható. Ne töltsd le / kérd le távolról az igeverseket.

3. **Döntési útvonal alaphelyzetben összecsukva:** Az `A döntési útvonalad` cím vagy egyértelmű `Döntési útvonal megtekintése` gomb alatt az útvonal-lista alapból REJTVE legyen, és egyetlen kattintással megjeleníthető, ismételt kattintással összecsukható. Natív `<details>` javasolt. Ez tisztán megjelenítési funkció: ne módosítsa a játék döntéseit, a mentést, a visszalépést vagy a befejezés számítását.

4. **Megőrzés:** R1–R5 címek, feliratok, szimbolikus hídképek, korábbi jóváhagyott kérdések, `Mi történt a te történetedben?` dinamikus összefoglaló, `Újrajátszom Nóra történetét`, valamint a játék v1.0 felülete változatlanul maradjon. **R5 többféle útból előállhat; a dinamikus összefoglaló tényszerű legyen, ne állítson soha meg nem történt közzétételt.** Ne adj R4/R5 extra javító gombot; az nincs jóváhagyva.

5. **Minimális befejezés:** A módosításokat az aktuális projektben készítsd el. Egy tömör összefoglalót adj: érintett fájlok, egy célzott ellenőrzés eredménye, commit-azonosító (ha létrejött), és hogy a GitHub Pages-re való megjelenéshez kell-e további lépés. Ha az összes módosítás kész, mentsd a szokásos GitHub-ágra/PR-munkafolyamatba a tényleges hozzáféréseid szerint. Ne állítsd, hogy publikáltad, ha csak egy külön ágon vagy PR-ben van.

## Kifejezetten TILOS / NEM RÉSZE A KÉRÉSNEK
- Másik jelenetek (J0–J6) újraírása vagy a történetlogika módosítása.
- Az egész alkalmazás újratervezése, verzióemelés, új grafika, játékmeneti extra, több körös tesztelés.
- AI-alügynökök párhuzamos kiküldése, extra auditok, teljes böngészős screenshot-sorozat.
- A kapott Biblia-idézetek újrakeresése, átírása vagy más bibliafordításra cserélése.

**Indítsd és fejezd be ezt az egy szűk frissítést, ne tervezz hozzá további munkát.**
