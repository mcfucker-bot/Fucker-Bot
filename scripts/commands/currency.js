module.exports.config = {
  name: "currency",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "Currency convert করো",
  category: "utility",
  usages: "currency [amount] [from] [to]  |  example: currency 100 USD BDT",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const axios = require("axios");

  if (args.length < 3) return api.sendMessage(
    `💱 CURRENCY CONVERTER\n━━━━━━━━━━━━━━━━━━\n📌 ব্যবহার:\n▸ currency 100 USD BDT\n▸ currency 1000 BDT USD\n▸ currency 50 EUR GBP\n\n💰 কিছু কোড:\nBDT=টাকা | USD=ডলার | EUR=ইউরো\nGBP=পাউন্ড | INR=রুপি | SAR=রিয়াল\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );

  const amount = parseFloat(args[0]);
  const from = args[1].toUpperCase();
  const to = args[2].toUpperCase();

  if (isNaN(amount)) return api.sendMessage("❌ পরিমাণ সঠিকভাবে দাও!", threadID, messageID);

  api.setMessageReaction("⏳", messageID, () => {}, true);
  try {
    const res = await axios.get(`https://api.frankfurter.app/latest?from=${from}&to=${to}`, { timeout: 10000 });
    const rate = res.data.rates[to];
    if (!rate) throw new Error("Invalid currency");
    const result = (amount * rate).toFixed(2);
    api.setMessageReaction("💱", messageID, () => {}, true);
    return api.sendMessage(
      `💱 CURRENCY CONVERTER 💱\n━━━━━━━━━━━━━━━━━━\n\n💰 ${amount} ${from}\n       ▼\n✅ ${result} ${to}\n\n📊 Rate: 1 ${from} = ${rate} ${to}\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch {
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage(`❌ "${from}" বা "${to}" সঠিক currency code না!\n📌 উদাহরণ: currency 100 USD BDT`, threadID, messageID);
  }
};
