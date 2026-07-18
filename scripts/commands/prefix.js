module.exports.config = {
  name: "prefix",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: 'awto',
  description: "Show the current command prefix",
  category: "system",
  usages: "prefix",
  cooldowns: 5
};

module.exports.run = async function({ api, event, Threads }) {
  const threadData = global.data.threadData.get(event.threadID) || {};
  const threadPrefix = threadData.PREFIX || global.config.PREFIX;

  return api.sendMessage(
    `╔══════════════════╗\n   ⚙️ BOT PREFIX   \n╚══════════════════╝\n\n🔖 বর্তমান Prefix : [ ${threadPrefix} ]\n\n📌 Prefix পরিবর্তন করতে :\n▸ ${threadPrefix}prefixset [new prefix]\n\n══════════════════\n💎 EMon-BHai-BOT`,
    event.threadID, event.messageID
  );
};
