module.exports.config = {
  name: "hack",
  version: "2.0.0",
  permission: 0,
  credits: "Emon (fixed)",
  prefix: 'awto',
  description: "Fun 'hacked' text prank (API-free)",
  category: "fun",
  usages: "hack [@mention / reply]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID, senderID, mentions } = event;

  let targetID = senderID;
  if (Object.keys(mentions).length > 0) targetID = Object.keys(mentions)[0];
  else if (event.type === "message_reply") targetID = event.messageReply.senderID;

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const userInfo = await api.getUserInfo(targetID);
    const name = userInfo[targetID].name;

    // Purong text na "hack" na biro, walang image API na kailangan
    const fakeIP = `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;
    const fakePass = Math.random().toString(36).slice(-8);

    const message = `╔══════════════════╗\n   💀 HACKED! 💀   \n╚══════════════════╝\n\n😈 Target: ${name}\n\n🔓 Status: NABUKSAN\n🌐 IP: ${fakeIP}\n🔑 Password: ${fakePass}\n📁 Files: 69 na nakuha\n\n⚠️ (Ito ay puro biro, walang totoong nangyaring hack)\n\n══════════════════\n💎 EMon-BHai-BOT`;

    api.setMessageReaction("✅", messageID, () => {}, true);
    return api.sendMessage(message, threadID, messageID);

  } catch (err) {
    api.setMessageReaction("❌", messageID, () => {}, true);
    console.error(err);
    return api.sendMessage(`❌ May naganap na error, subukang muli.`, threadID, messageID);
  }
};
