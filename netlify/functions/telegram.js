exports.handler = async (event) => {
	try {
		const token = "7716038351:AAHoS7TU2CowMVuH3leMpdFaaxgbJu-eUcs"; // Замени на свой токен
		const chatId = "-1001449215447";  // Замени на свой Chat ID
		const data = JSON.parse(event.body);

		const dataArray = Object.entries(data)
		let message = `📩 Новая заявка с сайта!\n\n`;
		//const message = `📩 Новая заявка с сайта!\n\nИмя: ${data.name}\nEmail: ${data.email}\nСообщение: ${data.message}`;
		for (const [key, value] of dataArray) {
			message += `\n✅ ${key}: ${value}`
		}
		

		// Отправляем сообщение с кнопками для напоминаний
    await sendReminderOptions(chatId, message);

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
