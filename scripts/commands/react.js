module.exports.config = {
  name: "react",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: true,
  description: "React to the replied message with an emoji",
  category: "user",
  usages: "react [emoji] | reply to a message",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;

  if (event.type !== "message_reply") return api.sendMessage(
    `╔══════════════════╗\n   😊 REACT HELP   \n╚══════════════════╝\n\n📌 কোনো message এ reply দিয়ে react দাও।\n📝 উদাহরণ : react 😍\n\n🎭 Reactions :\n▸ 😍 ❤️ 😆 😢 😮 😠 👍`,
    threadID, messageID
  );

  const emoji = args[0] || "😍";
  const validReactions = { "😍": "😍", "❤️": "❤️", "😆": "😆", "😢": "😢", "😮": "😮", "😠": "😠", "👍": "👍", "🎉": "🎉" };
  const reaction = validReactions[emoji] || emoji;

  try {
    await api.setMessageReaction(reaction, event.messageReply.messageID, () => {}, true);
    return api.sendMessage(`✅ ${reaction} reaction দেওয়া হয়েছে!`, threadID, messageID);
  } catch (err) {
    console.error(err);
    return api.sendMessage(`❌ Reaction দিতে সমস্যা হয়েছে।`, threadID, messageID);
  }
};
