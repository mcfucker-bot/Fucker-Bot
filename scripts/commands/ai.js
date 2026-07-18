module.exports.config = {
  name: "ai",
  version: "2.1.0",
  permission: 0,
  credits: "Nayan | Emon",
  description: "Ask anything to AI (GPT-3)",
  prefix: true,
  category: "ai",
  usages: "ai [question]",
  cooldowns: 5,
  dependencies: {}
};

module.exports.run = async function ({ api, event, args }) {
  const axios = require("axios");
  const { threadID, messageID } = event;

  if (!args[0]) return api.sendMessage("❌ দয়া করে আপনার প্রশ্নটি লিখুন।\nউদাহরণ: ai বাংলাদেশের রাজধানী কী?", threadID, messageID);

  const query = args.join(" ");

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    // API fetch
    const apiInfo = await axios.get(
      "https://raw.githubusercontent.com/MOHAMMAD-NAYAN-OFFICIAL/Nayan/main/api.json",
      { timeout: 8000 }
    );
    const baseUrl = apiInfo.data.api;

    const res = await axios.get(
      `${baseUrl}/nayan/gpt3?prompt=${encodeURIComponent(query)}`,
      { timeout: 15000 }
    );

    const aiResponse = res.data.response || res.data.message || res.data.result;

    if (!aiResponse) throw new Error("No response");

    api.setMessageReaction("✅", messageID, () => {}, true);
    
    // শুধুমাত্র এআই এর উত্তর পাঠানো হচ্ছে
    return api.sendMessage(aiResponse, threadID, messageID);
    
  } catch (error) {
    console.error("[ai.js] Error:", error.message);
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage("❌ AI এর উত্তর দিতে সমস্যা হচ্ছে। দয়া করে আবার চেষ্টা করুন।", threadID, messageID);
  }
};
