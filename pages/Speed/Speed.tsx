import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import styles from "../../styles/Home.module.css";

function Speed() {
  const [duration, setDuration] = useState<any>();
  const [custom, setCustom] = useState<any>(0);

  // start timer
  const start = () => {
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((duration % (1000 * 60)) / 1000);

    console.log(seconds, minutes);
  };

  return (
    <div className="container mx-auto flex flex-col space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col space-y-5 w-4/5">
          <p className="font-sans font-medium text-base">Select Duration</p>
          <select
            className="font-serif font-normal text-base px-3 py-2 rounded-sm border border-sky-500 outline-none shadow-none"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value={""} selected disabled hidden>
              Select...
            </option>
            <option value={1}>1 min</option>
            <option value={2}>2 mins</option>
            <option value={3}>3 mins</option>
            <option value={4}>4 mins</option>
            <option value={5}>5 mins</option>
          </select>

          <div className="flex flex-col space-y-2">
            <label className="font-sans">Enter a custom duration(mins)</label>
            <input
              className="px-2 py-3 font-mono border-solid rounded-sm border border-sky-500 bg-white outline-none shadow-none text-black"
              type={"number"}
              id="custom"
              name="custom"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-3 justify-center relative w-4/5">
          <p className="text-center text-5xl text-blue-300 mt-9">0</p>

          <div className="flex flex-row items-center justify-center w-4/5 space-x-3 mx-auto">
            <Button label="start" onClick={() => start()} theme={"success"} />
            <Button label="stop" onClick={() => start()} theme={"error"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Speed;
