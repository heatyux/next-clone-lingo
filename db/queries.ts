import { cache } from "react";
import db from "./drizzle";
import { coursesTable } from "./schema";

export const getCourses = cache(async () => {
  const data = await db.select().from(coursesTable);

  return data;
});
