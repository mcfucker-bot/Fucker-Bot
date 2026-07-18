module.exports.config = {
  name: "pinterest",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: 'awto',
  description: "Search and download images from Pinterest",
  category: "user",
  usages: "pinterest [keyword]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  const path = require("path");
  const { threadID, messageID } = event;

  if (!args[0]) return api.sendMessage(
    `╔══════════════════╗\n   📌 PINTEREST HELP   \n╚══════════════════╝\n\n📌 ব্যবহার : pinterest [keyword]\n📝 উদাহরণ : pinterest anime wallpaper`,
    threadID, messageID
  );

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const res = await axios.get(`https://api.ravenllm.eu.org/pinterest?search=${encodeURIComponent(args.join(" "))}&apikey=ravenllm`);
    const images = res.data.images || res.data;

    if (!images || images.length === 0) return api.sendMessage(`❌ "${args.join(" ")}" এর জন্য কোনো ছবি পাওয়া যায়নি।`, threadID, messageID);

    const streams = [];
    let count = 0;
    for (const imgUrl of images) {
      if (count >= 6) break;
      try {
        const imgRes = await axios.get(imgUrl, { responseType: "arraybuffer" });
        const imgPath = path.join(__dirname, `/cache/pin_${count}.jpg`);
        fs.writeFileSync(imgPath, Buffer.from(imgRes.data, "binary"));
        streams.push(fs.createReadStream(imgPath).on("end", () => { if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath); }));
        count++;
      } catch (e) { continue; }
    }

    if (streams.length === 0) return api.sendMessage(`❌ ছবি লোড করতে সমস্যা হয়েছে।`, threadID, messageID);

    return api.sendMessage({
      body: `╔══════════════════╗\n   📌 PINTEREST   \n╚══════════════════╝\n\n🔍 "${args.join(" ")}"\n🖼️ ${streams.length}টি ছবি পাওয়া গেছে!\n\n══════════════════\n💎 EMon-BHai-BOT`,
      attachment: streams
    }, threadID, messageID);
  } catch (err) {
    console.error(err);
    return api.sendMessage(`❌ সমস্যা হয়েছে। আবার চেষ্টা করো।`, threadID, messageID);
  }
};
