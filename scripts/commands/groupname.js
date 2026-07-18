module.exports.config = {
  name: "groupname",
  version: "1.0.0",
  permission: 1,
  credits: "Emon",
  prefix: true,
  description: "Change the group name",
  category: "group",
  usages: "groupname [new name]",
  cooldowns: 10
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;

  const newName = args.join(" ").trim();
  if (!newName) return api.sendMessage(
    `╔══════════════════╗\n   📝 GROUPNAME HELP   \n╚══════════════════╝\n\n📌 ব্যবহার : groupname [নতুন নাম]\n📝 উদাহরণ : groupname EMon Gang`,
    threadID, messageID
  );

  try {
    await api.setTitle(newName, threadID);
    return api.sendMessage(
      `╔══════════════════╗\n   📝 GROUP RENAMED   \n╚══════════════════╝\n\n✅ Group এর নাম পরিবর্তন হয়েছে!\n📛 নতুন নাম : ${newName}\n\n══════════════════\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch (err) {
    return api.sendMessage(`❌ Group rename করতে সমস্যা হয়েছে।\n▸ ${err.message}`, threadID, messageID);
  }
};
