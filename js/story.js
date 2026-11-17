/* Source-only scene data. Dramaturgical additions live separately. */
(function (root, factory) {
  'use strict';
  const story = factory();
  if (typeof module === 'object' && module.exports) module.exports = story;
  else root.TorottHidStory = story;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  return {
  "title": "A Törött híd",
  "sourceFile": "docs/nora-pov-forgatokonyv.md",
  "scenes": [
    {
      "id": 0,
      "title": "A TITOK",
      "time": "Szombat, 17:20 · Iskola melletti pad, majd üzenetváltás",
      "source": {
        "file": "docs/nora-pov-forgatokonyv.md",
        "line": 55
      },
      "blocks": [
        {
          "type": "speech",
          "speaker": "Nóra",
          "text": "Apu most máshol lakik. Még nem tudom, ez mit jelent nekünk. Senkinek sem akarom elmondani az osztályban.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 60
          }
        },
        {
          "type": "speech",
          "speaker": "Áron",
          "text": "Sajnálom, hogy ez történik veletek. Itt vagyok, ha beszélni akarsz.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 61
          }
        },
        {
          "type": "speech",
          "speaker": "Nóra",
          "text": "Megígéred, hogy nem mondod tovább? Még Lilinek se.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 62
          }
        },
        {
          "type": "speech",
          "speaker": "Áron",
          "text": "Megígérem.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 63
          }
        },
        {
          "type": "thought",
          "speaker": "Nóra",
          "text": "Végre valakinek elmondhattam. Áronban mindig bíztam.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 64
          }
        }
      ],
      "choices": []
    },
    {
      "id": 1,
      "title": "A FOLYOSÓN",
      "time": "Hétfő, 7:42 · Az első sérelem",
      "source": {
        "file": "docs/nora-pov-forgatokonyv.md",
        "line": 69
      },
      "blocks": [
        {
          "type": "narration",
          "text": "Nóra az osztályterem ajtajához ér. Két osztálytárs halkan beszélget, a saját nevét is hallja.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 71
          }
        },
        {
          "type": "speech",
          "speaker": "Osztálytárs 1",
          "text": "Azt hallottad, hogy Nóráék szülei szétmentek?",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 72
          }
        },
        {
          "type": "speech",
          "speaker": "Osztálytárs 2",
          "text": "Lili mondta. Árontól tudja.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 73
          }
        },
        {
          "type": "thought",
          "speaker": "Nóra",
          "text": "Áron? Hiszen megígérte. Hogy mondhatta el? Egyszerre vagyok dühös, szomorú és szégyellem magam.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 74
          }
        }
      ],
      "choices": [
        {
          "id": "A",
          "label": "A folyosón, mások előtt számon kérem Áront.",
          "immediate": "Áron megdermed. Többen odafordulnak. Nóra végre kimondta a fájdalmát, de a helyzet nyilvánossá válik.",
          "later": "Később nehezebb lehet higgadtan beszélni. Ugyanakkor ettől még Áron eredeti titoksértése változatlanul az ő felelőssége.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 80,
            "immediateLine": 81,
            "laterLine": 82
          }
        },
        {
          "id": "B",
          "label": "Elmegyek a folyosóról. Most még nem tudok reagálni.",
          "immediate": "Nóra időt ad magának, mielőtt megszólalna.",
          "later": "A nyugalom lehetőségét növeli, de az elhangzott pletykára később még reagálni kellhet.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 87,
            "immediateLine": 88,
            "laterLine": 89
          }
        },
        {
          "id": "C",
          "label": "Megkérdezem az osztálytársakat, pontosan mit hallottak.",
          "immediate": "Kiderül, hogy az információ Lilitől érkezett, aki Árontól hallotta.",
          "later": "Nóra több tényt ismer, mielőtt dönt. A kérdezés nem jelenti a történtek elfogadását.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 93,
            "immediateLine": 94,
            "laterLine": 95
          }
        },
        {
          "id": "D",
          "label": "Határozottan megkérem őket, hogy ne beszéljenek erről.",
          "immediate": "Az osztálytársak elhallgatnak. Nóra kimond egy fontos személyes határt.",
          "later": "Nem biztos, hogy minden pletyka megszűnik, de Nóra megvédi a magánéletét.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 98,
            "immediateLine": 99,
            "laterLine": 100
          }
        }
      ],
      "question": "Mit teszel most?",
      "questionSource": {
        "file": "docs/nora-pov-forgatokonyv.md",
        "line": 79
      }
    },
    {
      "id": 2,
      "title": "AZ ELSŐ ÜZENET",
      "time": "Hétfő, 15:16 · Indulat vagy tudatos válasz",
      "source": {
        "file": "docs/nora-pov-forgatokonyv.md",
        "line": 103
      },
      "blocks": [
        {
          "type": "narration",
          "text": "A telefonon Áron neve villan fel.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 105
          }
        },
        {
          "type": "speech",
          "speaker": "Áron",
          "text": "Nóra, beszélhetünk? Tudom, hogy dühös vagy. Nem akartalak megbántani. Csak tanácsot kértem Lilitől.",
          "channel": "message",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 106
          }
        },
        {
          "type": "thought",
          "speaker": "Nóra",
          "text": "Tanácsot? Engedélyt nem kért tőlem. De tényleg el akarta árulni? És számít-e, hogy mit akart?",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 107
          }
        }
      ],
      "choices": [
        {
          "id": "A",
          "label": "„Most az egész osztály tudja. Ezt soha nem bocsátom meg neked!”",
          "immediate": "Nóra keményen megfogalmazza fájdalmát. Áron röviden válaszol: „Értem, hogy haragszol.”",
          "later": "A véglegesnek hangzó mondat nehezíti a későbbi közeledést, de a játék még nem zárja le a történetet.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 113,
            "immediateLine": 114,
            "laterLine": 115
          }
        },
        {
          "id": "B",
          "label": "„Nem az a kérdés, hogy mit akartál. Megígérted, hogy nem mondod el.”",
          "immediate": "Áron elsőre nem válaszol, majd: „Igazad van. Megígértem.”",
          "later": "A felelősség kimondhatóvá válik, miközben Nóra nem tagadja le a haragját.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 120,
            "immediateLine": 121,
            "laterLine": 122
          }
        },
        {
          "id": "C",
          "label": "„Most túl dühös vagyok. Holnap beszéljünk.”",
          "immediate": "Áron: „Rendben. Nem sürgetlek.”",
          "later": "Az időnyerés és a határállítás esélyt ad a megfontolt beszélgetésre.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 125,
            "immediateLine": 126,
            "laterLine": 127
          }
        },
        {
          "id": "D",
          "label": "„Jól van, felejtsük el. Nincs semmi baj.”",
          "immediate": "Áron megkönnyebbül, de Nóra úgy érzi, nem mondta ki az igazságot.",
          "later": "A látszólagos béke nem oldja fel automatikusan a sérelmet, a következő jelenetben előkerülhet.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 131,
            "immediateLine": 132,
            "laterLine": 133
          }
        }
      ],
      "question": "Mit írsz vissza Áronnak?",
      "questionSource": {
        "file": "docs/nora-pov-forgatokonyv.md",
        "line": 112
      }
    },
    {
      "id": 3,
      "title": "SZEMTŐL SZEMBEN",
      "time": "Kedd, szünet · Meghallgatás és igazság",
      "source": {
        "file": "docs/nora-pov-forgatokonyv.md",
        "line": 137
      },
      "blocks": [
        {
          "type": "narration",
          "text": "Áron az udvar szélén megállítja Nórát. Nem ér hozzá, nem állja el az útját. Nóra eldöntheti, hogy most akar-e beszélgetni.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 139
          }
        },
        {
          "type": "speech",
          "speaker": "Áron",
          "text": "Elmondanám, mi történt, ha szeretnéd. Nem akarom azt mondani, hogy semmi baj nem volt.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 140
          }
        },
        {
          "type": "thought",
          "speaker": "Nóra",
          "text": "Hallgassam meg? Vagy túl korai? Attól, hogy meghallgatom, még nem kell megbocsátanom.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 141
          }
        }
      ],
      "choices": [
        {
          "id": "A",
          "label": "„Mondd el pontosan, kinek mit mondtál.”",
          "immediate": "Áron elmondja: „Lilinek azt mondtam, hogy a szüleid különköltöznek, mert tanácstalan voltam. Megígértettem vele, hogy hallgat.”",
          "later": "Nóra már a tényekre tud reagálni. Áron nem hivatkozhat arra, hogy a továbbadás nem történt meg.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 147,
            "immediateLine": 148,
            "laterLine": 149
          }
        },
        {
          "id": "B",
          "label": "„Először azt szeretném, hogy megértsd, nekem ez mit jelentett.”",
          "immediate": "Nóra elmondja, milyen érzés volt a folyosón visszahallani a titkát. Áron végighallgatja, majd ennyit mond: „Ezt nem gondoltam végig.” Nóra még nem tudja, valóban megértette-e.",
          "later": "A kérés több az egyszerű meghallgatásnál: Nóra azt szeretné, hogy Áron felismerje tette személyes következményét. A megértés megnyithatja a felelősségvállalás útját, de nem jelent automatikus megbékélést.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 153,
            "immediateLine": 154,
            "laterLine": 155
          }
        },
        {
          "id": "C",
          "label": "„Csak mentegetőzni akarsz. Nem érdekel, amit mondasz.”",
          "immediate": "Áron hátralép: „Rendben. Ha később mégis szeretnél beszélni, itt vagyok.”",
          "later": "Nóra határt állított, de a tények tisztázása elmaradt, a játék nem bünteti a beszélgetés elutasítását.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 159,
            "immediateLine": 160,
            "laterLine": 161
          }
        },
        {
          "id": "D",
          "label": "„Ha te elmondtad a titkomat, én is elárulom a tiedet mindenkinek.”",
          "immediate": "Áron megijed és elfordul. Nóra később dönthet úgy, hogy nem teszi meg a fenyegetést.",
          "later": "A bosszú kilátásba helyezése új sérelmet teremthet, ez még nem visszafordíthatatlan történeti végpont.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 165,
            "immediateLine": 166,
            "laterLine": 167
          }
        }
      ],
      "question": "Mit válaszolsz?",
      "questionSource": {
        "file": "docs/nora-pov-forgatokonyv.md",
        "line": 146
      }
    },
    {
      "id": 4,
      "title": "A BOCSÁNATKÉRÉS",
      "time": "Csütörtök · A hibázó felelőssége",
      "source": {
        "file": "docs/nora-pov-forgatokonyv.md",
        "line": 172
      },
      "blocks": [
        {
          "type": "narration",
          "text": "Áron rövid, nem követelőző üzenetet küld.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 174
          }
        },
        {
          "type": "speech",
          "speaker": "Áron",
          "text": "Megígértem, hogy megtartom a titkodat, mégis továbbadtam. Ezt én rontottam el, nem Lili a kifogás. Sajnálom. Nem várok azonnali választ.",
          "channel": "message",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 175
          }
        },
        {
          "type": "thought",
          "speaker": "Nóra",
          "text": "Most először nevezte nevén, amit tett. Attól még nem lett könnyebb. Mit kezdhetek ezzel?",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 176
          }
        }
      ],
      "choices": [
        {
          "id": "A",
          "label": "„Köszönöm, hogy elismerted. Még mindig fáj.”",
          "immediate": "Áron: „Értem. Mit szeretnél, mit tegyek a pletykával?”",
          "later": "A felelősség elismerése és az érzelmi feldolgozás külön haladhat, a kapcsolat jövője nyitott.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 183,
            "immediateLine": 184,
            "laterLine": 185
          }
        },
        {
          "id": "B",
          "label": "„Most nem tudok megbocsátani. Kérlek, adj időt.”",
          "immediate": "Áron: „Rendben. Nem sürgetlek.”",
          "later": "A megbocsátást nem kényszeríti ki a játék. Nóra tartja a határát.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 189,
            "immediateLine": 190,
            "laterLine": 191
          }
        },
        {
          "id": "C",
          "label": "„Nem akarok bosszút állni. De nem tudom, leszünk-e újra barátok.”",
          "immediate": "Áron: „Megértem. Nem akarom eldönteni helyetted.”",
          "later": "A megbocsátás felé való elmozdulás és a bizalom bizonytalansága egyszerre jelenhet meg.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 196,
            "immediateLine": 197,
            "laterLine": 198
          }
        },
        {
          "id": "D",
          "label": "„Nem érdekel. Ne írj többet.”",
          "immediate": "Áron nem küld több személyes üzenetet.",
          "later": "A kapcsolat egyelőre lezárulhat. Nóra később saját döntéséből újranyithatja, de Áron nem sértheti meg a kért határt.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 202,
            "immediateLine": 203,
            "laterLine": 204
          }
        }
      ],
      "question": "Hogyan reagálsz?",
      "questionSource": {
        "file": "docs/nora-pov-forgatokonyv.md",
        "line": 182
      }
    },
    {
      "id": 5,
      "title": "A JÓVÁTÉTEL",
      "time": "Egy héttel később · A szavakon túl",
      "source": {
        "file": "docs/nora-pov-forgatokonyv.md",
        "line": 209
      },
      "blocks": [
        {
          "type": "narration",
          "text": "Lili egy csoportbeszélgetésben ismét Nóra családi helyzetére utal.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 211
          }
        },
        {
          "type": "thought",
          "speaker": "Nóra",
          "text": "Nem tudja visszavonni, ami történt. De talán már érti, miért volt ez fontos.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 213
          }
        }
      ],
      "choices": [
        {
          "id": "A",
          "label": "„Beszélj Lilivel, hogy álljon le. Kérlek, ne foglalkozzatok ezzel többet.”",
          "immediate": "Áron a korábbi figyelmeztetés után még egyszer, egyértelműen megkéri Lilit, hogy állítsa le a pletykát. Nem ismétli el a családi részleteket. Nóra kérésének megfelelően ezután nem kezdeményez újabb beavatkozást.",
          "later": "Nóra a pletyka megállítását kéri, ugyanakkor azt is, hogy a többiek ne foglalkozzanak tovább az ügyével. A jóvátétel nem válhat újabb, folyamatos beszédtémává. Ettől még nem garantált, hogy a pletyka teljesen megszűnik.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 219,
            "immediateLine": 220,
            "laterLine": 221
          }
        },
        {
          "id": "B",
          "label": "„Mondhatod az osztálynak azt is, hogy megszegted a bizalmamat. DE A CSALÁDOMRÓL egy szót se.”",
          "immediate": "Áron az osztálynak röviden ezt mondja: „Megszegtem egy barátom bizalmát. Hiba volt.” Nóra családi körülményeit nem említi, és nem ad új információt.",
          "later": "Nóra kifejezetten engedélyezi a felelősségvállalásnak ezt a szűk formáját, de a családjára vonatkozó tilalom változatlan. A nyilvánosság így is új figyelmet kelthet, ezért a jóvátétel eredménye nem egyértelmű.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 225,
            "immediateLine": 226,
            "laterLine": 227
          }
        },
        {
          "id": "C",
          "label": "„Nem kell a segítséged többé már.”",
          "immediate": "Ha Nóra ezt személyesen mondja ki, Áron visszafogottan válaszol: „Rendben. Nem erőltetem.” Ha Nóra korábban megtiltotta a kapcsolatfelvételt, nem küld új üzenetet; egyszerűen nem kér Árontól további segítséget, Áron pedig nem keresi.",
          "later": "A mondat túlmegy egy konkrét jóvátételi ajánlat elutasításán: a barátságban felhalmozódott csalódást is kifejezi. Áron visszahúzódik, és a három hét múlva esedékes találkozás feszültebb lehet. Ugyanakkor Nóra később önállóan módosíthatja álláspontját, a mondat nem kényszeríti automatikusan R4-re.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 231,
            "immediateLine": 232,
            "laterLine": 233
          }
        },
        {
          "id": "D",
          "label": "„Majd én is közzéteszek rólad valamit, hogy érezd, milyen.”",
          "immediate": "Nóra úgy dönt, később elégtételt vesz. Egyelőre nem közöl semmit; a játék megmutathat egy megíratlan vagy elmentett üzenettervezetet. Mielőtt bármilyen nyilvános közlés megtörténik, külön megerősítő döntést kap.",
          "later": "A „majd” még szándék, nem megtörtént bosszú. Ha Nóra később valóban közzéteszi a sértő tartalmat, új sérelmet okoz; ha visszalép, ez tudatos önszabályozás, nem a harag letagadása.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 237,
            "immediateLine": 238,
            "laterLine": 239
          }
        }
      ],
      "contactBlocks": [
        {
          "type": "speech",
          "speaker": "Áron",
          "text": "Szóltam Lilinek, hogy nem lett volna szabad továbbadni. Ha szeretnéd, nyilvánosan is vállalom, hogy tőlem indult. De nem akarok rólad beszélni az engedélyed nélkül.",
          "channel": "message",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 212
          }
        }
      ],
      "question": "Milyen jóvátételt tartasz elfogadhatónak?",
      "questionSource": {
        "file": "docs/nora-pov-forgatokonyv.md",
        "line": 218
      }
    },
    {
      "id": 6,
      "title": "HÁROM HÉTTEL KÉSŐBB",
      "time": "Három hét múlva · A kapcsolat jövője",
      "source": {
        "file": "docs/nora-pov-forgatokonyv.md",
        "line": 247
      },
      "blocks": [
        {
          "type": "narration",
          "text": "Az iskolában újra közös helyzetbe kerülnek: egy osztályprojektben egymás mellett ülnek. Nóra látja, hogy Áron nem beszél a családjáról, és tiszteletben tartja a korábban kimondott határokat.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 249
          }
        },
        {
          "type": "thought",
          "speaker": "Nóra",
          "text": "Már nem ugyanaz a kapcsolat. Talán nem is lesz az. De most rajtam múlik, mit szeretnék a következő időszakban. Az ő döntéseit nem hozhatom meg helyette.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 250
          }
        },
        {
          "type": "speech",
          "speaker": "Áron",
          "text": "Nem kell most beszélgetnünk, ha nem szeretnél. Csak a projektről szerettem volna kérdezni.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 251
          }
        }
      ],
      "choices": [
        {
          "id": "A",
          "label": "„Szeretném, ha lassan újra barátok lehetnénk. Nem egyik napról a másikra.”",
          "immediate": "Áron elfogadja a fokozatosságot; nem kér azonnali teljes bizalmat.",
          "later": "Ha korábban valódi jóvátétel és következetes határtisztelet történt, R1 (A híd újjáépül) irányába halad. Ha ezek nem egyértelműek, R2 (A híd még épül).",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 257,
            "immediateLine": 258,
            "laterLine": 259
          }
        },
        {
          "id": "B",
          "label": "„Szeretnék esélyt adni a beszélgetésnek, de most még bizonytalan vagyok.”",
          "immediate": "A következő hetekre egy korlátozott, megfontolt közeledés lehetőségét választják.",
          "later": "R2: A híd még épül. Nem kötelező a folyamatot gyorsabban lezárni.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 263,
            "immediateLine": 264,
            "laterLine": 265
          }
        },
        {
          "id": "C",
          "label": "„Nem akarok haragban maradni. Megbocsátok, de a szoros barátságot nem folytatnám.”",
          "immediate": "Áron szomorúan, de vita nélkül elfogadja Nóra döntését.",
          "later": "R3: Megbocsátás, de külön utakon. Nem kudarc, és nem automatikusan kisebb erkölcsi értékű kimenetel.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 268,
            "immediateLine": 269,
            "laterLine": 270
          }
        },
        {
          "id": "D",
          "label": "„Kérlek ne keress személyesen. Csak a szükséges iskolai ügyeket beszéljük meg.”",
          "immediate": "Áron tudomásul veszi, hogy Nóra nem szeretne személyes kapcsolatot. A továbbiakban kizárólag a szükséges iskolai ügyekben szólítja meg.",
          "later": "R4: A híd lezárva marad. A „Kérlek ne keress személyesen” határozottabb, nem csupán néhány napos időhúzás. Nóra most nem kíván személyes kapcsolatot; annak későbbi megváltoztatásáról csak ő dönthet, de nem kell örökre szóló ítéletet mondania.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 274,
            "immediateLine": 275,
            "laterLine": 276
          }
        },
        {
          "id": "E",
          "label": "„Most nyilvánosan megmutatom, hogy ő a hibás, és mindenki tudja meg, milyen ember.”",
          "immediate": "Újabb nyilvános támadás kezdődik, ami mindkét félnek új sebeket okozhat.",
          "later": "Ha a korábbi megtorlásokat is folytatta, R5: A híd tovább omlik. Ha még az elküldés előtt megáll, másik irány választható.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 280,
            "immediateLine": 281,
            "laterLine": 282
          }
        }
      ],
      "question": "Mit szeretnél most?",
      "questionSource": {
        "file": "docs/nora-pov-forgatokonyv.md",
        "line": 256
      }
    },
    {
      "id": 7,
      "title": "A HÍD ÁLLAPOTA",
      "time": "Záróképernyő · Öt külön reflexió",
      "source": {
        "file": "docs/nora-pov-forgatokonyv.md",
        "line": 286
      },
      "blocks": [
        {
          "type": "narration",
          "speaker": "Narrátor",
          "text": "Nem dönthetted el, mit tesz Áron. Azt viszont igen, hogy a haragoddal mit kezdesz, hogyan véded meg magad, és milyen jövőt tudsz elképzelni a kapcsolatnak.",
          "source": {
            "file": "docs/nora-pov-forgatokonyv.md",
            "line": 289
          }
        }
      ],
      "choices": []
    }
  ]
};
});
