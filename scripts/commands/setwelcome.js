module.exports.config = {
  name: "setwelcome",
  version: "1.0.0",
  permission: 1,
  credits: "Emon",
  prefix: true,
  description: "Set custom welcome message for new members",
  category: "admin",
  usages: "setwelcome [message]  |  setwelcome reset",
  cooldowns: 5
};

// Available placeholders
const PLACEHOLDERS = `▸ {name} — নতুন member এর নাম
▸ {threadName} — Group এর নাম
▸ {soThanhVien} — Member সংখ্যা
▸ {type} — you / friends`;

module.exports.run = async function ({ api, event, args, Threads }) {
  const { threadID, messageID } = event;
  const text = args.join(" ").trim();

  if (!text) return api.sendMessage(
    `╔══════════════════╗\n   👋 SETWELCOME   \n╚══════════════════╝\n\n📌 ব্যবহার :\n▸ setwelcome [message]\n▸ setwelcome reset\n\n🔧 Placeholders :\n${PLACEHOLDERS}\n\n══════════════════\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`,
    threadID, messageID
  );

  const threadData = global.data.threadData.get(parseInt(threadID)) || {};

  if (text.toLowerCase() === "reset") {
    delete threadData.customJoin;
    global.data.threadData.set(parseInt(threadID), threadData);
    await Threads.setData(threadID, { data: threadData });
    return api.sendMessage(
      `✅ Welcome message reset হয়েছে। Default message ব্যবহার হবে।`,
      threadID, messageID
    );
  }

  threadData.customJoin = text;
  global.data.threadData.set(parseInt(threadID), threadData);
  await Threads.setData(threadID, { data: threadData });

  return api.sendMessage(
    `╔══════════════════╗\n   👋 WELCOME SET   \n╚══════════════════╝\n\n✅ Welcome message সেট হয়েছে!\n\n📝 Preview :\n"${text}"\n\n══════════════════\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`,
    threadID, messageID
  );
};
