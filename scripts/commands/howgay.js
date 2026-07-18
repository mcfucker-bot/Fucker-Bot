module.exports.config = {
  name: "howgay",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "মজার % meter (fun only!)",
  category: "fun",
  usages: "howgay [@mention / name]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID, mentions, senderID } = event;
  const meters = [
    { name: "😈 Villain Meter", emojis: ["😇", "👿"] },
    { name: "🤡 Clown Meter", emojis: ["😐", "🤡"] },
    { name: "💪 Sigma Meter", emojis: ["🐑", "💪"] },
    { name: "🧠 Big Brain Meter", emojis: ["🤪", "🧠"] },
    { name: "😴 Lazy Meter", emojis: ["⚡", "😴"] },
    { name: "👑 King Meter", emojis: ["🙇", "👑"] },
    { name: "💀 Sus Meter", emojis: ["😇", "💀"] },
    { name: "🔥 Savage Meter", emojis: ["🐣", "🔥"] },
  ];

  const meter = meters[Math.floor(Math.random() * meters.length)];
  const targetID = Object.keys(mentions)[0];
  let name;
  if (targetID) {
    name = mentions[targetID].replace("@", "");
  } else if (args[0]) {
    name = args.join(" ");
  } else {
    name = "তুমি";
  }

  // Deterministic % based on name
  const sum = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const percent = (sum * 7 + 13) % 101;
  const bar = "█".repeat(Math.floor(percent / 10)) + "░".repeat(10 - Math.floor(percent / 10));

  api.setMessageReaction("😂", messageID, () => {}, true);
  return api.sendMessage(
    `${meter.name}\n━━━━━━━━━━━━━━━━━━\n\n🎯 ${name}\n\n${meter.emojis[0]} [${bar}] ${meter.emojis[1]}\n📊 Score: ${percent}%\n\n━━━━━━━━━━━━━━━━━━\n⚠️ এটা শুধু মজার জন্য! 😂\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
