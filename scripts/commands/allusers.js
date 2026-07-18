module.exports.config = {
  name: "allusers",
  version: "1.0.0",
  permission: 2,
  credits: "Emon",
  prefix: true,
  description: "List all users in bot database",
  category: "admin",
  usages: "allusers",
  cooldowns: 5
};

module.exports.run = async function({ api, event, Users }) {
  const { threadID, messageID } = event;

  try {
    const allUsers = [...(global.data.allUserID || [])];
    if (allUsers.length === 0) return api.sendMessage(
      `╔══════════════════╗\n   👥 ALL USERS   \n╚══════════════════╝\n\n❌ কোনো user পাওয়া যায়নি।`,
      threadID, messageID
    );

    let msg = `╔══════════════════╗\n   👥 ALL USERS   \n╚══════════════════╝\n\n📋 Database এ মোট : ${allUsers.length}টি user\n\n`;
    let count = 0;
    for (const uid of allUsers) {
      if (count >= 15) { msg += `...এবং আরো ${allUsers.length - 15}টি\n`; break; }
      try {
        const userData = await Users.getData(uid);
        count++;
        msg += `${count}. 👤 ${userData.name || 'Unknown'}\n   🔖 ${uid}\n\n`;
      } catch (e) { continue; }
    }
    msg += `══════════════════\n💎 EMon-BHai-BOT`;
    return api.sendMessage(msg, threadID, messageID);
  } catch (err) {
    console.error(err);
    return api.sendMessage(`❌ User list আনতে সমস্যা হয়েছে।`, threadID, messageID);
  }
};
