const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const nayan = require('nayan-media-downloaders');
const Youtube = require('youtube-search-api');

async function downloadVideoFromYoutube(link, filePath) {
  if (!link) throw new Error('Link Not Found');
  const timestart = Date.now();

  try {
    const data = await nayan.ytdown(link);
    const videoUrl = data.data.video;

    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: videoUrl,
        responseType: 'stream',
      })
        .then((response) => {
          const writer = fs.createWriteStream(filePath);
          response.data
            .pipe(writer)
            .on('finish', () => {
              resolve({
                title: data.data.title,
                timestart,
              });
            })
            .on('error', reject);
        })
        .catch(reject);
    });
  } catch (error) {
    throw error;
  }
}

module.exports.config = {
  name: 'video',
  version: '1.0.0',
  permission: 0,
  credits: 'Developed by Mohammad Nayan',
  prefix: true,
  description: 'Search and download video from YouTube.',
  usages: 'video <keyword>',
  category: 'media',
  cooldowns: 5,
  aliases: ['v']
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, senderID } = event;

  if (!args.length) {
    return api.sendMessage('» উফফ আবাল কি ভিডিও দেখতে চাস তার ২/১ লাইন তো লেখবি নাকি 🥵\nExample: video <keyword>', threadID, messageID);
  }

  const keyword = args.join(' ');
  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const results = await Youtube.GetListByKeyword(keyword, false, 6);
    const links = results.items.map((item) => item.id);
    const titles = results.items.map((item, index) => `${index + 1}. ${item.title} (${item.length.simpleText})`);

    const message = `🔎 Found ${links.length} results for "${keyword}":\n\n${titles.join('\n')}\n\nReply with a number (1-${links.length}) to download.`;

    api.setMessageReaction("🎬", messageID, () => {}, true);
    return api.sendMessage(message, threadID, (err, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        links
      });
    }, messageID);
  } catch (err) {
    api.setMessageReaction("❌", messageID, () => {}, true);
    api.sendMessage('❌ সার্চ করতে সমস্যা হয়েছে।', threadID, messageID);
  }
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  const { threadID, messageID, senderID, body } = event;
  const { links, author } = handleReply;

  if (senderID !== author) return;
  const selectedIndex = parseInt(body, 10) - 1;

  if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= links.length) {
    return api.sendMessage('❌ Invalid selection. Reply with a number between 1 and 6.', threadID, messageID);
  }

  api.unsendMessage(handleReply.messageID);
  api.setMessageReaction("⏳", messageID, () => {}, true);

  const selectedLink = `https://www.youtube.com/watch?v=${links[selectedIndex]}`;
  const cacheDir = path.join(__dirname, 'cache');
  if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);
  const filePath = path.join(cacheDir, `video_${senderID}_${Date.now()}.mp4`);

  try {
    const result = await downloadVideoFromYoutube(selectedLink, filePath);

    api.setMessageReaction("✅", messageID, () => {}, true);
    await api.sendMessage({
      body: `🎵 Title: ${result.title}\n⏱️ Processing Time: ${Math.floor((Date.now() - result.timestart) / 1000)} seconds.`,
      attachment: fs.createReadStream(filePath)
    }, threadID, () => {
      fs.unlinkSync(filePath);
    }, messageID);

  } catch (error) {
    console.error('Error during video download:', error);
    api.setMessageReaction("❌", messageID, () => {}, true);
    api.sendMessage('❌ Failed to download the video. Please try again later.', threadID, messageID);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
};
