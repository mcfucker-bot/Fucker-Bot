module.exports.config = {
  name: "poll",
  version: "1.0.0",
  permission: 0,
  credits: "EMon-BHai",
  prefix: true,
  description: "Group এ poll তৈরি করো",
  category: "utility",
  usages: "poll [question] | [option1] | [option2] ...",
  cooldowns: 10
};

if (!global.polls) global.polls = {};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, senderID } = event;
  const text = args.join(" ");
  const parts = text.split("|").map(p => p.trim()).filter(Boolean);

  if (parts.length < 3) return api.sendMessage(
    `📊 POLL HELP\n━━━━━━━━━━━━━━━━━━\n📌 ব্যবহার:\npoll [question] | [option1] | [option2] | ...\n\n📝 উদাহরণ:\npoll তোমার পছন্দ? | বাংলাদেশ | ভারত | পাকিস্তান\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );

  const question = parts[0];
  const options = parts.slice(1).slice(0, 10); // max 10 options
  const letters = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯"];

  const pollId = `${threadID}_${Date.now()}`;
  global.polls[pollId] = { question, options, votes: {}, creator: senderID, pollId };

  let msg = `📊 POLL 📊\n━━━━━━━━━━━━━━━━━━\n\n❓ ${question}\n\n`;
  options.forEach((opt, i) => { msg += `${letters[i]} ${opt}\n`; });
  msg += `\n━━━━━━━━━━━━━━━━━━\n📌 Reply করো: A / B / C / D ...\n✅ প্রত্যেকে শুধু ১বার ভোট দিতে পারবে!\n💎 EMon-BHai-BOT`;

  return api.sendMessage({ body: msg }, threadID, (err, info) => {
    if (err) return;
    global.polls[pollId].msgID = info.messageID;
    global.client.handleReply.push({
      type: "reply",
      name: "poll",
      messageID: info.messageID,
      pollId,
      options
    });
  }, messageID);
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  const { threadID, messageID, senderID, body } = event;
  const { pollId, options } = handleReply;
  const poll = global.polls?.[pollId];
  if (!poll) return;

  const letters = ["A","B","C","D","E","F","G","H","I","J"];
  const choice = body.trim().toUpperCase();
  const idx = letters.indexOf(choice);

  if (idx === -1 || idx >= options.length) return api.sendMessage(
    `❌ সঠিক option দাও (${letters.slice(0, options.length).join("/")})`, threadID, messageID
  );

  if (poll.votes[senderID] !== undefined) return api.sendMessage("⚠️ তুমি ইতিমধ্যে ভোট দিয়েছো!", threadID, messageID);

  poll.votes[senderID] = idx;

  // Tally results
  const tally = new Array(options.length).fill(0);
  Object.values(poll.votes).forEach(v => tally[v]++);
  const total = Object.keys(poll.votes).length;

  let result = `📊 POLL RESULT\n━━━━━━━━━━━━━━━━━━\n\n❓ ${poll.question}\n\n`;
  const emojiLetters = ["🇦","🇧","🇨","🇩","🇪","🇫","🇬","🇭","🇮","🇯"];
  options.forEach((opt, i) => {
    const pct = total ? ((tally[i] / total) * 100).toFixed(0) : 0;
    const bar = "█".repeat(Math.ceil(pct / 10)) + "░".repeat(10 - Math.ceil(pct / 10));
    result += `${emojiLetters[i]} ${opt}\n[${bar}] ${pct}% (${tally[i]})\n\n`;
  });
  result += `👥 মোট ভোট: ${total}\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`;

  return api.sendMessage(result, threadID, messageID);
};
