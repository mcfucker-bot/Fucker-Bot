module.exports.config = {
  name: "leaderboard",
  aliases: ["lb", "top"],
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: true,
  description: "Show top XP earners in the group",
  category: "user",
  usages: "leaderboard  |  lb",
  cooldowns: 10
};

const RANKS = [
  { name: "🌱 Newcomer",  min: 0    },
  { name: "🌿 Member",    min: 100  },
  { name: "🍀 Regular",   min: 300  },
  { name: "⭐ Active",    min: 700  },
  { name: "🌟 Veteran",   min: 1500 },
  { name: "💎 Elite",     min: 3000 },
  { name: "👑 Legend",    min: 6000 }
];

function getRank(xp) {
  let rank = RANKS[0];
  for (const r of RANKS) { if (xp >= r.min) rank = r; else break; }
  return rank;
}

const MEDALS = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

module.exports.run = async function ({ api, event, Users }) {
  const { threadID, messageID } = event;

  let threadInfo;
  try { threadInfo = await api.getThreadInfo(threadID); } catch (e) {
    return api.sendMessage(`❌ Thread info পাওয়া যায়নি।`, threadID, messageID);
  }

  const members = threadInfo.participantIDs || [];
  const scores = [];

  for (const uid of members) {
    try {
      const ud = await Users.getData(uid);
      const xp = ud?.data?.xp || 0;
      if (xp > 0) scores.push({ uid, name: ud?.name || "অজানা", xp });
    } catch (e) { /* skip */ }
  }

  if (scores.length === 0)
    return api.sendMessage(`❌ এখনো কেউ XP অর্জন করেনি।`, threadID, messageID);

  scores.sort((a, b) => b.xp - a.xp);
  const top10 = scores.slice(0, 10);

  let list = "";
  top10.forEach((u, i) => {
    const rank = getRank(u.xp);
    list += `${MEDALS[i]} ${u.name}\n   ${rank.name} • ${u.xp.toLocaleString()} XP\n\n`;
  });

  return api.sendMessage(
    `╔══════════════════╗\n   🏆 LEADERBOARD   \n╚══════════════════╝\n\n${list}══════════════════\n👥 Group : ${threadInfo.name || "এই group"}\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`,
    threadID, messageID
  );
};
