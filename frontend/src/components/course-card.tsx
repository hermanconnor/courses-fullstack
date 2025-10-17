import { Link } from "react-router";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Course } from "@/lib/types";

interface Props {
  course: Course;
}

const CourseCard = ({ course }: Props) => {
  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="line-clamp-2 text-lg">{course.title}</CardTitle>
        </div>
        <CardDescription className="line-clamp-3">
          {course.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="mr-2 h-4 w-4" />
            {course.estimatedTime || "N/A"}
          </div>

          <div className="pt-2">
            <Link to={`/courses/${course.id}`}>
              <Button className="w-full cursor-pointer">View Course</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
