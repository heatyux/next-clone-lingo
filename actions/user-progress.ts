"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import db from "@/db/drizzle";
import { getCourse, getUserProgress } from "@/db/queries";
import { userProgress } from "@/db/schema";

export const upsertUserProgress = async (courseId: number) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized.");
  }

  const course = await getCourse(courseId);

  if (!course) {
    throw new Error("Course not found.");
  }

  // TODO: Enable once units and lessons are added
  // if (!course.units.length || !course.units[0].lessons.length) {
  //   throw new Error('Course is empty.')
  // }

  const existUserProgress = await getUserProgress();

  if (existUserProgress) {
    await db.update(userProgress).set({
      userId,
      activeCourseId: courseId,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/mascot.svg",
    });

    revalidatePath("/course");
    revalidatePath("/learn");
    redirect("/learn");
  }

  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "/mascot.svg",
  });

  revalidatePath("/course");
  revalidatePath("/learn");
  redirect("/learn");
};
