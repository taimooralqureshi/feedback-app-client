import React, { useState } from 'react';
import { Feedback } from '../App';
import './styles.css'
import { Link } from 'react-router-dom';

interface FeedbackListProps {
  feedbackList: Feedback[];
}



const FeedbackList: React.FC<FeedbackListProps> = ({ feedbackList }) => {
  // State for filters
  const [selectedTeacher, setSelectedTeacher] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string>('');

  // Predefined lists for teachers and courses (with IDs)
  const teacherList = [
    { id: '1', name: 'Dr. John Doe' },
    { id: '2', name: 'Prof. Jane Smith' },
    { id: '3', name: 'Ms. Emily Johnson' },
  ];

  const courseList = [
    { id: 'C1', name: 'Mathematics 101' },
    { id: 'C2', name: 'Physics 202' },
    { id: 'C3', name: 'Computer Science 303' },
  ];

  // Filter feedback based on selected teacher and course
  const filteredFeedback = feedbackList.filter(feedback => {
    const matchesTeacher = selectedTeacher ? feedback.teacherId === selectedTeacher : true;
    const matchesCourse = selectedCourse ? feedback.courseId === selectedCourse : true;
    return matchesTeacher && matchesCourse;
  });

  return (
    <div className='absolute w-full'>
      <div className="bg-slate-200 top-16 mr-5 right-0 z-[1] absolute h-[61px] w-full flex justify-center">
        <div className="filter-bar m-4 fixed flex gap-5 max-w-4xl w-full bg-white rounded-lg shadow-lg px-5 pt-3">
          <div className="mb-4">
            <label className="block text-xs mb-1" htmlFor="teacherFilter">Filter by Teacher</label>
            <select
              id="teacherFilter"
              value={selectedTeacher}
              onChange={e => setSelectedTeacher(e.target.value)}
              className="border p-2 w-full rounded-md"
            >
              <option value="">All Teachers</option>
              {teacherList.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-xs mb-1" htmlFor="courseFilter">Filter by Course</label>
            <select
              id="courseFilter"
              value={selectedCourse}
              onChange={e => setSelectedCourse(e.target.value)}
              className="border p-2 w-full rounded-md"
            >
              <option value="">All Courses</option>
              {courseList.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="feedback-list">  
      <div className="max-w-3xl mx-auto mt-32 mb-5 shadow-lg rounded-lg">
      <ul className="divide-y divide-gray-200">
        {filteredFeedback.map((feedback) => (
          <li key={feedback.teacherId + feedback.courseId} className="bg-white mb-2 rounded-md">
            {/* Teacher and Course Info */}
            <div className="p-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {feedback.teacherName}
                </h2>
                <div className="pt-2 flex flex-wrap gap-1">

                <span className="pill pill-selected">{feedback.courseName}</span>
                </div>
              </div>
              {/* Average Rating */}
              <div className="border-2 border-orange-500 flex flex-col rounded-lg justify-center items-center min-w-[90px] h-[90px] align-center">
                <span className="text-[10px]">
                  Overall Rating
                  </span>
              <div className='flex flex-row'>
              <span className="text-yellow-500 font-bold text-lg mr-2">
                  {feedback.rating}
                  &#9733;
                </span>
              </div>
               
              </div>
            </div>
            <hr />
            <div className="p-4">
            {/* Create and Update Dates */}
            <div className="mb-4 text-xs font-bold text-gray-500">
              {!feedback.updatedDate && <p>last posted by user &diams; {new Date(feedback.createdDate).toLocaleDateString()}</p>}
              {feedback.updatedDate && <p>Last updated by user &diams; {new Date(feedback.updatedDate).toLocaleDateString()}</p>}
            </div>
            {/* Feedback Comment */}
            <p className="text-gray-700 italic">“{feedback.comment}”</p>
            </div>
          <hr />
            <Link to={'/profile/'+feedback.teacherId}>
              <div className="text-center font-semibold hover:bg-slate-200/30 p-2">
                Show all
              </div>
            </Link>
          </li>

        ))}
      </ul>
    </div>
      </div>
    </div>
  );
};

export default FeedbackList;
