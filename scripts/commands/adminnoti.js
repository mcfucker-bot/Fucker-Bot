module.exports.config = {
  name: "adminnoti",
  version: "1.0.0",
  permission: 2,
  credits: "Emon",
  prefix: true,
  description: "Send a notification to all bot admins",
  category: "admin",
  usages: "adminnoti [message]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID, senderID } = event;

  if (!args[0]) return api.sendMessage(
    `╔══════════════════╗\n   📣 ADMINNOTI HELP   \n╚══════════════════╝\n\n📌 ব্যবহার : adminnoti [message]`,
    threadID, messageID
  );

  const message = args.join(" ");
  const adminList = global.config.ADMINBOT || [];
  const senderInfo = await api.getUserInfo(senderID);
  const senderName = (senderInfo && senderInfo[senderID]) ? senderInfo[senderID].name : "Unknown";

  let success = 0, failed = 0;
  for (const adminID of adminList) {
    try {
      await api.sendMessage(
        `╔══════════════════╗\n   📣 ADMIN NOTIF   \n╚══════════════════╝\n\n📨 From : ${senderName}\n🔖 ID : ${senderID}\n💬 Group : ${event.threadID}\n\n📝 Message :\n${message}\n\n══════════════════\n💎 EMon-BHai-BOT`,
        adminID
      );
      success++;
    } catch (e) { failed++; }
  }

  return api.sendMessage(
    `╔══════════════════╗\n   📣 NOTIFICATION   \n╚══════════════════╝\n\n✅ ${success} জন Admin কে notify করা হয়েছে।${failed > 0 ? `\n❌ ${failed} জন কে করা যায়নি।` : ''}\n\n══════════════════\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
