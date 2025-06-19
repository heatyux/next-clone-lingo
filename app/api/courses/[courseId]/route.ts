import { type NextRequest, NextResponse } from "next/server";

import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { coursesTable } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";

export const GET = async (
  _req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { courseId } = await params;

  const data = await db.query.coursesTable.findFirst({
    where: eq(coursesTable.id, Number(courseId)),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { courseId } = await params;
  const body = await req.json();

  const data = await db
    .update(coursesTable)
    .set({
      ...body,
    })
    .where(eq(coursesTable.id, Number(courseId)))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  _req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { courseId } = await params;

  const data = await db
    .delete(coursesTable)
    .where(eq(coursesTable.id, Number(courseId)))
    .returning();

  return NextResponse.json(data[0]);
};
