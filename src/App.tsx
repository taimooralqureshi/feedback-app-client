import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import FeedbackList from './components/FeedbackList';
import FeedbackForm from './components/FeedbackForm';
import { seedFeedbacks } from './helper/seedData';
import './App.css'
import LoginPage from './components/LoginForm';
import Profile from './pages/Profile';

// Define the Feedback type

export interface Feedback {
  teacherId: string;
  teacherName: string;
  courseId: string;
  courseName: string;
  rating: number;
  comment: string;
  createdDate: string;
  updatedDate: string | null;
}

function App() {
  const feedbacks = seedFeedbacks; // Call the seed function here

  // Explicitly define the type of feedbackList as an array of Feedback objects
  const [feedbackList, setFeedbackList] = useState<Feedback[]>(feedbacks);

  const addFeedback = (feedback: Feedback) => {
    setFeedbackList([...feedbackList, feedback]); // Add new feedback to the list
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="app-content bg-slate-200 w-full">
        <Routes>
          <Route path="/" element={<FeedbackList feedbackList={feedbackList} />} />
          <Route path="/submit-feedback" element={<FeedbackForm addFeedback={addFeedback} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/profile/:id' element={<Profile />} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
