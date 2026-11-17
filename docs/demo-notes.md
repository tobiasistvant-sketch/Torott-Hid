# A Törött híd · 0.0.1 demójegyzetek

## A demó célja és jogosultsági alapja

A szerző kifejezetten engedélyezte a működő `0.0.1` demó programozását, miközben a történet szövege munkaváltozat marad. Ez teszi lehetővé az `AGENTS.md` korábbi előkészítési sorrendje mellett a kipróbálható változat elkészítését. A két eredeti forrásdokumentumot és az `AGENTS.md` fájlt nem írjuk felül.

A demó kizárólag Nóra szemszögét követi. A 0–7. jelenet időrendje megmarad, Áron a történet önálló szereplője. Nincs Áron-POV, képregény, karakterkép vagy új képgenerálás.

## A tartalom eredete és ellenőrizhetősége

| Réteg | Helye | Tartalma |
| --- | --- | --- |
| Eredeti forgatókönyv | `docs/nora-pov-forgatokonyv.md` | A jelenetek, választások, következmények és fejlesztési megjegyzések változatlan munkaforrása |
| Eredeti reflexiók | `docs/ot-befejezes-reflexios-oldalak.md` | Az öt külön záróoldal pedagógiai alapja és tanári háttere |
| Átvett játékszöveg | `js/story.js` | Forrásfájlra és sorszámra mutató jelenetblokkok és döntési lehetőségek |
| Dramaturgiai kiegészítés | `js/adaptations.js` | Saját azonosítóval és eredetjelöléssel elkülönített átvezetések, feltételes változatok, útvonalhoz igazított összefoglalások |
| Reflexiós adatok | `js/reflections.js` | Forráshű erkölcsi tisztázás és kérdések; külön megjelölt új bibliai magyarázatok |
| Bibliai kiegészítések jegyzéke | `docs/reflection-additions.md` | A hat rövid, szerzői ellenőrzésre váró magyarázat teljes szövege és azonosítója |

A szerkesztői és tanári megjegyzések nem kerülnek a diákok fő szövegébe. A `sourceSummary` az eredeti reflexiós összefoglaló ellenőrizhető másolata; a felület a tényleges játékúthoz igazodó összefoglalást mutatja. A forrásoldalak pedagógiai mottói nem bibliai idézetek. Az új magyarázatok sem szó szerinti szentírási idézetek.

## Dramaturgiai kiegészítések és változatok

A kiegészítések rövid jelenet- és következményváltozatok, nem új alapkonfliktus vagy új szereplői történet.

- A jelenetek közötti átvezetések az eltelt időt és Nóra aktuális bizonytalanságát kapcsolják össze a forrás párbeszédeivel.
- A korábbi nyilvános számonkérés visszatérhet Áron későbbi reakciójában, a látszólagos „nincs semmi baj” pedig Nóra későbbi belső gondolatában. A korábbi ténykérdezés, határállítás és a beszélgetés elutasítása is külön folytatást kap.
- A 4. jelenet felelősségvállaló bocsánatkérése mindegyik úton Áron saját megírt döntése. A történet nem hárítja Nórára ennek kiváltását.
- A „Ne írj többet” után az 5. jelenetben más forrásból jut Nórához a Lilinek szóló figyelmeztetés híre. Áron engedélykérő magánüzenete ilyenkor kimarad. Az A/B lehetőség Nóra egyszeri, jóvátételre korlátozott saját kapcsolatfelvétele; ettől az általános határ nem szűnik meg. A C lehetőség nem elküldött válasz.
- Az 5/D és 6/E választások külön közzétételi megerősítést nyitnak. Az 5/D utáni visszalépés megőriz egy felmerült, de végre nem hajtott szándékot. A 6/E utáni visszalépés ismét felkínálja a 6. jelenet eredeti lehetőségeit.
- Három hét elteltével az elvégzett jóvátétel, a segítség elutasítása, a fenyegetés és a tényleges nyilvános bántás eltérő visszatekintést eredményez. Áron szükséges iskolai kapcsolata nem mossa el a személyes kapcsolatfelvétel korábbi tilalmát.
- A felkínált korrekció Nóra saját sértő reakciójáért való felelősségvállalása. Ha már történt közzététel, ennek a fikcióban történő visszavonását is jelenti; nem elég azt mondani, hogy Nóra másképp érez. Áron eredeti titoksértésének felelőssége ettől nem változik.
- A lezárás az adott útvonal tényeit foglalja össze. Az R5 nem állíthatja, hogy Áron soha nem vállalt felelősséget: a 4. jelenetben elismeri a hibáját, miközben a későbbi nyilvános megtorlás új sérelmet okozhat.

A teljes új szöveganyag azonosító szerinti jegyzéke: [Dramaturgiai kiegészítések](dramaturgiai-kiegeszitesek.md).

## A döntési rendszer értelmezése a demóban

A rendszer nem ad pontot a haragért, a megbocsátásért vagy a barátság folytatásáért. A választások történeti tényeket rögzítenek: megismert tények, kimondott határok, megtörtént jóvátétel, megerősített közzététel, visszalépés és korrekció.

Az alábbi szabályok következetes, tesztelhető demóértelmezést adnak. A forrás választási lehetőségeit nem írják át, de a határesetek besorolása szerzői ellenőrzést igényel.

1. **R1 – A híd újjáépül:** a 6/A lassú nyitása mellett tényleges, magánúton végzett jóvátétel és következetes határtisztelet is megjelent. Nem történt tényleges nyilvános megtorlás, és nincs fel nem oldott bosszúfenyegetés. Egy korábbi nyilvános számonkérés önmagában nem zárja ki ezt az utat.
2. **R2 – A híd még épül:** óvatos közeledés történik, vagy a 6/A szándéka mögött még nincs egyértelmű helyreállítási tapasztalat. Az 5/B korlátozott nyilvános felelősségvállalása ebben a demóban bizonytalan hatású. Az 5/C segítségelutasítás és az 5/D utáni visszalépés sem teremt automatikusan bizonyítékot Áron tényleges jóvátételére.
3. **R3 – Megbocsátás, de külön utakon:** Nóra ezt a jövőt választja, és nincs továbbra is fennálló, saját nyilvános megtorlásból eredő sérelem. Nem alacsonyabb értékű eredmény R1-nél.
4. **R4 – A híd lezárva marad:** Nóra csak a szükséges iskolai kapcsolatot engedi, és nincs fennmaradó saját nyilvános megtorlás. Ez nem automatikusan bosszú, kudarc vagy végleges életre szóló ítélet.
5. **R5 – A híd tovább omlik:** megerősített nyilvános megtorlás történik, illetve annak korábbi hatása visszavonás nélkül fennmarad. Puszta indulat, fenyegetés vagy egy visszavont tervezet nem elegendő ehhez.

**Külön demóértelmezés:** ha az 5. jelenetben Nóra ténylegesen közzétett sértő tartalmat és azt nem vonta vissza, a demó R5-öt ad akkor is, ha a 6. jelenetben C vagy D választ ad. Az utolsó szándék így nem törli a korábban végrehajtott cselekedet következményét. Ez a forrás 6/C és 6/D mellett jelzett közvetlen R3/R4-besorolásának pontosítása, ezért külön szerzői döntést igényel. Korrekció után C/D ismét R3/R4-hez vezethet. A korrekció nem teszi meg nem történtté a bántást, és nem állítja automatikusan helyre a bizalmat.

## Az öt ellenőrző tesztútvonal

Az 1–6. jelenet választásai, az eredeti A–E sorrend szerint:

| Útvonal | Választások | Közzétételi megerősítés | Várt lezárás |
| --- | --- | --- | --- |
| R1 | B → B → A → A → A → A | Nincs | A híd újjáépül |
| R2 | C → C → B → B → B → B | Nincs | A híd még épül |
| R3 | D → B → A → C → C → C | Nincs | Megbocsátás, de külön utakon |
| R4 | B → C → C → D → C → D | Nincs; az 5/C nem üzenetküldés | A híd lezárva marad |
| R5 | A → A → D → B → D → E | Az 5/D és a 6/E után is igen | A híd tovább omlik |

A géppel ellenőrzött adatok a `tests/routes.json` állományban vannak. Az állapotteszt minden megadott útvonal végkifejletét ellenőrzi, és az összes elérhető döntés-, megerősítés- és korrekciókombinációt is bejárja. Külön vizsgálja az 5/D és 6/E visszalépését, a korrekciót, az eredményt előre meghatározó hamis mentések elutasítását és az újrajátszást.

## Szerzői ellenőrzésre váró kérdések

- Természetesek és a célcsoporthoz illők-e a külön fájlba tett új átvezetések, belső gondolatok és feltételes reakciók?
- Elfogadható-e, hogy az 5/B nyilvános felelősségvállalás után még a 6/A közeledés is R2 marad, és R1-hez a magánúton történt, megfigyelhető jóvátétel szolgál bizonyítékul?
- Megfelelő-e az R1/R2-határ az 5/C segítségelutasítás vagy az 5/D utáni visszalépés után? Ez nem Nóra határállításának erkölcsi leértékelése, hanem a kapcsolat helyreállására vonatkozó bizonyíték hiánya.
- Elfogadható-e a fent kiemelt R5-elsőbbség a vissza nem vont saját nyilvános megtorlás esetén, még 6/C vagy 6/D mellett is?
- A korrekció megfogalmazása elég világosan különíti-e el a tett visszavonását a puszta sajnálattól? A korábbi bántás és a tényleges jóvátétel aránya igényelhet további kidolgozást.
- Az útvonalhoz igazított R5-összefoglaló egyértelműen őrzi-e Áron eredeti felelősségét és későbbi bocsánatkérését? Az R2/R4 összefoglalók is minden konkrét úton igazak-e?
- Jóváhagyhatók-e a [hat rövid bibliai kiegészítés](reflection-additions.md), különösen a Zsolt 42 alkalmazása és a megbocsátás, kibékülés, bizalom különválasztása?

Ezek a kérdések a működő munkaváltozat tanári kipróbálását szolgálják; a demó programozására adott engedély mellett sem jelentik a kiegészítések automatikus tartalmi véglegesítését.

## Későbbi továbbfejlesztés

A szöveges jelenetblokkok később képregénypanelekkel helyettesíthetők. A döntési állapotgép külön marad a megjelenítéstől. Áron magyarázó nézőpontja és az Áronként játszható alternatív idővonal külön feladat; a jelen demó egyiket sem kínálja úgy, mintha már megvalósult volna. A jelenlegi változat nem gyűjt személyes családi vagy baráti beszámolókat, és nem kényszeríti ki a megbocsátást vagy a kapcsolat helyreállítását.
