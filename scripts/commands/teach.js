const axios = require('axios');

module.exports.config = {
  name: "teach",
  version: "1.0.0",
  permission: 0,
  credits: "EMon-BHai",
  prefix: 'awto',
  description: "Teach the SimSimi bot a new response",
  category: "user",
  usages: "teach [question] - [answer]",
  cooldowns: 2
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const info = args.join(" ");

  if (!info || !info.includes("-")) return api.sendMessage(
    `╔══════════════════╗\n   🤖 TEACH BOT HELP   \n╚══════════════════╝\n\n📌 ব্যবহার :\n▸ teach [প্রশ্ন] - [উত্তর]\n\n📝 উদাহরণ :\n▸ teach কেমন আছো? - ভালো আছি!`,
    threadID, messageID
  );

  const msg = info.split("-");
  const ask = msg[0].trim();
  const ans = msg[1].trim();

  if (!ask || !ans) return api.sendMessage(`❌ প্রশ্ন এবং উত্তর দুটোই দাও।`, threadID, messageID);

  try {
    const imgUrl = `http://fi3.bot-hosting.net:20536/sim?type=teach&ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}`;
    await axios.get(imgUrl);

    return api.sendMessage(
      `╔══════════════════╗\n   🤖 BOT TRAINED!   \n╚══════════════════╝\n\n✅ Bot কে শেখানো হয়েছে!\n\n❓ প্রশ্ন : ${ask}\n💬 উত্তর : ${ans}\n\n══════════════════\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch (err) {
    console.error(err);
    return api.sendMessage(`❌ Bot কে শেখাতে সমস্যা হয়েছে।`, threadID, messageID);
  }
};
