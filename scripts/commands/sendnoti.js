module.exports.config = {
  name: "sendnoti",
  version: "1.0.0",
  permission: 2,
  credits: "Emon",
  prefix: true,
  description: "Broadcast a message to all active threads",
  category: "admin",
  usages: "sendnoti [message]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID, senderID } = event;

  if (!args[0]) return api.sendMessage(
    `╔══════════════════╗\n   📢 SENDNOTI HELP   \n╚══════════════════╝\n\n📌 ব্যবহার : sendnoti [message]\n📝 উদাহরণ : sendnoti Bot maintenance at 9PM`,
    threadID, messageID
  );

  const message = args.join(" ");
  const allThreads = [...global.data.allThreadID];
  let success = 0, failed = 0;

  api.setMessageReaction("⏳", messageID, () => {}, true);

  for (const tid of allThreads) {
    try {
      await api.sendMessage(
        `╔══════════════════╗\n   📢 NOTIFICATION   \n╚══════════════════╝\n\n${message}\n\n══════════════════\n💎 EMon-BHai-BOT`,
        tid
      );
      success++;
    } catch (e) { failed++; }
  }

  return api.sendMessage(
    `╔══════════════════╗\n   📢 NOTIFICATION SENT   \n╚══════════════════╝\n\n✅ সফল : ${success}টি group\n❌ ব্যর্থ : ${failed}টি group\n📊 মোট : ${allThreads.length}টি\n\n══════════════════\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
