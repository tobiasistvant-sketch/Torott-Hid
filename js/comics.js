/* The twenty-one author-approved comic files remain unmodified.
 * Transcripts follow the approved artwork; source-story fallback stays separate.
 * See docs/comic-integration.md and the cumulative 0.0.4 specifications.
 */
(function (root, factory) {
  'use strict';
  const comics = factory();
  if (typeof module === 'object' && module.exports) module.exports = comics;
  else root.TorottHidComics = comics;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  return {
  "scenes": {
    "0": {
      "id": "scene-0",
      "src": "design/references/00_jelenet_a_titok_kozosen.webp",
      "width": 1178,
      "height": 1335,
      "title": "A titok",
      "alt": "Öt képkockán Nóra az iskola melletti padon elmondja Áronnak a családi titkát. Áron együttérez vele, majd titoktartást ígér.",
      "transcript": [
        {
          "type": "speech",
          "text": "Apu most máshol lakik. Még nem tudom, ez mit jelent nekünk. Senkinek sem akarom elmondani az osztályban.",
          "speaker": "Nóra"
        },
        {
          "type": "speech",
          "text": "Sajnálom, hogy ez történik veletek. Itt vagyok, ha beszélni akarsz.",
          "speaker": "Áron"
        },
        {
          "type": "speech",
          "text": "Megígéred, hogy nem mondod tovább? Még Lilinek se.",
          "speaker": "Nóra"
        },
        {
          "type": "speech",
          "text": "Megígérem.",
          "speaker": "Áron"
        },
        {
          "type": "thought",
          "text": "Végre valakinek elmondhattam. Áronban mindig bízom.",
          "speaker": "Nóra"
        }
      ],
      "transcriptSource": "approved-image",
      "layout": "replace-scene",
      "sha256": "7279ca8f8928b177e576e6179fb5b7e50aa2c3faa85f268ab9d012dadc77fc4c"
    },
    "1": {
      "id": "scene-1",
      "src": "design/references/01_jelenet_a_folyoson_kozosen.webp",
      "width": 1199,
      "height": 1312,
      "title": "A folyosón",
      "alt": "Nóra a folyosón meghallja két osztálytársa beszélgetését: a családi titkát Lilitől, ő pedig Árontól tudta meg. Nóra dühösen és szomorúan gondolkodik.",
      "transcript": [
        {
          "type": "narration",
          "text": "Nóra a folyosón meghallja két osztálytársa beszélgetését."
        },
        {
          "type": "speech",
          "text": "Azt hallottad, hogy Nóráék szülei szétmentek?",
          "speaker": "Lara"
        },
        {
          "type": "speech",
          "text": "Lili mondta. Árontól tudja.",
          "speaker": "Niki"
        },
        {
          "type": "thought",
          "text": "Áron? Hiszen megígérte. Hogy mondhatta el? Egyszerre vagyok dühös, szomorú és szégyellem magam.",
          "speaker": "Nóra"
        }
      ],
      "transcriptSource": "approved-image",
      "layout": "replace-scene",
      "sha256": "ef591c8720efe44a25b1c48a1c764e671fff86d932fb27b1d899e302978ea6ae",
      "beforeBlockIds": [
        "v004-j02-intro"
      ]
    },
    "2": {
      "id": "scene-2",
      "src": "design/references/02_jelenet_aron_elso_uzenete_kozosen.webp",
      "width": 1122,
      "height": 1402,
      "title": "Áron első üzenete",
      "alt": "Három képkockán Nóra új telefonos értesítést kap Árontól, elolvassa a beszélgetést kérő üzenetét, majd a szándékán és az engedély nélkül továbbadott titkon gondolkodik.",
      "transcript": [
        {
          "type": "narration",
          "text": "Nóra telefonjára új üzenet érkezik Árontól."
        },
        {
          "type": "speech",
          "text": "Nóra, beszélhetünk? Tudom, hogy dühös vagy. Nem akartalak megbántani. Csak tanácsot kértem Lilitől.",
          "speaker": "Áron"
        },
        {
          "type": "thought",
          "text": "Tanácsot? Engedélyt nem kért tőlem. De tényleg el akarta árulni? És számít-e, hogy mit akart?",
          "speaker": "Nóra"
        }
      ],
      "transcriptSource": "approved-image",
      "layout": "ad3",
      "sha256": "24a48d4b9bfedee94193e584c7965a697297615b4737504cdbb8154364b8bf6c",
      "beforeBlockIds": [
        "v004-j03-intro",
        "s2-pause",
        "s2-facts",
        "s2-boundary"
      ]
    },
    "3": {
      "id": "scene-3",
      "src": "design/references/03_jelenet_kozosen_nyito_kepregeny.webp",
      "width": 1448,
      "height": 1086,
      "title": "Szemtől szemben",
      "alt": "Az iskolaudvaron Áron felajánlja, hogy elmondja, mi történt. Nóra azon gondolkodik, készen áll-e meghallgatni, és tudja, hogy a meghallgatás még nem jelent megbocsátást.",
      "transcript": [
        {
          "type": "speech",
          "text": "Elmondanám, mi történt, ha szeretnéd. Nem akarom azt mondani, hogy semmi baj nem volt.",
          "speaker": "Áron"
        },
        {
          "type": "thought",
          "text": "Hallgassam meg? Vagy túl korai? Attól, hogy meghallgatom, még nem kell megbocsátanom.",
          "speaker": "Nóra"
        }
      ],
      "transcriptSource": "approved-image",
      "layout": "replace-scene",
      "sha256": "9f4087f48ec47349301ea76cd4d2c645ca980e09238eb3a7836857bc72b04954",
      "beforeBlockIds": [
        "v004-j06-A",
        "v004-j06-B",
        "v004-j06-C",
        "v004-j06-D",
        "v004-j07-intro"
      ]
    },
    "4": {
      "id": "scene-4",
      "src": "design/references/04_kozos_bocsanatkeres.webp",
      "width": 1448,
      "height": 1086,
      "title": "A bocsánatkérés",
      "alt": "Négy képkockán Nóra csütörtök délután megkapja Áron bocsánatkérő üzenetét. Áron elismeri ígéretszegését és nem vár azonnali választ; Nóra fájdalma még megmarad.",
      "transcript": [
        {
          "type": "narration",
          "text": "Csütörtök délután Nóra telefonja rezeg. Áron írt neki. Ezúttal nem akarja megmagyarázni, miért mondta el a titkát."
        },
        {
          "type": "speech",
          "text": "Nóra, sokat gondolkodtam azon, ami történt. Megígértem, hogy nem mondom el senkinek, mégis megtettem. Nem Lili hibája, hogy megbíztam benne a titkoddal. Én szegtem meg az ígéretemet. Sajnálom, hogy megbántottalak. Nem várom, hogy most válaszolj, és azt sem, hogy azonnal megbocsáss.",
          "speaker": "Áron",
          "channel": "message"
        },
        {
          "type": "thought",
          "text": "Most először nem próbálja megmagyarázni, miért tette. Egyszerűen kimondta, hogy hibázott. Ezt vártam tőle. Akkor miért érzem még mindig ugyanazt a fájdalmat?",
          "speaker": "Nóra"
        }
      ],
      "transcriptSource": "approved-image",
      "layout": "replace-scene",
      "sha256": "397249616a285e2f011136ebc7d23e13dee864cfa52ca51ac3a78d4f3fff36ad",
      "beforeBlockIds": [
        "v004-j10-A",
        "v004-j10-B",
        "v004-j10-C",
        "v004-j10-D"
      ]
    },
    "5": {
      "id": "scene-5",
      "src": "design/references/05_kozos_ABC_aron_uzenete.webp",
      "width": 1122,
      "height": 1402,
      "title": "A jóvátétel lehetősége",
      "alt": "Nóra a telefonján Áron üzenetét olvassa: beszélt Lilivel, és Nóra engedélyével nyilvánosan is vállalná a felelősségét. Nóra még csak azon gondolkodik, mit válaszoljon.",
      "transcript": [
        {
          "type": "speech",
          "speaker": "Áron",
          "text": "Szóltam Lilinek, hogy nem lett volna szabad továbbadni. Ha szeretnéd, nyilvánosan is vállalom, hogy tőlem indult. De nem akarok rólad beszélni az engedélyed nélkül.",
          "channel": "message"
        },
        {
          "type": "thought",
          "speaker": "Nóra",
          "text": "Mit írjak vissza?"
        }
      ],
      "transcriptSource": "approved-image",
      "layout": "replace-scene",
      "sha256": "b6048f7c585f7de9bba518c6e6e4e262dbc3d60353255e7f6a1e90b97ab80682",
      "sourceManifest": "docs/manifest_J5_J6_HID_0.0.4.json",
      "approval": "accepted_in_conversation",
      "beforeBlockIds": [
        "v1-j13-A",
        "v1-j13-B",
        "v1-j13-C",
        "v1-j13-D"
      ]
    },
    "6": {
      "id": "scene-6",
      "src": "design/references/06_kozos_osztalyterem.webp",
      "width": 1671,
      "height": 941,
      "title": "Közös osztályprojekt",
      "alt": "Színesceruzával rajzolt osztályterem: Nóra és Áron egymás mellett ülnek a nyitott füzeteknél, de másfelé néznek. A háttérben tanár és diákok láthatók. A képen nincs felirat.",
      "transcript": [
        {
          "type": "narration",
          "text": "Osztályterem, tanár, diákok; Nóra és Áron egymás mellett ül, de másfelé néznek."
        }
      ],
      "transcriptSource": "approved-image",
      "layout": "replace-scene",
      "sha256": "39665344cc5784a21d88c42f4563a04cccf872fa008bfb6439f6a087f4c1b70b",
      "sourceManifest": "docs/manifest_J5_J6_HID_0.0.4.json",
      "approval": "accepted_in_conversation",
      "beforeBlockIds": [
        "v1-j17-narr-A",
        "v1-j17-narr-B",
        "v1-j17-narr-C",
        "v1-j17-narr-D",
        "v1-j17-thought-A",
        "v1-j17-thought-B",
        "v1-j17-thought-C",
        "v1-j17-thought-D"
      ],
      "textless": true
    }
  },
  "consequences": {
    "1": {
      "A": {
        "id": "scene-1-A",
        "src": "design/references/Iskolai folyosói titokdráma.png",
        "width": 1122,
        "height": 1402,
        "title": "Nyilvános számonkérés",
        "alt": "Három képkockán Nóra a folyosón Áront kéri számon: Hogy tehetted ezt? Megígérted, hogy nem mondod el senkinek! A többiek odafordulnak, Áron lesüti a szemét.",
        "transcript": [
          {
            "type": "narration",
            "text": "Nóra mások előtt Áron felé fordulva számon kéri. Az osztálytársak odanéznek. Áron lesüti a szemét; Nóra arca feszült."
          },
          {
            "type": "speech",
            "speaker": "Nóra",
            "text": "Hogy tehetted ezt? Megígérted, hogy nem mondod el senkinek!"
          }
        ],
        "transcriptSource": "approved-image",
        "layout": "illustrated-consequence",
        "sha256": "a81534979741400545585e437161552ad520e31fc7530c4c7f9a5f5c17bb0f62"
      },
      "B": {
        "id": "scene-1-B",
        "src": "design/references/01B_elvonulas_kovetkezmeny.webp",
        "width": 1199,
        "height": 1312,
        "title": "Elvonulás",
        "alt": "Három szöveg nélküli képkockán Nóra elmegy Áron és az osztálytársak mellett, majd egy padon ülve összekulcsolja a kezét és gondterhelten néz maga elé.",
        "transcript": [
          {
            "type": "narration",
            "text": "Nóra elfordul és elmegy Áron mellett. Egy padra ül, összekulcsolja a kezét, majd gondterhelten néz maga elé."
          }
        ],
        "transcriptSource": "approved-image",
        "layout": "illustrated-consequence",
        "sha256": "9201604eefd57f5ae8ecb4d974972b516ebb1193b2f7e7387c61e28ef6004ad7"
      },
      "C": {
        "id": "scene-1-C",
        "src": "design/references/01C_osztalytarsak_kikerdezese_kovetkezmeny.webp",
        "width": 1199,
        "height": 1312,
        "title": "Az osztálytársak kikérdezése",
        "alt": "Nóra megkérdezi a két osztálytársát, mit hallottak. Elmondják, hogy Lilitől tudják a hírt, aki állítólag Árontól hallotta. Nóra gondterhelt marad.",
        "transcript": [
          {
            "type": "speech",
            "text": "Megkérdezem tőletek, pontosan mit hallottatok?",
            "speaker": "Nóra"
          },
          {
            "type": "speech",
            "text": "Lilitől hallottam, hogy a szüleid szétmentek.",
            "speaker": "Lara"
          },
          {
            "type": "speech",
            "text": "Igen, ő mondta. Árontól hallotta állítólag.",
            "speaker": "Niki"
          }
        ],
        "transcriptSource": "approved-image",
        "layout": "replace-consequence",
        "sha256": "3ecc0aa9f72058ab0de75dd806eecd4e568a8a390258ad72e2fde5a2bb570ccb"
      },
      "D": {
        "id": "scene-1-D",
        "src": "design/references/01D_pletyka_leallitasa_kovetkezmeny.webp",
        "width": 1199,
        "height": 1312,
        "title": "A pletyka leállítása",
        "alt": "Nóra felemelt kézzel megállítja a pletykát. A két osztálytárs elhallgat; Nóra könnyes, dühös arccal védi meg családja és saját magánéletének határát.",
        "transcript": [
          {
            "type": "speech",
            "text": "Kérlek, ne beszéljetek többet erről! Ez nem pletyka téma.",
            "speaker": "Nóra"
          },
          {
            "type": "narration",
            "text": "Az osztálytársak elhallgatnak."
          },
          {
            "type": "speech",
            "text": "Ez az én családom és az én magánéletem. Azt, hogy mikor és mit osztok meg, én döntöm el!",
            "speaker": "Nóra"
          }
        ],
        "transcriptSource": "approved-image",
        "layout": "replace-consequence",
        "sha256": "e32e0a4b072c7e7e3a01afaa0ee5a7d131e1d694a20695f9cf523f3882d7d53c"
      }
    },
    "2": {
      "A": {
        "id": "scene-2-A",
        "src": "design/references/02A_soha_nem_bocsatom_meg_kovetkezmeny.webp",
        "width": 1536,
        "height": 1024,
        "title": "A válasz következménye",
        "alt": "Nóra indulatosan megírja, majd elküldi Áronnak, hogy soha nem bocsát meg. Áron azt válaszolja, érti, hogy haragszik.",
        "transcript": [
          {
            "type": "narration",
            "text": "Nóra keményen megfogalmazza fájdalmát."
          },
          {
            "type": "speech",
            "text": "Most az egész osztály tudja. Ezt soha nem bocsátom meg neked!",
            "speaker": "Nóra"
          },
          {
            "type": "speech",
            "text": "Értem, hogy haragszol.",
            "speaker": "Áron"
          }
        ],
        "transcriptSource": "approved-image",
        "layout": "replace-consequence",
        "sha256": "9e7174aca709bde96a05d332f6c95207ecf5a71a576a07cfe4804630f11f1919"
      },
      "B": {
        "id": "scene-2-B",
        "src": "design/references/02B_igeret_szamonkerese_kovetkezmeny.webp",
        "width": 1122,
        "height": 1402,
        "title": "Az ígéret számonkérése",
        "alt": "Nóra telefonos üzenetben emlékezteti Áront a titoktartási ígéretére. Áron elismeri, hogy valóban megígérte. A felső felirat Nóra fájdalmának megfogalmazását nevezi meg.",
        "transcript": [
          {
            "type": "narration",
            "text": "Nóra keményen megfogalmazza fájdalmát."
          },
          {
            "type": "speech",
            "text": "Nem az a kérdés, hogy mit akartál. Megígérted, hogy nem mondod el.",
            "speaker": "Nóra"
          },
          {
            "type": "speech",
            "text": "Igazad van. Megígértem.",
            "speaker": "Áron"
          }
        ],
        "transcriptSource": "approved-image",
        "layout": "replace-consequence",
        "sha256": "52140e7b0678eba2ced8e0c537c59847ebf776ff9b499a8dc87f02488068f2a9"
      },
      "C": {
        "id": "scene-2-C",
        "src": "design/references/02C_idot_ker_kovetkezmeny.webp",
        "width": 1122,
        "height": 1402,
        "title": "Időt kér",
        "alt": "Nóra megírja Áronnak, hogy most túl dühös és holnap beszéljenek. Áron elfogadja, hogy időre van szüksége. A felső felirat az elfogadott közös narrációt tartalmazza.",
        "transcript": [
          {
            "type": "narration",
            "text": "Nóra keményen megfogalmazza fájdalmát."
          },
          {
            "type": "speech",
            "text": "Most túl dühös vagyok. Holnap beszéljünk.",
            "speaker": "Nóra"
          },
          {
            "type": "speech",
            "text": "Rendben. Nem sürgetlek.",
            "speaker": "Áron"
          }
        ],
        "transcriptSource": "approved-image",
        "layout": "replace-consequence",
        "sha256": "7769ced928a8268b31d4a1604115257a37d695853de27581e29033fb6e0226cc"
      },
      "D": {
        "id": "scene-2-D",
        "src": "design/references/02D_felejtsuk_el_kovetkezmeny.webp",
        "width": 1536,
        "height": 1024,
        "title": "„Jól van, felejtsük el.”",
        "alt": "Nóra azt írja, hogy nincs semmi baj. Áron megkönnyebbül, de Nóra gondterhelt marad. A kép Áron „Rendben. Nem sürgetlek.” válaszát mutatja.",
        "transcript": [
          {
            "type": "narration",
            "text": "Áron megkönnyebbül, de Nóra úgy érzi, nem mondta ki az igazságot."
          },
          {
            "type": "speech",
            "text": "Jól van, felejtsük el. Nincs semmi baj.",
            "speaker": "Nóra"
          },
          {
            "type": "speech",
            "text": "Rendben. Nem sürgetlek.",
            "speaker": "Áron"
          }
        ],
        "transcriptSource": "approved-image",
        "layout": "replace-consequence",
        "sha256": "db26b8a5369273c4d07fc75bae41b8d26ed5846219a593f96bfff24577e6ff7d"
      }
    },
    "3": {
      "A": {
        "id": "scene-3-A",
        "src": "design/references/03A_szembesites_kovetkezmeny.webp",
        "width": 1536,
        "height": 1024,
        "title": "Számonkérés",
        "alt": "Négy képkockán Áron elmondja, hogy Lilitől kért tanácsot. Nóra számon kéri a titoktartási ígéretét, majd elindul az iskolaépület felé. Áron nem állítja meg.",
        "transcript": [
          {
            "type": "speech",
            "text": "Elmondtam neki, hogy a szüleid különköltöznek. Nem tudtam, hogyan segítsek neked, ezért tanácsot kértem tőle. Megígérte, hogy nem adja tovább.",
            "speaker": "Áron"
          },
          {
            "type": "speech",
            "text": "De nekem meg te ígérted meg, hogy senkinek nem mondod el. Még Lilinek sem!",
            "speaker": "Nóra"
          },
          {
            "type": "speech",
            "text": "Tudom... Azt hittem, Lili tud segíteni.",
            "speaker": "Áron"
          },
          {
            "type": "speech",
            "text": "És engem miért nem kérdeztél meg? Nem az volt a dolgod, hogy megoldd a problémámat. Csak annyit kértem, hogy őrizd meg a titkomat!",
            "speaker": "Nóra"
          },
          {
            "type": "narration",
            "text": "Nóra elfordul, és elindul az iskolaépület felé. Áron utána néz, de nem próbálja megállítani."
          }
        ],
        "transcriptSource": "approved-image",
        "layout": "replace-consequence",
        "sha256": "39f660836cd71bff6787aebffdfda8f5a3544838d6b12de5b09cc0fe157e2b93"
      },
      "B": {
        "id": "scene-3-B",
        "src": "design/references/03B_meghallgatas_kovetkezmeny.webp",
        "width": 1536,
        "height": 1024,
        "title": "Meghallgatás",
        "alt": "Nóra elmondja Áronnak, hogyan fájt neki a titok kiszivárgása. Áron végighallgatja, majd csendben ülnek egymás mellett. Nóra még bizonytalan abban, mennyit értett meg.",
        "transcript": [
          {
            "type": "speech",
            "text": "Először azt szeretném, hogy megértsd, nekem ez mit jelentett.",
            "speaker": "Nóra"
          },
          {
            "type": "speech",
            "text": "Rendben. Hallgatlak.",
            "speaker": "Áron"
          },
          {
            "type": "speech",
            "text": "Amikor a folyosón meghallottam, hogy rólam beszélnek, először azt hittem, rosszul hallok. Aztán kimondták a nevedet. Tudod, milyen érzés volt rájönni, hogy pont attól tudják, akiben a legjobban bíztam?",
            "speaker": "Nóra"
          },
          {
            "type": "speech",
            "text": "Nem... Ezt nem gondoltam végig.",
            "speaker": "Áron"
          },
          {
            "type": "speech",
            "text": "Én nem azért mondtam el neked, hogy segíts megoldani. Csak kellett valaki, akinek elmondhatom, és aki nem adja tovább.",
            "speaker": "Nóra"
          },
          {
            "type": "narration",
            "text": "Áron lehajtja a fejét. Egy pillanatig egyikük sem szólal meg."
          },
          {
            "type": "thought",
            "text": "Most legalább végighallgatott. De vajon tényleg megértette, mit tett, vagy csak nem tudja, mit mondjon?",
            "speaker": "Nóra"
          },
          {
            "type": "narration",
            "text": "Áron nem próbálja megtörni a csendet. Nóra még nem tudja, mit gondoljon a beszélgetésről."
          }
        ],
        "transcriptSource": "approved-image",
        "layout": "replace-consequence",
        "sha256": "afeac385712cdf63fcdc30e3d46cd20f0f7312055ccc9ab7ed595a6af2cad947"
      },
      "C": {
        "id": "scene-3-C",
        "src": "design/references/03C_beszelgetes_elutasitasa_kovetkezmeny.webp",
        "width": 1536,
        "height": 1024,
        "title": "Beszélgetés elutasítása",
        "alt": "Nóra közli, hogy most nem akar beszélgetni. Áron elismeri, hogy a magyarázat nem változtatja meg a történteket, és nem követi Nórát az iskolaépület felé.",
        "transcript": [
          {
            "type": "speech",
            "text": "Csak mentegetőzni akarsz. Nem érdekel, amit mondasz.",
            "speaker": "Nóra"
          },
          {
            "type": "speech",
            "text": "Nem mentegetőzni akarok. Csak szeretném, ha tudnád, mi történt.",
            "speaker": "Áron"
          },
          {
            "type": "speech",
            "text": "Tudom, mi történt! Elmondtad Lilinek azt, amit rád bíztam. Most mit mondhatnál, amitől ez megváltozna?",
            "speaker": "Nóra"
          },
          {
            "type": "narration",
            "text": "Áron egy pillanatig hallgat, majd hátralép."
          },
          {
            "type": "speech",
            "text": "Igazad van. Attól, hogy elmagyarázom, még nem változik meg. Rendben. Ha később mégis szeretnél beszélni, itt vagyok.",
            "speaker": "Áron"
          },
          {
            "type": "speech",
            "text": "Most nem akarok.",
            "speaker": "Nóra"
          },
          {
            "type": "narration",
            "text": "Nóra elindul az iskolaépület felé. Áron nem követi, és nem szól utána."
          }
        ],
        "transcriptSource": "approved-image",
        "layout": "replace-consequence",
        "sha256": "734e5ebabceed5e6729eaf6d9753d45f948d980969ca0f1727fa6b5c080d50c8"
      },
      "D": {
        "id": "scene-3-D",
        "src": "design/references/03D_fenyegetes_kovetkezmeny.webp",
        "width": 1536,
        "height": 1024,
        "title": "Fenyegetés",
        "alt": "Nóra azzal fenyegeti Áront, hogy elárulja a titkát. Áron megijed, majd elfordul és elindul. A képen fenyegetés történik, nem a titok tényleges nyilvánosságra hozása.",
        "transcript": [
          {
            "type": "speech",
            "text": "Ha te elmondtad a titkomat, én is elárulom a tiedet mindenkinek!",
            "speaker": "Nóra"
          },
          {
            "type": "narration",
            "text": "Nóra dühösen Áron szemébe néz."
          },
          {
            "type": "speech",
            "text": "Nóra… Ezt most komolyan mondod?",
            "speaker": "Áron"
          },
          {
            "type": "narration",
            "text": "Áron arcáról eltűnik minden remény. Láthatóan megijed."
          },
          {
            "type": "speech",
            "text": "Most már tudod, milyen érzés attól félni, hogy mások megtudják a titkodat!",
            "speaker": "Nóra"
          },
          {
            "type": "narration",
            "text": "Áron hátralép, elfordul, és szó nélkül elindul. Nóra ott marad az iskolaudvaron."
          }
        ],
        "transcriptSource": "approved-image",
        "layout": "replace-consequence",
        "sha256": "6875ea504821ff58c2b473772a44f17c708548a3cfc3b4037a332359333ad50d"
      }
    },
    "4": {
      "A": {
        "id": "scene-4-A",
        "src": "design/references/04A_fajdalom_es_felelosseg.webp",
        "width": 1122,
        "height": 1402,
        "title": "Fájdalom és felelősség",
        "alt": "Nóra megköszöni Áron felelősségvállalását. A pletyka helyrehozásának megtervezését Áronra hagyja, aki vállalja, hogy átgondolja, mit tehet. Nóra ezután félreteszi a telefonját.",
        "transcript": [
          {
            "type": "speech",
            "text": "Köszönöm, hogy elismerted. Még mindig fáj.",
            "speaker": "Nóra",
            "channel": "message"
          },
          {
            "type": "speech",
            "text": "Értem. Mit szeretnél, mit tegyek a pletykával?",
            "speaker": "Áron",
            "channel": "message"
          },
          {
            "type": "speech",
            "text": "Nem tudom, Áron. Nem nekem kellene kitalálnom, hogyan hozd helyre.",
            "speaker": "Nóra",
            "channel": "message"
          },
          {
            "type": "speech",
            "text": "Igazad van. Átgondolom, mit tehetek.",
            "speaker": "Áron",
            "channel": "message"
          },
          {
            "type": "narration",
            "text": "Nóra leteszi a telefont. Egyelőre nem ír többet."
          }
        ],
        "transcriptSource": "approved-image",
        "layout": "replace-consequence",
        "sha256": "5b30844c7483d8e9cb42d81061bee98a08cb31ec41efc127d1b3d5e525cbddec"
      },
      "B": {
        "id": "scene-4-B",
        "src": "design/references/04B_idokeres.webp",
        "width": 1536,
        "height": 1024,
        "title": "Időkérés",
        "alt": "Nóra felhúzott térdekkel ül az ágyon és időt kér a megbocsátáshoz. Áron azt válaszolja, hogy nem sürgeti. Nóra félreteszi a telefonját, és az ablak felé néz.",
        "transcript": [
          {
            "type": "speech",
            "text": "Most nem tudok megbocsátani. Kérlek, adj időt.",
            "speaker": "Nóra",
            "channel": "message"
          },
          {
            "type": "speech",
            "text": "Rendben. Nem sürgetlek.",
            "speaker": "Áron",
            "channel": "message"
          },
          {
            "type": "narration",
            "text": "Nóra felhúzott térdekkel ül az ágyon. A telefonját végül félreteszi, az ablak felé néz."
          }
        ],
        "transcriptSource": "approved-image",
        "layout": "replace-consequence",
        "sha256": "81a60afef0f8c33a87ed93801bbf5b103e160d644519b4b3ba10f418ad895d3f"
      },
      "C": {
        "id": "scene-4-C",
        "src": "design/references/04C_bosszu_es_baratsag.webp",
        "width": 1536,
        "height": 1024,
        "title": "Bosszú és barátság",
        "alt": "Nóra azt írja, hogy nem akar bosszút állni, de bizonytalan a barátság jövőjében. Áron nem dönt helyette; Nóra morcos, dacos arccal karba teszi a kezét, és nem ír többet.",
        "transcript": [
          {
            "type": "speech",
            "text": "Nem akarok bosszút állni. De nem tudom, leszünk-e újra barátok.",
            "speaker": "Nóra",
            "channel": "message"
          },
          {
            "type": "speech",
            "text": "Megértem. Nem akarom eldönteni helyetted.",
            "speaker": "Áron",
            "channel": "message"
          },
          {
            "type": "narration",
            "text": "Nóra elolvassa Áron válaszát. Morcos, dacos arccal karba teszi a kezét. Nem ír többet."
          }
        ],
        "transcriptSource": "approved-image",
        "layout": "replace-consequence",
        "sha256": "1e624cee960085ab6848d9974e70b695d72c812819cf928abebb4cb75445aad2"
      },
      "D": {
        "id": "scene-4-D",
        "src": "design/references/04D_ne_irj_tobbet_JOVAHAGYOTT.webp",
        "width": 1536,
        "height": 1024,
        "title": "Ne írj többet",
        "alt": "Nóra lila tokos telefonjáról megtiltja a személyes üzeneteket. Áron sötét tokos készülékén Nóra neve és profilképe látszik. Elolvassa az üzenetet, de nem válaszol; Nóra telefonja csendben marad.",
        "transcript": [
          {
            "type": "speech",
            "text": "Nem érdekel. Ne írj többet.",
            "speaker": "Nóra",
            "channel": "message"
          },
          {
            "type": "narration",
            "text": "Áron nem küld több személyes üzenetet Nórának."
          }
        ],
        "transcriptSource": "approved-image",
        "layout": "replace-consequence",
        "sha256": "b160f90643347b6aaa95879d41f01c43bd086bb7dcea8bd83b56e13b569b0e0d"
      }
    },
    "5": {
      "A": {
        "id": "scene-5-A",
        "src": "design/references/05A_lilivel_beszel.webp",
        "width": 1122,
        "height": 1402,
        "title": "Beszélgetés Lilivel",
        "alt": "Nóra üzenetben kéri Áront, hogy beszéljen Lilivel. Áron személyesen megkéri a lányt, hogy ne beszéljen Nóra családjáról, majd beszámol Nórának a válaszáról. Nóra félreteszi a telefonját.",
        "transcript": [
          {
            "type": "speech",
            "speaker": "Nóra",
            "text": "Beszélj Lilivel, hogy álljon le. Kérlek, ne foglalkozzatok ezzel többet.",
            "channel": "message",
            "initiatesContact": true
          },
          {
            "type": "speech",
            "speaker": "Áron",
            "text": "Lili, már beszéltünk erről, de még mindig terjed a pletyka. Kérlek, ne beszélj többet Nóra családjáról."
          },
          {
            "type": "speech",
            "speaker": "Lili",
            "text": "Jó, rendben. Nem hozom fel többet."
          },
          {
            "type": "speech",
            "speaker": "Áron",
            "text": "Beszéltem vele. Megígérte, hogy nem folytatja.",
            "channel": "message",
            "initiatedBy": "Nóra",
            "replyToNora": true
          },
          {
            "type": "narration",
            "text": "Nóra elolvassa az üzenetet, félreteszi a telefonját, és nem válaszol. A pletyka megszűnése nem garantált."
          }
        ],
        "transcriptSource": "approved-image",
        "layout": "replace-consequence",
        "sha256": "379f11d98a4bf9cc7259f3cae2f28e84637be501013e4f997b2260e793f188e7",
        "sourceManifest": "docs/manifest_J5_J6_HID_0.0.4.json",
        "approval": "accepted_in_conversation"
      },
      "B": {
        "id": "scene-5-B",
        "src": "design/references/05B_osztaly_elott_felelosseg.webp",
        "width": 1122,
        "height": 1402,
        "title": "Nyilvános felelősségvállalás",
        "alt": "Nóra engedélyt ad Áronnak a felelősség nyilvános vállalására, családi részletek nélkül. Áron az osztály előtt beszél, de a kérdezősködésre nem árul el többet; Nóra csendben figyel.",
        "transcript": [
          {
            "type": "speech",
            "speaker": "Nóra",
            "text": "Mondhatod az osztálynak azt is, hogy megszegted a bizalmamat. DE A CSALÁDOMRÓL egy szót se.",
            "channel": "message",
            "initiatesContact": true
          },
          {
            "type": "speech",
            "speaker": "Áron",
            "text": "Figyeljetek, szeretnék mondani valamit. Nóra megbízott bennem, én meg továbbadtam olyasmit, amit nem kellett volna. Nagyon elrontottam.",
            "channel": "classroom"
          },
          {
            "type": "speech",
            "speaker": "Osztálytárs",
            "text": "De akkor mi történt pontosan?",
            "channel": "classroom"
          },
          {
            "type": "speech",
            "speaker": "Áron",
            "text": "Nem fogom elmondani. Pont ez volt a baj, hogy először sem kellett volna beszélnem róla.",
            "channel": "classroom"
          },
          {
            "type": "narration",
            "text": "Nóra figyeli Áront, néhány diák összesúg. Nóra nem szólal meg."
          }
        ],
        "transcriptSource": "approved-image",
        "layout": "replace-consequence",
        "sha256": "8462226dce5719332bf31950c54283a267b0973beb6d6b9ed2d4770fb9a73008",
        "sourceManifest": "docs/manifest_J5_J6_HID_0.0.4.json",
        "approval": "accepted_in_conversation"
      },
      "C": {
        "id": "scene-5-C",
        "src": "design/references/05C_segites_elutasitasa.webp",
        "width": 1122,
        "height": 1402,
        "title": "A segítség elutasítása",
        "alt": "Nóra kezdeményez üzenetet: közli, hogy nem kéri Áron segítségét. Áron erre válaszol, hogy nem erőlteti. Másnap a folyosón elhaladnak egymás mellett, beszélgetés nélkül.",
        "transcript": [
          {
            "type": "speech",
            "speaker": "Nóra",
            "text": "Nem kell a segítséged többé már.",
            "channel": "message",
            "initiatesContact": true
          },
          {
            "type": "speech",
            "speaker": "Áron",
            "text": "Rendben. Nem erőltetem.",
            "channel": "message",
            "initiatedBy": "Nóra",
            "replyToNora": true
          },
          {
            "type": "narration",
            "text": "Másnap az iskolai folyosón Áron és Nóra elhaladnak egymás mellett, nem kezdeményeznek beszélgetést."
          }
        ],
        "transcriptSource": "approved-image",
        "layout": "replace-consequence",
        "sha256": "332c040d1730110d0787042bbbed7d354bf794371f9bfabc67b8c9f8784b939a",
        "sourceManifest": "docs/manifest_J5_J6_HID_0.0.4.json",
        "approval": "accepted_in_conversation"
      },
      "D": {
        "id": "scene-5-D",
        "src": "design/references/05D_bosszu_kozzetetel.webp",
        "width": 1122,
        "height": 1402,
        "title": "A közzétett üzenet",
        "alt": "Nóra elküldi Áron bizalmas információját az osztálycsoportba. Az üzenet megjelenik, a többiek reagálnak, és Áron elolvassa. Később Nóra és Áron elkerülik egymást.",
        "transcript": [
          {
            "type": "narration",
            "text": "Nóra az osztály közös csoportjában nyilvánosságra hozza Áron titkát. Nóra és Áron később elkerülik egymást."
          },
          {
            "type": "thought",
            "speaker": "Nóra",
            "text": "Majd én is közzéteszek rólad valamit, hogy érezd, milyen."
          },
          {
            "type": "speech",
            "speaker": "Nóra",
            "text": "Tudjátok, Áron valójában egy ideje pszichológushoz jár. Én tudom, mert bízott bennem, de már nem érdekel.",
            "channel": "class-group"
          },
          {
            "type": "speech",
            "speaker": "Osztálytárs",
            "text": "Ez komoly?!",
            "channel": "class-group"
          },
          {
            "type": "speech",
            "speaker": "Osztálytárs",
            "text": "Nem is gondoltam!",
            "channel": "class-group"
          },
          {
            "type": "speech",
            "speaker": "Osztálytárs",
            "text": "Azta...",
            "channel": "class-group"
          },
          {
            "type": "speech",
            "speaker": "Osztálytárs",
            "text": "Hogy lehetett ilyen bizalmas?",
            "channel": "class-group"
          }
        ],
        "transcriptSource": "approved-image",
        "layout": "replace-consequence",
        "sha256": "9163f87ed6463280bab944c5f8238b7a4abf38222f8df32ef5389d5afd269503",
        "sourceManifest": "docs/manifest_J5_J6_HID_0.0.4.json",
        "approval": "accepted_in_conversation",
        "event": "publication"
      }
    },
    "6": {
      "A": {
        "id": "scene-6-A",
        "src": "design/references/06A_ujrakezdes.webp",
        "width": 1199,
        "height": 1312,
        "title": "Lassú újrakezdés",
        "alt": "Nóra lassú újrakezdésről beszél Áronnak az osztályteremben. Áron elfogadja, hogy ehhez idő kell. Óvatos mosollyal egymás felé fordulnak, majd visszatérnek a projektfüzethez.",
        "transcript": [
          {
            "type": "speech",
            "speaker": "Nóra",
            "text": "Szeretném, ha lassan újra barátok lehetnénk. Nem egyik napról a másikra.",
            "channel": "classroom"
          },
          {
            "type": "speech",
            "speaker": "Áron",
            "text": "Én is szeretném. De tudom, hogy időbe telik.",
            "channel": "classroom"
          },
          {
            "type": "narration",
            "text": "Egymás felé fordulnak, óvatos mosoly; visszatérnek a közös projektfüzethez."
          }
        ],
        "transcriptSource": "approved-image",
        "layout": "replace-consequence",
        "sha256": "d09f289ee6c6dd425788d4ec4ea9c269f093355966f25d7839b18fab734570ec",
        "sourceManifest": "docs/manifest_J5_J6_HID_0.0.4.json",
        "approval": "accepted_in_conversation"
      },
      "B": {
        "id": "scene-6-B",
        "src": "design/references/06B_bizonytalan_kozeledes.webp",
        "width": 1536,
        "height": 1024,
        "title": "Bizonytalan közeledés",
        "alt": "Nóra elmondja, hogy esélyt adna a beszélgetésnek, de bizonytalan. Áron nem sürgeti a döntést. Rövid szemkontaktus után közösen dolgoznak, a feszültség még érződik.",
        "transcript": [
          {
            "type": "speech",
            "speaker": "Nóra",
            "text": "Szeretnék esélyt adni a beszélgetésnek, de most még bizonytalan vagyok.",
            "channel": "classroom"
          },
          {
            "type": "speech",
            "speaker": "Áron",
            "text": "Rendben. Nem kell most eldöntenünk mindent.",
            "channel": "classroom"
          },
          {
            "type": "narration",
            "text": "Rövid szemkontaktus, majd közös munka. A feszültség még érződik."
          }
        ],
        "transcriptSource": "approved-image",
        "layout": "replace-consequence",
        "sha256": "2ea5e3de304fa4ecb71ab2c67b453331fa408506ab7fb83d69a46c0fa4521d59",
        "sourceManifest": "docs/manifest_J5_J6_HID_0.0.4.json",
        "approval": "accepted_in_conversation"
      },
      "C": {
        "id": "scene-6-C",
        "src": "design/references/06C_megbocsatas_kulon_utak.webp",
        "width": 1245,
        "height": 1263,
        "title": "Megbocsátás, külön utakon",
        "alt": "Nóra kimondja, hogy megbocsát, de a korábbi barátságot nem folytatná ugyanúgy. Áron elfogadja a döntését. Egymásra néznek, majd külön folytatják a munkát.",
        "transcript": [
          {
            "type": "speech",
            "speaker": "Nóra",
            "text": "Nem akarok tovább haragudni rád. Megbocsátok, de nem hiszem, hogy ezek után ugyanolyan barátok tudnánk lenni, mint régen.",
            "channel": "classroom"
          },
          {
            "type": "speech",
            "speaker": "Áron",
            "text": "Sajnálom, hogy így alakult. De megértem.",
            "channel": "classroom"
          },
          {
            "type": "narration",
            "text": "Egymásra néznek, majd külön folytatják a munkát."
          }
        ],
        "transcriptSource": "approved-image",
        "layout": "replace-consequence",
        "sha256": "9ba40a19bf175c4127301196bb6c58646a212b9853204ae580135acba36cb0a1",
        "sourceManifest": "docs/manifest_J5_J6_HID_0.0.4.json",
        "approval": "accepted_in_conversation"
      },
      "D": {
        "id": "scene-6-D",
        "src": "design/references/06D_szemelyes_kapcsolat_lezarasa.webp",
        "width": 1239,
        "height": 1270,
        "title": "A személyes kapcsolat lezárása",
        "alt": "Nóra csak a szükséges iskolai ügyekre korlátozza a kapcsolatot. Áron elfogadja ezt, és visszafordul a füzetéhez. Nóra is a közös feladatra figyel.",
        "transcript": [
          {
            "type": "speech",
            "speaker": "Nóra",
            "text": "Kérlek, ne keress személyesen. Csak a szükséges iskolai ügyeket beszéljük meg.",
            "channel": "classroom"
          },
          {
            "type": "speech",
            "speaker": "Áron",
            "text": "Rendben. Akkor maradjunk a projektnél.",
            "channel": "classroom"
          },
          {
            "type": "narration",
            "text": "Áron visszafordul a füzetéhez, Nóra is a feladatára figyel."
          }
        ],
        "transcriptSource": "approved-image",
        "layout": "replace-consequence",
        "sha256": "d548c882eb4e78fc781e6f3691e413f1deb4c0ea4d628f179c48162dd91802c7",
        "sourceManifest": "docs/manifest_J5_J6_HID_0.0.4.json",
        "approval": "accepted_in_conversation"
      },
      "E": {
        "id": "scene-6-E",
        "src": "design/references/06E_nyilvanos_szembesites.webp",
        "width": 1246,
        "height": 1263,
        "title": "Nyilvános szembesítés",
        "alt": "Nóra az osztály előtt számon kéri Áront. Áron azt kérdezi, miért most, mindenki előtt beszélik meg ezt. Bezárja a füzetét és elfordul, a tanár és az osztály figyel. Új titok nem kerül nyilvánosságra.",
        "transcript": [
          {
            "type": "speech",
            "speaker": "Nóra",
            "text": "Te komolyan azt hiszed, hogy ezek után minden mehet tovább, mintha semmi sem történt volna?",
            "channel": "classroom"
          },
          {
            "type": "speech",
            "speaker": "Áron",
            "text": "Nem. De ezt most miért az egész osztály előtt kell megbeszélnünk?",
            "channel": "classroom"
          },
          {
            "type": "speech",
            "speaker": "Nóra",
            "text": "Amikor az én titkomat elmondtad, akkor sem zavart, hogy mások is megtudják!",
            "channel": "classroom"
          },
          {
            "type": "narration",
            "text": "Áron becsukja a füzetét, elfordul. Az osztály figyel, a tanár észreveszi a konfliktust."
          }
        ],
        "transcriptSource": "approved-image",
        "layout": "replace-consequence",
        "sha256": "8ddee0e9a529aaba8f52766a399a4dddcd0cb1f7c6411de59151fe8f0a75e65f",
        "sourceManifest": "docs/manifest_J5_J6_HID_0.0.4.json",
        "approval": "accepted_in_conversation",
        "event": "public-confrontation"
      }
    }
  },
  "sceneVariants": {
    "5": {
      "noContact": {
        "id": "scene-5-no-contact",
        "src": "design/references/05_kulon_D_kozvetett_hir.webp",
        "width": 1122,
        "height": 1402,
        "title": "Közvetett hír",
        "alt": "Nóra egy osztálytárs üzenetéből értesül arról, hogy Áron beszélt Lilivel. Árontól nem kap személyes üzenetet. Az üres chatmezőt nézve mérlegeli, hogy ő írjon-e neki.",
        "transcript": [
          {
            "type": "speech",
            "speaker": "Osztálytárs",
            "text": "Lili már nem beszél rólad. Áron szólt neki.",
            "channel": "message"
          },
          {
            "type": "narration",
            "text": "Árontól nem érkezik új személyes üzenet. Egy osztálytársadtól tudod meg, hogy megkérte Lilit: ne beszéljen tovább rólad."
          },
          {
            "type": "thought",
            "speaker": "Nóra",
            "text": "Írjak neki én?"
          }
        ],
        "transcriptSource": "approved-image",
        "layout": "replace-scene",
        "sha256": "194b22ef1fe9732040d6d82857e9f7ca96b48a682bc7ed85c29f227c704f5695",
        "sourceManifest": "docs/manifest_J5_J6_HID_0.0.4.json",
        "approval": "accepted_in_conversation",
        "beforeBlockIds": [
          "v1-j13-A",
          "v1-j13-B",
          "v1-j13-C",
          "v1-j13-D"
        ]
      }
    }
  },
  "bridges": {
    "H0": {
      "id": "bridge-H0",
      "src": "design/references/H0_fokepernyo_ep_hid.webp",
      "width": 1536,
      "height": 1024,
      "title": "A Törött híd",
      "alt": "Őszi tájban ép fahíd ível át a patakon. Nóra a bal, Áron a jobb parton áll, hátizsákkal, egymás felé fordulva.",
      "transcript": [],
      "transcriptSource": "image-description",
      "layout": "bridge",
      "sha256": "3786fd61b301908b8a0b7bab37ea108c429452881f8aeb879af3c7c26303b9fb",
      "sourceManifest": "docs/manifest_J5_J6_HID_0.0.4.json",
      "approval": "awaiting_individual_approval",
      "kind": "bridge"
    },
    "R1": {
      "id": "bridge-R1",
      "src": "design/references/R1_a_hid_ujjaepul.webp",
      "width": 1536,
      "height": 1024,
      "title": "A híd újjáépül",
      "alt": "Az ép fahídon Nóra és Áron egymás felé lépnek, óvatos mosollyal. A háttérben őszi lomb és patak látható.",
      "transcript": [],
      "transcriptSource": "image-description",
      "layout": "bridge",
      "sha256": "262fc9ff1854cd4a3421aacce084619c0cb2f67f5c6f3504fb64543931ab79ba",
      "sourceManifest": "docs/manifest_J5_J6_HID_0.0.4.json",
      "approval": "awaiting_individual_approval",
      "kind": "bridge"
    },
    "R2": {
      "id": "bridge-R2",
      "src": "design/references/R2_a_hid_meg_epul.webp",
      "width": 1536,
      "height": 1024,
      "title": "A híd még épül",
      "alt": "Hiányos deszkájú, javítás alatt álló fahíd két végén Nóra és Áron egymás felé nézve állnak. A bal parton szerszámosláda és deszkák hevernek.",
      "transcript": [],
      "transcriptSource": "image-description",
      "layout": "bridge",
      "sha256": "5c4375a6aecfd3f8ae51e5db552686ca7b7a7affb44f1f706b22e273a10b1000",
      "sourceManifest": "docs/manifest_J5_J6_HID_0.0.4.json",
      "approval": "awaiting_individual_approval",
      "kind": "bridge"
    },
    "R3": {
      "id": "bridge-R3",
      "src": "design/references/R3_megbocsatas_kulon_utakon.webp",
      "width": 1536,
      "height": 1024,
      "title": "Megbocsátás, de külön utakon",
      "alt": "Ép, járható fahíd két végén Nóra és Áron egymástól elfordulva, külön irányba sétálnak az őszi tájban.",
      "transcript": [],
      "transcriptSource": "image-description",
      "layout": "bridge",
      "sha256": "02b39feb48e1bbad0d17aac8281ce0b6af38e1515d656753a217bf0a4e661322",
      "sourceManifest": "docs/manifest_J5_J6_HID_0.0.4.json",
      "approval": "awaiting_individual_approval",
      "kind": "bridge"
    },
    "R4": {
      "id": "bridge-R4",
      "src": "design/references/R4_lezart_hid.webp",
      "width": 1536,
      "height": 1024,
      "title": "A híd lezárva marad",
      "alt": "Az álló fahíd közepét lakattal lezárt kapu zárja el. Nóra összefont karral a bal parton áll, Áron a jobb parton elfordul tőle.",
      "transcript": [],
      "transcriptSource": "image-description",
      "layout": "bridge",
      "sha256": "ddb229aa24fe41e8c246eb11ce51d6d4da96ad9c05441e2b5525839335f430d8",
      "sourceManifest": "docs/manifest_J5_J6_HID_0.0.4.json",
      "approval": "awaiting_individual_approval",
      "kind": "bridge"
    },
    "R5": {
      "id": "bridge-R5",
      "src": "design/references/R5_osszeomlott_hid.webp",
      "width": 1536,
      "height": 1024,
      "title": "A híd összeomlik",
      "alt": "Az összeomlott fahíd törött deszkái a patak fölé roskadnak. Nóra és Áron külön parton, egymástól távolodva sétálnak.",
      "transcript": [],
      "transcriptSource": "image-description",
      "layout": "bridge",
      "sha256": "f7435f4513111db941e23e0c8ecfa0ee413486ebe085afb7fcc57ad8b5c48d1b",
      "sourceManifest": "docs/manifest_J5_J6_HID_0.0.4.json",
      "approval": "awaiting_individual_approval",
      "kind": "bridge"
    }
  }
};
});
