import React from 'react';
import FeedbackList from '../components/FeedbackList';
import { seedFeedbacks } from '../helper/seedData';

const Home: React.FC = () => {
  const feedbacks = seedFeedbacks; // Call the seed function here

  return (
    <div className="container mx-auto p-4">
      <FeedbackList feedbackList={feedbacks} />
    </div>
  );
};

export default Home;
