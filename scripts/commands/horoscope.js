module.exports.config = {
  name: "horoscope",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "রাশিফল দেখো",
  category: "fun",
  usages: "horoscope [রাশি]  |  horoscope list",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const signs = {
    "aries": { bn: "মেষ", emoji: "♈", date: "Mar 21 – Apr 19" },
    "taurus": { bn: "বৃষ", emoji: "♉", date: "Apr 20 – May 20" },
    "gemini": { bn: "মিথুন", emoji: "♊", date: "May 21 – Jun 20" },
    "cancer": { bn: "কর্কট", emoji: "♋", date: "Jun 21 – Jul 22" },
    "leo": { bn: "সিংহ", emoji: "♌", date: "Jul 23 – Aug 22" },
    "virgo": { bn: "কন্যা", emoji: "♍", date: "Aug 23 – Sep 22" },
    "libra": { bn: "তুলা", emoji: "♎", date: "Sep 23 – Oct 22" },
    "scorpio": { bn: "বৃশ্চিক", emoji: "♏", date: "Oct 23 – Nov 21" },
    "sagittarius": { bn: "ধনু", emoji: "♐", date: "Nov 22 – Dec 21" },
    "capricorn": { bn: "মকর", emoji: "♑", date: "Dec 22 – Jan 19" },
    "aquarius": { bn: "কুম্ভ", emoji: "♒", date: "Jan 20 – Feb 18" },
    "pisces": { bn: "মীন", emoji: "♓", date: "Feb 19 – Mar 20" }
  };

  const readings = [
    "আজকের দিনটি তোমার জন্য অত্যন্ত শুভ। নতুন সুযোগ আসছে। সাহসী হও! ⭐",
    "আজ সম্পর্কের বিষয়ে মনোযোগ দাও। প্রিয়জনকে সময় দাও। ❤️",
    "আর্থিক বিষয়ে সতর্ক থাকো। অপ্রয়োজনীয় খরচ এড়াও। 💰",
    "তোমার স্বাস্থ্যের দিকে নজর দাও। পর্যাপ্ত বিশ্রাম নাও। 🌙",
    "আজ সৃজনশীলতা তুঙ্গে। নতুন কিছু শুরু করার সেরা সময়! 🎨",
    "পুরানো বন্ধুর সাথে যোগাযোগ হতে পারে। স্মৃতি মধুর হবে! 🤝",
    "আজ একটু ধৈর্য ধরো। সব ঠিক হয়ে যাবে সময়মতো। 🌈",
    "তোমার কঠোর পরিশ্রম শীঘ্রই ফল দেবে। হাল ছেড়ো না! 💪",
    "আজ ভ্রমণের সুযোগ আসতে পারে। নতুন জায়গা explore করো! ✈️",
    "পরিবারের সাথে সময় কাটানো আজ সেরা সিদ্ধান্ত হবে। 🏠"
  ];

  if (!args[0] || args[0] === "list") {
    const list = Object.entries(signs).map(([k, v]) => `${v.emoji} ${v.bn} (${k}) — ${v.date}`).join("\n");
    return api.sendMessage(
      `🔮 HOROSCOPE SIGNS\n━━━━━━━━━━━━━━━━━━\n${list}\n\n📌 ব্যবহার: horoscope aries\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }

  const key = args[0].toLowerCase();
  const sign = signs[key];
  if (!sign) return api.sendMessage(`❌ "${args[0]}" রাশি পাওয়া যায়নি!\n📌 horoscope list দিয়ে সব রাশি দেখো।`, threadID, messageID);

  const reading = readings[Math.floor(Math.random() * readings.length)];
  const lucky = Math.floor(Math.random() * 99) + 1;
  const colors = ["লাল", "নীল", "সবুজ", "হলুদ", "সাদা", "কমলা", "বেগুনি"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  api.setMessageReaction("🔮", messageID, () => {}, true);
  return api.sendMessage(
    `🔮 HOROSCOPE 🔮\n━━━━━━━━━━━━━━━━━━\n\n${sign.emoji} ${sign.bn} | ${sign.date}\n\n📖 আজকের ভবিষ্যৎ:\n${reading}\n\n🍀 Lucky Number: ${lucky}\n🎨 Lucky Color: ${color}\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
