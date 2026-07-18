module.exports.config = {
  name: "password",
  version: "2.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "Strong password generate করো",
  category: "utility",
  usages: "password [length] [type]  |  type: strong/simple/pin",
  cooldowns: 3
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const length = parseInt(args[0]) || 12;
  const type = args[1]?.toLowerCase() || "strong";

  if (length < 4 || length > 50) return api.sendMessage("❌ Length: 4-50 এর মধ্যে দাও!", threadID, messageID);

  let chars, label;
  if (type === "simple") {
    chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    label = "Simple";
  } else if (type === "pin") {
    chars = "0123456789";
    label = "PIN";
  } else {
    chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}";
    label = "Strong";
  }

  const pass = Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");

  // Strength indicator
  const hasUpper = /[A-Z]/.test(pass);
  const hasLower = /[a-z]/.test(pass);
  const hasNum = /[0-9]/.test(pass);
  const hasSpecial = /[^A-Za-z0-9]/.test(pass);
  const strength = [hasUpper, hasLower, hasNum, hasSpecial].filter(Boolean).length;
  const strengthText = strength >= 4 ? "💪 Very Strong" : strength >= 3 ? "✅ Strong" : strength >= 2 ? "⚠️ Medium" : "❌ Weak";

  return api.sendMessage(
    `🔐 PASSWORD GENERATED 🔐\n━━━━━━━━━━━━━━━━━━\n\n🔑 Password:\n${pass}\n\n📊 Type: ${label}\n📏 Length: ${length}\n🛡️ Strength: ${strengthText}\n\n━━━━━━━━━━━━━━━━━━\n⚠️ কোথাও save করো এবং কাউকে দিও না!\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
