# A Törött híd – grafikai stílus és v1.0 integráció

## Közös arculat

A meglévő oktatási játékcsalád sötétkék, meleg törtfehér és türkiz felületei, a betűkészletek, a választási kártyák és a reszponzív szerkezet megmaradnak. A v1.0 nem általános UI-újratervezés.

A jelenlegi kiadás megjelenített verziója **v1.0**, státusza **Fejlesztés alatt**. A lábléc a meglévő tantárgyi/adatkezelési tájékoztatás alatt két visszafogott sort kap:

```text
Koncepció és fejlesztés: Tóbiás István Tamás
MI-támogatott fejlesztés · v1.0 · Fejlesztés alatt
```

A szerzői sorok normál, körülbelül 400-as betűsúlyúak, a főtartalomnál kisebbek, semleges színűek és mérsékelt térközzel állnak. Nem címek, badge-ek vagy gombok. Nem tartalmaznak félkövér kiemelést. Mobilon és a támogatott színsémában megfelelő kontraszttal olvashatók maradnak; e változtatás a láblécre korlátozódik.

## Képi stílus

- Jól látható, hagyományos színesceruza-vonások, kézzel satírozott papír- és ceruzatextúra.
- Meleg, harmonikus színek: őszi aranysárga, puha kék, rózsás-lila és természetes barna.
- Nóra szeplős, vörösesbarna kontyos középiskolás lila-rózsaszín felsőben; Áron barna hajú kamasz, kék felsővel.
- Természetes mimika és testbeszéd, követhető panelolvasási sorrend. Nem fotórealisztikus, manga- vagy animehatású átrajzolás.
- A beszédbuborék előtt nincs „Nóra:”/„Áron:” névcímke, a gondolatfelhőn nincs „Nóra · belső gondolat” felirat. A chat fejlécében a partner neve természetesen megjelenhet.
- A jóváhagyott képek nem kapnak új jelenetcímet, ráhelyezett feliratot vagy erkölcsi értékelést. A J6 közös osztálytermi képe felirat nélküli.

## Meglévő képanyag

A `design/references/` alatt 39 meglévő WebP szerepel: a korábbi 21 J0–J4 kép, 12 jóváhagyott J5/J6 képregény és 6, egyedi végleges vizuális jóváhagyásra váró hídillusztráció. A felhasználó a teljes feltöltött csomag beillesztését kérte; ez nem jelenti a hat híd egyenkénti végleges vizuális lezárását. A hídmetaadatok külön, könnyen cserélhető hozzárendelésben maradnak.

A teljes lista a [referenciák README-jében](references/README.md) található. A J3 manifest a `design/references/manifest.json`, a J4 és J5/J6/híd jegyzék ténylegesen a `docs/manifest_J4_0.0.4.json` és `docs/manifest_J5_J6_HID_0.0.4.json`. A csomagok `kepek/...` útvonalai helyett a játék a tényleges, lapos GitHub-útvonalakat használja.

**Codi/Codex nem generál, nem szerkeszt és nem rajzol újra képeket.** A feladat a meglévő állományok változatlan beillesztése. A J4–D végleges változata a `04D_ne_irj_tobbet_JOVAHAGYOTT.webp`. A J2–B nagy fehér részének J–05 szerinti javítása továbbra is külön, nyitott grafikai feladat.

## Elhelyezés és olvashatóság

A J0–J6 képei a történet részei, nem galériát vagy diavetítést alkotnak. A döntésfüggő monológok és a jóváhagyott felvezetések külön szöveges komponensként maradnak a kép előtt. J5 két nyitóképe a J4 döntéséhez illeszkedik, J6 közös képe elé a J5 szerinti narráció és monológ kerül.

Hídillusztráció csak a kezdőképernyőn és az R1–R5 végoldalon jelenik meg. Nincs folyamatos hídmérő vagy hídanimáció a jelenetek között. Az R-oldalakon a híd és a testbeszéd hordozza a képi helyzetet; nem kerül mellé külön új képregény vagy kitalált didaktikus képaláírás. A reflexiós kérdések a [jóváhagyott R-dokumentumból](../docs/04_R_reflexios_kerdesek.md) származnak.

Az átirat kattintás nélkül látható és hozzáférhető, ezen felül nincs még egy teljesen azonos párbeszédkártya. A képek eredeti oldalaránya és teljes vászna megmarad. Mobilon használható nagyított nézet segíti a képi szöveg olvasását; a bezárás visszaadja a történeti állapotot és fókuszt. Csak az aktuális állapothoz tartozó kép töltődik be. Képhibánál működő szöveges tartalék marad.

A J–20 szerint felvetett J6-zárolás és R4/R5 plusz gomb továbbra is terv: a kiadás nem jelenít meg új zároló vagy helyreállító felületet. A konkrét, még nem aktivált javaslatot a [v1.0 jegyzék](../docs/release-v1.0.md#nyitott-tervek-konkrét-javaslatok-aktiválás-nélkül) tartalmazza.
