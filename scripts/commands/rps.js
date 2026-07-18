module.exports.config = {
  name: "rps",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "Rock Paper Scissors খেলো Bot-এর সাথে",
  category: "games",
  usages: "rps [rock/paper/scissors]",
  cooldowns: 3
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const choices = ["rock", "paper", "scissors"];
  const emojis = { rock: "🪨", paper: "📄", scissors: "✂️" };
  const bn = { rock: "পাথর", paper: "কাগজ", scissors: "কাঁচি" };

  const userChoice = args[0]?.toLowerCase();
  if (!choices.includes(userChoice)) {
    return api.sendMessage(
      `✂️ ROCK PAPER SCISSORS\n━━━━━━━━━━━━━━━━━━\n📌 ব্যবহার:\n▸ rps rock\n▸ rps paper\n▸ rps scissors\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }

  const botChoice = choices[Math.floor(Math.random() * 3)];
  let result;
  if (userChoice === botChoice) result = "draw";
  else if (
    (userChoice === "rock" && botChoice === "scissors") ||
    (userChoice === "paper" && botChoice === "rock") ||
    (userChoice === "scissors" && botChoice === "paper")
  ) result = "win";
  else result = "lose";

  const resultText = { win: "🎉 তুমি জিতেছো!", draw: "🤝 Draw!", lose: "😢 Bot জিতেছে!" };
  api.setMessageReaction(result === "win" ? "🎉" : result === "draw" ? "🤝" : "😢", messageID, () => {}, true);
  return api.sendMessage(
    `✂️ ROCK PAPER SCISSORS ✂️\n━━━━━━━━━━━━━━━━━━\n\n👤 তুমি: ${emojis[userChoice]} ${bn[userChoice]}\n🤖 Bot: ${emojis[botChoice]} ${bn[botChoice]}\n\n${resultText[result]}\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
