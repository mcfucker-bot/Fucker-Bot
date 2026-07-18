module.exports.config = {
	name: "covid",
	version: "1.0.0",
	permission: 0,
	credits: "EMon-BHai",
	prefix: 'awto',
	description: "View COVID-19 statistics by country",
	category: "user",
	usages: "covid [country name]",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	var tip = args.join(" ");

	if (!tip) return api.sendMessage(
		`╔══════════════════╗\n   🦠 COVID TRACKER   \n╚══════════════════╝\n\n❌ দেশের নাম দাও!\n\n📌 ব্যবহার : covid [দেশের নাম]\n📝 উদাহরণ : covid Bangladesh`,
		event.threadID, event.messageID
	);

	axios.get(`https://disease.sh/v3/covid-19/countries/${encodeURIComponent(tip)}`).then(res => {
		let { cases, deaths, recovered, population, continent, country } = res.data;
		var flag = res.data.countryInfo.flag;

		let callback = function() {
			api.sendMessage({
				body: `╔══════════════════╗\n   🦠 COVID TRACKER   \n╚══════════════════╝\n\n🌍 দেশ : ${country}\n🌐 মহাদেশ : ${continent}\n\n══════════════════\n😷 মোট আক্রান্ত : ${cases.toLocaleString()}\n💀 মৃত্যু : ${deaths.toLocaleString()}\n💚 সুস্থ : ${recovered.toLocaleString()}\n👥 জনসংখ্যা : ${population.toLocaleString()}\n══════════════════\n💎 EMon-BHai-BOT`,
				attachment: fs.createReadStream(__dirname + `/cache/covidtk.png`)
			}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/covidtk.png`), event.messageID);
		};
		request(encodeURI(flag)).pipe(fs.createWriteStream(__dirname + `/cache/covidtk.png`)).on("close", callback);
	}).catch(() => {
		api.sendMessage(`❌ "${tip}" দেশটি খুঁজে পাওয়া যায়নি।`, event.threadID, event.messageID);
	});
};
