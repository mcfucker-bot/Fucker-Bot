module.exports.config = {
  name: "gcprotect",
  eventType: ["log:thread-name", "log:thread-image", "log:thread-admins"],
  version: "1.0.0",
  credits: "EMon-BHai",
  description: "Protect group from unauthorized name/photo/admin changes (per-thread toggle)"
};

module.exports.run = async function ({ api, event, Users }) {
  const { threadID, logMessageType, logMessageData, author } = event;

  const threadData = global.data.threadData.get(parseInt(threadID)) || {};

  // Author info
  let authorName = "কেউ";
  try {
    const authData = await Users.getData(String(author));
    authorName = authData?.name || authorName;
  } catch (_) {}

  // ─── Group pic পরিবর্তন → সবসময় message (gcprotect toggle লাগবে না) ───
  if (logMessageType === "log:thread-image") {
    return api.sendMessage(
      `🖼️ Group Photo\n\n👤 ${authorName} group এর ছবি পরিবর্তন করেছে।`,
      threadID
    );
  }

  // বাকি সব → gcprotect চালু থাকলেই কাজ করবে
  if (!threadData.gcprotect) return;

  // Bot admin বা group admin হলে skip
  const adminIDs = global.config.ADMINBOT || [];
  if (adminIDs.includes(String(author))) return;
  try {
    const threadInfo = await api.getThreadInfo(threadID);
    if (threadInfo.adminIDs?.some(a => a.uid == author)) return;
  } catch (e) { /* silent */ }

  // ─── Group name পরিবর্তন ───
  if (logMessageType === "log:thread-name") {
    const oldName = logMessageData.oldName || "আগের নাম";
    const newName = logMessageData.name || logMessageData.newName || "নতুন নাম";

    // নাম আগেরটায় ফিরিয়ে দেওয়ার চেষ্টা
    try {
      await api.setTitle(oldName, threadID);
    } catch (e) { /* bot admin না হলে fail হবে */ }

    return api.sendMessage(
      `╔══════════════════╗\n   🛡️ GC PROTECT ⚠️   \n╚══════════════════╝\n\n🚫 ${authorName} group এর নাম পরিবর্তন করেছে!\n\n▸ আগে : ${oldName}\n▸ এখন : ${newName}\n\n🔄 নাম আগের অবস্থায় ফিরিয়ে দেওয়া হয়েছে।\n\n══════════════════\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`,
      threadID
    );
  }

  // ─── Group photo পরিবর্তন ───
  if (logMessageType === "log:thread-image") {
    return api.sendMessage(
      `╔══════════════════╗\n   🛡️ GC PROTECT ⚠️   \n╚══════════════════╝\n\n🚫 ${authorName} group এর ছবি পরিবর্তন করেছে!\n\n⚠️ শুধুমাত্র Group Admin এটি করতে পারবে।\n\n══════════════════\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`,
      threadID
    );
  }

  // ─── Admin পরিবর্তন ───
  if (logMessageType === "log:thread-admins") {
    const targetID = String(
      logMessageData.TARGET_ID ||
      logMessageData.targetID  ||
      (Array.isArray(logMessageData.targetIDs) ? logMessageData.targetIDs[0] : null) ||
      ""
    );
    const adminEvent = logMessageData.ADMIN_EVENT || logMessageData.adminEvent || "";
    if (!targetID || !adminEvent) return;

    let targetName = targetID;
    try {
      const info = await Users.getData(targetID);
      targetName = info?.name || targetID;
    } catch (_) {}

    const action = adminEvent === "add_admin" ? "Admin বানিয়েছে" : "Admin থেকে সরিয়েছে";
    return api.sendMessage(
      `╔══════════════════╗\n   🛡️ GC PROTECT ⚠️   \n╚══════════════════╝\n\n🚫 ${authorName} — ${targetName} কে ${action}!\n\n⚠️ অননুমোদিত পরিবর্তন সনাক্ত হয়েছে।\n\n══════════════════\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`,
      threadID
    );
  }
};
