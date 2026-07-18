module.exports.config = {
  name: "join",
  version: "1.0.0",
  permission: 2,
  credits: "Emon",
  prefix: true,
  description: "Join a group that the bot is in",
  category: "admin",
  usages: "join [group link or ID]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;

  if (!args[0]) {
    // list all threads
    const allThreads = [...global.data.allThreadID];
    let msg = `╔══════════════════╗\n   👥 BOT GROUPS   \n╚══════════════════╝\n\n📋 মোট Group : ${allThreads.length}টি\n\n`;
    let count = 0;
    for (const tid of allThreads) {
      if (count >= 10) break;
      try {
        const info = await api.getThreadInfo(tid);
        msg += `${count + 1}. 💬 ${info.threadName || 'N/A'}\n   🔖 ID : ${tid}\n\n`;
        count++;
      } catch (e) { continue; }
    }
    msg += `══════════════════\n📌 Bot join করতে : join [group ID]`;
    return api.sendMessage(msg, threadID, messageID);
  }

  try {
    await api.sendMessage(
      `╔══════════════════╗\n   🤖 BOT JOINED   \n╚══════════════════╝\n\n✅ Bot এই group এ যোগ দিয়েছে!\n\n💎 EMon-BHai-BOT`,
      args[0]
    );
    return api.sendMessage(`✅ Group ${args[0]} এ সফলভাবে join করা হয়েছে।`, threadID, messageID);
  } catch (err) {
    return api.sendMessage(`❌ Group এ join করতে সমস্যা হয়েছে।`, threadID, messageID);
  }
};
