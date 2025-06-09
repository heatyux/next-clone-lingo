import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Resetting database...");
    await db.delete(schema.coursesTable);
    await db.delete(schema.userProgress);

    console.log("Seeding database...");
    await db.insert(schema.coursesTable).values([
      {
        id: 1,
        title: "Spanish",
        imageSrc: "/es.svg",
      },
      {
        id: 2,
        title: "French",
        imageSrc: "/fr.svg",
      },
      {
        id: 3,
        title: "Italian",
        imageSrc: "/it.svg",
      },
      {
        id: 4,
        title: "Croatian",
        imageSrc: "/hr.svg",
      },
    ]);

    console.log("Seeding finished.");
  } catch (error: unknown) {
    console.log(error);
    throw new Error("Failed to seed database.");
  }
};

main();
