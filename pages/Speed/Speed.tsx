import randomWords from "random-words";
import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import Stats from "../../components/Stats";
import Timer from "../../components/Timer";
import styles from "../../styles/Home.module.css";
import { NUM_OF_SECS, NUM_OF_WORDS } from "../../utils/constants";

function Speed() {
  const inputRef: any = useRef();
  const textAreaRef: any = useRef();

  const [duration, setDuration] = useState<any>(0);
  const [custom, setCustom] = useState<any>(0);
  const [seconds, setSeconds] = useState<any>(NUM_OF_SECS);
  const [paragraph, setParagraph] = useState<string>("");
  const [word, setWord] = useState<string>("");
  const [random, setRandom] = useState<any>([]);
  const [showRandom, setShowRandom] = useState<boolean>(true);
  const [stop, setStop] = useState<boolean>(false);
  const [currWordIndex, setCurrentWordIndex] = useState<any>(0);
  const [count, setCount] = useState<any>(0);
  const [incorrectWord, setIncorrectWord] = useState<any>(0);
  const [correctWord, setCorrectWord] = useState<any>(0);

  const handleSelect = (e: any) => {
    const value = e.target.value;
    if (value > 1) {
      setSeconds(0);
    }
  };

  const generateWords = () => {
    const w = randomWords(NUM_OF_WORDS);
    return w;
  };

  // generates random words on mount
  useEffect(() => {
    setRandom(generateWords());
  }, []);

  // countdown timer logic
  useEffect(() => {}, [seconds]);

  const start = () => {
    let interval = setInterval(() => {
      if (duration === 0 || duration === 1) {
        setSeconds((prev: any) => {
          if (prev === 0) {
            clearInterval(interval);
            setSeconds(0);
          } else {
            return prev - 1;
          }
        });
      } else if (duration > 1) {
        setSeconds((prev: any) => console.log(prev));
        setDuration((prev: any) => {
          if (prev == 0) {
            clearInterval(interval);
          } else {
            return duration - 1;
          }
        });
      }
    }, 1000);
  };

  // console.log(seconds, "km");

  const timerMins = duration < 10 ? `0${duration}` : duration;
  const timerSecs = seconds < 10 ? `0${seconds}` : seconds;

  const handleKeyDown = (e: any) => {
    const { keyCode } = e;
    if (keyCode === 32) {
      checkMatch();
      setCurrentWordIndex(currWordIndex + 1);
      setWord("");
    }
  };

  const checkMatch = () => {
    const wordToCheck = random[currWordIndex];
    const doesItMatch = wordToCheck === word.trim();

    if (doesItMatch) {
      setCount(count + 1);
      setCorrectWord(correctWord + 1);
    } else {
      setCount((prev: any) => {
        if (prev > 0) {
          return prev - 1;
        }
      });
      setIncorrectWord(incorrectWord + 1);
    }
  };

  const handleTextArea = (e: any) => {
    const value = e.target.value;
    const y = value.trim();
    const x = y.replace(/[ ,]+/g, ",");
    const words = x.split(",");
    setRandom(words);
  };

  const acc = (correctWord / (correctWord + incorrectWord)) * 100;

  return (
    <div className="container mx-auto flex flex-col space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col space-y-5 w-4/5">
          <p className="font-sans font-medium text-base">Select Duration</p>
          <select
            className="font-serif font-normal text-base px-3 py-2 rounded-sm border border-sky-500 outline-none shadow-none"
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
              handleSelect(e);
            }}
          >
            <option value={""}>Select...</option>
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
              ref={inputRef}
            />
          </div>
        </div>

        <Timer
          minutes={timerMins}
          seconds={timerSecs}
          onStart={() => start()}
          onStop={() => {
            console.log("stop");
          }}
        />
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
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </div>
        {showRandom ? (
          <div className="w-full border border-solid border-3 text-left px-3 py-3 rounded-md shadow">
            {random?.map((i: any, index: any) => (
              <span key={index}>
                <span key={index} className="text-left">
                  {i.split("").map((char: any, idx: any) => (
                    <span key={idx}>{char}</span>
                  ))}
                </span>
                <span> </span>
                &nbsp;
              </span>
            ))}
          </div>
        ) : (
          <>
            <label className="font-serif font-medium text-base pb-2">
              Paste your words
            </label>
            <textarea
              className="bg-amber-200 border border-solid border-amber-200 rounded-lg px-4 py-4 h-auto w-full outline-none shadow-none text-sm"
              value={paragraph}
              id="paragraph"
              name="paragraph"
              onChange={(e) => {
                setParagraph(e.target.value);
                handleTextArea(e);
              }}
              maxLength={1000}
              ref={textAreaRef}
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
            className="px-4"
          />
        </div>
      </div>

      {/* STATS */}
      <Stats
        totalScore={count}
        wordsLength={random?.length}
        accuracy={acc.toFixed(2)}
        wpm={correctWord}
      />
    </div>
  );
}

export default Speed;
