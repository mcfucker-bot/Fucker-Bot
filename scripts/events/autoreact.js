module.exports.config = {
  name: "autoreact",
  eventType: ["message"],
  version: "1.0.0",
  credits: "EMon-BHai",
  description: "Auto react to messages based on keywords",
  envConfig: {
    enable: true
  }
};

// keyword → emoji react mapping (lowercase এ লিখতে হবে)
const REACT_MAP = [
  { keywords: ["ভালোবাসি", "love", "❤️", "💕", "ভালোবাসা", "প্রেম"],   emoji: "❤️" },
  { keywords: ["হাহা", "haha", "lol", "😂", "funny", "মজার", "হাসি"],   emoji: "😆" },
  { keywords: ["বাহ", "wow", "amazing", "অসাধারণ", "দারুণ", "🔥"],       emoji: "😮" },
  { keywords: ["দুঃখ", "sad", "কষ্ট", "😢", "কাঁদছি", "কান্না"],         emoji: "😢" },
  { keywords: ["ধন্যবাদ", "thanks", "thank you", "thx", "ty"],            emoji: "👍" },
  { keywords: ["শুভকামনা", "good luck", "all the best", "best of luck"], emoji: "🙏" },
  { keywords: ["অভিনন্দন", "congrats", "congratulations", "🎉"],           emoji: "🎉" },
  { keywords: ["রাগ", "angry", "রাগী", "😡", "বিরক্ত"],                   emoji: "😡" }
];

module.exports.run = async function ({ api, event }) {
  if (!global.configModule[this.config.name]?.enable) return;
  const { messageID, senderID, body, type } = event;
  if (type !== "message" || !body) return;

  // Bot নিজের message এ react করবে না
  if (senderID === api.getCurrentUserID()) return;

  const lower = body.toLowerCase();

  for (const rule of REACT_MAP) {
    if (rule.keywords.some(kw => lower.includes(kw.toLowerCase()))) {
      try {
        api.setMessageReaction(rule.emoji, messageID, () => {}, true);
      } catch (e) { /* silent */ }
      return; // একটা match হলেই থামো
    }
  }
};
