module.exports.config = {
  name: "calc",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: 'awto',
  description: "Calculate any math expression",
  category: "utility",
  usages: "calc [expression]",
  cooldowns: 3
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;

  const expr = args.join(" ").trim();
  if (!expr) return api.sendMessage(
    `╔══════════════════╗\n   🔢 CALCULATOR   \n╚══════════════════╝\n\n📌 ব্যবহার : calc [math expression]\n📝 উদাহরণ :\n▸ calc 2 + 2\n▸ calc (10 * 5) / 2\n▸ calc 2 ** 10`,
    threadID, messageID
  );

  try {
    // Safe math eval — only allow numbers and math operators
    const safe = expr.replace(/[^0-9+\-*/().%\s^]/g, "").trim();
    if (!safe) throw new Error("Invalid expression");

    // Replace ^ with ** for exponentiation
    const cleaned = safe.replace(/\^/g, "**");

    // eslint-disable-next-line no-new-func
    const result = Function(`"use strict"; return (${cleaned})`)();

    if (typeof result !== "number" || !isFinite(result))
      throw new Error("Invalid result");

    return api.sendMessage(
      `╔══════════════════╗\n   🔢 CALCULATOR   \n╚══════════════════╝\n\n📐 Expression :\n${expr}\n\n✅ Result :\n= ${result}\n\n══════════════════\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch (err) {
    return api.sendMessage(
      `╔══════════════════╗\n   🔢 CALCULATOR   \n╚══════════════════╝\n\n❌ সমস্যা হয়েছে!\n▸ Valid math expression দাও।\n📝 উদাহরণ : calc 5 * (3 + 2)\n\n══════════════════\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }
};
