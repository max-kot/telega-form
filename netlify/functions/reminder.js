import fs from 'fs';
import path from 'path';
//import fetch from 'node-fetch';

const remindersFile = path.join(__dirname, "../../reminders.json");

export const handler = async () => {
	const reminders = loadReminders();

	const now = new Date();

	// Фильтруем напоминания, которые нужно отправить
	reminders.forEach((reminder, index) => {
		const reminderTime = new Date(reminder.remindTime);
		if (reminderTime <= now) {
			sendReminder(reminder.chatId, reminder.message);
			reminders.splice(index, 1);  // Удаляем отправленное напоминание
		}
	});

	// Сохраняем обновленный список напоминаний
	saveReminders(reminders);

	return { statusCode: 200, body: "Напоминания проверены." };
};

const loadReminders = () => {
	if (fs.existsSync(remindersFile)) {
		return JSON.parse(fs.readFileSync(remindersFile, 'utf-8'));
	}
	return [];
};

const saveReminders = (reminders) => {
	fs.writeFileSync(remindersFile, JSON.stringify(reminders, null, 2));
};

const sendReminder = async (chatId, message) => {
	const token = "7716038351:AAHoS7TU2CowMVuH3leMpdFaaxgbJu-eUcs"; // Замени на свой токен
	const url = `https://api.telegram.org/bot${token}/sendMessage`;

	await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			chat_id: chatId,
			text: message,
		}),
	});
};
