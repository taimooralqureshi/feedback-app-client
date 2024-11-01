import { Feedback } from "../App";

const teachers = [
  { id: "1", name: "Dr. John Doe" },
  { id: "2", name: "Prof. Jane Smith" },
  { id: "3", name: "Ms. Emily Johnson" },
];

const courses = [
  { id: "C1", name: "Mathematics 101" },
  { id: "C2", name: "Physics 202" },
  { id: "C3", name: "Computer Science 303" },
];

const seedFeedback = (): Feedback[] => {
  const feedbackList: Feedback[] = [
    {
      teacherId: "1",
      courseId: "C1",
      teacherName: "Dr. John Doe",
      courseName: "Mathematics 101",
      review: {
        rating: 4.9,
        comment:
          "Dr. John explains complex math concepts in a very simple way. Highly recommend!",
        user: "Student A",
        createdDate: "2023-09-12T10:20:00Z",
        updatedDate: null,
      },
    },
    {
      teacherId: "1",
      courseId: "C2",
      teacherName: "Dr. John Doe",
      courseName: "Physics 202",
      review: {
        rating: 4.7,
        comment:
          "Physics was never this easy. Dr. John really knows how to make things interesting.",
        user: "Student B",
        createdDate: "2023-08-22T09:30:00Z",
        updatedDate: "2023-09-02T11:00:00Z",
      },
    },
    {
      teacherId: "1",
      courseId: "C3",
      teacherName: "Dr. John Doe",
      courseName: "Computer Science 303",
      review: {
        rating: 4.8,
        comment:
          "Great teacher! His knowledge in computer science is impressive.",
        user: "Student C",
        createdDate: "2023-07-10T11:15:00Z",
        updatedDate: null,
      },
    },
    {
      teacherId: "2",
      courseId: "C1",
      teacherName: "Prof. Jane Smith",
      courseName: "Mathematics 101",
      review: {
        rating: 4.6,
        comment:
          "Prof. Jane was thorough with her explanations. Learned a lot!",
        user: "Student D",
        createdDate: "2023-09-25T14:40:00Z",
        updatedDate: null,
      },
    },
    {
      teacherId: "2",
      courseId: "C2",
      teacherName: "Prof. Jane Smith",
      courseName: "Physics 202",
      review: {
        rating: 4.5,
        comment: "Physics lectures were very engaging. I enjoyed the course.",
        user: "Student E",
        createdDate: "2023-09-05T08:30:00Z",
        updatedDate: "2023-09-15T13:55:00Z",
      },
    },
    {
      teacherId: "2",
      courseId: "C3",
      teacherName: "Prof. Jane Smith",
      courseName: "Computer Science 303",
      review: {
        rating: 4.9,
        comment: "Exceptional teacher. The course was structured really well!",
        user: "Student F",
        createdDate: "2023-08-18T10:00:00Z",
        updatedDate: null,
      },
    },
    {
      teacherId: "3",
      courseId: "C1",
      teacherName: "Ms. Emily Johnson",
      courseName: "Mathematics 101",
      review: {
        rating: 4.7,
        comment: "Emily helped make math fun! Great teaching style.",
        user: "Student G",
        createdDate: "2023-09-10T14:00:00Z",
        updatedDate: "2023-09-18T16:15:00Z",
      },
    },
    {
      teacherId: "3",
      courseId: "C2",
      teacherName: "Ms. Emily Johnson",
      courseName: "Physics 202",
      review: {
        rating: 4.8,
        comment:
          "Her approach to physics was hands-on and practical. Enjoyed every class.",
        user: "Student H",
        createdDate: "2023-08-28T11:20:00Z",
        updatedDate: null,
      },
    },
    {
      teacherId: "3",
      courseId: "C3",
      teacherName: "Ms. Emily Johnson",
      courseName: "Computer Science 303",
      review: {
        rating: 4.6,
        comment:
          "Good understanding of concepts and great interaction with students.",
        user: "Student I",
        createdDate: "2023-07-15T12:45:00Z",
        updatedDate: null,
      },
    },
  ];

  return feedbackList;
};

export const seedFeedbacks = seedFeedback();
