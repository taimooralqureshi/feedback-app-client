import React, { useState } from 'react';
import { Feedback } from '../App';

interface FeedbackFormProps {
  addFeedback: (feedback: Feedback) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ addFeedback }) => {
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

  // State for feedback form
  const [feedback, setFeedback] = useState<Feedback>({
    teacherId: '',
    teacherName: '',
    courseId: '',
    courseName: '',
    rating: 0,
    comment: '',
    createdDate: new Date().toISOString(),
    updatedDate: null, // No update
  });

  // State for modal visibility
  const [isModalOpen, setModalOpen] = useState(false);

  // State for storing feedbacks in memory
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);

  const handleTeacherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTeacher = teacherList.find((teacher) => teacher.id === e.target.value);
    if (selectedTeacher) {
      setFeedback({
        ...feedback,
        teacherId: selectedTeacher.id,
        teacherName: selectedTeacher.name,
      });
    }
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCourse = courseList.find((course) => course.id === e.target.value);
    if (selectedCourse) {
      setFeedback({
        ...feedback,
        courseId: selectedCourse.id,
        courseName: selectedCourse.name,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFeedback({
      ...feedback,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalOpen(true); // Open the modal when the form is submitted
  };

  // Handle confirmation of feedback submission
  const handleConfirm = () => {
    setFeedbackList([...feedbackList, feedback]); // Add feedback to memory
    setModalOpen(false); // Close the modal
    addFeedback(feedback); // Pass feedback to parent if necessary

    // Reset the feedback form
    setFeedback({
      teacherId: '',
      teacherName: '',
      courseId: '',
      courseName: '',
      rating: 0,
      comment: '',
      createdDate: new Date().toISOString(),
      updatedDate: null, // No update
    });
  };

  const handleCancel = () => {
    setModalOpen(false); // Close the modal without saving
  };

  return (
    <div className='absolute top-16 w-full'>
      <form onSubmit={handleSubmit} className="max-w-md bg-white rounded-md mt-4 mx-auto p-4">

        {/* Teacher Name Dropdown */}
        <div className="mb-4">
          <label className="block mb-1" htmlFor="teacherName">Teacher Name</label>
          <select
            name="teacherId"
            value={feedback.teacherId}
            onChange={handleTeacherChange}
            required
            className="border p-2 w-full rounded-md"
          >
            <option value="" disabled>Select a teacher</option>
            {teacherList.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>

        {/* Course List Dropdown */}
        <div className="mb-4">
          <label className="block mb-1" htmlFor="courseId">Course Name</label>
          <select
            name="courseId"
            value={feedback.courseId}
            onChange={handleCourseChange}
            required
            className="border p-2 w-full rounded-md"
          >
            <option value="" disabled>Select a course</option>
            {courseList.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label className="block mb-1" htmlFor="rating">Rating (1-5):</label>
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={feedback.rating}
            onChange={handleInputChange}
            required
            className="border p-2 w-full"
          />
        </div>

        {/* Comment */}
        <div className="mb-4">
          <label className="block mb-1" htmlFor="comment">Comment</label>
          <textarea
            name="comment"
            value={feedback.comment}
            onChange={handleInputChange}
            required
            className="border p-2 w-full"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-orange-600 text-white p-2 rounded-md">
          Submit Feedback
        </button>
      </form>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-4">Confirm Submission</h2>
            <p className="mb-4">Are you sure you want to submit this feedback?</p>
            <button
              onClick={handleConfirm}
              className="bg-orange-600 text-white p-2 rounded-md mr-2"
            >
              Confirm
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-600 text-white p-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
