module.exports.config = {
  name: "hangman",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "Hangman game খেলো",
  category: "games",
  usages: "hangman  |  hangman [letter]",
  cooldowns: 5
};

if (!global.hangmanGame) global.hangmanGame = {};

const HANGMAN_STAGES = [
  "  +---+\n  |   |\n      |\n      |\n      |\n      |\n=========",
  "  +---+\n  |   |\n  O   |\n      |\n      |\n      |\n=========",
  "  +---+\n  |   |\n  O   |\n  |   |\n      |\n      |\n=========",
  "  +---+\n  |   |\n  O   |\n /|   |\n      |\n      |\n=========",
  "  +---+\n  |   |\n  O   |\n /|\\  |\n      |\n      |\n=========",
  "  +---+\n  |   |\n  O   |\n /|\\  |\n /    |\n      |\n=========",
  "  +---+\n  |   |\n  O   |\n /|\\  |\n / \\  |\n      |\n========="
];

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID, senderID } = event;
  const guess = args[0]?.toLowerCase();

  if (!global.hangmanGame[threadID] || !guess) {
    // Start new game
    const words = ["python", "javascript", "facebook", "messenger", "bangladesh", "programming", "computer", "internet", "keyboard", "monitor"];
    const word = words[Math.floor(Math.random() * words.length)];
    global.hangmanGame[threadID] = {
      word, guessed: [], wrong: 0, players: [senderID]
    };
    const display = word.split("").map(() => "_").join(" ");
    return api.sendMessage(
      `🎮 HANGMAN GAME 🎮\n━━━━━━━━━━━━━━━━━━\n\n${HANGMAN_STAGES[0]}\n\n📝 Word: ${display}\n📏 Length: ${word.length} letters\n\n━━━━━━━━━━━━━━━━━━\n💡 একটি letter guess করতে:\nhangman [letter]\nউদাহরণ: hangman a\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }

  const game = global.hangmanGame[threadID];
  if (!guess || guess.length !== 1 || !/[a-z]/.test(guess)) {
    return api.sendMessage("📌 একটি letter guess করো!\nউদাহরণ: hangman a", threadID, messageID);
  }

  if (game.guessed.includes(guess)) {
    return api.sendMessage(`⚠️ "${guess}" আগেই guess করা হয়েছে!`, threadID, messageID);
  }

  game.guessed.push(guess);
  if (!game.word.includes(guess)) game.wrong++;

  const display = game.word.split("").map(l => game.guessed.includes(l) ? l : "_").join(" ");
  const stage = HANGMAN_STAGES[Math.min(game.wrong, 6)];
  const isWon = !display.includes("_");
  const isLost = game.wrong >= 6;

  if (isWon || isLost) {
    delete global.hangmanGame[threadID];
    return api.sendMessage(
      `${isWon ? "🎉 YOU WIN!" : "💀 GAME OVER!"}\n━━━━━━━━━━━━━━━━━━\n\n${stage}\n\n🎯 Word: ${game.word.toUpperCase()}\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }

  return api.sendMessage(
    `🎮 HANGMAN 🎮\n━━━━━━━━━━━━━━━━━━\n\n${stage}\n\n📝 Word: ${display}\n❌ Wrong: ${game.wrong}/6\n🔤 Guessed: ${game.guessed.join(", ")}\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
