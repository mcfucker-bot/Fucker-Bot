module.exports.config = {
  name: "joke",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: 'awto',
  description: "Get a random joke",
  category: "fun",
  usages: "joke",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const axios = require("axios");
  const { threadID, messageID } = event;

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const res = await axios.get("https://official-joke-api.appspot.com/random_joke", { timeout: 10000 });
    const { setup, punchline } = res.data;

    api.setMessageReaction("✅", messageID, () => {}, true);
    return api.sendMessage(
      `╔══════════════════╗\n   😂 RANDOM JOKE   \n╚══════════════════╝\n\n❓ ${setup}\n\n😄 ${punchline}\n\n══════════════════\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch (err) {
    // Fallback jokes if API fails
    const jokes = [
      { q: "Why don't scientists trust atoms?", a: "Because they make up everything!" },
      { q: "Why did the math book look so sad?", a: "Because it had too many problems!" },
      { q: "What do you call a fake noodle?", a: "An impasta!" },
      { q: "Why can't you give Elsa a balloon?", a: "Because she'll let it go!" },
      { q: "What do you call cheese that isn't yours?", a: "Nacho cheese!" }
    ];
    const j = jokes[Math.floor(Math.random() * jokes.length)];
    api.setMessageReaction("✅", messageID, () => {}, true);
    return api.sendMessage(
      `╔══════════════════╗\n   😂 RANDOM JOKE   \n╚══════════════════╝\n\n❓ ${j.q}\n\n😄 ${j.a}\n\n══════════════════\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }
};
