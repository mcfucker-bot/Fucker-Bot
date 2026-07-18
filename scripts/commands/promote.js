module.exports.config = {
  name: "promote",
  version: "1.0.0",
  permission: 1,
  credits: "EMon",
  prefix: true,
  description: "কাউকে group admin বানাও",
  category: "admin",
  usages: "promote [@mention]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args, Users }) {
  const { threadID, messageID, mentions, senderID } = event;
  const targetID = Object.keys(mentions)[0] || args[0];
  if (!targetID) return api.sendMessage("📌 ব্যবহার: promote @নাম", threadID, messageID);
  if (targetID === api.getCurrentUserID()) return api.sendMessage("❌ Bot-কে promote করা যাবে না!", threadID, messageID);

  try {
    const info = await api.getThreadInfo(threadID);
    const isAlreadyAdmin = info.adminIDs?.some(a => a.id === targetID);
    if (isAlreadyAdmin) return api.sendMessage("⚠️ এই ব্যক্তি ইতিমধ্যে admin!", threadID, messageID);

    await api.changeAdminStatus(threadID, targetID, true);
    let name = Object.values(mentions)[0] || "Member";
    if (name.startsWith("@")) name = name.slice(1);

    return api.sendMessage(
      `👑 PROMOTED! 👑\n━━━━━━━━━━━━━━━━━━\n\n✅ ${name} কে Admin করা হয়েছে!\n\n🎉 Congratulations!\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch (e) {
    return api.sendMessage(`❌ Promote করতে পারিনি!\n🔧 Error: ${e.message}`, threadID, messageID);
  }
};
