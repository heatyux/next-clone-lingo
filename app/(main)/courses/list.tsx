"use client";

import { coursesTable, userProgress } from "@/db/schema";
import { Card } from "./card";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";
import { isRedirectError } from "next/dist/client/components/redirect-error";

type ListProps = {
  courses: (typeof coursesTable.$inferSelect)[];
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

export const List = ({ courses, activeCourseId }: ListProps) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = (id: number) => {
    if (pending) return;

    if (id === activeCourseId) {
      return router.push("/learn");
    }

    startTransition(() => {
      //   try {
      //     await upsertUserProgress(id);
      //   } catch (error) {
      //     if (isRedirectError(error)) {
      //       return;
      //     }
      //     toast.error("Something went wrong.");
      //   }
      // });
      upsertUserProgress(id).catch((error) => {
        if (isRedirectError(error)) {
          return;
        }
        toast.error("Something went wrong.");
      });
    });
  };

  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={onClick}
          disabled={pending}
          isActive={course.id === activeCourseId}
        />
      ))}
    </div>
  );
};
