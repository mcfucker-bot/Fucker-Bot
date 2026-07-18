module.exports.config = {
  name: "pp",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: 'awto',
  description: "Get profile picture of any Facebook user",
  category: "info",
  usages: "pp [@mention / uid / reply]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const axios = require("axios");
  const fs    = require("fs-extra");
  const path  = require("path");
  const { threadID, senderID, messageID } = event;

  // ─── Target ID বের করো ───
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
    // Get user name
    const info = await api.getUserInfo(id);
    const user = info && info[id];
    const name = user?.name || `UID: ${id}`;

    // HD profile picture URL (Graph API)
    const avatarUrl = `https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;

    const outPath = path.join(__dirname, "cache", `pp_${id}.jpg`);
    const buf = (await axios.get(avatarUrl, { responseType: "arraybuffer", timeout: 15000 })).data;
    fs.writeFileSync(outPath, Buffer.from(buf));

    api.setMessageReaction("✅", messageID, () => {}, true);
    return api.sendMessage({
      body: `╔══════════════════╗\n   🖼️ PROFILE PIC   \n╚══════════════════╝\n\n👤 ${name}\n🔖 UID : ${id}\n\n══════════════════\n💎 EMon-BHai-BOT`,
      attachment: fs.createReadStream(outPath)
    }, threadID, () => { try { fs.unlinkSync(outPath); } catch (e) {} });

  } catch (err) {
    api.setMessageReaction("❌", messageID, () => {}, true);
    console.error("[pp.js]", err.message);
    return api.sendMessage(`❌ Profile picture আনতে সমস্যা হয়েছে।\n▸ ${err.message}`, threadID, messageID);
  }
};
