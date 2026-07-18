module.exports.config = {
  name: "kick",
  version: "1.0.0",
  permission: 1,
  credits: "Emon",
  prefix: true,
  description: "Kick a member from the group",
  category: "admin",
  usages: "kick [@mention / uid] [reason]",
  cooldowns: 3
};

module.exports.run = async function({ api, event, args, Users }) {
  const { threadID, messageID, mentions, senderID } = event;

  const targetID = Object.keys(mentions)[0] || args[0];
  if (!targetID || isNaN(targetID))
    return api.sendMessage(
      `╔══════════════════╗\n   👢 KICK HELP   \n╚══════════════════╝\n\n📌 ব্যবহার :\n▸ kick [@mention] [কারণ]\n▸ kick [uid] [কারণ]`,
      threadID, messageID
    );

  const adminList = global.config?.ADMINBOT || [];
  const opList    = global.config?.OPERATOR  || [];
  if ([...adminList, ...opList].includes(targetID))
    return api.sendMessage(`❌ Bot admin কে kick করা যাবে না।`, threadID, messageID);

  if (targetID === api.getCurrentUserID())
    return api.sendMessage(`❌ Bot নিজেকে kick করতে পারবে না।`, threadID, messageID);

  const reason = args.slice(Object.keys(mentions).length > 0 ? 1 : 1).join(" ") || "কোনো কারণ দেওয়া হয়নি";

  let name = targetID;
  try {
    const info = await api.getUserInfo(targetID);
    name = (info && info[targetID]) ? info[targetID].name : targetID;
  } catch (e) {}

  try {
    await api.removeUserFromGroup(targetID, threadID);
    return api.sendMessage(
      `╔══════════════════╗\n   👢 KICKED!   \n╚══════════════════╝\n\n` +
      `👤 ${name} কে group থেকে বের করা হয়েছে!\n` +
      `📝 কারণ : ${reason}\n\n` +
      `══════════════════\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch (err) {
    return api.sendMessage(
      `❌ Kick করতে সমস্যা হয়েছে!\n▸ Bot কে group admin করো।`,
      threadID, messageID
    );
  }
};
