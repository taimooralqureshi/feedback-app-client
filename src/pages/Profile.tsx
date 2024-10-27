import React from 'react';
import { useParams } from 'react-router-dom';
import TeacherProfile from '../components/TeacherProfile';

interface ITeacher {
  id: string;
  name: string;
  bio: string;
  courses: {
    id: string;
    name: string;
    ratingDistribution: { 5: number; 4: number; 3: number; 2: number; 1: number };
    reviews: { rating: number; feedback: string; user: string; date: string }[]; // Add user and date
  }[];
  rating: number;
}

// Example data for the teachers with reviews added
const teacherData: ITeacher[] = [
  {
    id: '1',
    name: 'Dr. John Doe',
    bio: 'Dr. John Doe has been teaching Mathematics and Physics for over 20 years.',
    courses: [
      {
        id: 'C1',
        name: 'Mathematics 101',
        ratingDistribution: { 5: 12, 4: 3, 3: 2, 2: 1, 1: 0 },
        reviews: [
          { rating: 5, feedback: 'Excellent course!', user: 'Alice', date: '2023-09-12' },
          { rating: 4, feedback: 'Very good but could use more examples.', user: 'Bob', date: '2023-08-15' },
          { rating: 3, feedback: 'Average content, needs improvement.', user: 'Charlie', date: '2023-07-10' },
        ],
      },
      {
        id: 'C2',
        name: 'Advanced Physics 202',
        ratingDistribution: { 5: 12, 4: 3, 3: 2, 2: 1, 1: 0 },
        reviews: [
          { rating: 5, feedback: 'In-depth and informative.', user: 'David', date: '2023-09-18' },
          { rating: 4, feedback: 'Challenging but rewarding.', user: 'Eve', date: '2023-08-22' },
          { rating: 2, feedback: 'Too advanced for beginners.', user: 'Frank', date: '2023-07-30' },
        ],
      },
    ],
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Prof. Jane Smith',
    bio: 'Prof. Jane Smith specializes in Computer Science and has a passion for teaching.',
    courses: [
      {
        id: 'C1',
        name: 'Mathematics 101',
        ratingDistribution: { 5: 12, 4: 3, 3: 2, 2: 1, 1: 0 },
        reviews: [
          { rating: 5, feedback: 'Great explanations.', user: 'Grace', date: '2023-09-01' },
          { rating: 4, feedback: 'Good course, but a bit fast-paced.', user: 'Heidi', date: '2023-08-20' },
          { rating: 3, feedback: 'Needs more clarity on some topics.', user: 'Ivan', date: '2023-07-18' },
        ],
      },
      {
        id: 'C2',
        name: 'Physics 202',
        ratingDistribution: { 5: 8, 4: 2, 3: 1, 2: 0, 1: 0 },
        reviews: [
          { rating: 5, feedback: 'Well-organized and engaging.', user: 'Jack', date: '2023-09-11' },
          { rating: 3, feedback: 'A bit tough for beginners.', user: 'Kim', date: '2023-08-05' },
          { rating: 1, feedback: 'Not what I expected.', user: 'Liam', date: '2023-07-27' },
        ],
      },
    ],
    rating: 4.7,
  },
];



const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the dynamic id from the route

  // Find the specific teacher by ID
  const teacher = teacherData.find(teacher => teacher.id === id);

  // Handle case where no teacher is found
  if (!teacher) {
    return <div className="relative top-16 p-4 text-center text-red-500">Teacher not found.</div>;
  }

  return (
    <div className="relative top-16 p-4 flex justify-center w-full">
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
