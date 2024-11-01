import React, { useState } from "react";
import ThreeStateSort, {
  SORT_STATE,
  SortStateType,
} from "./shared/ThreeStateSort";
import RatingCube from "./shared/RatingCard";
import ReviewCard from "./shared/ReviewCard";
import { IReview } from "../App";

interface TeacherProfileProps {
  teacherName: string;
  teacherBio: string;
  courses: {
    id: string;
    name: string;
    ratingDistribution: { [key: string]: number };
    reviews: IReview[];
  }[];
}

const ALL = "all";

const TeacherProfile: React.FC<TeacherProfileProps> = ({
  teacherName,
  teacherBio,
  courses,
}) => {
  const [selectedCourse, setSelectedCourse] = useState<string>(ALL);
  const [selectedRating, setSelectedRating] = useState<number | string>(ALL);
  const [ratingOrder, setRatingOrder] = useState<SortStateType>(
    SORT_STATE.NONE
  );
  const [dateOrder, setDateOrder] = useState<SortStateType>(SORT_STATE.NONE);

  const onCourseClick = (courseId: string) => setSelectedCourse(courseId);
  const onStarClick = (star: number | string) => setSelectedRating(star);

  const selectedCourseData =
    selectedCourse === ALL
      ? null
      : courses.find((course) => course.id === selectedCourse);

  const ratingDistribution = selectedCourseData
    ? selectedCourseData.ratingDistribution
    : courses.reduce(
        (acc: { [key: string]: number }, course) => {
          Object.keys(acc).forEach((star) => {
            acc[star] += course.ratingDistribution[star] || 0;
          });
          return acc;
        },
        { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
      );

  const filteredFeedback =
    selectedRating === ALL
      ? `Total reviews: ${Object.values(ratingDistribution).reduce(
          (sum, count) => sum + count,
          0
        )}`
      : `${selectedRating}-star: ${
          ratingDistribution[selectedRating as number]
        } reviews`;

  const allReviews =
    selectedCourse === ALL
      ? courses.flatMap((course) => course.reviews)
      : selectedCourseData?.reviews || [];

  // Sorting reviews based on selected criteria and order
  const sortedReviews = [...allReviews].sort((a, b) => {
    const a_date = a.updatedDate ? a.updatedDate : a.createdDate;
    const b_date = b.updatedDate ? b.updatedDate : b.createdDate;
    if (dateOrder) {
      if (dateOrder === "none") return 0;
      return dateOrder === "desc"
        ? new Date(b_date).getTime() - new Date(a_date).getTime()
        : new Date(a_date).getTime() - new Date(b_date).getTime();
    } else {
      return ratingOrder === "desc" ? b.rating - a.rating : a.rating - b.rating;
    }
  });

  const filteredReviews =
    selectedRating === ALL
      ? sortedReviews
      : sortedReviews.filter((review) => review.rating === selectedRating);

  return (
    <div className="p-4 overflow-auto w-full">
      <div className="max-w-lg w-full md:min-w-[800px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="divide-y">
          <div className="p-4 header flex justify-between">
            <div>
              <div className="font-bold text-2xl text-orange-600">
                {teacherName}
              </div>
              {teacherBio && (
                <p className="text-gray-700 text-base">{teacherBio}</p>
              )}
            </div>
            <RatingCube rating={1} />
          </div>

          <div className="p-4">
            <span className="text-xs font-semibold text-gray-800">
              Filter by Course
            </span>
            <div className="flex justify-between">
              <div className="list-disc list-inside flex flex-wrap items-start gap-1 mt-2">
                <div
                  className={`pill cursor-pointer text-sm ${
                    selectedCourse === ALL ? "pill-selected" : ""
                  }`}
                  onClick={() => onCourseClick(ALL)}
                >
                  <span className="text-sm">ALL Courses</span>
                </div>
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className={`pill cursor-pointer text-sm ${
                      course.id === selectedCourse ? "pill-selected" : ""
                    }`}
                    onClick={() => onCourseClick(course.id)}
                  >
                    <span className="text-sm">{course.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs font-semibold text-gray-800">
                Filter by Rating
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                <div
                  className={`cursor-pointer text-sm pill ${
                    selectedRating === ALL ? "pill-selected" : ""
                  }`}
                  onClick={() => onStarClick(ALL)}
                >
                  <span className="text-center flex gap-1">
                    <span>ALL &#9733;</span>
                    <span>
                      (
                      {Object.values(ratingDistribution).reduce(
                        (sum, count) => sum + count,
                        0
                      )}{" "}
                      reviews)
                    </span>
                  </span>
                </div>
                {[5, 4, 3, 2, 1].map((star) => (
                  <div
                    key={star}
                    className={`cursor-pointer text-sm pill ${
                      selectedRating === star ? "pill-selected" : ""
                    }`}
                    onClick={() => onStarClick(star)}
                  >
                    <span className="text-center flex gap-1">
                      <span>{star} &#9733;</span>
                      <span>({ratingDistribution[star]} reviews)</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800">Reviews</h3>
                <p className="text-gray-700">{filteredFeedback}</p>
              </div>
              <div className="flex gap-2">
                <ThreeStateSort onSortChange={setDateOrder} label="Date" />
                <ThreeStateSort onSortChange={setRatingOrder} label="Rating" />
              </div>
            </div>

            {filteredReviews.length === 0 ? (
              <div className="text-gray-500 text-center py-4">
                No reviews available
              </div>
            ) : (
              <div className="space-y-4 mt-4">
                {filteredReviews.map((review, index) => (
                  <ReviewCard key={index} index={index} review={review} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
