import { redirect } from "next/navigation";
import { getLesson, getUserProgress } from "@/db/queries";
import { Quiz } from "../quiz";

type LessonIdPageProps = {
  params: Promise<{
    lessonId: string;
  }>;
};

const LessonIdPage = async ({ params }: LessonIdPageProps) => {
  const { lessonId } = await params;

  const lessonData = getLesson(Number(lessonId));
  const userProgressData = getUserProgress();

  const [lesson, userProgress] = await Promise.all([
    lessonData,
    userProgressData,
  ]);

  if (!lesson || !userProgress?.activeCourse) {
    redirect("/learn");
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  console.log(initialPercentage);

  return (
    <Quiz
      initialLessonId={Number(lessonId)}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={null} // TODO: Add user subscription
    />
  );
};

export default LessonIdPage;
