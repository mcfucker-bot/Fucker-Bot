const {
  readdirSync: a,
  readFileSync: b,
  writeFileSync: c
} = require("fs-extra");
const {
  join: d,
  resolve: e
} = require("path");
const {
  execSync: f
} = require("child_process");
const g = require("axios");
const h = require("../../Emon.json");
const i = require("chalk");
const j = JSON.parse(b("../../package.json")).dependencies;
const k = JSON.parse(b("../../package.json"));
const l = require("fs");
const m = require("stfca");
const n = require("moment-timezone");
const o = require("./Emonc.js");
const p = require("gradient-string");
const q = require("process");
const r = require("module").builtinModules;
global.client = new Object({
  commands: new Map(),
  events: new Map(),
  cooldowns: new Map(),
  eventRegistered: new Array(),
  handleSchedule: new Array(),
  handleReaction: new Array(),
  handleReply: new Array(),
  mainPath: q.cwd(),
  configPath: new String(),
  apiEmonPath: new String(),
  EmonPath: new String(),
  getTime: function (a) {
    switch (a) {
      case "seconds":
        return "" + n.tz("Asia/Dhaka").format("ss");
      case "minutes":
        return "" + n.tz("Asia/Dhaka").format("mm");
      case "hours":
        return "" + n.tz("Asia/Dhaka").format("hh");
      case "date":
        return "" + n.tz("Asia/Dhaka").format("DD");
      case "month":
        return "" + n.tz("Asia/Dhaka").format("MM");
      case "year":
        return "" + n.tz("Asia/Dhaka").format("YYYY");
      case "fullHour":
        return "" + n.tz("Asia/Dhaka").format("HH:mm:ss");
      case "fullYear":
        return "" + n.tz("Asia/Dhaka").format("DD/MM/YYYY");
      case "fullTime":
        return "" + n.tz("Asia/Dhaka").format("hh:mm:ss DD/MM/YYYY");
    }
  },
  timeStart: Date.now()
});
global.data = new Object({
  threadInfo: new Map(),
  threadData: new Map(),
  userName: new Map(),
  userBanned: new Map(),
  threadBanned: new Map(),
  commandBanned: new Map(),
  threadAllowNSFW: new Array(),
  allUserID: new Array(),
  allCurrenciesID: new Array(),
  allThreadID: new Array()
});
global.utils = require("./Emond.js");
global.loading = require("./Emonc.js");
global.nodemodule = new Object();
global.config = new Object();
global.Emon = new Object();
global.apiEmon = new Object();
global.configModule = new Object();
global.moduleData = new Array();
global.EmonData = new Array();
global.language = new Object();
global.account = new Object();
const s = p.fruit;
const t = p("yellow", "lime", "green");
const u = p("#3446eb", "#3455eb", "#3474eb");
const v = "#3467eb";
const w = [];
if (w.length > 0) {
  console.log("commands with errors : ");
  w.forEach(({
    command: a,
    error: b
  }) => {
    console.log(a + ": " + b);
  });
}
var x;
try {
  global.client.apiEmonPath = d(global.client.mainPath, "../configs/api.json");
  x = require(global.client.apiEmonPath);
} catch (a) {
  return;
}
try {
  for (const a in x) {
    global.apiEmon[a] = x[a];
  }
} catch (a) {
  return;
}
var y;
try {
  global.client.EmonPath = d(global.client.mainPath, "../configs/Emon.json");
  y = require(global.client.EmonPath);
} catch (a) {
  return;
}
try {
  for (const a in y) {
    global.Emon[a] = y[a];
  }
} catch (a) {
  return;
}
var z;
try {
  global.client.configPath = d(global.client.mainPath, "../../Emon.json");
  z = require(global.client.configPath);
  o.loader("deploying " + i.blueBright("Emon") + " file");
} catch (a) {
  return o.loader("cant read " + i.blueBright("Emon") + " file", "error");
}
try {
  for (const a in z) {
    global.config[a] = z[a];
  }
  o.loader("deployed " + i.blueBright("Emon") + " file");
} catch (a) {
  return o.loader("can't deploy " + i.blueBright("Emon") + " file", "error");
}
const {
  Sequelize: A,
  sequelize: B
} = require("../system/database/index.js");
for (const a in j) {
  try {
    global.nodemodule[a] = require(a);
  } catch (a) {}
}
const C = b(__dirname + "/languages/" + (global.config.language || "en") + ".lang", {
  encoding: "utf-8"
}).split(/\r?\n|\r/);
const D = C.filter(a => a.indexOf("#") != 0 && a != "");
for (const a of D) {
  const b = a.indexOf("=");
  const c = a.slice(0, b);
  const d = a.slice(b + 1, a.length);
  const e = c.slice(0, c.indexOf("."));
  const f = c.replace(e + ".", "");
  const g = d.replace(/\\n/gi, "\n");
  if (typeof global.language[e] == "undefined") {
    global.language[e] = new Object();
  }
  global.language[e][f] = g;
}
global.getText = function (...a) {
  const b = global.language;
  if (!b.hasOwnProperty(a[0])) {
    throw new Error(__filename + " - not found key language : " + a[0]);
  }
  var c = b[a[0]][a[1]];
  if (typeof c === "undefined") {
    throw new Error(__filename + " - not found key text : " + a[1]);
  }
  for (var d = a.length - 1; d > 0; d--) {
    const b = RegExp("%" + d, "g");
    c = c.replace(b, a[d + 1]);
  }
  return c;
};
async function E() {
  try {
    const a = await g.get("https://raw.githubusercontent.com/sharifvau/Emon-Server/refs/heads/main/update.json");
    const b = a.data;
    const latestVer = (b.updates && b.updates.latest_version) || b.version || "N/A";
    if (k.version === latestVer) {
      console.log(i.blue("version -") + " You Use EMon-BHai-Bot Update Version " + i.blueBright(latestVer));
    } else {
      console.clear();
      const bName   = (b.bot && b.bot.name)                        || b.name           || "EMon-BHai-Bot";
      const bDesc   = (b.bot && b.bot.description)                 || b.description    || "N/A";
      const bNewCmd = (b.updates && b.updates.new_command)         || b["new command"] || "N/A";
      const bUpdate = (b.updates && b.updates.update_status)       || b.update         || "N/A";
      const bOwner  = (b.bot && b.bot.owner)                       || b.owner          || "N/A";
      const bFork   = (b.bot && b.bot.links && b.bot.links.github) || b.main           || "N/A";
      console.log(i.red("╔═╗╔╦╗╔═╗╔╗╔  ╔╗ ╔═╗╔╦╗\n║╣ ║║║║ ║║║║  ╠╩╗║ ║ ║ \n╚═╝╩ ╩╚═╝╝╚╝  ╚═╝╚═╝ ╩  "));
      console.log(i.red("⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n     VERSION MISMATCH — BOT STOPPED\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n"));
      o("Your version : " + k.version + "  |  Latest : " + latestVer, "[ VERSION ]");
      o(bName,   "[ NAME ]");
      o(bDesc,   "[ DESCRIPTION ]");
      o(bNewCmd, "[ NEW COMMAND ]");
      o(bUpdate, "[ UPDATE STATUS ]");
      console.log();
      o(bOwner,  "[ Contact Owner ]");
      o(bFork,   "[ Update Here ]");
      console.log();
      q.exit(0);
    }
  } catch (a) {
    console.error("EMon-BHai-BOT IS ON");
  }
}
async function loadGithubAdmins() {
  try {
    const res = await g.get("https://raw.githubusercontent.com/sharifvau/Emon-Server/refs/heads/main/Admins.json");
    const adminArr = res.data;
    if (!Array.isArray(adminArr)) return;
    const existing = global.config.ADMINBOT || [];
    let added = 0;
    for (const obj of adminArr) {
      const uid = String(Object.values(obj)[0] || "").trim();
      if (uid && uid !== "id" && !isNaN(uid) && !existing.includes(uid)) {
        existing.push(uid);
        added++;
      }
    }
    global.config.ADMINBOT = existing;
    if (added > 0) console.log(i.blue("github admin -") + " loaded " + i.blueBright(added) + " global admin(s) from GitHub");
    else console.log(i.blue("github admin -") + " global admins synced from GitHub");
  } catch (e) {
    console.log(i.yellow("github admin -") + " could not fetch GitHub admins (offline/error)");
  }
}
async function loadGithubGban() {
  try {
    const res = await g.get("https://raw.githubusercontent.com/sharifvau/Emon-Server/refs/heads/main/Gban.json");
    const data = res.data;
    const bannedList = data.banned || [];
    const banMsg = data.message || "You are globally banned from using this bot.";
    let added = 0;
    for (const uid of bannedList) {
      const id = String(uid).trim();
      if (id && !isNaN(id) && !global.data.userBanned.has(id)) {
        global.data.userBanned.set(id, {
          reason: banMsg,
          date: "GitHub Global Ban",
          bannedByName: "System"
        });
        added++;
      }
    }
    if (added > 0) console.log(i.blue("github gban -") + " loaded " + i.blueBright(added) + " globally banned user(s) from GitHub");
    else console.log(i.blue("github gban -") + " GitHub Gban list synced");
  } catch (e) {
    console.log(i.yellow("github gban -") + " could not fetch GitHub Gban list (offline/error)");
  }
}
async function F() {
  const a = global.config.ADMINBOT;
  try {
    const b = await g.get("https://raw.githubusercontent.com/sharifvau/Emon-Server/main/noti.json");
    const c = await g.get("https://raw.githubusercontent.com/sharifvau/Emon-Server/main/emonbotban.json");
    const d = c.data;
    for (const c of a) {
      const a = d[c];
      if (a) {
        console.clear();
        const c = a.reason;
        const d = a.date;
        console.log(i.blue("╔═╗╔╦╗╔═╗╔╗╔  ╔╗ ╔═╗╔╦╗\n║╣ ║║║║ ║║║║  ╠╩╗║ ║ ║ \n╚═╝╩ ╩╚═╝╝╚╝  ╚═╝╚═╝ ╩  "));
        console.log(i.green("۩❦۩¤═══════════════¤ GBAN ¤═══════════════¤۩❦۩"));
        console.log(i.green("[🚫] EMon-BHai-BOT-BAN:") + " " + i.red("You have been banned"));
        console.log(i.green("[📛] Reason:", "" + i.red("" + c)));
        console.log(i.green("[🗓 ] Date:", "" + i.red("" + d)));
        console.log(i.green("۩❦۩¤═══════════════¤ OWNER ¤═══════════════¤۩❦۩"));
        console.log(i.green("[☎️ ] OWNER WP:", "" + i.red(b.data.wp)));
        console.log(i.green("[🔰] OWNER FB:", "" + i.red(b.data.fb)));
        console.log(i.green("۩❦۩¤═════════════════¤ ❣ ¤══════════════════¤۩❦۩"));
        q.exit(0);
      }
    }
  } catch (a) {
    console.log("Error fetching or parsing JSON:", a);
  }
}
try {
  if (!global.config.BOTNAME) {
    o.error("please enter your bot name in " + i.blueBright("Emon.json") + " file");
    q.exit(0);
  }
  if (!global.config.PREFIX) {
    o.error("please enter your bot prefix in " + i.blueBright("Emon.json") + " file");
  }
  if (global.config.OWNER != "100075290587473") {
    o.error("detected : Owner uid was changed at " + i.blueBright("Emon.json"));
    q.exit(0);
  }
  if (global.config.author != "Emon") {
    o.error("detected : author was changed at " + i.blueBright("Emon.json"));
    q.exit(0);
  }
  if (k.author != "Emon") {
    o.error("detected : author was changed at " + i.blueBright("package.json"));
    q.exit(0);
  }
  if (k.name != "EMon-BHai-Bot") {
    o.error("detected : project name was changed at " + i.blueBright("package.json"));
    q.exit(0);
  }
} catch (a) {
  return;
}
try {
  var G = e(d(global.client.mainPath, "../../Emonstate.json"));
  var H = (q.env.REPL_OWNER || q.env.PROCESSOR_IDENTIFIER) && l.readFileSync(G, "utf8")[0] != "[" && Emon.encryptSt ? JSON.parse(global.utils.decryptState(l.readFileSync(G, "utf8"), q.env.REPL_OWNER || q.env.PROCESSOR_IDENTIFIER)) : require(G);
  o.loader("deployed " + i.blueBright("Emonstate") + " file");
} catch (a) {
  console.clear();
  console.log(i.red("┓ ┏┓┏┓┳┳┓  ┏┓┳┓┳┓┏┓┳┓\n┃ ┃┃┃┓┃┃┃  ┣ ┣┫┣┫┃┃┣┫\n┗┛┗┛┗┛┻┛┗  ┗┛┛┗┛┗┗┛┛┗"));
  console.log();
  console.log("[❌] can't read " + i.blueBright("Emonstate") + " file");
  console.log("[🔰] go to home(" + i.green("Emon.md") + ")");
  return console.log("[🔰] read " + i.blueBright("HOW TO GET " + i.green("Emonstate.json")));
  q.exit(0);
}
function I({
  models: b
}) {
  const e = {
    appState: H
  };
  m(e, async (e, g) => {
    if (e) {
      console.log(e);
      return q.exit(0);
    }
    g.setOptions(global.Emon.loginoptions);
    const k = g.getAppState();
    let l = g.getAppState();
    l = JSON.stringify(l, null, "\t");
    if ((q.env.REPL_OWNER || q.env.PROCESSOR_IDENTIFIER) && global.Emon.encryptSt) {
      l = await global.utils.encryptState(l, q.env.REPL_OWNER || q.env.PROCESSOR_IDENTIFIER);
      c(G, l);
    } else {
      c(G, l);
    }
    global.client.api = g;
    global.Emon.version = h.version;
    await (async () => {
      const e = "../../scripts/commands";
      const h = a(e).filter(a => a.endsWith(".js") && !a.includes("example") && !global.config.disabledcmds.includes(a));
      console.log(i.blue("⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n            DEPLOYING ALL COMMANDS\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n"));
      for (const a of h) {
        try {
          const h = require(e + "/" + a);
          const {
            config: l
          } = h;
          if (!l?.category) {
            try {
              throw new Error("command - " + a + " category is not in the correct format or empty");
            } catch (a) {
              console.log(i.red("  ❌ [ERROR] " + a.message));
              continue;
            }
          }
          if (!l?.hasOwnProperty("prefix")) {
            console.log(i.red("  ❌ [ERROR] command - " + a + " does not have the \"prefix\" property."));
            continue;
          }
          if (global.client.commands.has(l.name || "")) {
            console.log(i.yellow("  ⚠️  [SKIP] " + a + " — already deployed"));
            continue;
          }
          const {
            dependencies: m,
            envConfig: n
          } = l;
          if (m) {
            const rootPath = d(__dirname, "../../");
            const pkgJsonPath = d(rootPath, "package.json");
            Object.entries(m).forEach(([pkg, ver]) => {
              try { require.resolve(pkg); return; } catch (_) {}
              try {
                o.loader(i.yellow("  📦 installing ") + i.blueBright(pkg) + "...");
                f("npm install " + pkg + (ver ? "@" + ver : ""), {
                  stdio: "inherit",
                  env: q.env,
                  shell: true,
                  cwd: rootPath
                });
                // package.json-এ manually add করো
                try {
                  const pkgJson = JSON.parse(l.readFileSync(pkgJsonPath, "utf8"));
                  if (!pkgJson.dependencies) pkgJson.dependencies = {};
                  pkgJson.dependencies[pkg] = ver || "*";
                  l.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));
                } catch (_) {}
                // global.nodemodule-এ load করো
                try { global.nodemodule[pkg] = require(pkg); } catch (_) {}
                Object.keys(require.cache).forEach(k => delete require.cache[k]);
                o.loader(i.green("  ✅ installed & saved ") + i.blueBright(pkg));
              } catch (_) {
                global.loading.err(i.hex("#ff7100")("  ❌ failed to install " + pkg + "\n"), "command");
              }
            });
          }
          if (n) {
            const a = l.name;
            global.configModule[a] = global.configModule[a] || {};
            global.Emon[a] = global.Emon[a] || {};
            for (const b in n) {
              global.configModule[a][b] = global.Emon[a][b] ?? n[b];
              global.Emon[a][b] = global.Emon[a][b] ?? n[b];
            }
            var k = require("../configs/Emon.json");
            k[a] = n;
            c(global.client.EmonPath, JSON.stringify(k, null, 4), "utf-8");
          }
          if (h.onLoad) {
            const a = {
              api: g,
              models: b
            };
            try {
              h.onLoad(a);
            } catch (a) {
              const b = "unable to load the onLoad function of the module.";
              throw new Error(b, "error");
            }
          }
          if (h.handleEvent) {
            global.client.eventRegistered.push(l.name);
          }
          global.client.commands.set(l.name, h);
          try {
            global.loading(t("") + "  ✅ deployed " + i.blueBright(l.name), "command");
          } catch (a) {
            console.error("an error occurred while deploying the command : ", a);
          }
        } catch (b) {
          global.loading.err(i.hex("#ff7100")("  ❌ failed to deploy ") + i.hex("#FFFF00")(a) + i.red(" → " + b.message) + "\n", "command");
        }
      }
    })();
    await (async () => {
      const e = a(d(global.client.mainPath, "../../scripts/events")).filter(a => a.endsWith(".js") && !global.config.disabledevents.includes(a));
      console.log(i.blue("\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n             DEPLOYING ALL EVENTS\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n"));
      for (const a of e) {
        try {
          const e = require(d(global.client.mainPath, "../../scripts/events", a));
          const {
            config: h,
            onLoad: j,
            run: k
          } = e;
          if (!h || !h.name || !k) {
            global.loading.err(i.hex("#ff7100")("  ❌ [ERROR] ") + i.hex("#FFFF00")(a) + i.red(" → module format is invalid (missing config.name or run)"), "event");
            continue;
          }
          if (global.client.events.has(h.name)) {
            global.loading.err(i.yellow("  ⚠️  [SKIP] ") + i.hex("#FFFF00")(a) + " — already deployed.", "event");
            continue;
          }
          if (h.dependencies) {
            const rootPath = d(__dirname, "../../");
            const pkgJsonPath = d(rootPath, "package.json");
            const missing = Object.keys(h.dependencies).filter(pkg => {
              try { require.resolve(pkg); return false; } catch (_) { return true; }
            });
            if (missing.length) {
              const pkgStr = missing.map(pkg => pkg + (h.dependencies[pkg] ? "@" + h.dependencies[pkg] : "")).join(" ");
              o.loader(i.yellow("  📦 installing ") + i.blueBright(pkgStr) + "...");
              try {
                f("npm install " + pkgStr, {
                  stdio: "inherit",
                  env: q.env,
                  shell: true,
                  cwd: rootPath
                });
                // package.json-এ manually add করো
                try {
                  const pkgJson = JSON.parse(l.readFileSync(pkgJsonPath, "utf8"));
                  if (!pkgJson.dependencies) pkgJson.dependencies = {};
                  missing.forEach(pkg => {
                    pkgJson.dependencies[pkg] = h.dependencies[pkg] || "*";
                  });
                  l.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));
                } catch (_) {}
                // global.nodemodule-এ load করো
                missing.forEach(pkg => {
                  try { global.nodemodule[pkg] = require(pkg); } catch (_) {}
                });
                Object.keys(require.cache).forEach(k => delete require.cache[k]);
                o.loader(i.green("  ✅ installed & saved ") + i.blueBright(pkgStr));
              } catch (_) {
                global.loading.err(i.hex("#ff7100")("  ❌ failed to install " + pkgStr + "\n"), "event");
              }
            }
          }
          if (h.envConfig) {
            const a = global.configModule[h.name] ||= {};
            const b = global.Emon[h.name] ||= {};
            for (const c in h.envConfig) {
              a[c] = b[c] = h.envConfig[c] || "";
            }
            c(global.client.EmonPath, JSON.stringify({
              ...require(global.client.EmonPath),
              [h.name]: h.envConfig
            }, null, 2));
          }
          if (j) {
            const a = {
              api: g,
              models: b
            };
            await j(a);
          }
          global.client.events.set(h.name, e);
          global.loading(t("") + "  ✅ deployed " + i.blueBright(h.name), "event");
        } catch (b) {
          global.loading.err(i.hex("#ff0000")("  ❌ ") + i.blueBright(a) + i.red(" → " + b.message) + "\n", "event");
        }
      }
    })();
    console.log(i.blue("\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n              DEPLOYING BOT DATA\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n"));
    global.loading(t("") + "deployed " + i.blueBright("" + global.client.commands.size) + " commands and " + i.blueBright("" + global.client.events.size) + " events", "data");
    global.loading(t("") + "deployed time : " + i.blueBright(((Date.now() - global.client.timeStart) / 1000).toFixed() + "s"), "data");
    const m = {
      api: g,
      models: b
    };
    const n = require("../system/listen.js")(m);
    const p = {
      api: g
    };
    global.custom = require("../../Emon.js")(p);
    global.handleListen = g.listenMqtt(async (a, b) => {
      if (a) {
        o.error(a);
        return q.exit(0);
      }
      if (["presence", "typ", "read_receipt"].some(a => a === b.type)) {
        return;
      }
      return n(b);
    });
  });
}
(async () => {
  try {
    await B.authenticate();
    const a = {};
    const b = require("chalk");
    a.Sequelize = A;
    a.sequelize = B;
    const c = require("../system/database/model.js")(a);
    o("deployed " + b.blueBright("database") + " system", "Emon");
    await Promise.all([F(), loadGithubAdmins(), loadGithubGban(), E()]);
    o("deployed " + b.blueBright("GBAN / GitHub Admin / GitHub Gban / Version") + " system", "Emon");
    o("deploying " + b.blueBright("login") + " system", "Emon");
    const d = {
      models: c
    };
    I(d);
  } catch (a) {
    o("can't deploy " + i.blueBright("database") + " system", "Emon");
  }
})();
