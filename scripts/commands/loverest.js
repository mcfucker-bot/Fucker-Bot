module.exports.config = {
  name: "lovetest",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: 'awto',
  description: "Calculate love compatibility between two names",
  category: "Fun",
  usages: "lovetest [name1] [name2] | mention two people",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args, Users }) {
  const { threadID, messageID, mentions, senderID } = event;
  let name1, name2;

  const mentionIDs = Object.keys(mentions);
  if (mentionIDs.length >= 2) {
    const info1 = await api.getUserInfo(mentionIDs[0]);
    const info2 = await api.getUserInfo(mentionIDs[1]);
    name1 = (info1 && info1[mentionIDs[0]]) ? info1[mentionIDs[0]].name : "Person 1";
    name2 = (info2 && info2[mentionIDs[1]]) ? info2[mentionIDs[1]].name : "Person 2";
  } else if (args.length >= 2) {
    const parts = args.join(" ").split(" and ");
    if (parts.length === 2) { name1 = parts[0].trim(); name2 = parts[1].trim(); }
    else { name1 = args[0]; name2 = args.slice(1).join(" "); }
  } else {
    return api.sendMessage(
      `╔══════════════════╗\n   ❤️ LOVE TEST HELP   \n╚══════════════════╝\n\n📌 ব্যবহার :\n▸ lovetest [নাম১] [নাম২]\n▸ lovetest [@mention] [@mention]\n▸ lovetest Riya and Rahul`,
      threadID, messageID
    );
  }

  const score = Math.floor(Math.random() * 101);
  const heart = score >= 80 ? "💖" : score >= 60 ? "❤️" : score >= 40 ? "🧡" : score >= 20 ? "💛" : "💔";
  const bar = "█".repeat(Math.floor(score / 10)) + "░".repeat(10 - Math.floor(score / 10));
  let comment = score >= 90 ? "অবিশ্বাস্য মিল! একদম Perfect Couple! 💑" :
                score >= 70 ? "দারুণ মিল আছে! ভালো একসাথে আছো! 😍" :
                score >= 50 ? "মোটামুটি মিল। চেষ্টা করলে আরো ভালো হবে! 😊" :
                score >= 30 ? "একটু কম মিল। একে অপরকে বুঝতে চাও! 🤝" :
                "খুব কম মিল। বন্ধুত্ব দিয়ে শুরু করো! 👋";

  return api.sendMessage(
    `╔══════════════════╗\n   ❤️ LOVE TEST ❤️   \n╚══════════════════╝\n\n💑 ${name1} ❤️ ${name2}\n\n${heart} Love Score : ${score}%\n[${bar}]\n\n💬 ${comment}\n\n══════════════════\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
