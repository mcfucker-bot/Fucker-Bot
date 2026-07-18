module.exports.config = {
  name: "rate",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "যেকোনো কিছু rate করো ১০/১০",
  category: "fun",
  usages: "rate [কিছু একটা]",
  cooldowns: 3
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  if (!args[0]) return api.sendMessage("📌 ব্যবহার: rate [কিছু একটা]", threadID, messageID);
  const topic = args.join(" ");
  // Deterministic based on topic text
  const sum = topic.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const score = sum % 11;
  const bar = "⭐".repeat(score) + "☆".repeat(10 - score);
  let comment;
  if (score === 10) comment = "নিখুঁত! ১০ এ ১০! 🏆";
  else if (score >= 8) comment = "অসাধারণ! 🌟";
  else if (score >= 6) comment = "ভালো! 😊";
  else if (score >= 4) comment = "মোটামুটি। 🤔";
  else if (score >= 2) comment = "তেমন ভালো না। 😕";
  else comment = "একেবারেই না! ❌";

  api.setMessageReaction("⭐", messageID, () => {}, true);
  return api.sendMessage(
    `⭐ RATING ⭐\n━━━━━━━━━━━━━━━━━━\n\n🎯 "${topic}"\n\n${bar}\n📊 স্কোর: ${score}/10\n💬 ${comment}\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
