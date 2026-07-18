const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "admin",
  version: "2.0.0",
  permission: 3,
  credits: "Emon",
  prefix: true,
  description: "Manage bot admin list",
  category: "owner",
  usages: "admin [list/add/remove] [@mention/uid]",
  cooldowns: 5
};

module.exports.languages = {
  "en": {
    "list": "╔══════════════════╗\n   👑 BOT ADMINS   \n╚══════════════════╝\n\n📋 মোট Admin : %1 জন\n\n%2\n══════════════════\n💎 EMon-BHai-BOT",
    "added": "╔══════════════════╗\n   👑 ADMIN ADDED   \n╚══════════════════╝\n\n✅ %1 কে Admin করা হয়েছে!\n🔖 UID : %2\n\n══════════════════\n💎 EMon-BHai-BOT",
    "removed": "╔══════════════════╗\n   👑 ADMIN REMOVED   \n╚══════════════════╝\n\n✅ %1 এর Admin permission সরানো হয়েছে!\n🔖 UID : %2\n\n══════════════════\n💎 EMon-BHai-BOT",
    "alreadyAdmin": "❌ %1 ইতিমধ্যে Admin।",
    "notAdmin": "❌ %1 Admin না।",
    "cantRemoveSelf": "❌ নিজেকে Admin থেকে সরাতে পারবে না।",
    "help": "╔══════════════════╗\n   👑 ADMIN HELP   \n╚══════════════════╝\n\n📌 ব্যবহার :\n▸ admin list — Admin list\n▸ admin add [@/uid] — Admin যোগ\n▸ admin remove [@/uid] — Admin সরানো"
  }
};

module.exports.run = async function({ api, event, args, getText, Users }) {
  const { threadID, messageID, senderID, mentions } = event;
  const configPath = path.join(process.cwd(), "Emon.json");
  const subCmd = (args[0] || "list").toLowerCase();

  if (subCmd === "list") {
    const adminList = global.config.ADMINBOT || [];
    if (adminList.length === 0) return api.sendMessage("❌ কোনো Admin নেই।", threadID, messageID);
    let listText = "";
    for (let i = 0; i < adminList.length; i++) {
      try {
        const info = await api.getUserInfo(adminList[i]);
        listText += `${i + 1}. 👑 ${info[adminList[i]].name}\n   🔖 ${adminList[i]}\n\n`;
      } catch (e) {
        listText += `${i + 1}. 👑 Unknown\n   🔖 ${adminList[i]}\n\n`;
      }
    }
    return api.sendMessage(getText("list", adminList.length, listText), threadID, messageID);
  }

  if (subCmd === "add") {
    const targetID = Object.keys(mentions)[0] || args[1];
    if (!targetID) return api.sendMessage("❌ Mention করো অথবা UID দাও।", threadID, messageID);
    const adminList = global.config.ADMINBOT || [];
    if (adminList.includes(targetID)) {
      const info = await api.getUserInfo(targetID);
      return api.sendMessage(getText("alreadyAdmin", info[targetID].name), threadID, messageID);
    }
    adminList.push(targetID);
    global.config.ADMINBOT = adminList;
    try {
      const cfg = JSON.parse(fs.readFileSync(configPath, "utf8"));
      cfg.ADMINBOT = adminList;
      fs.writeFileSync(configPath, JSON.stringify(cfg, null, 2));
    } catch (e) { console.error(e); }
    const info = await api.getUserInfo(targetID);
    return api.sendMessage(getText("added", info[targetID].name, targetID), threadID, messageID);
  }

  if (subCmd === "remove") {
    const targetID = Object.keys(mentions)[0] || args[1];
    if (!targetID) return api.sendMessage("❌ Mention করো অথবা UID দাও।", threadID, messageID);
    if (targetID === senderID) return api.sendMessage(getText("cantRemoveSelf"), threadID, messageID);
    let adminList = global.config.ADMINBOT || [];
    if (!adminList.includes(targetID)) {
      const info = await api.getUserInfo(targetID);
      return api.sendMessage(getText("notAdmin", info[targetID].name), threadID, messageID);
    }
    adminList = adminList.filter(id => id !== targetID);
    global.config.ADMINBOT = adminList;
    try {
      const cfg = JSON.parse(fs.readFileSync(configPath, "utf8"));
      cfg.ADMINBOT = adminList;
      fs.writeFileSync(configPath, JSON.stringify(cfg, null, 2));
    } catch (e) { console.error(e); }
    const info = await api.getUserInfo(targetID);
    return api.sendMessage(getText("removed", info[targetID].name, targetID), threadID, messageID);
  }

  return api.sendMessage(getText("help"), threadID, messageID);
};
