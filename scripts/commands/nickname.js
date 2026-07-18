module.exports.config = {
  name: "nickname",
  version: "1.0.0",
  permission: 1,
  credits: "Emon",
  prefix: true,
  description: "Set nickname for a member in the group",
  category: "group",
  usages: "nickname [@mention / reply] [new name]  |  nickname reset [@mention]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID, mentions, senderID } = event;

  if (!args[0]) return api.sendMessage(
    `╔══════════════════╗\n   ✏️ NICKNAME HELP   \n╚══════════════════╝\n\n📌 ব্যবহার :\n▸ nickname [@mention] [নতুন নাম]\n▸ nickname reset [@mention]\n▸ reply করে : nickname [নতুন নাম]\n\n📝 উদাহরণ :\nnickname @Emon Boss\nnickname reset @Emon`,
    threadID, messageID
  );

  // Reset mode
  if (args[0].toLowerCase() === "reset") {
    const targetID = Object.keys(mentions)[0] ||
      (event.type === "message_reply" ? event.messageReply.senderID : senderID);
    try {
      await api.changeNickname("", threadID, targetID);
      return api.sendMessage(
        `╔══════════════════╗\n   ✏️ NICKNAME RESET   \n╚══════════════════╝\n\n✅ Nickname reset করা হয়েছে!\n\n══════════════════\n💎 EMon-BHai-BOT`,
        threadID, messageID
      );
    } catch (err) {
      return api.sendMessage(`❌ Reset করতে সমস্যা হয়েছে।\n▸ ${err.message}`, threadID, messageID);
    }
  }

  // Set nickname
  let targetID, newName;
  if (Object.keys(mentions).length > 0) {
    targetID = Object.keys(mentions)[0];
    newName  = args.slice(1).join(" ").trim();
  } else if (event.type === "message_reply") {
    targetID = event.messageReply.senderID;
    newName  = args.join(" ").trim();
  } else {
    targetID = senderID;
    newName  = args.join(" ").trim();
  }

  if (!newName) return api.sendMessage(`❌ নতুন nickname লিখতে ভুলে গেছো।`, threadID, messageID);

  try {
    await api.changeNickname(newName, threadID, targetID);
    return api.sendMessage(
      `╔══════════════════╗\n   ✏️ NICKNAME SET   \n╚══════════════════╝\n\n✅ Nickname পরিবর্তন হয়েছে!\n✏️ নতুন নাম : ${newName}\n\n══════════════════\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch (err) {
    return api.sendMessage(`❌ Nickname change করতে সমস্যা হয়েছে।\n▸ ${err.message}`, threadID, messageID);
  }
};
