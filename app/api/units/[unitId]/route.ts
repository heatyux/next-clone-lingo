import { type NextRequest, NextResponse } from "next/server";

import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { units } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";

export const GET = async (
  _req: NextRequest,
  { params }: { params: Promise<{ unitId: string }> }
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { unitId } = await params;

  const data = await db.query.units.findFirst({
    where: eq(units.id, Number(unitId)),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ unitId: string }> }
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { unitId } = await params;
  const body = await req.json();

  const data = await db
    .update(units)
    .set({
      ...body,
    })
    .where(eq(units.id, Number(unitId)))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  _req: NextRequest,
  { params }: { params: Promise<{ unitId: string }> }
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { unitId } = await params;

  const data = await db
    .delete(units)
    .where(eq(units.id, Number(unitId)))
    .returning();

  return NextResponse.json(data[0]);
};
