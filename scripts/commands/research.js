module.exports.config = {
  name: "research",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: 'awto',
  description: "Search academic papers on ResearchGate",
  category: "study",
  usages: "research [topic]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const axios = require("axios");
  const { threadID, messageID } = event;

  if (!args[0]) return api.sendMessage(
    `╔══════════════════╗\n   🔬 RESEARCH HELP   \n╚══════════════════╝\n\n📌 ব্যবহার : research [topic]\n📝 উদাহরণ : research machine learning`,
    threadID, messageID
  );

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const query = encodeURIComponent(args.join(" "));
    const res = await axios.get(`https://www.googleapis.com/customsearch/v1?q=site:researchgate.net+${query}&key=AIzaSyDoEx2hakmeLsensitivity&cx=017576662512468239146:omuauf10dwe`);
    const items = res.data.items || [];

    if (items.length === 0) return api.sendMessage(`❌ "${args.join(" ")}" সম্পর্কে কোনো paper পাওয়া যায়নি।`, threadID, messageID);

    let msg = `╔══════════════════╗\n   🔬 RESEARCH PAPERS   \n╚══════════════════╝\n\n🔍 "${args.join(" ")}" এর জন্য ${items.length}টি result:\n\n`;
    items.slice(0, 5).forEach((item, i) => {
      msg += `${i + 1}. 📄 ${item.title}\n   🔗 ${item.link}\n\n`;
    });
    msg += `══════════════════\n💎 EMon-BHai-BOT`;
    return api.sendMessage(msg, threadID, messageID);
  } catch (err) {
    console.error(err);
    return api.sendMessage(`❌ সমস্যা হয়েছে। আবার চেষ্টা করো।`, threadID, messageID);
  }
};
