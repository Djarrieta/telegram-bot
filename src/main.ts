import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import * as schema from "./schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

const bot = new Telegraf(process.env.BOT_TOKEN || "");

bot.on(message("text"), async (ctx) => {
	const userId = ctx.message.chat.id.toString();

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
