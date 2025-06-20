import { type NextRequest, NextResponse } from "next/server";

import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { challenges } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";

export const GET = async (
  _req: NextRequest,
  { params }: { params: Promise<{ challengeId: string }> }
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { challengeId } = await params;

  const data = await db.query.lessons.findFirst({
    where: eq(challenges.id, Number(challengeId)),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ challengeId: string }> }
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { challengeId } = await params;
  const body = await req.json();

  const data = await db
    .update(challenges)
    .set({
      ...body,
    })
    .where(eq(challenges.id, Number(challengeId)))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  _req: NextRequest,
  { params }: { params: Promise<{ challengeId: string }> }
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { challengeId } = await params;

  const data = await db
    .delete(challenges)
    .where(eq(challenges.id, Number(challengeId)))
    .returning();

  return NextResponse.json(data[0]);
};
