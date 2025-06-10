import { cache } from "react";
import db from "./drizzle";
import { coursesTable, units, userProgress } from "./schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const getCourses = cache(async () => {
  const data = await db.select().from(coursesTable);

  return data;
});

export const getUserProgress = cache(async () => {
  const { userId } = await auth();

  if (!userId) return null;

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  });

  return data;
});

export const getUnits = cache(async () => {
  const userProgress = await getUserProgress();

  if (!userProgress?.activeCourseId) {
    return [];
  }

  const data = await db.query.units.findMany({
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        with: {
          challenges: {
            with: {
              challengeProgress: true,
            },
          },
        },
      },
    },
  });

  const normalizedData = data.map((unit) => {
    const lessonWithComplatedStatus = unit.lessons.map((lesson) => {
      const allCompletedChallenges = lesson.challenges.every((challenge) => {
        return (
          challenge.challengeProgress &&
          challenge.challengeProgress.length > 0 &&
          challenge.challengeProgress.every(
            (challengeProgress) => challengeProgress.completed
          )
        );
      });
      return {
        ...lesson,
        completed: allCompletedChallenges,
      };
    });

    return {
      ...unit,
      lessons: lessonWithComplatedStatus,
    };
  });

  return normalizedData;
});

export const getCourse = cache(async (courseId: number) => {
  const data = await db.query.coursesTable.findFirst({
    where: eq(coursesTable.id, courseId),
    // TODO: Populate units and lessons
  });

  return data;
});
