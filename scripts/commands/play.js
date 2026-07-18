const fs = require("fs");
const path = require("path");
const axios = require("axios");
const nayan = require("nayan-media-downloaders");
const Youtube = require("youtube-search-api");
const ffmpeg = require("fluent-ffmpeg");

// অডিও ডাউনলোড এবং MP3 তে কনভার্ট করার ফাংশন
async function downloadAndConvertToMp3(url, filePath) {
  return new Promise((resolve, reject) => {
    const tempFile = filePath.replace(".mp3", ".tmp");

    axios({
      method: "get",
      url,
      responseType: "stream",
    })
      .then((response) => {
        const writer = fs.createWriteStream(tempFile);
        response.data.pipe(writer);

        writer.on("finish", () => {
          ffmpeg(tempFile)
            .toFormat("mp3")
            .on("end", () => {
              try { fs.unlinkSync(tempFile); } catch(_) {}
              resolve(filePath);
            })
            .on("error", reject)
            .save(filePath);
        });

        writer.on("error", reject);
      })
      .catch(reject);
  });
}

module.exports.config = {
  name: "play",
  version: "1.0.0",
  permission: 0,
  credits: "Developed by Mohammad Nayan",
  prefix: true,
  description: "ইউটিউব থেকে সরাসরি প্রথম গানটি প্লে করুন।",
  category: "media",
  usages: "play [গান এর নাম] / music [গান এর নাম]",
  cooldowns: 5,
  aliases: ["music"] // আপনার অনুরোধ অনুযায়ী এখানে music যুক্ত করা হয়েছে
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const keyword = args.join(" ");

  if (!keyword) {
    return api.sendMessage("⚠️ দয়া করে একটি গানের নাম দিন। যেমন: play ghum odd", threadID, messageID);
  }

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    // ইউটিউবে প্রথম রেজাল্টটি সার্চ করা হচ্ছে
    const results = await Youtube.GetListByKeyword(keyword, false, 1);
    if (!results.items || !results.items.length) {
      api.setMessageReaction("❌", messageID, () => {}, true);
      return api.sendMessage("❌ ইউটিউবে কোনো গান পাওয়া যায়নি।", threadID, messageID);
    }

    const videoId = results.items[0].id;
    const title = results.items[0].title;
    const selectedLink = `https://www.youtube.com/watch?v=${videoId}`;

    // লোডিং মেসেজ পাঠানো হচ্ছে
    api.sendMessage(`🎧 Searching & downloading: ${title}`, threadID, async (err, info) => {
      if (err) return;

      const cacheDir = path.join(__dirname, "cache");
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
      }
      const filePath = path.join(cacheDir, `play_${Date.now()}.mp3`);

      try {
        const data = await nayan.ytdown(selectedLink);
        const audioUrl = data.data.audio;

        // ডাউনলোড এবং কনভার্ট শুরু
        await downloadAndConvertToMp3(audioUrl, filePath);

        // লোডিং মেসেজটি ডিলিট (unsend) করা হচ্ছে
        try { api.unsendMessage(info.messageID); } catch (_) {}

        api.setMessageReaction("✅", messageID, () => {}, true);

        // গানটি চ্যাটে পাঠানো হচ্ছে
        api.sendMessage({
          body: `🎵 Title: ${title}\n✅ Converted to MP3 format.`,
          attachment: fs.createReadStream(filePath)
        }, threadID, () => {
          // গান পাঠানো শেষ হলে ক্যাশ ফাইল ডিলিট করে দেওয়া হবে
          try { fs.unlinkSync(filePath); } catch (e) { console.error("❌ Failed to delete file:", e); }
        }, messageID);

      } catch (error) {
        console.error("❌ Error in download/convert:", error);
        try { api.unsendMessage(info.messageID); } catch (_) {}
        api.setMessageReaction("❌", messageID, () => {}, true);
        api.sendMessage("❌ গানটি প্লে করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।", threadID, messageID);
        if (fs.existsSync(filePath)) try { fs.unlinkSync(filePath); } catch(_) {}
      }
    }, messageID);

  } catch (error) {
    console.error("❌ Error in /play search:", error);
    api.setMessageReaction("❌", messageID, () => {}, true);
    api.sendMessage("❌ গানটি সার্চ করতে সমস্যা হয়েছে।", threadID, messageID);
  }
};
