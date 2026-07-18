module.exports.config = {
  name: "nameinfo",
  version: "1.0.0",
  permission: 0,
  credits: "EMon-BHai",
  prefix: true,
  description: "নামের অর্থ ও তথ্য জানো",
  category: "info",
  usages: "nameinfo [name]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const axios = require("axios");

  if (!args[0]) return api.sendMessage("📌 ব্যবহার: nameinfo [name]\nউদাহরণ: nameinfo Emon", threadID, messageID);

  api.setMessageReaction("⏳", messageID, () => {}, true);
  const name = args.join(" ");

  try {
    // Get gender prediction
    const [genderRes, agifyRes] = await Promise.allSettled([
      axios.get(`https://api.genderize.io/?name=${encodeURIComponent(name.split(" ")[0])}`, { timeout: 8000 }),
      axios.get(`https://api.agify.io/?name=${encodeURIComponent(name.split(" ")[0])}`, { timeout: 8000 })
    ]);

    const genderData = genderRes.status === "fulfilled" ? genderRes.value.data : null;
    const ageData = agifyRes.status === "fulfilled" ? agifyRes.value.data : null;

    const gender = genderData?.gender
      ? `${genderData.gender === "male" ? "ছেলে 👦" : "মেয়ে 👧"} (${(genderData.probability * 100).toFixed(0)}% probability)`
      : "জানা যায়নি";

    const avgAge = ageData?.age ? `${ageData.age} বছর বয়সীরা সাধারণত এই নাম রাখে` : "N/A";

    // Name numerology (simple)
    const sum = name.toUpperCase().split("").reduce((a, c) => {
      const code = c.charCodeAt(0);
      return code >= 65 && code <= 90 ? a + (code - 64) : a;
    }, 0);
    const num = ((sum - 1) % 9) + 1;

    const numMeaning = {
      1: "নেতৃত্বগুণ সম্পন্ন, স্বাধীনচেতা, উদ্যোগী",
      2: "শান্তিপ্রিয়, কূটনীতিক, সহযোগী",
      3: "সৃজনশীল, আশাবাদী, যোগাযোগপটু",
      4: "পরিশ্রমী, নিয়মনিষ্ঠ, বিশ্বস্ত",
      5: "স্বাধীনতাপ্রিয়, অ্যাডভেঞ্চারপ্রিয়, পরিবর্তনপ্রিয়",
      6: "দায়িত্বশীল, পরিবারপ্রিয়, যত্নশীল",
      7: "বুদ্ধিমান, বিশ্লেষণমূলক, আধ্যাত্মিক",
      8: "উচ্চাকাঙ্ক্ষী, সাফল্যমুখী, ব্যবসায়িক মনোভাব",
      9: "মানবিক, সহানুভূতিশীল, আদর্শবাদী"
    };

    api.setMessageReaction("✨", messageID, () => {}, true);
    return api.sendMessage(
      `✨ NAME INFO ✨\n━━━━━━━━━━━━━━━━━━\n\n👤 Name: ${name}\n\n♂️ Gender: ${gender}\n📅 Age Stat: ${avgAge}\n\n🔢 Name Number: ${num}\n🌟 Personality:\n${numMeaning[num]}\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch {
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage("❌ Name info আনতে পারিনি!", threadID, messageID);
  }
};
