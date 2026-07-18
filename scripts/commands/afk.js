module.exports.config = {
  name: "afk",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "AFK mode চালু করো (Away From Keyboard)",
  category: "utility",
  usages: "afk [reason]",
  cooldowns: 5
};

if (!global.afkList) global.afkList = {};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID, senderID } = event;
  const reason = args.join(" ") || "কারণ নেই";

  if (global.afkList[senderID]) {
    delete global.afkList[senderID];
    return api.sendMessage(
      `✅ AFK Mode বন্ধ হয়েছে! Welcome back! 👋\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }

  global.afkList[senderID] = { reason, time: Date.now(), thread: threadID };
  return api.sendMessage(
    `😴 AFK MODE ON\n━━━━━━━━━━━━━━━━━━\n\n💤 তুমি AFK mode-এ গেছো!\n📝 কারণ: ${reason}\n\n⚠️ কেউ mention করলে auto-reply যাবে!\n💡 ফিরে এলে আবার "afk" type করো।\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};

module.exports.handleEvent = async function({ api, event }) {
  const { threadID, body, mentions, senderID } = event;
  if (!global.afkList || !body) return;

  // Check if AFK user returned
  if (global.afkList[senderID]) {
    const afkData = global.afkList[senderID];
    const elapsed = Math.floor((Date.now() - afkData.time) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    delete global.afkList[senderID];
    return api.sendMessage(
      `👋 Welcome back! তুমি ${mins}m ${secs}s AFK ছিলে।\n💎 EMon-BHai-BOT`,
      threadID
    );
  }

  // Check if someone mentioned an AFK user
  for (const uid of Object.keys(mentions || {})) {
    if (global.afkList[uid]) {
      const { reason, time } = global.afkList[uid];
      const elapsed = Math.floor((Date.now() - time) / 1000);
      const mins = Math.floor(elapsed / 60);
      await api.sendMessage(
        `😴 AFK NOTICE\n${mentions[uid]} এখন AFK mode-এ আছে!\n📝 কারণ: ${reason}\n⏱️ ${mins} মিনিট ধরে AFK\n💎 EMon-BHai-BOT`,
        threadID
      );
    }
  }
};
