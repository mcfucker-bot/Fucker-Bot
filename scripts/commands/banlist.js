module.exports.config = {
  name: "banlist",
  version: "1.0.0",
  permission: 1,
  credits: "Emon",
  prefix: true,
  description: "Show all banned users",
  category: "admin",
  usages: "banlist",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID } = event;

  const banned = global.data?.userBanned;
  if (!banned || banned.size === 0)
    return api.sendMessage(
      `╔══════════════════╗\n   🚫 BAN LIST   \n╚══════════════════╝\n\n✅ কোনো banned user নেই।\n\n══════════════════\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );

  let msg = `╔══════════════════╗\n   🚫 BANNED USERS   \n╚══════════════════╝\n\n📋 মোট : ${banned.size} জন\n\n`;
  let i = 1;
  for (const [uid, info] of banned) {
    msg += `${i}. 🔖 UID : ${uid}\n   📝 কারণ : ${info.reason}\n   📅 তারিখ : ${info.date}\n\n`;
    i++;
  }
  msg += `══════════════════\n💎 EMon-BHai-BOT`;

  return api.sendMessage(msg, threadID, messageID);
};
