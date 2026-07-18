module.exports.config = {
  name: "rules",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "Group rules দেখো বা set করো",
  category: "admin",
  usages: "rules  |  rules set [rules text]  |  rules clear",
  cooldowns: 5
};

if (!global.groupRules) global.groupRules = {};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const sub = args[0]?.toLowerCase();

  if (sub === "set") {
    const text = args.slice(1).join(" ");
    if (!text) return api.sendMessage("📌 ব্যবহার: rules set [rules লেখো]", threadID, messageID);
    global.groupRules[threadID] = text;
    return api.sendMessage(
      `✅ GROUP RULES SET!\n━━━━━━━━━━━━━━━━━━\n\n📋 নতুন rules save হয়েছে!\n"rules" দিয়ে দেখতে পারবে।\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }

  if (sub === "clear") {
    delete global.groupRules[threadID];
    return api.sendMessage("🗑️ Group rules clear করা হয়েছে!", threadID, messageID);
  }

  const savedRules = global.groupRules[threadID];
  if (!savedRules) {
    return api.sendMessage(
      `📋 GROUP RULES\n━━━━━━━━━━━━━━━━━━\n\n⚠️ এই গ্রুপে কোনো rules set করা হয়নি।\n\n📌 Admin-রা rules set করতে পারেন:\nrules set [rules লেখো]\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }

  return api.sendMessage(
    `📋 GROUP RULES 📋\n━━━━━━━━━━━━━━━━━━\n\n${savedRules}\n\n━━━━━━━━━━━━━━━━━━\n⚠️ Rules ভাঙলে action নেওয়া হবে!\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
