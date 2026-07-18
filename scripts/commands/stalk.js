module.exports.config = {
  name: "stalk",
  version: "4.0.0",
  permission: 0,
  credits: "Emon",
  description: "Get Facebook user info by UID / mention / reply",
  prefix: "awto",
  usages: "stalk [uid / @mention / reply]",
  category: "info",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const axios = require("axios");
  const fs    = require("fs-extra");
  const path  = require("path");
  const { threadID, senderID, messageID } = event;

  // ─── ID বের করো ───
  let id = senderID;
  if (event.type === "message_reply") {
    id = event.messageReply.senderID;
  } else if (Object.keys(event.mentions).length > 0) {
    id = Object.keys(event.mentions)[0];
  } else if (args[0] && /^\d{10,}$/.test(args[0])) {
    id = args[0];
  }
  id = String(id);

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const info = await api.getUserInfo(id);
    const user = info && info[id];
    if (!user) {
      api.setMessageReaction("❌", messageID, () => {}, true);
      return api.sendMessage(
        `╔══════════════════╗\n   ❌ NOT FOUND   \n╚══════════════════╝\n\n🔍 UID ${id} এর কোনো তথ্য পাওয়া যায়নি।\n\n▸ সঠিক UID / mention / reply দিয়ে চেষ্টা করো`,
        threadID, messageID
      );
    }

    const name     = user.name     || "N/A";
    const gender   = user.gender == 2 ? "♂️  Male" : user.gender == 1 ? "♀️  Female" : "❓ Unknown";
    const isFriend = user.isFriend  ? "✅  Yes" : "❌  No";
    const isValid  = user.is_verified ? "✅  Verified" : "—";

    const body =
      `╔═══════════════════════╗\n` +
      `   👤  USER PROFILE  👤   \n` +
      `╚═══════════════════════╝\n\n` +
      `┌─────────────────────\n` +
      `│ 📛  নাম       : ${name}\n` +
      `│ 🔖  UID       : ${id}\n` +
      `│ ⚧   Gender    : ${gender}\n` +
      `│ 🤝  Friend?   : ${isFriend}\n` +
      `│ ✅  Verified? : ${isValid}\n` +
      `└─────────────────────\n\n` +
      `🔗  Profile : fb.com/${id}\n\n` +
      `══════════════════════\n` +
      `💎  ${global.config.BOTNAME || "EMon-BHai-BOT"}`;

    // ─── HD Profile Picture ───
    const avatarUrl = `https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
    const outPath   = path.join(__dirname, "cache", `stalk_${id}.jpg`);
    fs.ensureDirSync(path.dirname(outPath));

    try {
      const buf = (await axios.get(avatarUrl, { responseType: "arraybuffer", timeout: 15000 })).data;
      fs.writeFileSync(outPath, Buffer.from(buf));
      api.setMessageReaction("✅", messageID, () => {}, true);
      return api.sendMessage({
        body,
        attachment: fs.createReadStream(outPath)
      }, threadID, () => { try { fs.unlinkSync(outPath); } catch (e) {} });
    } catch (_) {
      // picture ছাড়া text পাঠাও
      api.setMessageReaction("✅", messageID, () => {}, true);
      return api.sendMessage({ body }, threadID);
    }

  } catch (err) {
    api.setMessageReaction("❌", messageID, () => {}, true);
    console.error("[stalk.js]", err.message);
    return api.sendMessage(
      `╔══════════════════╗\n   ❌ ERROR   \n╚══════════════════╝\n\n⚠️  তথ্য আনতে সমস্যা হয়েছে।\n▸  ${err.message}`,
      threadID, messageID
    );
  }
};
