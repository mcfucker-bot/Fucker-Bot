module.exports.config = {
  name: "bye",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: false,
  description: "Bot says goodbye and auto-unsends after 30s",
  category: "user",
  usages: "bye",
  cooldowns: 5
};

module.exports.run = async function({ api, event, Users }) {
  const { threadID, messageID, senderID } = event;
  const name = (await Users.getNameUser(senderID)) || "বন্ধু";

  api.sendMessage(
    `╔══════════════════╗\n   👋 GOODBYE!   \n╚══════════════════╝\n\n${name}, বিদায়! 👋\nআবার দেখা হবে ইনশাআল্লাহ! 🌙\n\n⏳ এই message 30 সেকেন্ডে মুছে যাবে।\n\n══════════════════\n💎 EMon-BHai-BOT`,
    threadID,
    (err, info) => {
      if (!err) {
        setTimeout(() => {
          api.unsendMessage(info.messageID);
        }, 30000);
      }
    },
    messageID
  );
};
