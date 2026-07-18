module.exports.config = {
  name: "enc",
  version: "1.0.0",
  permission: 2,
  credits: "Emon",
  prefix: true,
  description: "Obfuscate JavaScript code",
  category: "admin",
  usages: "enc [js code] | reply to a js message",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const JavaScriptObfuscator = require("javascript-obfuscator");

  let code;
  if (event.type === "message_reply") code = event.messageReply.body;
  else code = args.join(" ");

  if (!code) return api.sendMessage(
    `╔══════════════════╗\n   🔐 ENCODE HELP   \n╚══════════════════╝\n\n📌 ব্যবহার :\n▸ enc [js code]\n▸ JS message এ reply দিয়ে enc`,
    threadID, messageID
  );

  try {
    const result = JavaScriptObfuscator.obfuscate(code, {
      compact: true,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 0.75
    });

    const obfuscated = result.getObfuscatedCode();
    return api.sendMessage(
      `╔══════════════════╗\n   🔐 CODE ENCODED   \n╚══════════════════╝\n\n✅ Code Obfuscation সম্পন্ন!\n\n${obfuscated.substring(0, 500)}${obfuscated.length > 500 ? '...[truncated]' : ''}\n\n══════════════════\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch (err) {
    console.error(err);
    return api.sendMessage(`❌ Code encode করতে সমস্যা হয়েছে। Valid JavaScript দাও।`, threadID, messageID);
  }
};
