module.exports.config = {
  name: "trivia",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "Trivia quiz খেলো",
  category: "games",
  usages: "trivia",
  cooldowns: 10
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID } = event;
  const axios = require("axios");
  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const res = await axios.get("https://opentdb.com/api.php?amount=1&type=multiple", { timeout: 10000 });
    if (res.data.response_code !== 0) throw new Error("no question");

    const q = res.data.results[0];
    const decode = str => str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#039;/g, "'");

    const question = decode(q.question);
    const correct = decode(q.correct_answer);
    const all = [...q.incorrect_answers.map(decode), correct].sort(() => Math.random() - 0.5);
    const letters = ["A", "B", "C", "D"];
    const correctLetter = letters[all.indexOf(correct)];
    const options = all.map((a, i) => `${letters[i]}. ${a}`).join("\n");

    api.setMessageReaction("🧠", messageID, () => {}, true);
    return api.sendMessage(
      `🧠 TRIVIA QUIZ 🧠\n━━━━━━━━━━━━━━━━━━\n\n📚 Category: ${q.category}\n⚡ Difficulty: ${q.difficulty.toUpperCase()}\n\n❓ ${question}\n\n${options}\n\n━━━━━━━━━━━━━━━━━━\n⏰ ৩০ সেকেন্ডে উত্তর দাও!\n💎 EMon-BHai-BOT`,
      threadID,
      (err, info) => {
        if (!err) {
          setTimeout(() => {
            api.sendMessage(`✅ সঠিক উত্তর: ${correctLetter}. ${correct}`, threadID, info.messageID);
          }, 30000);
        }
      },
      messageID
    );
  } catch {
    const fallback = [
      { q: "পৃথিবীর সবচেয়ে বড় মহাসাগর কোনটি?", opts: ["A. আটলান্টিক", "B. ভারত মহাসাগর", "C. প্রশান্ত মহাসাগর", "D. আর্কটিক"], ans: "C. প্রশান্ত মহাসাগর" },
      { q: "বাংলাদেশের জাতীয় ফুল কী?", opts: ["A. গোলাপ", "B. শাপলা", "C. পদ্ম", "D. চামেলি"], ans: "B. শাপলা" },
      { q: "সূর্য থেকে পৃথিবীতে আলো আসতে কত সময় লাগে?", opts: ["A. ৩ মিনিট", "B. ৮ মিনিট", "C. ১৫ মিনিট", "D. ১ ঘণ্টা"], ans: "B. ৮ মিনিট" },
    ];
    const f = fallback[Math.floor(Math.random() * fallback.length)];
    return api.sendMessage(
      `🧠 TRIVIA QUIZ 🧠\n━━━━━━━━━━━━━━━━━━\n\n❓ ${f.q}\n\n${f.opts.join("\n")}\n\n━━━━━━━━━━━━━━━━━━\n⏰ ৩০ সেকেন্ডে উত্তর দাও!\n💎 EMon-BHai-BOT`,
      threadID,
      (err, info) => {
        if (!err) setTimeout(() => api.sendMessage(`✅ সঠিক উত্তর: ${f.ans}`, threadID, info.messageID), 30000);
      },
      messageID
    );
  }
};
