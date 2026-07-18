module.exports.config = {
  name: "autoreact",
  version: "1.0.0",
  permission: 1,
  credits: "Emon",
  prefix: true,
  description: "Toggle auto-react to all messages",
  category: "group",
  usages: "autoreact [on/off]",
  cooldowns: 5
};

const emojis = ["😍", "❤️", "😆", "😮", "👍", "🎉", "🔥", "💯", "✨", "🌟"];

module.exports.handleEvent = async function({ api, event }) {
  const threadData = global.data.threadData.get(event.threadID) || {};
  if (!threadData.autoReact) return;
  if (!event.body) return;
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  api.setMessageReaction(emoji, event.messageID, () => {}, true);
};

module.exports.run = async function({ api, event, args, Threads }) {
  const { threadID, messageID } = event;
  const action = (args[0] || "").toLowerCase();

  if (!["on", "off"].includes(action)) return api.sendMessage(
    `╔══════════════════╗\n   🎭 AUTOREACT HELP   \n╚══════════════════╝\n\n📌 ব্যবহার :\n▸ autoreact on — চালু করো\n▸ autoreact off — বন্ধ করো`,
    threadID, messageID
  );

  const enable = action === "on";
  const threadData = global.data.threadData.get(threadID) || {};
  threadData.autoReact = enable;
  global.data.threadData.set(threadID, threadData);
  await Threads.setData(threadID, { autoReact: enable });

  return api.sendMessage(
    `╔══════════════════╗\n   🎭 AUTO REACT   \n╚══════════════════╝\n\n${enable ? "✅ Auto-React চালু হয়েছে! 🎉" : "❌ Auto-React বন্ধ করা হয়েছে।"}\n\n══════════════════\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
