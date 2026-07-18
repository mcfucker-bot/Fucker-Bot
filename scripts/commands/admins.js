module.exports.config = {
  name: "admins",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: 'awto',
  description: "Show all admins in the current group",
  category: "group",
  usages: "admins",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID } = event;

  try {
    const info = await api.getThreadInfo(threadID);
    const admins = info.adminIDs || [];

    if (admins.length === 0) return api.sendMessage(
      `╔══════════════════╗\n   👑 GROUP ADMINS   \n╚══════════════════╝\n\n❌ এই group এ কোনো admin নেই।`,
      threadID, messageID
    );

    let msg = `╔══════════════════╗\n   👑 GROUP ADMINS   \n╚══════════════════╝\n\n👥 গ্রুপ : ${info.threadName}\n🏅 মোট Admin : ${admins.length} জন\n\n`;
    for (let i = 0; i < admins.length; i++) {
      try {
        const userInfo = await api.getUserInfo(admins[i].uid);
        const name = userInfo[admins[i].uid].name;
        msg += `${i + 1}. 👑 ${name}\n   🔖 ${admins[i].uid}\n\n`;
      } catch (e) {
        msg += `${i + 1}. 👑 Unknown\n   🔖 ${admins[i].uid}\n\n`;
      }
    }
    msg += `══════════════════\n💎 EMon-BHai-BOT`;
    return api.sendMessage(msg, threadID, messageID);
  } catch (err) {
    console.error(err);
    return api.sendMessage(`❌ Admin list আনতে সমস্যা হয়েছে।`, threadID, messageID);
  }
};
