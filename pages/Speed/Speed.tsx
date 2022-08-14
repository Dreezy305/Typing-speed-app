import randomWords from "random-words";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Stats from "../../components/Stats";
import styles from "../../styles/Home.module.css";

function Speed() {
  const [duration, setDuration] = useState<any>();
  const [custom, setCustom] = useState<any>(0);
  const [seconds, setSeconds] = useState<any>(0);
  const [paragraph, setParagraph] = useState<string>("");
  const [word, setWord] = useState<string>("");
  const [random, setRandom] = useState<any>([]);
  const [showRandom, setShowRandom] = useState<boolean>(true);

  const NUM_OF_WORDS = 100;

  const generateWords = () => {
    const w = randomWords(NUM_OF_WORDS);
    return w;
  };

  useEffect(() => {
    setRandom(generateWords());
  }, []);
  // start timer
  const start = () => {
    console.log("here");
  };

  return (
    <div className="container mx-auto flex flex-col space-y-4">
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
          <p className="text-center text-5xl text-blue-300 mt-9">
            {duration ? duration : 0}:{seconds}
          </p>

          <div className="flex flex-row items-center justify-center w-4/5 space-x-3 mx-auto">
            <Button
              label="start"
              onClick={() => start()}
              theme={"success"}
              marginTop="mt-10"
              width="w-4/5"
            />
            <Button
              label="stop"
              onClick={() => start()}
              theme={"error"}
              marginTop="mt-10"
              width="w-4/5"
            />
          </div>
        </div>
      </div>

      {/* random paragraph */}
      <div className="pt-12 flex flex-col items-start">
        <div className="flex flex-col pb-3 w-full">
          <label className="font-serif font-medium text-base pb-2">
            Type here
          </label>
          <input
            value={word}
            className="px-2 py-3 font-mono border-solid rounded-sm border border-sky-500 bg-white outline-none shadow-none text-black w-full"
            onChange={(e) => setWord(e.target.value)}
          />
        </div>
        {showRandom ? (
          <div className="w-4/5">
            {random?.map((i: any, index: any) => (
              <span key={index} className="text-left">
                {i}
              </span>
            ))}
          </div>
        ) : (
          <>
            <label className="font-serif font-medium text-base pb-2">
              Paste your texts
            </label>
            <textarea
              className="bg-amber-200 border border-solid border-amber-200 rounded-lg px-4 py-4 h-auto w-full outline-none shadow-none text-sm"
              value={paragraph}
              id="paragraph"
              name="paragraph"
              onChange={(e) => setParagraph(e.target.value)}
              maxLength={100}
            />
          </>
        )}
        <div className="w-1/3">
          <Button
            label={
              showRandom
                ? "Toggle to paste your practice words"
                : "Generate random words"
            }
            marginTop="mt-3"
            onClick={() => setShowRandom(!showRandom)}
            width="auto"
          />
        </div>
      </div>

      {/* STATS */}
      <Stats />
    </div>
  );
}

export default Speed;
