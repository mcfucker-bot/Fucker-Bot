module.exports.config = {
  name: "toggle",
  aliases: ["tg"],
  version: "1.0.0",
  permission: 1,
  credits: "Emon",
  prefix: true,
  description: "Enable or disable per-thread bot features",
  category: "admin",
  usages: "toggle [feature] [on/off]  |  toggle list",
  cooldowns: 3
};

// যেসব features toggle করা যাবে
const FEATURES = {
  antilink:  { label: "🔗 AntiLink",  desc: "Group এ link share করা বন্ধ রাখে"       },
  antiswear: { label: "🤬 AntiSwear", desc: "Bad word detect করে warn/kick করে"       },
  rankup:    { label: "🏆 RankUp",    desc: "Chat করলে XP পাওয়ার system"              },
  unsend:    { label: "🗑️ Unsend",    desc: "কেউ message delete করলে group কে জানায়" }
};

module.exports.run = async function ({ api, event, args, Threads }) {
  const { threadID, messageID } = event;

  const sub = (args[0] || "").toLowerCase();

  // ─── toggle list ───
  if (!sub || sub === "list") {
    const threadData = global.data.threadData.get(parseInt(threadID)) || {};

    let rows = "";
    for (const [key, info] of Object.entries(FEATURES)) {
      const isOn = !!threadData[key];
      rows += `${info.label}\n  ${isOn ? "✅ ON" : "❌ OFF"} — ${info.desc}\n\n`;
    }

    return api.sendMessage(
      `╔══════════════════╗\n   ⚙️ TOGGLE LIST   \n╚══════════════════╝\n\n${rows}══════════════════\n📌 ব্যবহার : toggle [feature] on/off\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`,
      threadID, messageID
    );
  }

  // ─── toggle [feature] on/off ───
  const feature = sub;
  const action  = (args[1] || "").toLowerCase();

  if (!FEATURES[feature]) {
    const validList = Object.keys(FEATURES).join(", ");
    return api.sendMessage(
      `❌ "${feature}" নামে কোনো feature নেই!\n\n✅ সঠিক নাম : ${validList}`,
      threadID, messageID
    );
  }

  if (!["on", "off"].includes(action)) {
    return api.sendMessage(
      `❌ on অথবা off লিখতে হবে!\n📌 উদাহরণ : toggle ${feature} on`,
      threadID, messageID
    );
  }

  const isOn = action === "on";
  const threadData = global.data.threadData.get(parseInt(threadID)) || {};
  threadData[feature] = isOn;

  // global cache update
  global.data.threadData.set(parseInt(threadID), threadData);

  // database save
  try {
    await Threads.setData(threadID, { data: threadData });
  } catch (e) {
    console.error("[toggle] DB save error:", e);
  }

  const info = FEATURES[feature];
  return api.sendMessage(
    `╔══════════════════╗\n   ⚙️ TOGGLE   \n╚══════════════════╝\n\n${isOn ? "✅ চালু করা হয়েছে!" : "❌ বন্ধ করা হয়েছে!"}\n\n▸ Feature : ${info.label}\n▸ Status : ${isOn ? "ON 🟢" : "OFF 🔴"}\n\n══════════════════\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`,
    threadID, messageID
  );
};
