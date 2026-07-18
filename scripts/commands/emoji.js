module.exports.config = {
  name: "emoji",
  version: "1.0.0",
  permission: 1,
  credits: "Emon",
  prefix: true,
  description: "Change the group chat emoji",
  category: "group",
  usages: "emoji [emoji]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;

  const newEmoji = args[0];
  if (!newEmoji) return api.sendMessage(
    `╔══════════════════╗\n   😊 EMOJI HELP   \n╚══════════════════╝\n\n📌 ব্যবহার : emoji [emoji]\n📝 উদাহরণ :\n▸ emoji ❤️\n▸ emoji 🔥\n▸ emoji 😂`,
    threadID, messageID
  );

  try {
    await api.changeThreadEmoji(newEmoji, threadID);
    return api.sendMessage(
      `╔══════════════════╗\n   😊 EMOJI CHANGED   \n╚══════════════════╝\n\n✅ Group emoji পরিবর্তন হয়েছে!\n${newEmoji} এখন group এর emoji!\n\n══════════════════\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch (err) {
    return api.sendMessage(`❌ Emoji change করতে সমস্যা হয়েছে।\n▸ ${err.message}`, threadID, messageID);
  }
};
