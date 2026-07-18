module.exports.config = {
  name: "uid",
  version: "2.0.0",
  permission: 0,
  credits: "Emon",
  prefix: 'awto',
  description: "Get Facebook User ID",
  category: "without prefix",
  usages: "uid | uid [@mention] | reply to get someone's UID",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID, senderID, mentions } = event;

  // ─── Reply করে কারো UID নাও ───
  if (event.type === "message_reply") {
    const targetID = event.messageReply.senderID;
    let name = "User";
    try {
      const info = await api.getUserInfo(targetID);
      if (info && info[targetID]) name = info[targetID].name;
    } catch (e) {}
    return api.sendMessage(
      `╔══════════════════╗\n   🪪 USER ID   \n╚══════════════════╝\n\n👤 ${name}\n🔖 UID : ${targetID}\n\n══════════════════\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }

  // ─── Mention করলে তাদের UID দাও ───
  const mentionIDs = Object.keys(mentions || {});
  if (mentionIDs.length > 0) {
    let msg = `╔══════════════════╗\n   🪪 USER IDs   \n╚══════════════════╝\n\n`;
    for (const id of mentionIDs) {
      const rawName = mentions[id] || "";
      const name = rawName.replace(/^@/, "");
      msg += `👤 ${name}\n🔖 UID : ${id}\n\n`;
    }
    msg += `══════════════════\n💎 EMon-BHai-BOT`;
    return api.sendMessage(msg, threadID, messageID);
  }

  // ─── কাউকে mention না করলে নিজের UID ───
  let myName = "তুমি";
  try {
    const info = await api.getUserInfo(senderID);
    if (info && info[senderID]) myName = info[senderID].name;
  } catch (e) {}

  return api.sendMessage(
    `╔══════════════════╗\n   🪪 YOUR UID   \n╚══════════════════╝\n\n👤 ${myName}\n🔖 UID : ${senderID}\n\n📌 কারো UID নিতে :\n▸ তার message এ reply দিয়ে uid\n▸ @mention করে uid\n\n══════════════════\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
