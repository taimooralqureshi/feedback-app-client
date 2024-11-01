import React from "react";
import { useParams } from "react-router-dom";
import TeacherProfile from "../components/TeacherProfile";
import { IReview } from "../App";

interface ITeacher {
  id: string;
  name: string;
  bio: string;
  courses: {
    id: string;
    name: string;
    ratingDistribution: {
      5: number;
      4: number;
      3: number;
      2: number;
      1: number;
    };
    reviews: IReview[];
  }[];
  rating: number;
}

// Example data for the teachers with reviews added
const teacherData: ITeacher[] = [
  {
    id: "1",
    name: "Dr. John Doe",
    bio: "Dr. John Doe has been teaching Mathematics and Physics for over 20 years.",
    courses: [
      {
        id: "C1",
        name: "Mathematics 101",
        ratingDistribution: { 5: 12, 4: 3, 3: 2, 2: 1, 1: 0 },
        reviews: [
          {
            rating: 5,
            comment: "Excellent course!",
            user: "Alice",
            createdDate: "2023-09-12",
            updatedDate: null,
          },
          {
            rating: 4,
            comment: "Very good but could use more examples.",
            user: "Bob",
            createdDate: "2023-08-15",
            updatedDate: null,
          },
          {
            rating: 3,
            comment: "Average content, needs improvement.",
            user: "Charlie",
            createdDate: "2023-07-10",
            updatedDate: null,
          },
        ],
      },
      {
        id: "C2",
        name: "Advanced Physics 202",
        ratingDistribution: { 5: 12, 4: 3, 3: 2, 2: 1, 1: 0 },
        reviews: [
          {
            rating: 5,
            comment: "In-depth and informative.",
            user: "David",
            createdDate: "2023-09-18",
            updatedDate: null,
          },
          {
            rating: 4,
            comment: "Challenging but rewarding.",
            user: "Eve",
            createdDate: "2023-08-22",
            updatedDate: null,
          },
          {
            rating: 2,
            comment: "Too advanced for beginners.",
            user: "Frank",
            createdDate: "2023-07-30",
            updatedDate: null,
          },
        ],
      },
    ],
    rating: 4.8,
  },
  {
    id: "2",
    name: "Prof. Jane Smith",
    bio: "Prof. Jane Smith specializes in Computer Science and has a passion for teaching.",
    courses: [
      {
        id: "C1",
        name: "Mathematics 101",
        ratingDistribution: { 5: 12, 4: 3, 3: 2, 2: 1, 1: 0 },
        reviews: [
          {
            rating: 5,
            comment: "Great explanations.",
            user: "Grace",
            createdDate: "2023-09-01",
            updatedDate: null,
          },
          {
            rating: 4,
            comment: "Good course, but a bit fast-paced.",
            user: "Heidi",
            createdDate: "2023-08-20",
            updatedDate: null,
          },
          {
            rating: 3,
            comment: "Needs more clarity on some topics.",
            user: "Ivan",
            createdDate: "2023-07-18",
            updatedDate: null,
          },
        ],
      },
      {
        id: "C2",
        name: "Physics 202",
        ratingDistribution: { 5: 8, 4: 2, 3: 1, 2: 0, 1: 0 },
        reviews: [
          {
            rating: 5,
            comment: "Well-organized and engaging.",
            user: "Jack",
            createdDate: "2023-09-11",
            updatedDate: null,
          },
          {
            rating: 3,
            comment: "A bit tough for beginners.",
            user: "Kim",
            createdDate: "2023-08-05",
            updatedDate: null,
          },
          {
            rating: 1,
            comment: "Not what I expected.",
            user: "Liam",
            createdDate: "2023-07-27",
            updatedDate: null,
          },
        ],
      },
    ],
    rating: 4.7,
  },
];

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the dynamic id from the route

  // Find the specific teacher by ID
  const teacher = teacherData.find((teacher) => teacher.id === id);

  // Handle case where no teacher is found
  if (!teacher) {
    return (
      <div className="relative top-16 p-4 text-center text-red-500">
        Teacher not found.
      </div>
    );
  }

  return (
    <div className="h-content-viewport relative top-16 flex justify-center w-full">
      {/* Pass the teacher data to the TeacherProfile component */}
      <TeacherProfile
        teacherName={teacher.name}
        teacherBio={teacher.bio}
        courses={teacher.courses}
      />
    </div>
  );
};

export default Profile;
