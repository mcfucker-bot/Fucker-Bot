module.exports.config = {
  name: "unsend",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "Bot-এর reply করা message unsend করো",
  category: "utility",
  usages: "unsend (bot-এর message-এ reply করো)",
  cooldowns: 3
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID, messageReply } = event;
  if (!messageReply) return api.sendMessage(
    "❌ Bot-এর কোনো message-এ reply করে এই command দাও!",
    threadID, messageID
  );

  const botID = api.getCurrentUserID();
  if (messageReply.senderID !== botID) return api.sendMessage(
    "❌ শুধু Bot-এর message-ই unsend করা যাবে!",
    threadID, messageID
  );

  try {
    await api.unsendMessage(messageReply.messageID);
    api.setMessageReaction("✅", messageID, () => {}, true);
  } catch (e) {
    return api.sendMessage(`❌ Unsend করতে পারিনি: ${e.message}`, threadID, messageID);
  }
};
