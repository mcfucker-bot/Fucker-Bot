module.exports.config = {
  name: "mute",
  version: "1.0.0",
  permission: 1,
  credits: "Emon",
  prefix: true,
  description: "Mute or unmute bot replies in this group",
  category: "group",
  usages: "mute [on/off]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args, Threads }) {
  const { threadID, messageID } = event;
  const action = (args[0] || "").toLowerCase();

  if (!["on", "off"].includes(action)) return api.sendMessage(
    `╔══════════════════╗\n   🔇 MUTE HELP   \n╚══════════════════╝\n\n📌 ব্যবহার :\n▸ mute on — Bot এই group এ চুপ করবে\n▸ mute off — Bot আবার reply করবে`,
    threadID, messageID
  );

  const muted = action === "on";
  const threadData = global.data.threadData.get(threadID) || {};
  threadData.muted = muted;
  global.data.threadData.set(threadID, threadData);

  try { await Threads.setData(threadID, { muted }); } catch (e) {}

  return api.sendMessage(
    `╔══════════════════╗\n   ${muted ? "🔇 MUTED" : "🔊 UNMUTED"}   \n╚══════════════════╝\n\n${muted
      ? "✅ Bot এখন এই group এ চুপ করেছে!"
      : "✅ Bot আবার reply করবে!"
    }\n\n══════════════════\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
