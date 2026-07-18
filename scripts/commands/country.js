module.exports.config = {
  name: "country",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "দেশের তথ্য দেখো",
  category: "info",
  usages: "country [country name]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const axios = require("axios");

  if (!args[0]) return api.sendMessage("📌 ব্যবহার: country [দেশের নাম]\nউদাহরণ: country bangladesh", threadID, messageID);

  api.setMessageReaction("⏳", messageID, () => {}, true);
  const name = args.join(" ");
  try {
    const res = await axios.get(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`, { timeout: 10000 });
    const c = res.data[0];
    const currencies = c.currencies ? Object.values(c.currencies).map(cur => `${cur.name} (${cur.symbol || "?"})`).join(", ") : "N/A";
    const langs = c.languages ? Object.values(c.languages).join(", ") : "N/A";
    const capital = c.capital?.[0] || "N/A";
    const pop = c.population?.toLocaleString() || "N/A";
    const area = c.area?.toLocaleString() || "N/A";
    const region = c.region || "N/A";
    const subregion = c.subregion || "";
    const flag = c.flag || "";
    const tld = c.tld?.join(", ") || "N/A";
    const calling = c.idd?.root ? `${c.idd.root}${(c.idd.suffixes || [""])[0]}` : "N/A";

    api.setMessageReaction("🌍", messageID, () => {}, true);
    return api.sendMessage(
      `${flag} ${c.name.common.toUpperCase()} ${flag}\n━━━━━━━━━━━━━━━━━━\n\n🏛️ রাজধানী: ${capital}\n🌍 অঞ্চল: ${region}${subregion ? ` / ${subregion}` : ""}\n👥 জনসংখ্যা: ${pop}\n📐 আয়তন: ${area} km²\n💰 মুদ্রা: ${currencies}\n🗣️ ভাষা: ${langs}\n📞 Calling Code: ${calling}\n🌐 TLD: ${tld}\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch {
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage(`❌ "${name}" দেশটি পাওয়া যায়নি! ইংরেজিতে নাম দাও।`, threadID, messageID);
  }
};
