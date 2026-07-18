module.exports.config = {
  name: "antispam",
  eventType: ["message"],
  version: "1.0.0",
  credits: "EMon-BHai",
  description: "Detect message flooding/spam and warn or kick (per-thread toggle)",
  envConfig: {
    enable: true
  }
};

// কত সেকেন্ডের মধ্যে কতটা message spam ধরা হবে
const SPAM_LIMIT   = 5;   // এই সংখ্যক message
const SPAM_WINDOW  = 5000; // এই সময়ের মধ্যে (ms)

module.exports.run = async function ({ api, event, Users }) {
  if (!global.configModule[this.config.name]?.enable) return;
  const { threadID, messageID, senderID, type } = event;
  if (type !== "message") return;

  // Thread settings — per-thread antispam toggle
  const threadData = global.data.threadData.get(parseInt(threadID)) || {};
  if (!threadData.antispam) return;

  // Bot admin দের skip করো
  const adminIDs = global.config.ADMINBOT || [];
  if (adminIDs.includes(senderID)) return;

  // Group admin দের skip করো
  try {
    const threadInfo = await api.getThreadInfo(threadID);
    if (threadInfo.adminIDs?.some(a => a.uid == senderID)) return;
  } catch (e) { /* silent */ }

  if (!global.temp) global.temp = {};

  const key  = `spam_${senderID}_${threadID}`;
  const now  = Date.now();
  const log  = global.temp[key] || [];

  // পুরনো entries সরাও
  const recent = log.filter(t => now - t < SPAM_WINDOW);
  recent.push(now);
  global.temp[key] = recent;

  if (recent.length < SPAM_LIMIT) return;

  // Spam detected — reset counter
  global.temp[key] = [];

  const warnKey  = `spam_warn_${senderID}_${threadID}`;
  const warns    = (global.temp[warnKey] || 0) + 1;
  global.temp[warnKey] = warns;

  const name = global.data.userName.get(senderID)
    || await Users.getNameUser(senderID).catch(() => "একজন member");

  if (warns >= 3) {
    global.temp[warnKey] = 0;
    try {
      await api.removeUserFromGroup(senderID, threadID);
      return api.sendMessage(
        `╔══════════════════╗\n   🚨 ANTISPAM 🚫   \n╚══════════════════╝\n\n❌ ${name} কে kick করা হয়েছে!\n⚠️ কারণ : ৩ বার spam করা\n\n══════════════════\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`,
        threadID
      );
    } catch (e) {
      return api.sendMessage(
        `🚨 ${name} spam করছে! (Kick করতে পারিনি — Bot admin নয়)`,
        threadID
      );
    }
  }

  return api.sendMessage(
    `╔══════════════════╗\n   🚨 ANTISPAM ⚠️   \n╚══════════════════╝\n\n⚠️ ${name}, এত দ্রুত message করা নিষেধ!\n\n▸ Warning : ${warns}/3\n▸ ৩টি warning এ kick করা হবে\n\n══════════════════\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`,
    threadID
  );
};
