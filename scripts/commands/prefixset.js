module.exports.config = {
  name: "prefixset",
  version: "1.0.0",
  permission: 2,
  credits: "Emon",
  prefix: true,
  description: "Set a custom prefix for this group",
  category: "system",
  usages: "prefixset [new prefix]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args, Threads }) {
  const { threadID, messageID } = event;

  if (!args[0]) return api.sendMessage(
    `╔══════════════════╗\n   ⚙️ PREFIX SET HELP   \n╚══════════════════╝\n\n📌 ব্যবহার : prefixset [new prefix]\n📝 উদাহরণ : prefixset !`,
    threadID, messageID
  );

  const newPrefix = args[0];
  try {
    await Threads.setData(threadID, { PREFIX: newPrefix });
    const threadData = global.data.threadData.get(threadID) || {};
    threadData.PREFIX = newPrefix;
    global.data.threadData.set(threadID, threadData);

    return api.sendMessage(
      `╔══════════════════╗\n   ⚙️ PREFIX UPDATED   \n╚══════════════════╝\n\n✅ Prefix পরিবর্তন হয়েছে!\n🔖 নতুন Prefix : [ ${newPrefix} ]\n\n══════════════════\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch (err) {
    console.error(err);
    return api.sendMessage(`❌ Prefix পরিবর্তন করতে সমস্যা হয়েছে।`, threadID, messageID);
  }
};
