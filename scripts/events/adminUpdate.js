module.exports.config = {
  name: "adminUpdate",
  eventType: ["log:thread-admins"],
  version: "2.0.0",
  credits: "EMon-BHai",
  description: "Notify when someone is promoted or demoted as group admin"
};

module.exports.run = async function ({ api, event, Users }) {
  const { threadID, logMessageData, author } = event;

  // ─── Facebook API বিভিন্ন field name ব্যবহার করে, সব cover করো ───
  const targetID = String(
    logMessageData.TARGET_ID ||
    logMessageData.targetID  ||
    (Array.isArray(logMessageData.targetIDs) ? logMessageData.targetIDs[0] : null) ||
    ""
  );
  const adminEvent = logMessageData.ADMIN_EVENT || logMessageData.adminEvent || "";

  if (!targetID || !adminEvent) return;

  // ─── User info ───
  let userName = "একজন সদস্য";
  try {
    const userData = await Users.getData(targetID);
    userName = userData?.name || userName;
  } catch (_) {
    try {
      const info = await api.getUserInfo(targetID);
      userName = info?.[targetID]?.name || userName;
    } catch (_) {}
  }

  // ─── Author info (কে করলো) ───
  let authorName = "কেউ";
  try {
    const authData = await Users.getData(String(author));
    authorName = authData?.name || authorName;
  } catch (_) {}

  let msg = "";

  if (adminEvent === "add_admin") {
    msg =
      `╔═══════════════════════╗\n` +
      `   👑  ADMIN PROMOTED  👑   \n` +
      `╚═══════════════════════╝\n\n` +
      `🎉  অভিনন্দন!\n\n` +
      `┌─────────────────────\n` +
      `│ 👤  নাম    : ${userName}\n` +
      `│ 🔖  UID    : ${targetID}\n` +
      `│ 👑  Status : Admin হয়েছে\n` +
      `│ ✍️   করেছে : ${authorName}\n` +
      `└─────────────────────\n\n` +
      `✅  ${userName} এখন এই group এর Admin!\n\n` +
      `══════════════════════\n` +
      `💎  ${global.config.BOTNAME || "EMon-BHai-BOT"}`;

  } else if (adminEvent === "remove_admin") {
    msg =
      `╔═══════════════════════╗\n` +
      `   ⚠️  ADMIN DEMOTED  ⚠️   \n` +
      `╚═══════════════════════╝\n\n` +
      `😔  দুঃখজনক!\n\n` +
      `┌─────────────────────\n` +
      `│ 👤  নাম    : ${userName}\n` +
      `│ 🔖  UID    : ${targetID}\n` +
      `│ 🚫  Status : Admin থেকে বাদ\n` +
      `│ ✍️   করেছে : ${authorName}\n` +
      `└─────────────────────\n\n` +
      `❌  ${userName} আর এই group এর Admin নেই।\n\n` +
      `══════════════════════\n` +
      `💎  ${global.config.BOTNAME || "EMon-BHai-BOT"}`;
  }

  if (msg) {
    return api.sendMessage({ body: msg }, threadID);
  }
};
