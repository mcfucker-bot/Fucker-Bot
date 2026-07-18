module.exports.config = {
  name: "antiswear",
  eventType: ["message"],
  version: "1.0.0",
  credits: "Emon",
  description: "Detect bad words and warn/kick members (per-thread toggle)",
  envConfig: {
    enable: true
  }
};

// Bad word list — lowercase এ রাখো, partial match হবে
const BAD_WORDS = [
  "fuck", "shit", "bitch", "bastard", "asshole", "idiot",
  "মাগী", "চুদি", "চুদা", "হারামি", "শালা", "বেশ্যা",
  "কুত্তা", "শুয়োর", "ধোন", "চোদ", "রান্ডি", "খানকি"
];

function containsBadWord(text) {
  if (!text) return { found: false };
  const lower = text.toLowerCase();
  for (const word of BAD_WORDS) {
    if (lower.includes(word)) return { found: true, word };
  }
  return { found: false };
}

module.exports.run = async function ({ api, event, Threads, Users }) {
  if (!global.configModule[this.config.name]?.enable) return;
  const { threadID, messageID, senderID, body, type } = event;
  if (type !== "message") return;

  // Thread settings
  const threadData = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data || {};
  if (!threadData.antiswear) return; // এই group এ antiswear off থাকলে skip

  // Admin দের skip করো
  const adminIDs = global.config.ADMINBOT || [];
  if (adminIDs.includes(senderID)) return;

  try {
    const threadInfo = await api.getThreadInfo(threadID);
    if (threadInfo.adminIDs?.some(a => a.uid == senderID)) return;
  } catch (e) { /* silent */ }

  const check = containsBadWord(body);
  if (!check.found) return;

  // Message delete করো
  try { await api.unsendMessage(messageID); } catch (e) { /* silent */ }

  // Warning গণনা
  if (!global.temp) global.temp = {};
  const warnKey = `antiswear_warn_${senderID}_${threadID}`;
  const warns = (global.temp[warnKey] || 0) + 1;
  global.temp[warnKey] = warns;

  const name = global.data.userName.get(senderID)
    || (await Users.getNameUser(senderID).catch(() => "একজন member"));

  if (warns >= 3) {
    global.temp[warnKey] = 0;
    try {
      await api.removeUserFromGroup(senderID, threadID);
      return api.sendMessage(
        `╔══════════════════╗\n   🤬 ANTISWEAR 🚫   \n╚══════════════════╝\n\n❌ ${name} কে kick করা হয়েছে!\n⚠️ কারণ : ৩ বার গালাগাল\n\n══════════════════\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`,
        threadID
      );
    } catch (e) {
      return api.sendMessage(`🚫 ${name} গালাগাল দিয়েছে! (Kick করতে পারিনি — Bot admin নয়)`, threadID);
    }
  }

  return api.sendMessage(
    `╔══════════════════╗\n   🤬 ANTISWEAR ⚠️   \n╚══════════════════╝\n\n⚠️ ${name}, এই ধরনের ভাষা ব্যবহার করা নিষেধ!\n\n▸ Warning : ${warns}/3\n▸ Message delete করা হয়েছে\n▸ ৩টি warning এ kick করা হবে\n\n══════════════════\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`,
    threadID
  );
};
