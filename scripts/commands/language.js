module.exports.config = {
  name: "language",
  version: "1.0.0",
  permission: 2,
  credits: "Emon",
  prefix: true,
  description: "Change bot language (vi / en)",
  category: "admin",
  usages: "language [vi/en]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const supported = ["vi", "en"];

  if (!args[0] || !supported.includes(args[0].toLowerCase())) return api.sendMessage(
    `╔══════════════════╗\n   🌐 LANGUAGE HELP   \n╚══════════════════╝\n\n📌 ব্যবহার : language [code]\n\n🌍 সমর্থিত ভাষা :\n▸ vi — Vietnamese\n▸ en — English`,
    threadID, messageID
  );

  const lang = args[0].toLowerCase();
  global.config.language = lang;

  return api.sendMessage(
    `╔══════════════════╗\n   🌐 LANGUAGE SET   \n╚══════════════════╝\n\n✅ Bot এর ভাষা পরিবর্তন হয়েছে!\n🔖 নতুন ভাষা : ${lang === "vi" ? "🇻🇳 Vietnamese" : "🇬🇧 English"}\n\n══════════════════\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
