module.exports.config = {
  name: "tagall",
  version: "1.0.0",
  permission: 1,
  credits: "EMon",
  prefix: true,
  description: "গ্রুপের সবাইকে tag করো",
  category: "admin",
  usages: "tagall [message]",
  cooldowns: 30
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID, senderID } = event;
  try {
    const info = await api.getThreadInfo(threadID);
    const members = info.participantIDs.filter(id => id !== api.getCurrentUserID());
    const msg = args.join(" ") || "📢 সবার মনোযোগ!";

    const mentions = members.map(id => ({ tag: `@${id}`, id }));
    const tagText = members.map(id => `@${id}`).join(" ");

    return api.sendMessage(
      {
        body: `📢 TAG ALL\n━━━━━━━━━━━━━━━━━━\n\n💬 ${msg}\n\n${tagText}\n\n━━━━━━━━━━━━━━━━━━\n👥 Total: ${members.length} জন\n💎 EMon-BHai-BOT`,
        mentions
      },
      threadID, messageID
    );
  } catch (e) {
    return api.sendMessage(`❌ Tag করতে পারিনি: ${e.message}`, threadID, messageID);
  }
};
