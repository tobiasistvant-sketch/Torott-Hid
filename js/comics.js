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
          "speaker": "Osztálytárs 1"
        },
        {
          "type": "speech",
          "text": "Lili mondta. Árontól tudja.",
          "speaker": "Osztálytárs 2"
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
    }
  },
  "consequences": {
    "1": {
      "A": {
        "id": "scene-1-A",
        "src": "design/references/01A_nyilvanos_szamonkeres_kovetkezmeny.webp",
        "width": 1199,
        "height": 1312,
        "title": "Nyilvános számonkérés",
        "alt": "Három szöveg nélküli képkockán Nóra a folyosón Áront kéri számon. A többiek odafordulnak, Áron lesüti a szemét, Nóra feszülten áll vele szemben.",
        "transcript": [
          {
            "type": "narration",
            "text": "Nóra mások előtt Áron felé fordulva számon kéri. Az osztálytársak odanéznek. Áron lesüti a szemét; Nóra arca feszült."
          }
        ],
        "transcriptSource": "approved-image",
        "layout": "illustrated-consequence",
        "sha256": "b19973fa5e095fa2f7c746917a7158520495f9ddcf1059b0c2a743360d1d3d08"
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
            "speaker": "Osztálytárs 1"
          },
          {
            "type": "speech",
            "text": "Igen, ő mondta. Árontól hallotta állítólag.",
            "speaker": "Osztálytárs 2"
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
          },
          {
            "type": "narration",
            "text": "Áron megkönnyebbült arccal nézi a telefonját, Nóra gondolatfelhőjében kusza vonalak látszanak."
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
    }
  }
};
});
