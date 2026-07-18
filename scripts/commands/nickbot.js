module.exports.config = {
  name: "nickbot",
  version: "1.0.0",
  permission: 1,
  credits: "EMon-BHai",
  prefix: true,
  description: "এই গ্রুপে bot এর nickname set/reset করো",
  category: "admin",
  usages: "nickbot [nickname]  |  nickbot reset  |  nickbot off",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const botID = api.getCurrentUserID();
  const sub = args[0]?.toLowerCase();

  // Help message
  if (!args.length) return api.sendMessage(
    `🤖 NICKBOT HELP\n━━━━━━━━━━━━━━━━━━\n\n📌 ব্যবহার:\n▸ nickbot [nickname] — Bot এর নতুন nickname দাও\n▸ nickbot reset — Default নামে ফেরত যাও\n▸ nickbot off — Bot এর nickname সরিয়ে দাও\n\n📝 উদাহরণ:\nnickbot EMon-BHai 🤖\nnickbot ꧁ঊ EMon BOT ঊ꧂\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );

  // Reset to default bot name
  if (sub === "reset") {
    const defaultName = `« ${global.config.PREFIX} » ❲ ${global.config.BOTNAME || "EMon-BHai"} ❳`;
    try {
      await new Promise((resolve, reject) =>
        api.changeNickname(defaultName, threadID, botID, (err) => err ? reject(err) : resolve())
      );
      return api.sendMessage(
        `✅ Bot এর nickname reset হয়েছে!\n👤 নতুন নাম: ${defaultName}\n💎 EMon-BHai-BOT`,
        threadID, messageID
      );
    } catch (err) {
      return api.sendMessage(`❌ Nickname change করতে পারিনি!\n🔧 ${err.message || "Unknown error"}\n\n💡 Bot কি group admin?`, threadID, messageID);
    }
  }

  // Remove nickname (blank)
  if (sub === "off") {
    try {
      await new Promise((resolve, reject) =>
        api.changeNickname("", threadID, botID, (err) => err ? reject(err) : resolve())
      );
      return api.sendMessage(
        `✅ Bot এর nickname সরিয়ে দেওয়া হয়েছে!\n💎 EMon-BHai-BOT`,
        threadID, messageID
      );
    } catch (err) {
      return api.sendMessage(`❌ Nickname remove করতে পারিনি!\n💡 Bot কি group admin?`, threadID, messageID);
    }
  }

  // Set custom nickname
  const newNick = args.join(" ").trim();
  if (newNick.length > 75) return api.sendMessage(
    `❌ Nickname সর্বোচ্চ ৭৫ character হতে পারে!\nতোমারটা ${newNick.length} character।`,
    threadID, messageID
  );

  try {
    await new Promise((resolve, reject) =>
      api.changeNickname(newNick, threadID, botID, (err) => err ? reject(err) : resolve())
    );
    return api.sendMessage(
      `✅ Bot এর nickname set হয়েছে!\n━━━━━━━━━━━━━━━━━━\n🤖 নতুন নাম: ${newNick}\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch (err) {
    return api.sendMessage(
      `❌ Nickname change করতে পারিনি!\n🔧 ${err.message || "Unknown error"}\n\n💡 নিশ্চিত হও:\n▸ Bot group admin কিনা\n▸ Nickname-এ কোনো special char সমস্যা নেই কিনা`,
      threadID, messageID
    );
  }
};
