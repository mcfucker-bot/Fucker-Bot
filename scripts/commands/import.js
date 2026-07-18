const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "import",
  version: "1.0.0",
  permission: 3,
  credits: "Emon",
  prefix: true,
  description: "Import Imgur links or API data to cache",
  category: "owner",
  usages: "import [save/send] [data]",
  cooldowns: 5
};

const ALLOWED_IDS = ["100075290587473"]; // Only bot owner

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID, senderID } = event;

  if (!ALLOWED_IDS.includes(senderID)) return api.sendMessage(
    `❌ এই command শুধু Bot Owner ব্যবহার করতে পারবে।`,
    threadID, messageID
  );

  if (!args[0]) return api.sendMessage(
    `╔══════════════════╗\n   📥 IMPORT HELP   \n╚══════════════════╝\n\n📌 ব্যবহার :\n▸ import save [category] [url1] [url2]...\n▸ import send [category] — API তে upload`,
    threadID, messageID
  );

  const action = args[0].toLowerCase();
  const category = args[1];
  const cachePath = path.join(__dirname, "cache", "imports");
  fs.ensureDirSync(cachePath);

  if (action === "save" && category && args.length > 2) {
    const urls = args.slice(2);
    const filePath = path.join(cachePath, `${category}.json`);
    let existing = [];
    if (fs.existsSync(filePath)) existing = JSON.parse(fs.readFileSync(filePath, "utf8"));
    existing.push(...urls);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

    return api.sendMessage(
      `╔══════════════════╗\n   📥 IMPORT SAVED   \n╚══════════════════╝\n\n✅ ${urls.length}টি link save হয়েছে!\n📂 Category : ${category}\n📊 মোট : ${existing.length}টি\n\n══════════════════\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }

  if (action === "send" && category) {
    const filePath = path.join(cachePath, `${category}.json`);
    if (!fs.existsSync(filePath)) return api.sendMessage(`❌ "${category}" category তে কোনো data নেই।`, threadID, messageID);
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return api.sendMessage(
      `╔══════════════════╗\n   📤 IMPORT DATA   \n╚══════════════════╝\n\n📂 Category : ${category}\n📊 মোট : ${data.length}টি link\n\n${data.slice(0, 5).join('\n')}${data.length > 5 ? '\n...এবং আরো' : ''}\n\n══════════════════\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }

  return api.sendMessage(`❌ সঠিক option দাও: save অথবা send`, threadID, messageID);
};
