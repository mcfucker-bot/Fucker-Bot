module.exports.config = {
  name: "approve",
  version: "1.0.0",
  permission: 2,
  credits: "Emon",
  prefix: true,
  description: "Approve or deny group join requests",
  category: "admin",
  usages: "approve [on/off]",
  cooldowns: 5
};

module.exports.languages = {
  "en": {
    "turnOn": "✅ Auto-Approve চালু হয়েছে!",
    "turnOff": "❌ Auto-Approve বন্ধ করা হয়েছে।",
    "invalid": "❌ সঠিক option দাও: on অথবা off"
  }
};

module.exports.handleEvent = async function({ api, event, Threads }) {
  if (event.logMessageType !== "log:approval") return;
  const threadData = global.data.threadData.get(event.threadID) || {};
  if (!threadData.autoApprove) return;
  try { await api.handleMessageRequest(event.threadID, true); } catch (e) {}
};

module.exports.run = async function({ api, event, args, Threads, getText }) {
  const { threadID, messageID } = event;
  const action = (args[0] || "").toLowerCase();

  if (!["on", "off"].includes(action)) return api.sendMessage(
    `╔══════════════════╗\n   ✅ APPROVE HELP   \n╚══════════════════╝\n\n📌 ব্যবহার :\n▸ approve on — Auto-Approve চালু\n▸ approve off — Auto-Approve বন্ধ`,
    threadID, messageID
  );

  const enable = action === "on";
  const threadData = global.data.threadData.get(threadID) || {};
  threadData.autoApprove = enable;
  global.data.threadData.set(threadID, threadData);
  await Threads.setData(threadID, { autoApprove: enable });

  return api.sendMessage(
    `╔══════════════════╗\n   ✅ AUTO APPROVE   \n╚══════════════════╝\n\n${enable ? getText("turnOn") : getText("turnOff")}\n\n══════════════════\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
