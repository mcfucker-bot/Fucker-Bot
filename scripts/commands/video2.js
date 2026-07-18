module.exports.config = {
  name: "video2",
  version: "0.0.4",
  permission: 0,
  prefix: true, // true রাখা ভালো
  credits: "EMon-BHai",
  description: "Random video selection",
  category: "user",
  usages: "video2",
  cooldowns: 5
};

module.exports.run = async function({ event, api }) {
  const msg = `╔══════════════════╗\n     🎬 ভিডিও মেনু \n╚══════════════════╝\n\n১. লাভ ভিডিও 💞\n২. কাপল ভিডিও 💕\n৩. শর্ট ভিডিও 📽\n৪. স্যাড ভিডিও 😔\n৫. স্ট্যাটাস ভিডিও 📝\n৬. শায়রি\n৭. বেবি ভিডিও 😻\n৮. অ্যানিমে ভিডিও\n৯. হুমায়ূন ফরিদী স্যার ❄\n১০. ইসলামিক ভিডিও 🤲\n\n⚠️ প্রাপ্তবয়স্ক কন্টেন্ট:\n১১. হরনি ভিডিও 🥵\n১২. হট ভিডিও 🔞\n১৩. আইটেম ভিডিও\n\n📌 রিপ্লাই দিয়ে নম্বরটি লিখুন।\n\n💎 EMon-BHai-BOT`;

  return api.sendMessage(msg, event.threadID, (err, info) => {
    global.client.handleReply.push({
      name: this.config.name,
      messageID: info.messageID,
      author: event.senderID,
      type: "choose"
    });
  }, event.messageID);
};

module.exports.handleReply = async ({ api, event, handleReply }) => {
  if (event.senderID !== handleReply.author) return;

  const choice = event.body;
  const options = {
    "1": "/video/love", "2": "/video/cpl", "3": "/video/shortvideo",
    "4": "/video/sadvideo", "5": "/video/status", "6": "/video/shairi",
    "7": "/video/baby", "8": "/video/anime", "9": "/video/humaiyun",
    "10": "/video/islam", "11": "/video/horny", "12": "/video/hot", "13": "/video/item"
  };

  if (!options[choice]) return api.sendMessage("❌ ভুল নম্বর! দয়া করে ১-১৩ এর মধ্যে একটি নম্বর বেছে নিন।", event.threadID, event.messageID);

  api.setMessageReaction("⏳", event.messageID, () => {}, true);

  try {
    const axios = require("axios");
    const apis = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-OFFICIAL/Nayan/main/api.json');
    const baseUrl = apis.data.api;
    const apiUrl = `${baseUrl}${options[choice]}`;

    const res = await axios.get(apiUrl);
    const { data, nayan: cap, count: cn } = res.data;

    const videoStream = (await axios.get(data, { responseType: "stream" })).data;

    api.setMessageReaction("✅", event.messageID, () => {}, true);
    return api.sendMessage({
      body: `${cap}\n\n🎬 মোট ভিডিও সংখ্যা: ${cn}\n💎 EMon-BHai-BOT`,
      attachment: videoStream
    }, event.threadID, event.messageID);

  } catch (err) {
    api.setMessageReaction("❌", event.messageID, () => {}, true);
    api.sendMessage("❌ ভিডিওটি লোড করতে সমস্যা হচ্ছে।", event.threadID, event.messageID);
  }
};
