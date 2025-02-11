export const handler = async (event) => {
	try {
		const token = "7716038351:AAHoS7TU2CowMVuH3leMpdFaaxgbJu-eUcs"; // Замени на свой токен
		const chatId = "-1001449215447";  // Замени на свой Chat ID
		const data = JSON.parse(event.body);

		const dataArray = Object.entries(data);
		let message = `📩 Новая заявка с сайта!\n\n`;

		for (const [key, value] of dataArray) {
			message += `\n✅ ${key}: ${value}`;
		}

		// Отправляем сообщение с кнопками для напоминаний
		await sendReminderOptions(chatId, message);

		return { statusCode: 200, body: "OK" };
	} catch (error) {
		return { statusCode: 500, body: error.toString() };
	}
};

const sendReminderOptions = async (chatId, originalMessage) => {
	const url = `https://api.telegram.org/bot${token}/sendMessage`;
	const options = {
		reply_markup: {
			inline_keyboard: [
				[
					{ text: "Ок", callback_data: "ok" },
					{ text: "Напомнить через 5 минут", callback_data: "remind_5min" },
					{ text: "Напомнить через 1 час", callback_data: "remind_1hour" },
				],
				[
					{ text: "Напомнить завтра", callback_data: "remind_tomorrow" },
					{ text: "Напомнить в указанное время", callback_data: "remind_custom" },
				],
			],
		},
	};

	await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			chat_id: chatId,
			text: originalMessage,
			...options,
		}),
	});
};
