# CODI – A Törött híd – 0.0.4 teljes kiegészítés / feladatkiírás

A feladat az elfogadott szövegek és képek következetes integrálása a meglévő GitHub Pages játékba. Ne fejleszd újra nulláról; tartsd meg az összes korábbi ágat, állapotot, tesztet és elérési utat.

## Források
1. `docs/01_javitasi_jegyzek_0.0.4_TELJES.md` – J–01–J–20 teendők és elfogadási állapot.
2. `docs/02_szovegfrissitesek_0.0.4_TELJES.md` – teljes, jóváhagyott dialógusok, monológok, narrációk.
3. `docs/04_R_reflexios_kerdesek.md` – a hídmetaforához kapcsolódó kérdések (javasolt, kép-véglegesítéshez kötve).
4. `design/references/manifest_J5_J6_HID_0.0.4.json` – új képek (18 WebP, forrás PNG) és állapotuk.
5. A korábbi J3/J4 képek és manifestek is megtartandók; keresd őket a `design/references/` könyvtárban.

## Kötelező integráció
- J–01–J–12 a korábbi javítási jegyzék szerint.
- J–13: J5 nyitó monológ J4 A/B/C/D előzményből; az elfogadott pontos szöveggel.
- J–14: J5 nyitó kép J4 A/B/C után `05_kozos_ABC_aron_uzenete.webp`, J4 D után `05_kulon_D_kozvetett_hir.webp`. **J4 D után Áron nem ír közvetlenül Nórának.**
- J–15: J5 A/B/C következmény-illusztrációk és jóváhagyott dialógusok.
- J–16: J5 D választása végrehajtott közzétételt jelent. A régi, képernyőn maradt figyelmeztető narrációt és belső gondolatot vedd ki; ne készíts piszkozat-megerősítő képernyőt ugyanarra a cselekményre. A visszamenőleges átállítást, session-state és end-routing konzisztenciát teszteld.
- J–17: J6 nyitás: változó narráció → változó monológ → jóváhagyott közös osztálytermi kép → A/B/C/D/E választási lehetőség.
- J–18: J6 A/B/C/D/E következményképek és az elfogadott dialógusok; E jelenetben osztály előtti vita történik, nem újabb titokkiszivárogtatás.
- A szereplőket a képeken ne címkézd beszédbuborékok előtt; ne generálj új képet a már jóváhagyott helyett.
- Ne csinálj erkölcsi pontozást, és tartsd meg a korábbi döntések állapotfüggő hatását.

## Feltételes / nem végleges
- **J–19:** a főképernyő H0 hídja és az R1–R5 hídképek készen állnak vizuális felülvizsgálatra. A felhasználó még nem hagyta jóvá őket egyenként; ne tekintsd automatikusan végleges integrációs utasításnak.
- **J–20:** J5–D után J6 A/B/C inaktívvá tétele, D/E aktív; az R-oldal plusz gombja **nincs részleteiben véglegesítve**. Ne találj ki saját gombműködést. Ezeket tervezz meg megjegyzésben, de ne implementáld önkényesen.

## Tesztelés
- Összes J4 (A–D) → J5 (A–D) elágazás; J4 D-ben nincs közvetlen Áron-üzenet.
- Összes J5 (A–D) → J6 narráció, belső gondolat, kép megjelenítése; J5 D azonnal elküldött közzétételként szerepel.
- J6 mind az 5 következménykép és válasz; R1–R5 kiválasztása a teljes történeti állapotból, nem pusztán az utolsó betűből.
- Visszalépés, előrelépés, újrakezdés, elmentett állapot, direkt oldalletöltés és responsive mobil nézet.
- Régi J0–J4 képek és a korábbi asset-manifest nem törlődhetnek.
- Futtass minden meglévő tesztet és kézi smoke tesztet; dokumentáld az eredményt.

## Kimenet
Commit vagy PR, amely tartalmazza a módosított forrásfájlokat, teszteket, képhivatkozásokat és rövid változásjegyzéket. Kérj külön döntést a nyitott J–19/J–20 pontokról, ne feltételezd jóváhagyásukat.
