module.exports.config = {
  name: "setdatauser",
  version: "1.0.0",
  permission: 2,
  credits: "Emon",
  prefix: true,
  description: "Sync and update user data in database",
  category: "admin",
  usages: "setdatauser",
  cooldowns: 5
};

module.exports.run = async function({ api, event, Users }) {
  const { threadID, messageID } = event;

  try {
    api.setMessageReaction("⏳", messageID, () => {}, true);
    const allUsers = [...(global.data.allUserID || [])];
    let updated = 0, failed = 0;

    for (const uid of allUsers) {
      try {
        const info = await api.getUserInfo(uid);
        if (info[uid]) {
          await Users.setData(uid, { name: info[uid].name });
          updated++;
        }
      } catch (e) { failed++; }
    }

    return api.sendMessage(
      `╔══════════════════╗\n   🗄️ USER SYNC DONE   \n╚══════════════════╝\n\n✅ User data sync সম্পন্ন!\n🔄 Updated : ${updated}টি\n❌ Failed : ${failed}টি\n\n══════════════════\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch (err) {
    console.error(err);
    return api.sendMessage(`❌ User data sync করতে সমস্যা হয়েছে।`, threadID, messageID);
  }
};
