module.exports.config = {
  name: "convert",
  version: "2.0.0",
  permission: 0,
  credits: "Emon",
  prefix: 'awto',
  description: "Convert video attachment to mp3 audio",
  category: "user",
  usages: "convert [reply to a video]",
  cooldowns: 10
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID } = event;
  const fs    = require("fs-extra");
  const axios = require("axios");
  const path  = require("path");
  const { execSync } = require("child_process");

  if (event.type !== "message_reply" || !event.messageReply.attachments?.length)
    return api.sendMessage(
      `╔══════════════════╗\n   🔄 CONVERT HELP   \n╚══════════════════╝\n\n📌 Video message এ reply দিয়ে এই command দাও।\n▸ Video → MP3 audio`,
      threadID, messageID
    );

  const att = event.messageReply.attachments[0];
  if (!["video", "audio"].includes(att.type))
    return api.sendMessage(`❌ Video অথবা audio তে reply দাও!`, threadID, messageID);

  api.setMessageReaction("⏳", messageID, () => {}, true);

  const inputPath  = path.join(__dirname, "cache", `conv_in_${event.senderID}`);
  const outputPath = path.join(__dirname, "cache", `conv_out_${event.senderID}.mp3`);

  try {
    // Download source file
    const buf = (await axios.get(att.url, { responseType: "arraybuffer", timeout: 30000 })).data;
    fs.writeFileSync(inputPath, Buffer.from(buf));

    // Use system ffmpeg
    execSync(`ffmpeg -y -i "${inputPath}" -vn -acodec libmp3lame -q:a 2 "${outputPath}" 2>/dev/null`, {
      timeout: 60000
    });

    if (!fs.existsSync(outputPath)) throw new Error("Output file not created");

    api.setMessageReaction("✅", messageID, () => {}, true);
    return api.sendMessage({
      body: `╔══════════════════╗\n   🔄 CONVERT DONE   \n╚══════════════════╝\n\n✅ MP3 তৈরি হয়েছে!\n\n══════════════════\n💎 EMon-BHai-BOT`,
      attachment: fs.createReadStream(outputPath)
    }, threadID, () => {
      try { fs.unlinkSync(inputPath); } catch (e) {}
      try { fs.unlinkSync(outputPath); } catch (e) {}
    });

  } catch (err) {
    try { fs.unlinkSync(inputPath); } catch (e) {}
    try { fs.unlinkSync(outputPath); } catch (e) {}
    api.setMessageReaction("❌", messageID, () => {}, true);
    console.error("[convert.js]", err.message);
    return api.sendMessage(`❌ Convert করতে সমস্যা হয়েছে।\n▸ ${err.message}`, threadID, messageID);
  }
};
