import React from "react";

type statProps = {
  totalScore?: any;
  wordsLength?: any;
  accuracy?: any;
};

function Stats({ totalScore, wordsLength, accuracy }: statProps) {
  return (
    <div className="flex flex-row mt-2 items-baseline justify-between">
      <div className="flex flex-col space-y-2">
        <p className="font-serif text-base font-semibold">Total Score:</p>
        <p className="text-center text-3xl">
          {totalScore}/{wordsLength}
        </p>
      </div>

      <div className="flex flex-col space-y-2">
        <p className="font-serif text-base font-semibold">Accuracy:</p>
        <p className="text-center text-3xl">
          {isNaN(accuracy) ? 0 : accuracy}%
        </p>
      </div>

      <div className="flex flex-col space-y-2">
        <p className="font-serif text-base font-semibold">Word Per minute:</p>
        <p className="text-center text-3xl">20</p>
      </div>
    </div>
  );
}

export default Stats;
