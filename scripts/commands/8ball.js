module.exports.config = {
  name: "8ball",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: 'awto',
  description: "Ask the magic 8-ball a yes/no question",
  category: "fun",
  usages: "8ball [question]",
  cooldowns: 3
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;

  const question = args.join(" ").trim();
  if (!question) return api.sendMessage(
    `╔══════════════════╗\n   🎱 MAGIC 8-BALL   \n╚══════════════════╝\n\n📌 ব্যবহার : 8ball [question]\n📝 উদাহরণ : 8ball Will I pass my exam?`,
    threadID, messageID
  );

  const answers = [
    { text: "✅ হ্যাঁ, অবশ্যই!", emoji: "✅" },
    { text: "✅ এটা নিশ্চিত।", emoji: "✅" },
    { text: "✅ সন্দেহ নেই!", emoji: "✅" },
    { text: "✅ হ্যাঁ, আমার মতে।", emoji: "✅" },
    { text: "✅ খুব সম্ভব।", emoji: "✅" },
    { text: "🌀 এখনই বলতে পারছি না।", emoji: "🌀" },
    { text: "🌀 পরে জিজ্ঞেস করো।", emoji: "🌀" },
    { text: "🌀 এখন বলা সম্ভব না।", emoji: "🌀" },
    { text: "❌ না, মনে হয় না।", emoji: "❌" },
    { text: "❌ সম্ভাবনা কম।", emoji: "❌" },
    { text: "❌ একদম না!", emoji: "❌" },
    { text: "❌ আমার উত্তর না।", emoji: "❌" }
  ];

  const pick = answers[Math.floor(Math.random() * answers.length)];

  return api.sendMessage(
    `╔══════════════════╗\n   🎱 MAGIC 8-BALL   \n╚══════════════════╝\n\n❓ প্রশ্ন :\n${question}\n\n🎱 উত্তর :\n${pick.text}\n\n══════════════════\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
