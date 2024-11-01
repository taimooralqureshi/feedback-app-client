import React from "react";

enum CSS_TYPE {
  BACKGROUND = 0,
  TEXT = 1,
  BORDER = 2,
}

const getColor = (rating: number, classType: CSS_TYPE) => {
  if (rating <= 1)
    return ["bg-red-500", "text-red-500", "border-red-500"][classType];
  if (rating <= 2)
    return ["bg-orange-400", "text-orange-400", "border-orange-400"][classType];
  if (rating <= 3)
    return ["bg-yellow-300", "text-yellow-300", "border-yellow-300"][classType];
  if (rating <= 4)
    return ["bg-lime-400", "text-lime-400", "border-lime-400"][classType];
  return ["bg-green-500", "text-green-500", "border-green-500"][classType];
};

const RatingCube: React.FC<{ rating: number }> = ({ rating }) => {
  const textColorClass = getColor(rating, CSS_TYPE.TEXT);
  const borderColorClass = getColor(rating, CSS_TYPE.BORDER);

  return (
    <div className="inline-block items-center justify-between">
      <div
        className={`border-4 p-2 rounded-lg flex flex-col justify-center items-center w-[80px] h-[80px] ${borderColorClass} ${textColorClass}`}
      >
        <span className={`text-center font-bold`}>
          {rating.toFixed(1)} &#9733;
        </span>
        <span className="text-xs text-center font-semibold text-gray-800">
          Rating
        </span>
      </div>
    </div>
  );
};

export default RatingCube;
