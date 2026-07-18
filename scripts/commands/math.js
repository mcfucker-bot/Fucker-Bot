module.exports.config = {
  name: "math",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "Math quiz খেলো",
  category: "games",
  usages: "math [easy/hard]",
  cooldowns: 10
};

if (!global.mathQuiz) global.mathQuiz = {};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const difficulty = args[0]?.toLowerCase() === "hard" ? "hard" : "easy";

  if (global.mathQuiz[threadID]) {
    return api.sendMessage("⚠️ এই গ্রুপে ইতিমধ্যে একটি math quiz চলছে! উত্তর দাও।", threadID, messageID);
  }

  let a, b, op, ans, question;
  if (difficulty === "hard") {
    a = Math.floor(Math.random() * 50) + 10;
    b = Math.floor(Math.random() * 20) + 2;
    const ops = ["+", "-", "*", "/"];
    op = ops[Math.floor(Math.random() * ops.length)];
    if (op === "/") { a = a * b; } // ensure whole number
    ans = op === "+" ? a + b : op === "-" ? a - b : op === "*" ? a * b : a / b;
    question = `${a} ${op} ${b} = ?`;
  } else {
    a = Math.floor(Math.random() * 20) + 1;
    b = Math.floor(Math.random() * 20) + 1;
    op = ["+", "-"][Math.floor(Math.random() * 2)];
    ans = op === "+" ? a + b : a - b;
    question = `${a} ${op} ${b} = ?`;
  }

  global.mathQuiz[threadID] = { ans, start: Date.now() };

  api.setMessageReaction("🧮", messageID, () => {}, true);
  await api.sendMessage(
    `🧮 MATH QUIZ 🧮\n━━━━━━━━━━━━━━━━━━\n\n🔢 ${question}\n\n━━━━━━━━━━━━━━━━━━\n⏰ ২০ সেকেন্ডে উত্তর দাও!\n📊 Difficulty: ${difficulty.toUpperCase()}\n💎 EMon-BHai-BOT`,
    threadID
  );

  setTimeout(async () => {
    if (global.mathQuiz[threadID]) {
      delete global.mathQuiz[threadID];
      await api.sendMessage(`⏰ সময় শেষ! সঠিক উত্তর ছিল: ${ans}`, threadID);
    }
  }, 20000);
};

module.exports.handleEvent = async function({ api, event }) {
  const { threadID, messageID, body, senderID } = event;
  if (!global.mathQuiz?.[threadID] || !body) return;

  const quiz = global.mathQuiz[threadID];
  const userAns = parseFloat(body.trim());

  if (isNaN(userAns)) return;
  if (userAns === quiz.ans) {
    const elapsed = ((Date.now() - quiz.start) / 1000).toFixed(1);
    delete global.mathQuiz[threadID];
    return api.sendMessage(
      `✅ CORRECT! 🎉\n━━━━━━━━━━━━━━━━━━\n\n🎯 সঠিক উত্তর: ${quiz.ans}\n⏱️ সময় নিয়েছো: ${elapsed}s\n\n🏆 তুমি জিতেছো!\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }
};
