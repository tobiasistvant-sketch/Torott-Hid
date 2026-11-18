# A Törött híd · 0.0.2 demó

**XI. osztály · Református vallás · Harag és megbocsátás: morális dilemmák az emberi kapcsolatokban**

Böngészőben futó, magyar nyelvű, szöveges döntésjáték Nóra szemszögéből. A demó a történet 0–7. jelenetét és mind az öt különálló befejezést végigjátszhatóvá teszi. A játékos Nóra reakcióiról dönt; Áron önálló szereplő, a bocsánatkérését nem a játékos „jó válaszai” váltják ki.

Ez **kipróbálásra készült dramaturgiai és pedagógiai munkaváltozat**, nem végleges tananyag. A szerző külön engedélyezte a `0.0.2` demó programozását; ez a korábbi előkészítési sorrendet a demó céljára felülírja, a forrásszövegek végleges jóváhagyását nem helyettesíti.

## Kipróbálás helyben

A repository gyökeréből:

```sh
python3 -m http.server 8004 --bind 127.0.0.2
```

Nyisd meg a `http://localhost:8004` címet. A futó játék statikus HTML/CSS/JavaScript: nincs fordítás, adatbázis, alkalmazásszerver vagy futásidejű csomagfüggőség. A betűkészletek helyben találhatók.

## Mi működik a demóban?

- Nyitóképernyő és nyolc, sorrendben következő jelenet, elkülönülő párbeszédekkel és Nóra belső gondolataival.
- A forrásból átvett döntési lehetőségek, utánuk olvasható következménnyel és a későbbi jelenetekhez illő változatokkal. **A válaszkártyára egyetlen kattintás rögzíti a választ**, nincs külön „Ezt választom” megerősítő gomb.
- Külön megerősítés a nyilvános megtorlás előtt; az **Átgondolom még** lehetőség visszalépést enged. A közzététel a történet fiktív eseménye: az alkalmazás nem küld üzenetet és nem publikál közösségi oldalra.
- A „Ne írj többet” határ következetes megtartása. Az ezt követő jóvátételi ajánlat nem Áron új magánüzeneteként jelenik meg.
- Öt saját záróoldal: történeti összefoglalás, erkölcsi tisztázás, bibliai útmutatás és magyarázat, két gondolkodtató kérdés, a döntési útvonal visszanézése és újrajátszás.
- Helyi, böngészőlaphoz kötött mentés, újratöltés utáni folytatással. Újrajátszáskor tiszta játékállapot indul.

Nincs pontozás, erkölcsi rangsor vagy személyes családi történeteket bekérő űrlap. Az R3 és R4 nem „rossz” befejezés; az R5 sem minősíti a játékost rossz embernek. Áron POV-ja, a képregény, a karakterillusztrációk és az AI-generált képek nem részei ennek a demónak.

## Tartalmi forrás és a kiegészítések határa

Az eredeti, változatlan munkaforrások:

1. [Nóra POV-forgatókönyve](docs/nora-pov-forgatokonyv.md).
2. [Az öt befejezés reflexiós oldalai](docs/ot-befejezes-reflexios-oldalak.md).
3. [Projektutasítások](AGENTS.md).

A forrásszövegeket a programban forrásfájlra és sorszámra mutató adatok azonosítják. Az új dramaturgiai szövegek külön `js/adaptations.js` állományba kerülnek, saját azonosítóval és eredetjelöléssel. A bibliai magyarázatok új részeit a [reflexiós kiegészítések jegyzéke](docs/reflection-additions.md) is felsorolja; ezek nem szó szerinti bibliai idézetek. A reflexiók pedagógiai kiemeléseit sem tüntetjük fel szentírási idézetként.

A régi R5-összefoglaló felelősségvállalást tagadó mondata nem kerül feltétel nélkül a játékba. A megjelenített összefoglalás a tényleges útvonalhoz igazodik, és megőrzi azt a tényt, hogy Áron a 4. jelenetben elismerte a titoksértést.

A dramaturgiai változatokat, a befejezések demóban alkalmazott szabályait és a szerzői ellenőrzésre váró kérdéseket a [demójegyzetek](docs/demo-notes.md) részletezik.

## Ellenőrizhető útvonal az öt befejezéshez

A betűk az eredeti forgatókönyv A–E lehetőségeire utalnak. A 0. jelenetben nincs döntés; a táblázat az 1–6. jelenet válaszait adja meg. Ezeket a [tesztútvonalak](tests/routes.json) és az állapotteszt is ellenőrzi.

| Befejezés | 1. | 2. | 3. | 4. | 5. | 6. | Külön lépés |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R1 – A híd újjáépül | B | B | A | A | A | A | Nincs közzététel |
| R2 – A híd még épül | C | C | B | B | B | B | Nincs közzététel |
| R3 – Megbocsátás, de külön utakon | D | B | A | C | C | C | Nincs közzététel |
| R4 – A híd lezárva marad | B | C | C | D | C | D | Az 5/C nem elküldött válasz |
| R5 – A híd tovább omlik | A | A | D | B | D | E | Az 5/D és a 6/E után is erősítsd meg a közzétételt |

A végkifejletet nem csak az utolsó gomb határozza meg. Például a barátság felé nyitás R1-hez vagy R2-höz vezethet attól függően, milyen jóvátétel történt korábban. A puszta fenyegetés vagy egy visszavont tervezet nem azonos a végrehajtott megtorlással.

## Fájlok

- `index.html`, `css/styles.css`: a reszponzív szöveges felület és a közös alkalmazáscsalád arculata.
- `js/story.js`: a forrásból átvett jelenetek, párbeszédek és választási lehetőségek.
- `js/adaptations.js`: elkülönített dramaturgiai változatok és az aktuális úthoz igazított történeti összefoglalások.
- `js/reflections.js`: az öt külön reflexió; a forrásból átvett részek és az új magyarázatok megkülönböztetésével.
- `js/engine.js`: tiszta állapotgép, események, befejezési szabályok és biztonságos munkamenetmentés.
- `js/app.js`: megjelenítés és eseménykezelés; a történeti szöveg adatból érkezik.
- `js/version.js`, `package.json`, `package-lock.json`: a `0.0.2` kiadás verzióadatai és fejlesztői tesztkörnyezete.
- `assets/fonts/`: helyi betűkészletek, forrás- és licencadatok.
- `tests/`: forráshűség, állapotgép, reflexiók és a böngészős működés ellenőrzése.

A történet, a döntési logika és a megjelenítés külön réteg. A későbbi képregényes megjelenítéshez a szöveges megjelenítő cserélhető; a döntési állapotgépet nem kell ezért újraírni.

## Tesztelés

A fejlesztői ellenőrzésekhez Node.js 20 vagy újabb, Python 3 és Chromium szükséges:

```sh
npm ci
npm test
npx playwright install chromium
npm run test:browser
```

A felhőkörnyezetben meglévő rendszer-Chromium használható, ha a Playwright-konfiguráció felismeri; ilyenkor a külön letöltés kihagyható.

Az állapottesztek az összes elérhető döntés-, közzététel- és korrekciókombinációt, mind az öt végkifejletet, a visszalépést, a mentést és az újrajátszást ellenőrzik. A forráshűségtesztek közvetlenül az eredeti Markdown-dokumentumokhoz mérik az átvett szövegeket. A böngészőtesztek a tényleges felületet és a feltételes jeleneteket vizsgálják mobilon és asztali nézetben.

## Helyi adatkezelés

A játék a `sessionStorage` `torott_hid_demo_v1` kulcsát használja. A mentés csak a döntési útvonalat, a jelenetet, a közzétételi megerősítéseket és a korrekció állapotát tartalmazza. Nincs regisztráció, névbekérés, analitika vagy szerveroldali válaszgyűjtés.

A munkamenet a böngészőlaphoz kötött. A böngésző saját lap-helyreállítása egy korábban bezárt munkamenetet is visszaállíthat. Tiltott vagy betelt tároló mellett a játék memóriában tovább használható; sérült mentésnél tiszta állapot indul. Újrajátszáskor csak e játék saját állapota törlődik, más alkalmazások tárolókulcsai megmaradnak.

## GitHub és GitHub Pages

A demó felülvizsgálati ága: **`demo/v0.0.2`**. A `main` beolvasztása külön ellenőrzés tárgya.

A statikus Pages-kiszolgáláshoz a repositoryban:

1. **Settings → Pages → Build and deployment**.
2. **Source: Deploy from a branch**.
3. **Branch: `demo/v0.0.2`**, mappa: **`/ (root)`**.
4. **Save**, majd várd meg a sikeres buildet és telepítést.

A `.nojekyll` jelzi a közvetlen statikus kiszolgálást; nincs szükség alkalmazásfordításra. Sikeres közzététel után az oldal címe: `https://tobiasistvant-sketch.github.io/Torott-Hid/`.

A közzétett változat a `demo/v0.0.2` ág aktuális, sikeresen telepített commitját követi. A tényleges közzétételi állapotot a GitHub **Actions → pages-build-deployment** futtatása és a Pages-beállítások jelzik. Egy helyi szerver elindítása önmagában nem jelent GitHub-közzétételt.

## Következő szerzői ellenőrzés

A [demójegyzetek szerzői kérdései](docs/demo-notes.md#szerzői-ellenőrzésre-váró-kérdések) alapján érdemes végigjátszani a történetet. Különösen a vissza nem vont nyilvános megtorlás utáni lezárás, a jóvátétel bizonytalan hatásai, az R5 útvonalfüggő összefoglalása és az új bibliai magyarázatok igényelnek tartalmi ellenőrzést. Ez a lista a működő demó továbbfejlesztését szolgálja; nem állítja, hogy a munkaváltozat már végleges tananyag.
