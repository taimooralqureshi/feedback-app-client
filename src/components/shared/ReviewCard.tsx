import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { IReview } from "../../App";

const ReviewCard: React.FC<{ index: number; review: IReview }> = ({
  index,
  review,
}) => {
  const [helpfulCount, setHelpfulCount] = useState(0);
  const [notHelpfulCount, setNotHelpfulCount] = useState(0);

  const handleHelpful = () => setHelpfulCount(helpfulCount + 1);
  const handleNotHelpful = () => setNotHelpfulCount(notHelpfulCount + 1);

  return (
    <div
      key={index}
      className="bg-slate-100/50 p-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-800">{review.user}</span>
          <span className="text-sm text-yellow-500">
            {review.rating} &#9733;
          </span>
        </div>
        <span className="text-xs text-gray-500">
          {new Date(
            review.updatedDate ? review.updatedDate : review.createdDate
          ).toLocaleDateString()}
        </span>
      </div>
      <p className="text-gray-700 mt-2">{review.comment}</p>
      <div className="flex justify-end items-center gap-4 mt-2">
        <button
          onClick={handleHelpful}
          className="flex items-center text-green-500 hover:text-green-700 transition-colors duration-200"
        >
          <FaThumbsUp className="mr-1" />
          Helpful ({helpfulCount})
        </button>
        <button
          onClick={handleNotHelpful}
          className="flex items-center text-red-500 hover:text-red-700 transition-colors duration-200"
        >
          <FaThumbsDown className="mr-1" />
          Not Helpful ({notHelpfulCount})
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
