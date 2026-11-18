# A Törött híd – grafikai stílus (jóváhagyott irány)

## Stílus
- Hagyományos **színes ceruzás** illusztráció, látható papír- és ceruzatextúrával.
- Meleg, élénk, harmonikus színek: őszi aranysárga, puha kék, rózsás-lila, természetes barna.
- **Nem fotórealisztikus, nem manga és nem anime**; kézzel rajzolt történetmesélő képregényhangulat.
- Nóra és Áron következetes megjelenésű kamaszszereplők, természetes mimikával.
- Keretezett, elkülönülő képregénypanelek; történetmesélő gesztusok és tekintetek.

## Szövegek a képen
- **Csak a párbeszéd szövege legyen a beszédbuborékokban.** Nem szerepelnek „Nóra:”, „Áron:” vagy egyéb névcímkék.
- A gondolatok gondolatfelhőbe kerülnek, „Nóra · belső gondolat” felirat nélkül.
- A buborék csúcsa vagy a gondolatfelhő pontjai egyértelműen mutassák, ki beszél/gondolkodik.
- A magyar szöveg ékezeteit, írásjeleit és tartalmát a forgatókönyv alapján ellenőrizni kell.
- A panelolvasási sorrend mobilon is egyértelmű, a betűméret olvasható.

## A 0.0.4 demó jóváhagyott képanyaga

A repositoryban már megtalálható a szerző által jóváhagyott **21 WebP-kép** a `design/references/` mappában. A korábbi tizenegy kép megmarad; a 3. és 4. jelenethez öt-öt meglévő kép kerül be. A korábban tervezett `nora-aron-0-jelenet-elfogadott.png` nem az alkalmazásban használt útvonal; a 0. jelenet tényleges képe `design/references/00_jelenet_a_titok_kozosen.webp`.

A teljes fájljegyzék és a jelenetenkénti hozzárendelés a [referenciák README-jében](references/README.md), a J3 csomag beillesztési útmutatója a [README_CODI.md](references/README_CODI.md) fájlban található. A J4 csomagjegyzék tényleges helye a [`docs/manifest_J4_0.0.4.json`](../docs/manifest_J4_0.0.4.json). A csomagok `kepek/...` útvonalai helyett a játék a GitHubon ténylegesen meglévő, egyetlen mappában található WebP-ket tölti be.

A 0. jelenet ötpanelezett képregénye az iskola melletti titokmegosztást és az ígéretet mutatja. Nóra felkötött vörösesbarna hajú, rózsás-lila kapucnis felsőt visel; Áron barna hajú, kék kapucnis felsős kamasz. Az 1–4. jelenetnek közös alapképe, majd A/B/C/D döntési következményképei vannak.

A képek konkrét, szerzőileg jóváhagyott feliratait az általános stíluselvek alapján sem írjuk át. A 2B és 2C kép azonos felső narrációja szándékos; a 2D kép a jelenlegi felirataival elfogadott.

A J4–D végleges javított változata a `04D_ne_irj_tobbet_JOVAHAGYOTT.webp`: Áron sötét tokos telefonján Nóra neve és profilképe látszik, Nóra készüléke lila tokos. A kép nem cserélhető vissza korábbi változatra, és nem kerül rá új cím vagy szereplőcímke. A 2B üres fehér részének J–05 szerinti javítása továbbra is külön, nyitott grafikai feladat.

## Beillesztési és mobilos alapelvek

- A képregény a meglévő történet része, nem külön galéria vagy diavetítés.
- A döntési kártyák, a fejléc, a haladásjelző és a közös alkalmazáscsalád arculata megmarad.
- A J–01 szerinti átirat alapból látható, külön nyitógomb nélkül. Az átiraton felül nincs újabb, ugyanazt ismétlő teljes párbeszédkártya vagy válaszidézet; képhiba esetére működő tartalék marad.
- A külön felvezetések és a 3–4. jelenet döntésfüggő Nóra-monológjai külön szöveges elemként, a közös kép fölött jelennek meg; nem kerülnek rá a statikus képre. A 2. jelenetből csak a J–03-ban kijelölt fölösleges blokkok maradnak el.
- Az eredeti oldalarányt megtartjuk, panelek és beszédbuborékok levágása nélkül. Telefonon kattintással vagy koppintással nyitható nagyított nézet; a bezárás a történethez vezet vissza.
- A későbbi képek nem töltődnek be egyszerre; az aktuális történeti pont határozza meg a szükséges illusztrációt.

## Feladatmegosztás és további jelenetek

**Az illusztrációkat a szerző és a ChatGPT képgenerálással külön készíti és hagyja jóvá. Codi/Codex nem generálhat, szerkeszthet vagy rajzolhat újra képeket.** A 0.0.4 képi feladata a már jóváhagyott fájlok változatlan beillesztése, reszponzív megjelenítése és a meglévő döntési rendszerhez kapcsolása.

A 0.0.4 jóváhagyott szövegfrissítései külön adatrétegben kapnak helyet; a kapcsolatfelvételi határ, a döntési logika, a navigáció és az öt reflexiós lezárás működése megmarad. Az 5–7. jelenet egyelőre szöveges; oda csak további szerzőileg jóváhagyott képanyag készülte után kerülhet képregény. Addig nem használunk helyettesítő képet vagy illusztrációt.
