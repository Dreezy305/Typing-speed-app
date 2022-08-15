import React, { useEffect, useState } from "react";

function NewTimer(props: any) {
  const { initialMinute = 0, initialSeconds = 0 } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [start, setStart] = useState<string>("");

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          setStart("stop");
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
          setStart("start");
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div className="w-4/5 mx-auto text-center flex flex-col space-y-2">
      {minutes === 0 && seconds === 0 ? (
        ""
      ) : (
        <h1 className="font-serif text-5xl text-center">
          {" "}
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h1>
      )}
      {start == "start" && (
        <p className="text-lg text-green-500">Your time has started</p>
      )}
      {start === "stop" && (
        <p className="text-lg text-red-400">
          Your time is up, check your score below
        </p>
      )}
    </div>
  );
}

export default NewTimer;
