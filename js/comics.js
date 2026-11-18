/* The eleven author-approved comic files remain unmodified.
 * Transcripts follow the lettering actually present in the approved artwork;
 * source-story fallback remains separate. See docs/comic-integration.md.
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
      "sha256": "ef591c8720efe44a25b1c48a1c764e671fff86d932fb27b1d899e302978ea6ae"
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
        "s2-public",
        "s2-pause",
        "s2-facts",
        "s2-boundary"
      ],
      "afterSourceLines": [
        136
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
        "title": "„Ezt soha nem bocsátom meg neked!”",
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
    }
  }
};
});
