module.exports.config = {
  name: "hack",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: 'awto',
  description: "Generate a fun 'hacked' image prank",
  category: "fun",
  usages: "hack [@mention / reply]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const axios = require("axios");
  const { threadID, messageID, senderID, mentions } = event;

  let targetID = senderID;
  if (Object.keys(mentions).length > 0) targetID = Object.keys(mentions)[0];
  else if (event.type === "message_reply") targetID = event.messageReply.senderID;

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const userInfo = await api.getUserInfo(targetID);
    const name = userInfo[targetID].name;
    const avatar = `https://graph.facebook.com/${targetID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;

    const res = await axios.get(
      `https://api.kenliejugarap.com/hacking/?name=${encodeURIComponent(name)}&url=${encodeURIComponent(avatar)}`,
      { responseType: "stream" }
    );

    api.setMessageReaction("✅", messageID, () => {}, true);
    return api.sendMessage({
      body: `╔══════════════════╗\n   💀 HACKED! 💀   \n╚══════════════════╝\n\n😈 ${name} এর account hack হয়ে গেছে!\n⚠️ (এটা শুধু মজার জন্য)\n\n══════════════════\n💎 EMon-BHai-BOT`,
      attachment: res.data
    }, threadID, messageID);
  } catch (err) {
    api.setMessageReaction("❌", messageID, () => {}, true);
    console.error(err);
    return api.sendMessage(`❌ Hack image তৈরি করতে সমস্যা হয়েছে।`, threadID, messageID);
  }
};
