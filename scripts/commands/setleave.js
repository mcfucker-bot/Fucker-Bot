module.exports.config = {
  name: "setleave",
  version: "1.0.0",
  permission: 1,
  credits: "Emon",
  prefix: true,
  description: "Set custom leave message for departing members",
  category: "admin",
  usages: "setleave [message]  |  setleave reset",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args, Threads }) {
  const { threadID, messageID } = event;
  const text = args.join(" ").trim();

  if (!text) return api.sendMessage(
    `╔══════════════════╗\n   👋 SETLEAVE   \n╚══════════════════╝\n\n📌 ব্যবহার :\n▸ setleave [message]\n▸ setleave reset\n\n🔧 Placeholders :\n▸ {name} — সদস্যের নাম\n▸ {type} — Kicked / নিজে চলে গেছে\n\n══════════════════\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`,
    threadID, messageID
  );

  const threadData = global.data.threadData.get(parseInt(threadID)) || {};

  if (text.toLowerCase() === "reset") {
    delete threadData.customLeave;
    global.data.threadData.set(parseInt(threadID), threadData);
    await Threads.setData(threadID, { data: threadData });
    return api.sendMessage(`✅ Leave message reset হয়েছে। Default message ব্যবহার হবে।`, threadID, messageID);
  }

  threadData.customLeave = text;
  global.data.threadData.set(parseInt(threadID), threadData);
  await Threads.setData(threadID, { data: threadData });

  return api.sendMessage(
    `╔══════════════════╗\n   👋 LEAVE SET   \n╚══════════════════╝\n\n✅ Leave message সেট হয়েছে!\n\n📝 Preview :\n"${text}"\n\n══════════════════\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`,
    threadID, messageID
  );
};
