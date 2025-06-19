import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { getIsAdmin } from "@/lib/admin";

export const GET = async () => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized.", { status: 401 });
  }

  const data = await db.query.coursesTable.findMany();

  return NextResponse.json(data);
};
