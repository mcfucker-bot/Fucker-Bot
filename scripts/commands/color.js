module.exports.config = {
  name: "color",
  version: "1.0.0",
  permission: 1,
  credits: "Emon",
  prefix: true,
  description: "Change the thread/chat color",
  category: "group",
  usages: "color [color name / hex code]",
  cooldowns: 5
};

// Available colors mapping
const COLORS = {
  "red"       : "#e68585",
  "blue"      : "#0084ff",
  "green"     : "#13cf13",
  "yellow"    : "#ffff00",
  "purple"    : "#7646ff",
  "pink"      : "#ff85c0",
  "orange"    : "#ffa500",
  "teal"      : "#20cef5",
  "lavender"  : "#a695c7",
  "coral"     : "#ff7e29",
  "sky"       : "#36c5f0",
  "mint"      : "#3eaf7c",
  "gold"      : "#ffd700",
  "white"     : "#ffffff",
  "black"     : "#1e1e1e",
  "default"   : "#0084ff"
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;

  const input = args.join(" ").toLowerCase().trim();
  if (!input) {
    const list = Object.keys(COLORS).map(k => `▸ ${k}`).join("\n");
    return api.sendMessage(
      `╔══════════════════╗\n   🎨 COLOR HELP   \n╚══════════════════╝\n\n📌 ব্যবহার : color [রং]\n\n🎨 Available colors :\n${list}\n\n📝 অথবা hex code : color #ff5500\n\n══════════════════\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }

  // Resolve color
  let hex = COLORS[input] || null;
  if (!hex && /^#[0-9a-fA-F]{6}$/.test(input)) hex = input;
  if (!hex && /^[0-9a-fA-F]{6}$/.test(input)) hex = `#${input}`;

  if (!hex) return api.sendMessage(
    `❌ "${input}" রং পাওয়া যায়নি।\n▸ color লিখলে সব available color দেখাবে।`,
    threadID, messageID
  );

  try {
    await api.changeThreadColor(hex, threadID);
    return api.sendMessage(
      `╔══════════════════╗\n   🎨 COLOR CHANGED   \n╚══════════════════╝\n\n✅ Chat color পরিবর্তন হয়েছে!\n🎨 Color : ${hex}\n\n══════════════════\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch (err) {
    return api.sendMessage(`❌ Color change করতে সমস্যা হয়েছে।\n▸ ${err.message}`, threadID, messageID);
  }
};
