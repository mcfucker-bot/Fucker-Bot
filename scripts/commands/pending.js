module.exports.config = {
  name: "pending",
  version: "1.0.0",
  permission: 2,
  credits: "Emon",
  prefix: true,
  description: "Manage pending group join requests",
  category: "admin",
  usages: "pending [list/approve/deny] [ID]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const action = args[0] ? args[0].toLowerCase() : "list";

  if (action === "list") {
    try {
      const pending = await api.getPendingThreads ? await api.getPendingThreads() : [];
      if (!pending || pending.length === 0) return api.sendMessage(
        `╔══════════════════╗\n   📋 PENDING LIST   \n╚══════════════════╝\n\n✅ কোনো pending request নেই।`,
        threadID, messageID
      );

      let msg = `╔══════════════════╗\n   📋 PENDING LIST   \n╚══════════════════╝\n\n📋 মোট : ${pending.length}টি\n\n`;
      pending.forEach((p, i) => {
        msg += `${i + 1}. 💬 ${p.threadName || 'Unknown'}\n   🔖 ID : ${p.threadID}\n\n`;
      });
      msg += `══════════════════\n📌 pending approve/deny [ID]`;
      return api.sendMessage(msg, threadID, messageID);
    } catch (err) {
      return api.sendMessage(`❌ Pending list আনতে সমস্যা হয়েছে।`, threadID, messageID);
    }
  }

  if (["approve", "deny"].includes(action) && args[1]) {
    try {
      const targetID = args[1];
      if (action === "approve") await api.handleMessageRequest(targetID, true);
      else await api.handleMessageRequest(targetID, false);
      return api.sendMessage(
        `✅ ${action === "approve" ? "Approved" : "Denied"} : ${targetID}`,
        threadID, messageID
      );
    } catch (err) {
      return api.sendMessage(`❌ সমস্যা হয়েছে।`, threadID, messageID);
    }
  }

  return api.sendMessage(
    `╔══════════════════╗\n   📋 PENDING HELP   \n╚══════════════════╝\n\n📌 ব্যবহার :\n▸ pending list\n▸ pending approve [ID]\n▸ pending deny [ID]`,
    threadID, messageID
  );
};
