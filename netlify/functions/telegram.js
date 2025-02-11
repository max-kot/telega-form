//const fetch = require("node-fetch");

exports.handler = async (event) => {
	try {
		const token = "7716038351:AAHoS7TU2CowMVuH3leMpdFaaxgbJu-eUcs"; // Замени на свой токен
		const chatId = "t.me/mx_netlify_telega_bot";  // Замени на свой Chat ID
		const data = JSON.parse(event.body);

		const dataArray = Object.entries(data)
		let message = `📩 Новая заявка с сайта!\n\n`;
		//const message = `📩 Новая заявка с сайта!\n\nИмя: ${data.name}\nEmail: ${data.email}\nСообщение: ${data.message}`;
		for (const [key, value] of dataArray) {
			message += `${key}: ${value}`
		}

		const url = `https://api.telegram.org/bot${token}/sendMessage`;
		await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ chat_id: chatId, text: message })
		});

		return { statusCode: 200, body: "OK" };
	} catch (error) {
		return { statusCode: 500, body: error.toString() };
	}
};
