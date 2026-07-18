module.exports.config = {
  name: "truth",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "Random truth question",
  category: "fun",
  usages: "truth",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID } = event;
  const truths = [
    "তুমি কি কখনো মিথ্যা বলে পার পেয়ে গেছো? কীভাবে?",
    "তোমার জীবনের সবচেয়ে বড় ভুল কী?",
    "তুমি কি কখনো কারো কথা পিছনে বলেছো? কার?",
    "তোমার secret crush কে? (নাম না বললে initial বলো)",
    "তুমি কি কখনো পরীক্ষায় নকল করেছো?",
    "তোমার সবচেয়ে বড় fear কী?",
    "তুমি কার সাথে সবচেয়ে বেশি ঝগড়া করো?",
    "তোমার life-এ সবচেয়ে embarrassing moment কোনটা?",
    "তুমি কি কখনো কাউকে block করে পরে unblock করেছো?",
    "তোমার phone-এ কী আছে যা কাউকে দেখাতে চাও না?",
    "তুমি কি কখনো কারো জন্য কেঁদেছো? কার জন্য?",
    "তুমি এখন পর্যন্ত সবচেয়ে বড় মিথ্যা কোনটা বলেছো?",
    "তোমার dream life কেমন?",
    "তুমি কি কখনো প্রেমে পড়েছো? কয়বার?",
    "তোমার সবচেয়ে কাছের বন্ধু কে এবং কেন?",
    "তুমি কার কাছ থেকে সবচেয়ে বেশি টাকা ধার করেছো?",
    "তোমার এমন কোনো অভ্যাস আছে যা কাউকে বলোনি?",
    "তুমি কার সাথে সবচেয়ে বেশি chat করো?",
    "তোমার প্রথম ভালোবাসার কথা বলো!",
    "তুমি কি এই গ্রুপে কাউকে like করো? 👀",
    "তোমার সবচেয়ে বড় dream কী?",
    "তুমি কি কখনো চুরি করেছো? (ছোট হলেও বলো)",
    "তোমার phone unlock pattern/password কাউকে জানো?",
    "তোমার সবচেয়ে প্রিয় মানুষ কে?",
    "তুমি কি কখনো কাউকে ইচ্ছাকৃতভাবে hurt করেছো?"
  ];
  const truth = truths[Math.floor(Math.random() * truths.length)];
  api.setMessageReaction("💬", messageID, () => {}, true);
  return api.sendMessage(
    `💬 TRUTH QUESTION 💬\n━━━━━━━━━━━━━━━━━━\n\n🤔 তোমার প্রশ্ন:\n${truth}\n\n━━━━━━━━━━━━━━━━━━\n⚠️ সত্যি বলতেই হবে! কোনো মিথ্যা নেই!\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
