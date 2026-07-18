module.exports.config = {
  name: "add",
  version: "1.0.0",
  permission: 1,
  credits: "Emon",
  prefix: true,
  description: "Add a user to the group by UID",
  category: "admin",
  usages: "add [uid]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;

  const targetID = args[0];
  if (!targetID || isNaN(targetID))
    return api.sendMessage(
      `╔══════════════════╗\n   ➕ ADD HELP   \n╚══════════════════╝\n\n📌 ব্যবহার : add [uid]\n📝 উদাহরণ : add 100012345678`,
      threadID, messageID
    );

  let name = targetID;
  try {
    const info = await api.getUserInfo(targetID);
    name = (info && info[targetID]) ? info[targetID].name : targetID;
  } catch (e) {}

  try {
    await api.addUserToGroup(targetID, threadID);
    return api.sendMessage(
      `╔══════════════════╗\n   ➕ USER ADDED   \n╚══════════════════╝\n\n` +
      `✅ ${name} কে group এ add করা হয়েছে!\n` +
      `🔖 UID : ${targetID}\n\n` +
      `══════════════════\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch (err) {
    return api.sendMessage(
      `❌ Add করতে সমস্যা হয়েছে!\n▸ ${err?.message || "Bot কে group admin করো।"}`,
      threadID, messageID
    );
  }
};
