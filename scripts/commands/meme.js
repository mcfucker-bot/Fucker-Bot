module.exports.config = {
  name: "meme",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "Random funny meme পাঠাও",
  category: "fun",
  usages: "meme",
  cooldowns: 8
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID } = event;
  const axios = require("axios");
  api.setMessageReaction("⏳", messageID, () => {}, true);
  try {
    const res = await axios.get("https://meme-api.com/gimme", { timeout: 10000 });
    const { title, url, author, subreddit } = res.data;
    const { createWriteStream } = require("fs");
    const { join } = require("path");
    const tmpFile = join(__dirname, `../../cache/meme_${Date.now()}.jpg`);
    const imgRes = await axios.get(url, { responseType: "stream", timeout: 15000 });
    const writer = createWriteStream(tmpFile);
    imgRes.data.pipe(writer);
    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
    api.setMessageReaction("😂", messageID, () => {}, true);
    return api.sendMessage(
      {
        body: `😂 RANDOM MEME 😂\n━━━━━━━━━━━━━━━━━━\n📌 ${title}\n👤 u/${author} | r/${subreddit}\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
        attachment: require("fs").createReadStream(tmpFile)
      },
      threadID,
      () => require("fs").unlinkSync(tmpFile),
      messageID
    );
  } catch {
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage("❌ Meme load করতে পারিনি! আবার try করো।", threadID, messageID);
  }
};
