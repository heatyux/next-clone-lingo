import { type NextRequest, NextResponse } from "next/server";

import db from "@/db/drizzle";
import { getIsAdmin } from "@/lib/admin";
import { coursesTable } from "@/db/schema";

export const GET = async () => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized.", { status: 401 });
  }

  const data = await db.query.coursesTable.findMany();

  return NextResponse.json(data);
};

export const POST = async (req: NextRequest) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized.", { status: 401 });
  }

  const body = await req.json();

  const data = await db
    .insert(coursesTable)
    .values({
      ...body,
    })
    .returning();

  return NextResponse.json(data[0]);
};
