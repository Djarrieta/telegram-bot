import * as schema from "./schema";
import { db } from "./db";

await db.insert(schema.users).values([
	{
		id: "5230842274",
		name: "Dario Arrieta",
	},
]);

//await db.delete(schema.users);

const users = await db.select().from(schema.users);
console.log(users);
