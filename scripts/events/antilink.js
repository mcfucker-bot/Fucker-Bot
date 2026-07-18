module.exports.config = {
  name: "antilink",
  eventType: ["message"],
  version: "1.0.0",
  credits: "Emon",
  description: "Auto-detect and remove links in groups (per-thread toggle)",
  envConfig: {
    enable: true
  }
};

// যেসব pattern link হিসেবে ধরা হবে
const LINK_PATTERNS = [
  /https?:\/\/[^\s]+/i,
  /www\.[a-z0-9-]+\.[a-z]{2,}/i,
  /fb\.me\/[^\s]+/i,
  /t\.me\/[^\s]+/i,
  /bit\.ly\/[^\s]+/i,
  /youtu\.be\/[^\s]+/i
];

// এই domains allow করা হবে (whitelist)
const WHITELIST = [
  "facebook.com",
  "fb.watch",
  "messenger.com"
];

function containsLink(text) {
  if (!text) return false;
  for (const pattern of LINK_PATTERNS) {
    if (pattern.test(text)) {
      for (const safe of WHITELIST) {
        if (text.includes(safe)) return false;
      }
      return true;
    }
  }
  return false;
}

module.exports.run = async function ({ api, event, Threads }) {
  if (!global.configModule[this.config.name]?.enable) return;
  const { threadID, messageID, senderID, body, type } = event;

  // শুধু group এ কাজ করবে
  if (type !== "message") return;

  // Thread settings দেখো
  const threadData = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data || {};
  if (!threadData.antilink) return; // এই group এ antilink off থাকলে skip

  // Bot admin/group admin দের message রাখো
  const adminIDs = global.config.ADMINBOT || [];
  if (adminIDs.includes(senderID)) return;

  try {
    const threadInfo = await api.getThreadInfo(threadID);
    const isGroupAdmin = threadInfo.adminIDs?.some(a => a.uid == senderID);
    if (isGroupAdmin) return;
  } catch (e) { /* silent */ }

  // Link আছে কিনা দেখো
  if (!containsLink(body)) return;

  // Message delete করো
  try { await api.unsendMessage(messageID); } catch (e) { /* bot sender না হলে fail হবে */ }

  // Warning পাঠাও
  if (!global.temp) global.temp = {};
  const warningKey = `antilink_warn_${senderID}_${threadID}`;
  const warns = (global.temp[warningKey] || 0) + 1;
  global.temp[warningKey] = warns;

  if (warns >= 3) {
    // ৩ বার link দিলে kick
    global.temp[warningKey] = 0;
    try {
      await api.removeUserFromGroup(senderID, threadID);
      return api.sendMessage(
        `╔══════════════════╗\n   🔗 ANTILINK 🚫   \n╚══════════════════╝\n\n❌ একজন member কে kick করা হয়েছে!\n⚠️ কারণ : ৩ বার link share করা\n\n══════════════════\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`,
        threadID
      );
    } catch (e) {
      return api.sendMessage(`❌ Link শেয়ার করা নিষেধ! (Kick করতে পারিনি — Bot admin নয়)`, threadID);
    }
  }

  return api.sendMessage(
    `╔══════════════════╗\n   🔗 ANTILINK ⚠️   \n╚══════════════════╝\n\n⚠️ Warning ${warns}/3\n🚫 এই group এ link share করা নিষেধ!\n\n▸ তোমার message delete করা হয়েছে\n▸ ৩টি warning এ kick করা হবে\n\n══════════════════\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`,
    threadID
  );
};
