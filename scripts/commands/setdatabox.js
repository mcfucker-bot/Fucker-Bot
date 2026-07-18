module.exports.config = {
  name: "setdatabox",
  version: "1.0.0",
  permission: 2,
  credits: "Emon",
  prefix: true,
  description: "Sync and update thread data in database",
  category: "admin",
  usages: "setdatabox",
  cooldowns: 5
};

module.exports.run = async function({ api, event, Threads }) {
  const { threadID, messageID } = event;

  try {
    api.setMessageReaction("⏳", messageID, () => {}, true);
    const allThreads = [...(global.data.allThreadID || [])];
    let updated = 0, failed = 0;

    for (const tid of allThreads) {
      try {
        const info = await api.getThreadInfo(tid);
        await Threads.setData(tid, {
          threadName: info.threadName,
          participantIDs: info.participantIDs,
          adminIDs: info.adminIDs
        });
        updated++;
      } catch (e) { failed++; }
    }

    return api.sendMessage(
      `╔══════════════════╗\n   🗄️ DATA SYNC DONE   \n╚══════════════════╝\n\n✅ Thread data sync সম্পন্ন!\n🔄 Updated : ${updated}টি\n❌ Failed : ${failed}টি\n\n══════════════════\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch (err) {
    console.error(err);
    return api.sendMessage(`❌ Data sync করতে সমস্যা হয়েছে।`, threadID, messageID);
  }
};
