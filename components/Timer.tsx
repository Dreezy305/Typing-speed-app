import React from "react";
import Button from "./Button";

type timerProps = {
  minutes?: any;
  seconds?: any;
  onStart?: () => void;
  onStop?: () => void;
};

function Timer({ minutes, seconds, onStart, onStop }: timerProps) {
  return (
    <div className="flex flex-col space-y-3 justify-center relative w-4/5">
      <p className="text-center text-5xl text-blue-300 mt-9">
        {minutes ? minutes : 0}:{seconds}
      </p>

      <div className="flex flex-row items-center justify-center w-4/5 space-x-3 mx-auto">
        <Button
          label="start"
          onClick={onStart}
          theme={"success"}
          marginTop="mt-10"
          width="w-4/5"
        />
        <Button
          label="stop"
          onClick={onStop}
          theme={"error"}
          marginTop="mt-10"
          width="w-4/5"
        />
      </div>
    </div>
  );
}

export default Timer;
