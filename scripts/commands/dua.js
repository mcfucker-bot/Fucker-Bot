module.exports.config = {
  name: "dua",
  version: "1.0.0",
  permission: 0,
  credits: "EMon-BHai",
  prefix: true,
  description: "Random Islamic dua পাও",
  category: "islamic",
  usages: "dua [topic]  |  dua list",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;

  const duas = {
    morning: {
      name: "সকালের দোয়া",
      arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
      bn: "আমরা সকালে উঠেছি এবং সমগ্র রাজত্ব আল্লাহর জন্যই হয়েছে, সমস্ত প্রশংসা আল্লাহর।",
      ref: "সহীহ মুসলিম"
    },
    night: {
      name: "রাতের দোয়া",
      arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
      bn: "হে আল্লাহ! তোমার নামে মৃত্যুবরণ করি এবং তোমার নামে জীবিত হই।",
      ref: "সহীহ বুখারি"
    },
    eating: {
      name: "খাওয়ার দোয়া",
      arabic: "بِسْمِ اللهِ وَعَلَى بَرَكَةِ اللهِ",
      bn: "আল্লাহর নামে এবং আল্লাহর বরকতের উপর ভরসা করে (খাচ্ছি)।",
      ref: "আবু দাউদ"
    },
    travel: {
      name: "সফরের দোয়া",
      arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ",
      bn: "পবিত্র সেই সত্তা যিনি এটিকে আমাদের অধীন করেছেন, অথচ আমরা এটিকে বশীভূত করার শক্তি রাখতাম না।",
      ref: "সূরা যুখরুফ ১৩"
    },
    forgiveness: {
      name: "ক্ষমার দোয়া",
      arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
      bn: "হে আল্লাহ! তুমি ক্ষমাশীল, ক্ষমা করতে ভালোবাসো, তাই আমাকে ক্ষমা করো।",
      ref: "তিরমিযী"
    },
    protection: {
      name: "সুরক্ষার দোয়া",
      arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ",
      bn: "আল্লাহর নামে, যার নামের সাথে আসমান ও জমিনে কোনো কিছুই ক্ষতি করতে পারে না।",
      ref: "আবু দাউদ"
    },
    stress: {
      name: "দুশ্চিন্তার দোয়া",
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
      bn: "হে আল্লাহ! আমি তোমার কাছে দুশ্চিন্তা ও দুঃখ থেকে আশ্রয় চাই।",
      ref: "সহীহ বুখারি"
    },
    success: {
      name: "সাফল্যের দোয়া",
      arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
      bn: "হে আমার রব! আমার বুক খুলে দাও এবং আমার কাজ সহজ করে দাও।",
      ref: "সূরা ত্বহা ২৫-২৬"
    }
  };

  if (args[0] === "list") {
    const list = Object.entries(duas).map(([k, v]) => `▸ dua ${k} — ${v.name}`).join("\n");
    return api.sendMessage(
      `🤲 DUA LIST\n━━━━━━━━━━━━━━━━━━\n\n${list}\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }

  const key = args[0]?.toLowerCase();
  const dua = duas[key] || Object.values(duas)[Math.floor(Math.random() * Object.values(duas).length)];

  api.setMessageReaction("🤲", messageID, () => {}, true);
  return api.sendMessage(
    `🤲 ${dua.name} 🤲\n━━━━━━━━━━━━━━━━━━\n\n🕌 Arabic:\n${dua.arabic}\n\n📖 বাংলা অর্থ:\n${dua.bn}\n\n📚 রেফারেন্স: ${dua.ref}\n\n━━━━━━━━━━━━━━━━━━\n💡 dua list দিয়ে সব দেখো\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
