module.exports.config = {
  name: "git",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: 'awto',
  description: "Get GitHub user profile info",
  category: "user",
  usages: "git [username]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const axios = require("axios");
  const { threadID, messageID } = event;

  if (!args[0]) return api.sendMessage(
    `╔══════════════════╗\n   🐙 GITHUB HELP   \n╚══════════════════╝\n\n📌 ব্যবহার : git [username]\n📝 উদাহরণ : git torvalds`,
    threadID, messageID
  );

  try {
    const res = await axios.get(`https://api.github.com/users/${args[0]}`);
    const d = res.data;
    return api.sendMessage(
      `╔══════════════════╗\n   🐙 GITHUB PROFILE   \n╚══════════════════╝\n\n👤 নাম : ${d.name || 'N/A'}\n🔖 Username : @${d.login}\n🔗 Profile : ${d.html_url}\n\n══════════════════\n📁 Repos : ${d.public_repos}\n👥 Followers : ${d.followers}\n➡️ Following : ${d.following}\n\n📍 Location : ${d.location || 'N/A'}\n🏢 Company : ${d.company || 'N/A'}\n💬 Bio : ${d.bio || 'N/A'}\n\n══════════════════\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch (err) {
    return api.sendMessage(`❌ "${args[0]}" নামের GitHub user পাওয়া যায়নি।`, threadID, messageID);
  }
};
