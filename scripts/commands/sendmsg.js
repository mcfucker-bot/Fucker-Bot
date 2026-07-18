module.exports.config = {
  name: "sendmsg",
  version: "1.0.0",
  permission: 2,
  credits: "Emon",
  prefix: true,
  description: "Send a message to a specific user or thread",
  category: "admin",
  usages: "sendmsg [uid/threadID] [message]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;

  if (args.length < 2) return api.sendMessage(
    `╔══════════════════╗\n   ✉️ SENDMSG HELP   \n╚══════════════════╝\n\n📌 ব্যবহার : sendmsg [ID] [message]\n📝 উদাহরণ : sendmsg 100012345 Hello!`,
    threadID, messageID
  );

  const targetID = args[0];
  const message = args.slice(1).join(" ");

  try {
    await api.sendMessage(
      `╔══════════════════╗\n   📨 BOT MESSAGE   \n╚══════════════════╝\n\n${message}\n\n══════════════════\n💎 EMon-BHai-BOT`,
      targetID
    );
    return api.sendMessage(
      `╔══════════════════╗\n   ✉️ MESSAGE SENT   \n╚══════════════════╝\n\n✅ Message পাঠানো হয়েছে!\n🔖 Target ID : ${targetID}\n\n══════════════════\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch (err) {
    console.error(err);
    return api.sendMessage(`❌ Message পাঠাতে সমস্যা হয়েছে।`, threadID, messageID);
  }
};
