module.exports.config = {
  name: "ship",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "দুইজনের compatibility check করো",
  category: "fun",
  usages: "ship [নাম১] + [নাম২]  অথবা  ship @mention @mention",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID, mentions } = event;
  let name1, name2;

  const mentionKeys = Object.keys(mentions);
  if (mentionKeys.length >= 2) {
    name1 = mentions[mentionKeys[0]].replace("@", "");
    name2 = mentions[mentionKeys[1]].replace("@", "");
  } else {
    const text = args.join(" ");
    const parts = text.split(/\+|vs|and/i);
    name1 = parts[0]?.trim();
    name2 = parts[1]?.trim();
  }

  if (!name1 || !name2) {
    return api.sendMessage(
      `💕 SHIP HELP\n━━━━━━━━━━━━━━━━━━\n📌 ব্যবহার:\n▸ ship Emon + Riya\n▸ ship @name1 @name2\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }

  // Deterministic % based on names so same names always give same %
  const str = (name1 + name2).toLowerCase().split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const percent = str % 101;

  let emoji, msg;
  if (percent >= 90) { emoji = "💞"; msg = "Perfect Match! এরা একে অপরের জন্যই তৈরি! 😍"; }
  else if (percent >= 75) { emoji = "❤️"; msg = "খুবই ভালো match! এদের future উজ্জ্বল! 🌟"; }
  else if (percent >= 60) { emoji = "💛"; msg = "ভালো compatibility! চেষ্টা করলে হবে! 😊"; }
  else if (percent >= 40) { emoji = "💜"; msg = "মাঝামাঝি match। একটু effort লাগবে! 🤔"; }
  else if (percent >= 20) { emoji = "🖤"; msg = "কম compatible। কিন্তু অসম্ভব না! 😅"; }
  else { emoji = "💔"; msg = "একদম match না! হয়তো শুধু বন্ধু থাকাই ভালো! 😂"; }

  const bar = "█".repeat(Math.floor(percent / 10)) + "░".repeat(10 - Math.floor(percent / 10));

  return api.sendMessage(
    `💕 SHIP METER 💕\n━━━━━━━━━━━━━━━━━━\n\n👫 ${name1} + ${name2}\n\n${emoji} ${percent}% Compatible\n[${bar}]\n\n📝 ${msg}\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
