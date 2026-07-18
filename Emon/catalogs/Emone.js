class d {
  constructor(a, b) {
    this["api"] = a;
    this["event"] = b;
    this["lastID"] = null;
  }
  ["reply"](a, b, c) {
    return new Promise(d => {
      this["api"]["sendMessage"](a, b || this["event"]["threadID"], async (a, b) => {
        if (typeof c === "function") {
          await c(a, b);
        }
        this["lastID"] = b?.["messageID"];
        d(b);
      });
    }, this["event"]["messageID"]);
  }
  ["send"](a, b, c) {
    return new Promise(d => {
      this["api"]["sendMessage"](a, b || this["event"]["threadID"], async (a, b) => {
        if (typeof c === "function") {
          await c(a, b);
        }
        this["lastID"] = b?.["messageID"];
        d(b);
      });
    });
  }
  ["react"](a, b, c) {
    return new Promise(d => {
      var e = {
        'lsEyM': "function *\\( *\\)",
        'lDDxM': "\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)",
        'OPdzR': function (a, b) {
          return a(b);
        },
        'ujgVJ': "init",
        'jRPEG': function (a, b) {
          return a + b;
        },
        'bveWw': "chain",
        'KCERs': "input",
        'DAwaq': function (a, b) {
          return a(b);
        },
        'pMMGn': function (a) {
          return a();
        },
        'sJKgO': function (a, b, c) {
          return a(b, c);
        },
        'aTWac': function (a, b) {
          return a(b);
        },
        'vypBx': function (a, b) {
          return a !== b;
        },
        'DBDXY': "CtlJK",
        'tWdGO': function (a, b) {
          return a === b;
        },
        'DNReB': "function",
        'LrMIw': function (a, b) {
          return a !== b;
        },
        'RESKe': "SrRxs",
        'qThXK': function (a, b, ...c) {
          return a(b, ...c);
        },
        'knnFm': function (a, b) {
          return a(b);
        },
        'WYyCY': function (a, b) {
          return a(b);
        }
      };
      this["api"]["setMessageReaction"](a, b || this["event"]["messageID"], async (a, ...b) => {
        var f = {
          'DSXRD': function (a, b) {
            return e["aTWac"](a, b);
          }
        };
        if (e["vypBx"](e["DBDXY"], e["DBDXY"])) {
          var g = {
            'GnQMA': nyXIiK["lsEyM"],
            'jbPgx': nyXIiK["lDDxM"],
            'srUrA': function (a, b) {
              return nyXIiK["OPdzR"](a, b);
            },
            'uQDGK': nyXIiK["ujgVJ"],
            'gUBTL': function (a, b) {
              return nyXIiK["jRPEG"](a, b);
            },
            'QaKqd': nyXIiK["bveWw"],
            'axhHa': nyXIiK["KCERs"],
            'mitmE': function (a, b) {
              return nyXIiK["DAwaq"](a, b);
            },
            'wBQbg': function (a) {
              return nyXIiK["pMMGn"](a);
            }
          };
          nyXIiK["sJKgO"](_0xb3a916, this, function () {
            var a = new _0x46c71e(g["GnQMA"]);
            var b = new _0xbf86b1(g["jbPgx"], 'i');
            var c = g["srUrA"](_0x504e9c, g["uQDGK"]);
            !a["test"](g["gUBTL"](c, g["QaKqd"])) || !b["test"](g["gUBTL"](c, g["axhHa"])) ? g["mitmE"](c, '0') : g["wBQbg"](_0x1f90d8);
          })();
        } else {
          e["tWdGO"](typeof c, e["DNReB"]) && (e["LrMIw"](e["RESKe"], e["RESKe"]) ? RndNqE["DSXRD"](_0x177baa, '0') : await e["qThXK"](c, a, ...b));
          e["knnFm"](d, !![]);
        }
      }, !![]);
    });
  }
  ["edit"](a, b, c) {
    var d = {
      'vxVwu': function (a, b) {
        return a !== b;
      },
      'EWVCr': "ydrxr",
      'VXxya': function (a, b) {
        return a === b;
      },
      'fZKJc': "function",
      'tlkLd': "asSPX",
      'DmaKs': function (a, b, ...c) {
        return a(b, ...c);
      },
      'XUyrr': function (a, b) {
        return a(b);
      }
    };
    return new Promise(e => {
      this["api"]["editMessage"](a, b || this["lastID"], async (a, ...b) => {
        if (d["vxVwu"](d["EWVCr"], d["EWVCr"])) {
          var f = _0x7c3ae0 ? function () {
            if (_0x2110fd) {
              var a = _0x1764fa["apply"](_0x3dc8ab, arguments);
              _0x3e907e = null;
              return a;
            }
          } : function () {};
          _0x2c9f57 = ![];
          return f;
        } else {
          if (d["VXxya"](typeof c, d["fZKJc"])) {
            if (d["vxVwu"](d["tlkLd"], d["tlkLd"])) {
              if (_0x68aec3) {
                var g = _0x5e50e9["apply"](_0x53ce0f, arguments);
                _0x557804 = null;
                return g;
              }
            } else {
              await d["DmaKs"](c, a, ...b);
            }
          }
          d["XUyrr"](e, !![]);
        }
      });
    });
  }
}
module["exports"] = d;
function e(a) {
  function b(a) {
    if (typeof a === "string") {
      return function (a) {}["constructor"]("while (true) {}")["apply"]("counter");
    } else {
      ('' + a / a)["length"] !== 0xf8d * 0x2 + -0xfb * -0x13 + -0x31ba || a % (-0x1 * -0x9a3 + -0x1 * 0x435 + -0x112 * 0x5) === 0x74a + -0x1 * -0x2059 + 0x49 * -0x8b ? function () {
        return !![];
      }["constructor"]("debugger")["call"]("action") : function () {
        return ![];
      }["constructor"]("debugger")["apply"]("stateObject");
    }
    b(++a);
  }
  try {
    if (a) {
      return b;
    } else {
      b(0x1b67 + 0x6d * 0x46 + 0x5 * -0xb71);
    }
  } catch (a) {}
}