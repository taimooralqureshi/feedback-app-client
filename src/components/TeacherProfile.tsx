import React, { useState } from "react";
import { FcNumericalSorting12, FcNumericalSorting21 } from "react-icons/fc";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";

interface TeacherProfileProps {
  teacherName: string;
  teacherBio: string;
  courses: {
    id: string;
    name: string;
    ratingDistribution: { [key: string]: number };
    reviews: { rating: number; feedback: string; user: string; date: string }[];
  }[];
}

const All = "all";

const TeacherProfile: React.FC<TeacherProfileProps> = ({
  teacherName,
  teacherBio,
  courses,
}) => {
  const [selectedCourse, setSelectedCourse] = useState<string>(All);
  const [selectedRating, setSelectedRating] = useState<number | string>(All);
  const [sortBy, setSortBy] = useState<"date" | "rating">("date");
  const [ratingOrder, setRatingOrder] = useState<"asc" | "desc">("desc");
  const [dateOrder, setDateOrder] = useState<"asc" | "desc">("desc");

  const onCourseClick = (courseId: string) => setSelectedCourse(courseId);
  const onStarClick = (star: number | string) => setSelectedRating(star);

  const onToggleSort = () => {
    if(sortBy === "rating") {
      setRatingOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setDateOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    }
  };

  const selectedCourseData =
    selectedCourse === All
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
    selectedRating === All
      ? `Total reviews: ${Object.values(ratingDistribution).reduce(
          (sum, count) => sum + count,
          0
        )}`
      : `${selectedRating}-star: ${ratingDistribution[selectedRating as number]} reviews`;

  const allReviews =
    selectedCourse === All
      ? courses.flatMap((course) => course.reviews)
      : selectedCourseData?.reviews || [];

  // Sorting reviews based on selected criteria and order
  const sortedReviews = [...allReviews].sort((a, b) => {
    if (sortBy === "date") {
      return dateOrder === "desc"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime();
    } else {
      return ratingOrder === "desc" ? b.rating - a.rating : a.rating - b.rating;
    }
  });

  const filteredReviews =
    selectedRating === All
      ? sortedReviews
      : sortedReviews.filter((review) => review.rating === selectedRating);

  const calculateAverageRating = () => {
    const totalRatings = courses.reduce((acc, course) => {
      const totalCourseRatings = Object.keys(course.ratingDistribution).reduce(
        (sum: number, star: string) => sum + course.ratingDistribution[star],
        0
      );
      const numberOfRatings = Object.values(course.ratingDistribution).reduce(
        (sum, count) => sum + count,
        0
      );
      return acc + (numberOfRatings > 0 ? totalCourseRatings / numberOfRatings : 0);
    }, 0);

    const totalCourses = courses.length;

    return totalCourses > 0 ? totalRatings / totalCourses : 0;
  };

  const averageRating = calculateAverageRating();

  return (
    <div className="max-w-lg w-full md:min-w-[800px] mx-auto mt-4 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="divide-y">
        <div className="p-4 header">
          <div className="font-bold text-2xl text-orange-600">{teacherName}</div>
          {teacherBio && <p className="text-gray-700 text-base">{teacherBio}</p>}
          <div className="p-4 flex items-center justify-between">
            <div className="border-2 border-orange-500 p-2 rounded-lg flex flex-col justify-center items-center w-[80px] h-[80px]">
              <span className="text-xs text-center font-semibold text-gray-800">Rating</span>
              <span className="text-yellow-500 text-center font-bold">{averageRating.toFixed(1)} / 5</span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <span className="text-xs font-semibold text-gray-800">Filter by Course</span>
          <div className="flex justify-between">
            <div className="list-disc list-inside flex flex-wrap items-start gap-1 mt-2">
              <div
                className={`pill cursor-pointer ${selectedCourse === All ? "pill-selected" : ""}`}
                onClick={() => onCourseClick(All)}
              >
                <span className="text-sm">All Courses</span>
              </div>
              {courses.map((course) => (
                <div
                  key={course.id}
                  className={`pill cursor-pointer ${course.id === selectedCourse ? "pill-selected" : ""}`}
                  onClick={() => onCourseClick(course.id)}
                >
                  <span className="text-sm">{course.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="">
            <span className="text-xs font-semibold text-gray-800">Filter by Rating</span>
            <div className="flex flex-wrap gap-2 mt-2">
              <div
                className={`cursor-pointer text-sm pill ${selectedRating === All ? "pill-selected" : ""}`}
                onClick={() => onStarClick(All)}
              >
                <span className="text-center flex flex-col">
                  <span>All &#9733;</span>
                  <span>({Object.values(ratingDistribution).reduce((sum, count) => sum + count, 0)} reviews)</span>
                </span>
              </div>
              {[5, 4, 3, 2, 1].map((star) => (
                <div
                  key={star}
                  className={`cursor-pointer text-sm pill ${selectedRating === star ? "pill-selected" : ""}`}
                  onClick={() => onStarClick(star)}
                >
                  <span className="text-center flex flex-col">
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
              <h3 className="text-lg font-semibold text-gray-800">Feedback</h3>
              <p className="text-gray-700">{filteredFeedback}</p>
            </div>
            <div className="flex gap-2">
              <button
                className={`pill ${sortBy === "date" ? "pill-selected" : ""} flex items-center gap-1`}
                onClick={() => {
                  setSortBy("date");
                  onToggleSort();
                }}
              >
                {dateOrder === "desc" ? <FaArrowDownLong />: <FaArrowUpLong />
                }
                Date
              </button>
              <button
                className={`pill ${sortBy === "rating" ? "pill-selected" : ""} flex items-center gap-1`}
                onClick={() => {
                  setSortBy("rating");
                  onToggleSort();
                }}
              >
                {ratingOrder === "desc" ? <FaArrowDownLong />: <FaArrowUpLong />}
                Rating
              </button>
            </div>
          </div>

          {filteredReviews.length === 0 ? (
            <div className="text-gray-500 text-center py-4">No feedback available</div>
          ) : (
            <div className="space-y-4 mt-4">
              {filteredReviews.map((review, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-800">{review.user}</span>
                      <span className="text-sm text-yellow-500">{review.rating} &#9733;</span>
                    </div>
                    <span className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-700 mt-2">{review.feedback}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
