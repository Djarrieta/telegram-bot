import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

import { db } from "./db";

// await db.insert(schema.movies).values([
// 	{
// 		title: "The Matrix",
// 		releaseYear: 1999,
// 	},
// 	{
// 		title: "The Matrix Reloaded",
// 		releaseYear: 2003,
// 	},
// 	{
// 		title: "The Matrix Revolutions",
// 		releaseYear: 2003,
// 	},
// ]);

// console.log(`Seeding complete.`);

const result = await db.select().from(schema.movies);
console.log(result);

// const bot = new Telegraf(process.env.BOT_TOKEN || "");

// bot.on(message("text"), async (ctx) => {
// 	await ctx.reply(`Hello ${ctx.message.from.first_name}`);
// });

// bot.on(message("document"), async (ctx) => {
// 	await ctx.reply(`Hello ${ctx.message.from.first_name}`);
// });

// bot.launch();
