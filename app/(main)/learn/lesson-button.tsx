type LessonButtonProps = {
  id: number;
  index: number;
  totalCount: number;
  current?: boolean;
  locked?: boolean;
  percentage: number;
};

export const LessonButton = ({ id }: LessonButtonProps) => {
  return <div>{id}</div>;
};
