module.exports.config = {
  name: "uns",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: true,
  description: "Unsend (delete) a replied message",
  category: "user",
  usages: "unend [reply to a message]",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID } = event;

  if (event.type !== "message_reply") return api.sendMessage(
    `╔══════════════════╗\n   🗑️ UNSEND HELP   \n╚══════════════════╝\n\n📌 কোনো message এ reply দিয়ে এই command দাও।`,
    threadID, messageID
  );

  try {
    await api.unsendMessage(event.messageReply.messageID);
    return api.sendMessage(`✅ Message মুছে ফেলা হয়েছে!`, threadID, messageID);
  } catch (err) {
    console.error(err);
    return api.sendMessage(`❌ Message মুছতে সমস্যা হয়েছে। (শুধু bot এর নিজের message মোছা যাবে)`, threadID, messageID);
  }
};
