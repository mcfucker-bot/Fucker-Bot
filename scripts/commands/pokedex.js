module.exports.config = {
  name: "pokedex",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "Pokemon এর তথ্য দেখো",
  category: "info",
  usages: "pokedex [pokemon name/id]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const axios = require("axios");
  const fs = require("fs");
  const path = require("path");

  if (!args[0]) return api.sendMessage("📌 ব্যবহার: pokedex [pokemon]\nউদাহরণ: pokedex pikachu | pokedex 25", threadID, messageID);

  api.setMessageReaction("⏳", messageID, () => {}, true);
  const name = args[0].toLowerCase();
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`, { timeout: 10000 });
    const p = res.data;
    const types = p.types.map(t => t.type.name).join(", ");
    const stats = p.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join(" | ");
    const abilities = p.abilities.map(a => a.ability.name).join(", ");
    const imgUrl = p.sprites?.other?.["official-artwork"]?.front_default || p.sprites?.front_default;

    let attachment;
    if (imgUrl) {
      try {
        const tmpFile = path.join(__dirname, `../../cache/pokemon_${Date.now()}.png`);
        const imgRes = await axios.get(imgUrl, { responseType: "stream", timeout: 10000 });
        const writer = fs.createWriteStream(tmpFile);
        imgRes.data.pipe(writer);
        await new Promise((resolve, reject) => { writer.on("finish", resolve); writer.on("error", reject); });
        attachment = fs.createReadStream(tmpFile);
        setTimeout(() => { try { fs.unlinkSync(tmpFile); } catch {} }, 10000);
      } catch {}
    }

    const msg = {
      body: `🔴 POKÉDEX 🔴\n━━━━━━━━━━━━━━━━━━\n\n#${p.id} ${p.name.toUpperCase()}\n\n🔸 Type: ${types}\n📏 Height: ${p.height / 10}m\n⚖️ Weight: ${p.weight / 10}kg\n💪 Abilities: ${abilities}\n\n📊 Base Stats:\n${stats}\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
      ...(attachment ? { attachment } : {})
    };

    api.setMessageReaction("🎮", messageID, () => {}, true);
    return api.sendMessage(msg, threadID, messageID);
  } catch {
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage(`❌ "${name}" Pokemon পাওয়া যায়নি!`, threadID, messageID);
  }
};
