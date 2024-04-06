import axios from "axios";
import { eq } from "drizzle-orm";
import { createWriteStream } from "node:fs";
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { db } from "./db";
import * as schema from "./schema";

const bot = new Telegraf(process.env.BOT_TOKEN || "");

bot.on(message("document"), async (ctx) => {
	try {
		const { file_id: fileId, file_name: fileName } =
			ctx.update.message.document;
		const fileUrl = await ctx.telegram.getFileLink(fileId);
		const response = await axios.get(fileUrl.toString(), {
			responseType: "stream",
		});

		await new Promise<void>((resolve, reject) => {
			response.data
				.pipe(createWriteStream(`./data/temp/${fileName}`))
				.on("finish", resolve)
				.on("error", reject);
		});

		await ctx.reply("File saved.");
	} catch (error) {
		console.error(error);
	}
});

bot.on(message("photo"), async (ctx) => {
	try {
		console.log(ctx.update.message.photo[1].file_id);
		const { file_id: fileId, file_unique_id: fileName } =
			ctx.update.message.photo[1];

		const fileUrl = await ctx.telegram.getFileLink(fileId);
		const response = await axios.get(fileUrl.toString(), {
			responseType: "stream",
		});

		await new Promise<void>((resolve, reject) => {
			response.data
				.pipe(createWriteStream(`./data/temp/${fileName}.jpg`))
				.on("finish", resolve)
				.on("error", reject);
		});

		await ctx.reply("File saved.");
	} catch (error) {
		console.error(error);
	}
});

bot.on(message("text"), async (ctx) => {
	const userId = ctx.update.message.from.id.toString();
	const user = await db
		.select()
		.from(schema.users)
		.where(eq(schema.users.id, userId));

	if (!user.length) {
		await ctx.reply(`User ${userId} not valid.`);
		return;
	}

	await db.insert(schema.notes).values([
		{
			userId: userId,
			description: ctx.message.text,
		},
	]);

	const result = await db.select().from(schema.notes);
	console.log(result);

	await ctx.reply(`Note "${ctx.message.text}" saved.`);
});

bot.launch();
