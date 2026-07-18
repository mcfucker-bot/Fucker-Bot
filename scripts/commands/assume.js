module.exports.config = {
  name: "assume",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "কাউকে নিয়ে random assumption করো",
  category: "fun",
  usages: "assume [@mention]",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID, mentions, senderID } = event;
  const assumptions = [
    "রাত ৩টায় একা জেগে phone scroll করে।",
    "Secret-এ K-drama দেখে কিন্তু কাউকে বলে না।",
    "গান শুনতে শুনতে নাচে যখন কেউ দেখছে না।",
    "প্রতিদিন plan করে gym যাবে, কিন্তু যায় না।",
    "মনে মনে অনেক কিছু বলে কিন্তু মুখে বলে না।",
    "রাতে ঘুমানোর আগে অদ্ভুত scenario চিন্তা করে।",
    "সবার কাছে cool, কিন্তু আসলে total nerd।",
    "গ্রুপে reply করতে করতে type করে পাঠায় না।",
    "Screenshot নেয় কিন্তু কাউকে দেখায় না।",
    "মনে মনে roast করে সবাইকে কিন্তু মুখে হাসে।",
    "Playlist-এ শুধু sad songs।",
    "সবার সাথে busy বলে কিন্তু আসলে Netflix দেখছে।",
    "Mirror-এর সামনে speech practice করে।",
    "খাবার order করতে ৩০ মিনিট লাগে decide করতে।",
    "রাতে text পাঠিয়ে read কিনা দেখতে থাকে।"
  ];

  const targetID = Object.keys(mentions)[0] || senderID;
  const name = mentions[targetID] ? mentions[targetID].replace("@", "") : "তুমি";
  const a = assumptions[Math.floor(Math.random() * assumptions.length)];

  api.setMessageReaction("👀", messageID, () => {}, true);
  return api.sendMessage(
    `👀 ASSUMPTION 👀\n━━━━━━━━━━━━━━━━━━\n\n🎯 ${name}...\n\n${a}\n\n━━━━━━━━━━━━━━━━━━\n⚠️ এটা মজার! কেউ সিরিয়াস নিও না 😂\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
