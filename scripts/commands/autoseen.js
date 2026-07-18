module.exports.config = {
  name: "autoseen",
  version: "1.0.0",
  permission: 1,
  credits: "Emon",
  prefix: true,
  description: "Toggle auto-seen for all messages",
  category: "group",
  usages: "autoseen [on/off]",
  cooldowns: 5
};

module.exports.handleEvent = async function({ api, event }) {
  const tid = String(event.threadID);
  const threadData = global.data.threadData.get(tid) || {};
  if (threadData.autoSeen) {
    try { api.markAsRead(tid, () => {}); } catch (_) {}
  }
};

module.exports.run = async function({ api, event, args, Threads }) {
  const { threadID, messageID } = event;
  const action = (args[0] || "").toLowerCase();

  if (!["on", "off"].includes(action)) return api.sendMessage(
    `╔══════════════════╗\n   👁️ AUTOSEEN HELP   \n╚══════════════════╝\n\n📌 ব্যবহার :\n▸ autoseen on — চালু করো\n▸ autoseen off — বন্ধ করো`,
    threadID, messageID
  );

  const enable = action === "on";
  const threadData = global.data.threadData.get(threadID) || {};
  threadData.autoSeen = enable;
  global.data.threadData.set(threadID, threadData);
  await Threads.setData(threadID, { autoSeen: enable });

  return api.sendMessage(
    `╔══════════════════╗\n   👁️ AUTO SEEN   \n╚══════════════════╝\n\n${enable ? "✅ Auto-Seen চালু হয়েছে!" : "❌ Auto-Seen বন্ধ করা হয়েছে।"}\n\n══════════════════\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
