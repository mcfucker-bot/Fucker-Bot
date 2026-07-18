module.exports.config = {
  name: "age",
  version: "1.0.0",
  permission: 0,
  credits: "EMon-BHai",
  prefix: true,
  description: "বয়স calculate করো",
  category: "utility",
  usages: "age [DD-MM-YYYY]  |  example: age 15-08-2000",
  cooldowns: 3
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  if (!args[0]) return api.sendMessage(
    `🎂 AGE CALCULATOR\n━━━━━━━━━━━━━━━━━━\n📌 ব্যবহার: age [DD-MM-YYYY]\nউদাহরণ: age 15-08-2000\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );

  const parts = args[0].split(/[-\/\.]/);
  if (parts.length !== 3) return api.sendMessage("❌ Format: DD-MM-YYYY\nউদাহরণ: age 15-08-2000", threadID, messageID);

  const [d, m, y] = parts.map(Number);
  if (!d || !m || !y || d > 31 || m > 12 || y < 1900) return api.sendMessage("❌ সঠিক তারিখ দাও!", threadID, messageID);

  const birth = new Date(y, m - 1, d);
  const now = new Date();
  if (birth > now) return api.sendMessage("❌ ভবিষ্যতের তারিখ দিওনি!", threadID, messageID);

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  if (days < 0) { months--; const prev = new Date(now.getFullYear(), now.getMonth(), 0); days += prev.getDate(); }
  if (months < 0) { years--; months += 12; }

  const totalDays = Math.floor((now - birth) / (1000 * 60 * 60 * 24));
  const totalMonths = years * 12 + months;
  const totalHours = totalDays * 24;

  const dayOfWeek = ["রোববার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"][birth.getDay()];

  // Next birthday
  const nextBirth = new Date(now.getFullYear(), m - 1, d);
  if (nextBirth < now) nextBirth.setFullYear(now.getFullYear() + 1);
  const daysToB = Math.ceil((nextBirth - now) / (1000 * 60 * 60 * 24));

  return api.sendMessage(
    `🎂 AGE RESULT 🎂\n━━━━━━━━━━━━━━━━━━\n\n📅 জন্মতারিখ: ${d}/${m}/${y} (${dayOfWeek})\n\n🎂 বয়স:\n${years} বছর ${months} মাস ${days} দিন\n\n📊 মোট:\n📅 ${totalDays.toLocaleString()} দিন\n🗓️ ${totalMonths} মাস\n⏰ ${totalHours.toLocaleString()} ঘণ্টা\n\n🎁 পরবর্তী জন্মদিন: ${daysToB} দিন পরে!\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
