module.exports.config = {
  name: "ginfo",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: 'awto',
  description: "Show detailed info about this group",
  category: "group",
  usages: "ginfo",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID } = event;

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const info = await api.getThreadInfo(threadID);

    const name        = info.threadName        || "Unnamed Group";
    const memberCount = info.participantIDs?.length || 0;
    const adminIDs    = info.adminIDs?.map(a => a.id) || [];
    const adminCount  = adminIDs.length;
    const emoji       = info.emoji             || "💬";
    const color       = info.color             || "#0084ff";
    const msgCount    = info.messageCount      || 0;
    const nicknames   = info.nicknames         ? Object.keys(info.nicknames).length : 0;
    const approval    = info.approvalMode      ? "✅ চালু" : "❌ বন্ধ";
    const threadType  = info.isGroup           ? "👥 Group" : "💬 Private";

    api.setMessageReaction("✅", messageID, () => {}, true);
    return api.sendMessage(
      `╔══════════════════╗\n   👥 GROUP INFO   \n╚══════════════════╝\n\n` +
      `📛 নাম       : ${name}\n` +
      `🔖 Thread ID : ${threadID}\n` +
      `💬 Type      : ${threadType}\n` +
      `👥 Members   : ${memberCount} জন\n` +
      `👑 Admins    : ${adminCount} জন\n` +
      `💬 Messages  : ${msgCount}\n` +
      `🎭 Nicknames : ${nicknames} সেট\n` +
      `😊 Emoji     : ${emoji}\n` +
      `🎨 Color     : ${color}\n` +
      `📋 Approval  : ${approval}\n\n` +
      `══════════════════\n` +
      `💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch (err) {
    api.setMessageReaction("❌", messageID, () => {}, true);
    console.error("[ginfo.js]", err.message);
    return api.sendMessage(`❌ Group info আনতে সমস্যা হয়েছে।\n▸ ${err.message}`, threadID, messageID);
  }
};
