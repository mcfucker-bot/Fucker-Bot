const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
	name: "Wallpaper",
	version: "1.0.0",
	permission: 0,
	credits: "EMon-BHai",
	prefix: 'awto',
	description: "Search and send HD wallpapers",
	usages: "wallpaper [name]",
	category: "user",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
	const { threadID, messageID } = event;

	if (args.length === 0) {
		return api.sendMessage(
			`╔══════════════════╗\n   🖼️ WALLPAPER HELP   \n╚══════════════════╝\n\n📌 ব্যবহার : wallpaper [নাম]\n📝 উদাহরণ : wallpaper nature`,
			threadID, messageID
		);
	}

	api.setMessageReaction("⏳", messageID, () => {}, true);

	const apiKey = "39178311-acadeb32d7e369897e41dba06";
	const query = encodeURIComponent(args.join(" "));
	const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&per_page=200`;

	try {
		const response = await axios.get(apiUrl);
		const wallpapers = response.data.hits.filter(w => {
			const ext = path.extname(w.largeImageURL);
			return ext === ".jpg" || ext === ".png";
		});

		if (wallpapers.length === 0) {
			return api.sendMessage(`❌ "${args.join(" ")}" এর জন্য কোনো ওয়ালপেপার পাওয়া যায়নি।`, threadID, messageID);
		}

		let streams = [];
		let counter = 0;

		for (const wallpaper of wallpapers) {
			if (counter >= 10) break;
			const imageUrl = wallpaper.largeImageURL;
			const imageExtension = path.extname(imageUrl);
			let imagePath = path.join(__dirname, `/cache/wallpaper${counter}${imageExtension}`);
			let hasError = false;

			try {
				const imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
				fs.writeFileSync(imagePath, Buffer.from(imageResponse.data, "binary"));
			} catch (error) {
				console.error(error);
				hasError = true;
			}

			if (!hasError) {
				streams.push(fs.createReadStream(imagePath).on("end", () => {
					if (fs.existsSync(imagePath)) fs.unlink(imagePath, err => { if (err) console.error(err); });
				}));
				counter++;
			}
		}

		if (streams.length > 0) {
			api.sendMessage({
				body: `╔══════════════════╗\n   🖼️ WALLPAPER   \n╚══════════════════╝\n\n🔍 "${args.join(" ")}" এর জন্য ${streams.length}টি ওয়ালপেপার পাওয়া গেছে!\n\n══════════════════\n💎 EMon-BHai-BOT`,
				attachment: streams
			}, threadID, messageID);
		} else {
			api.sendMessage(`❌ ওয়ালপেপার লোড করতে সমস্যা হয়েছে।`, threadID, messageID);
		}
	} catch (error) {
		console.error(error);
		api.sendMessage(`❌ সমস্যা হয়েছে, আবার চেষ্টা করো।`, threadID, messageID);
	}
};
