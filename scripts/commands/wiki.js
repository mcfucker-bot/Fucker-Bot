module.exports.config = {
  name: "wiki",
  version: "3.0.0",
  permission: 0,
  credits: "EMon-BHai",
  prefix: true,
  description: "Wikipedia তে search করো (বাংলা/English)",
  category: "info",
  usages: "wiki [keyword]  |  wiki en [keyword]",
  cooldowns: 5
};

module.exports.run = async ({ event, args, api }) => {
  const axios = require("axios");
  const { threadID, messageID } = event;

  if (!args.length) return api.sendMessage(
    `📚 WIKIPEDIA\n━━━━━━━━━━━━━━━━━━\n📌 ব্যবহার:\n▸ wiki Bangladesh\n▸ wiki en Artificial Intelligence\n▸ wiki bn বাংলাদেশ\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );

  api.setMessageReaction("⏳", messageID, () => {}, true);

  // Force lang if specified
  let langs = ["bn", "en"];
  let query = args.join(" ");

  if (args[0] === "en") { langs = ["en"]; query = args.slice(1).join(" "); }
  else if (args[0] === "bn") { langs = ["bn"]; query = args.slice(1).join(" "); }

  if (!query.trim()) return api.sendMessage("❌ Search term দাও!", threadID, messageID);

  for (const lang of langs) {
    try {
      // Step 1: Search for title
      const searchRes = await axios.get(`https://${lang}.wikipedia.org/w/api.php`, {
        params: { action: "opensearch", search: query, limit: 1, format: "json", redirects: "resolve" },
        timeout: 12000,
        headers: { "User-Agent": "EMon-BHai-Bot/3.0" }
      });

      const titles = searchRes.data[1];
      if (!titles || !titles.length) continue;
      const title = titles[0];

      // Step 2: Get full summary via REST
      const summaryRes = await axios.get(
        `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
        { timeout: 12000, headers: { "User-Agent": "EMon-BHai-Bot/3.0" } }
      );

      const { extract, content_urls, thumbnail } = summaryRes.data;
      if (!extract || extract.length < 20) continue;

      const text = extract.length > 900 ? extract.substring(0, 900) + "..." : extract;
      const link = content_urls?.desktop?.page || `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(title)}`;
      const langLabel = lang === "bn" ? "🇧🇩 বাংলা" : "🌐 English";

      api.setMessageReaction("📚", messageID, () => {}, true);

      // Download thumbnail if available
      if (thumbnail?.source) {
        try {
          const fs = require("fs");
          const path = require("path");
          const imgRes = await axios.get(thumbnail.source, { responseType: "stream", timeout: 10000 });
          const tmpFile = path.join(__dirname, `../../cache/wiki_${Date.now()}.jpg`);
          const writer = fs.createWriteStream(tmpFile);
          imgRes.data.pipe(writer);
          await new Promise((resolve, reject) => { writer.on("finish", resolve); writer.on("error", reject); });
          return api.sendMessage(
            {
              body: `📚 WIKIPEDIA ${langLabel}\n━━━━━━━━━━━━━━━━━━\n\n📖 ${title}\n\n${text}\n\n🔗 ${link}\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
              attachment: fs.createReadStream(tmpFile)
            },
            threadID,
            () => { try { require("fs").unlinkSync(tmpFile); } catch (_) {} },
            messageID
          );
        } catch (_) {}
      }

      return api.sendMessage(
        `📚 WIKIPEDIA ${langLabel}\n━━━━━━━━━━━━━━━━━━\n\n📖 ${title}\n\n${text}\n\n🔗 ${link}\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
        threadID, messageID
      );
    } catch (_) { continue; }
  }

  api.setMessageReaction("❌", messageID, () => {}, true);
  return api.sendMessage(
    `❌ "${query}" সম্পর্কে Wikipedia তে কিছু পাওয়া যায়নি।\n💡 ইংরেজিতে try করো: wiki en ${query}`,
    threadID, messageID
  );
};
