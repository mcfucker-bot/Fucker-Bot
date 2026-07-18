module.exports.config = {
  name: "inbox",
  version: "1.0.0",
  permission: 2,
  credits: "Emon",
  prefix: true,
  description: "View bot inbox messages",
  category: "admin",
  usages: "inbox",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;

  try {
    api.setMessageReaction("⏳", messageID, () => {}, true);
    const inbox = await api.getThreadList(20, null, ["INBOX"]);

    if (!inbox || inbox.length === 0) return api.sendMessage(
      `╔══════════════════╗\n   📬 INBOX   \n╚══════════════════╝\n\n✅ Inbox খালি আছে।`,
      threadID, messageID
    );

    let msg = `╔══════════════════╗\n   📬 INBOX   \n╚══════════════════╝\n\n📋 মোট : ${inbox.length}টি\n\n`;
    inbox.slice(0, 10).forEach((thread, i) => {
      msg += `${i + 1}. 💬 ${thread.threadName || 'DM'}\n   🔖 ${thread.threadID}\n   📝 ${thread.snippet ? thread.snippet.substring(0, 40) : 'N/A'}...\n\n`;
    });
    msg += `══════════════════\n💎 EMon-BHai-BOT`;
    return api.sendMessage(msg, threadID, messageID);
  } catch (err) {
    console.error(err);
    return api.sendMessage(`❌ Inbox লোড করতে সমস্যা হয়েছে।`, threadID, messageID);
  }
};
