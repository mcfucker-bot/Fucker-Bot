module.exports.config = {
  name: "gk",
  version: "1.0.0",
  permission: 0,
  credits: "EMon-BHai",
  prefix: true,
  description: "General Knowledge quiz",
  category: "games",
  usages: "gk",
  cooldowns: 10
};

if (!global.gkGame) global.gkGame = {};

const questions = [
  { q: "বাংলাদেশের জাতীয় ফুল কোনটি?", opts: ["A. গোলাপ", "B. শাপলা", "C. পদ্ম", "D. চামেলি"], ans: "B", full: "শাপলা" },
  { q: "বাংলাদেশের জাতীয় পাখি কোনটি?", opts: ["A. ময়না", "B. দোয়েল", "C. কোকিল", "D. শালিক"], ans: "B", full: "দোয়েল" },
  { q: "বাংলাদেশ কত সালে স্বাধীন হয়?", opts: ["A. ১৯৬৯", "B. ১৯৭০", "C. ১৯৭১", "D. ১৯৭২"], ans: "C", full: "১৯৭১" },
  { q: "ঢাকার পুরানো নাম কী?", opts: ["A. জাহাঙ্গীরনগর", "B. মুঘলপুর", "C. বঙ্গনগর", "D. ইসলামপুর"], ans: "A", full: "জাহাঙ্গীরনগর" },
  { q: "পৃথিবীর সবচেয়ে বড় দেশ কোনটি?", opts: ["A. চীন", "B. কানাডা", "C. রাশিয়া", "D. আমেরিকা"], ans: "C", full: "রাশিয়া" },
  { q: "পৃথিবীর সবচেয়ে ছোট দেশ কোনটি?", opts: ["A. মোনাকো", "B. ভ্যাটিকান সিটি", "C. সান মারিনো", "D. লিখটেনস্টাইন"], ans: "B", full: "ভ্যাটিকান সিটি" },
  { q: "কোন গ্রহকে লাল গ্রহ বলা হয়?", opts: ["A. শুক্র", "B. বৃহস্পতি", "C. মঙ্গল", "D. শনি"], ans: "C", full: "মঙ্গল" },
  { q: "মানবদেহে হাড়ের সংখ্যা কত?", opts: ["A. ২০০", "B. ২০৬", "C. ২১২", "D. ১৯৮"], ans: "B", full: "২০৬" },
  { q: "বিশ্বের দীর্ঘতম নদী কোনটি?", opts: ["A. আমাজন", "B. নীলনদ", "C. মিসিসিপি", "D. ইয়াংসি"], ans: "B", full: "নীলনদ" },
  { q: "কম্পিউটার আবিষ্কার করেন কে?", opts: ["A. বিল গেটস", "B. স্টিভ জবস", "C. চার্লস ব্যাবেজ", "D. অ্যালান টুরিং"], ans: "C", full: "চার্লস ব্যাবেজ" },
  { q: "ইন্টারনেট কে আবিষ্কার করেন?", opts: ["A. টিম বার্নার্স-লি", "B. ভিন্ট সার্ফ", "C. বিল গেটস", "D. মার্ক জাকারবার্গ"], ans: "B", full: "ভিন্ট সার্ফ" },
  { q: "বাংলাদেশের প্রথম রাষ্ট্রপতি কে?", opts: ["A. শেখ মুজিবুর রহমান", "B. জিয়াউর রহমান", "C. এরশাদ", "D. সৈয়দ নজরুল ইসলাম"], ans: "A", full: "শেখ মুজিবুর রহমান" },
  { q: "সুন্দরবন কোন দুটি দেশে অবস্থিত?", opts: ["A. বাংলাদেশ-মিয়ানমার", "B. বাংলাদেশ-ভারত", "C. ভারত-নেপাল", "D. বাংলাদেশ-ভুটান"], ans: "B", full: "বাংলাদেশ ও ভারত" },
  { q: "কোন ভিটামিনের অভাবে রাতকানা রোগ হয়?", opts: ["A. ভিটামিন C", "B. ভিটামিন D", "C. ভিটামিন A", "D. ভিটামিন B"], ans: "C", full: "ভিটামিন A" },
  { q: "পানির সংকেত কী?", opts: ["A. CO2", "B. H2O", "C. NaCl", "D. O2"], ans: "B", full: "H2O" }
];

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID } = event;
  if (global.gkGame[threadID]) return api.sendMessage("⚠️ ইতিমধ্যে একটি GK quiz চলছে! উত্তর দাও।", threadID, messageID);

  const q = questions[Math.floor(Math.random() * questions.length)];
  global.gkGame[threadID] = { ans: q.ans, full: q.full, start: Date.now() };

  api.setMessageReaction("🧠", messageID, () => {}, true);
  await api.sendMessage(
    `🧠 GK QUIZ 🧠\n━━━━━━━━━━━━━━━━━━\n\n❓ ${q.q}\n\n${q.opts.join("\n")}\n\n━━━━━━━━━━━━━━━━━━\n⏰ ৩০ সেকেন্ডে উত্তর দাও! (A/B/C/D)\n💎 EMon-BHai-BOT`,
    threadID
  );

  setTimeout(async () => {
    if (global.gkGame[threadID]) {
      const ans = global.gkGame[threadID];
      delete global.gkGame[threadID];
      await api.sendMessage(`⏰ সময় শেষ! সঠিক উত্তর: ${ans.ans}. ${ans.full}`, threadID);
    }
  }, 30000);
};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, body } = event;
  if (!global.gkGame?.[threadID] || !body) return;
  const game = global.gkGame[threadID];
  const ans = body.trim().toUpperCase().replace(/[^ABCD]/g, "");
  if (!ans || ans.length !== 1) return;
  if (ans === game.ans) {
    const elapsed = ((Date.now() - game.start) / 1000).toFixed(1);
    delete global.gkGame[threadID];
    return api.sendMessage(
      `✅ সঠিক উত্তর! 🎉\n━━━━━━━━━━━━━━━━━━\n🎯 উত্তর: ${game.ans}. ${game.full}\n⏱️ সময়: ${elapsed}s\n🏆 তুমি জিতেছো!\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } else {
    return api.sendMessage(`❌ ভুল! "${ans}" সঠিক নয়। আবার চেষ্টা করো!`, threadID, messageID);
  }
};
