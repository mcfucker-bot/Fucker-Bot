module.exports.config = {
  name: "demote",
  version: "1.0.0",
  permission: 1,
  credits: "EMon",
  prefix: true,
  description: "Admin থেকে সরাও",
  category: "admin",
  usages: "demote [@mention]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args, Users }) {
  const { threadID, messageID, mentions, senderID } = event;
  const targetID = Object.keys(mentions)[0] || args[0];
  if (!targetID) return api.sendMessage("📌 ব্যবহার: demote @নাম", threadID, messageID);
  if (targetID === api.getCurrentUserID()) return api.sendMessage("❌ Bot-কে demote করা যাবে না!", threadID, messageID);

  try {
    const info = await api.getThreadInfo(threadID);
    const isAdmin = info.adminIDs?.some(a => a.id === targetID);
    if (!isAdmin) return api.sendMessage("⚠️ এই ব্যক্তি admin নয়!", threadID, messageID);

    await api.changeAdminStatus(threadID, targetID, false);
    let name = Object.values(mentions)[0] || "Member";
    if (name.startsWith("@")) name = name.slice(1);

    return api.sendMessage(
      `🔻 DEMOTED 🔻\n━━━━━━━━━━━━━━━━━━\n\n❌ ${name} এর Admin মর্যাদা সরানো হয়েছে।\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch (e) {
    return api.sendMessage(`❌ Demote করতে পারিনি!\n🔧 Error: ${e.message}`, threadID, messageID);
  }
};
