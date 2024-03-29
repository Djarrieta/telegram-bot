import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import * as schema from "./schema";
import { db } from "./db";

const bot = new Telegraf(process.env.BOT_TOKEN || "");

bot.on(message("text"), async (ctx) => {
	await db.insert(schema.movies).values([
		{
			title: ctx.message.text,
			releaseYear: 0,
		},
	]);

	const result = await db.select().from(schema.movies);
	console.log(result);
	await ctx.reply(`${ctx.message.text}`);
});

bot.launch();
