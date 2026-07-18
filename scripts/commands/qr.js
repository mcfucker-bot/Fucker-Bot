module.exports.config = {
  name: "qr",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: 'awto',
  description: "Generate a QR code from any text or link",
  category: "utility",
  usages: "qr [text/link]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const QRCode = require("qrcode");
  const fs = require("fs-extra");
  const path = require("path");
  const { threadID, messageID } = event;

  const text = args.join(" ").trim() ||
    (event.type === "message_reply" ? event.messageReply.body : "");

  if (!text) return api.sendMessage(
    `╔══════════════════╗\n   📱 QR GENERATOR   \n╚══════════════════╝\n\n📌 ব্যবহার : qr [text বা link]\n📝 উদাহরণ : qr https://facebook.com`,
    threadID, messageID
  );

  api.setMessageReaction("⏳", messageID, () => {}, true);

  const outPath = path.join(__dirname, "cache", `qr_${event.senderID}.png`);
  try {
    await QRCode.toFile(outPath, text, {
      width: 512,
      margin: 2,
      color: { dark: "#000000", light: "#ffffff" }
    });

    api.setMessageReaction("✅", messageID, () => {}, true);
    return api.sendMessage({
      body: `╔══════════════════╗\n   📱 QR CODE   \n╚══════════════════╝\n\n✅ QR Code তৈরি হয়েছে!\n📝 "${text.length > 50 ? text.substring(0, 50) + "..." : text}"\n\n══════════════════\n💎 EMon-BHai-BOT`,
      attachment: fs.createReadStream(outPath)
    }, threadID, () => {
      try { fs.unlinkSync(outPath); } catch (e) {}
    });
  } catch (err) {
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage(`❌ QR Code তৈরি করতে সমস্যা হয়েছে।\n▸ ${err.message}`, threadID, messageID);
  }
};
