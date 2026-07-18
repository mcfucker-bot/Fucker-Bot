module.exports.config = {
  name: "work",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: true,
  description: "Work a job and earn virtual currency",
  category: "economy",
  usages: "work",
  cooldowns: 1200  // 20 minutes
};

module.exports.languages = {
  "en": {
    "cooldown": "╔══════════════════╗\n   ⏳ COOLDOWN!   \n╚══════════════════╝\n\n⏳ %1, এখনো %2 মিনিট %3 সেকেন্ড বাকি!\nবিশ্রাম নাও, আবার কাজ করতে পারবে। 😊",
    "work": "╔══════════════════╗\n   💼 WORK RESULT   \n╚══════════════════╝\n\n👤 %1\n💼 কাজ : %2\n💰 আয় : %3 টাকা\n💳 মোট Balance : %4 টাকা\n\n══════════════════\n⏳ আবার কাজ করো 20 মিনিট পর\n💎 EMon-BHai-BOT"
  }
};

const jobs = [
  { name: "💻 Programming", min: 200, max: 800 },
  { name: "🔧 Car Repair", min: 150, max: 600 },
  { name: "📦 Delivery", min: 100, max: 400 },
  { name: "🍕 Food Delivery", min: 120, max: 450 },
  { name: "🎨 Graphic Design", min: 250, max: 900 },
  { name: "📸 Photography", min: 200, max: 750 },
  { name: "🔒 Cybersecurity", min: 300, max: 1000 },
  { name: "📝 Content Writing", min: 150, max: 550 },
  { name: "🎓 Tutoring", min: 200, max: 700 },
  { name: "🌐 Web Dev", min: 350, max: 1200 }
];

module.exports.run = async function({ api, event, getText, Currencies, Users }) {
  const { threadID, messageID, senderID } = event;

  const cooldown = this.config.cooldowns;
  const userData = (await Users.getData(senderID)) || {};
  const data = userData.data || {};

  if (data.workTime) {
    const diff = Date.now() - data.workTime;
    if (diff < cooldown * 1000) {
      const remaining = Math.floor((cooldown * 1000 - diff) / 1000);
      const mins = Math.floor(remaining / 60);
      const secs = remaining % 60;
      const name = userData.name || "বন্ধু";
      return api.sendMessage(getText("cooldown", name, mins, secs), threadID, messageID);
    }
  }

  const job = jobs[Math.floor(Math.random() * jobs.length)];
  const earned = Math.floor(Math.random() * (job.max - job.min + 1)) + job.min;

  let balance = (await Currencies.getData(senderID)).money || 0;
  balance += earned;
  await Currencies.setData(senderID, { money: balance });

  data.workTime = Date.now();
  await Users.setData(senderID, { data });

  const name = userData.name || "বন্ধু";
  return api.sendMessage(getText("work", name, job.name, earned.toLocaleString(), balance.toLocaleString()), threadID, messageID);
};
