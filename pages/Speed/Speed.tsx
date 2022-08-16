import randomWords from "random-words";
import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import NewTimer from "../../components/NewTimer";
import Stats from "../../components/Stats";
import { lengthOfGame, NUM_OF_WORDS } from "../../utils/constants";

function Speed() {
  const inputRef: any = useRef();
  const textAreaRef: any = useRef();

  const [duration, setDuration] = useState<any>(0);
  const [custom, setCustom] = useState<any>(0);
  const [paragraph, setParagraph] = useState<string>("");
  const [word, setWord] = useState<string>("");
  const [random, setRandom] = useState<any>([]);
  const [showRandom, setShowRandom] = useState<boolean>(true);
  const [currWordIndex, setCurrentWordIndex] = useState<any>(0);
  const [count, setCount] = useState<any>(0);
  const [incorrectWord, setIncorrectWord] = useState<any>(0);
  const [correctWord, setCorrectWord] = useState<any>(0);
  const [currentChar, setCurrentChar] = useState<any>("");
  const [currentCharIndex, setCurrentCharIndex] = useState<any>(-1);
  const [checkCustom, setCheckCustom] = useState<any>();
  const [checker, setCheker] = useState<boolean>(false);

  const handleSelect = (e: any) => {
    const value = e.target.value;
  };

  const generateWords = () => {
    const w = randomWords(NUM_OF_WORDS);
    return w;
  };

  // generates random words on mount
  useEffect(() => {
    setRandom(generateWords());
  }, []);

  const handleKeyDown = (e: any) => {
    const { keyCode, key } = e;
    if (keyCode === 32) {
      checkMatch();
      setCurrentWordIndex(currWordIndex + 1);
      setWord("");
      setCurrentCharIndex(-1);
    } else {
      setCurrentCharIndex(currentCharIndex + 1);
      setCurrentChar(key);
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

  const handleCustomDuration = async (e: any) => {
    const value = e.target.value;
    // setDuration(value);
  };

  const acc = (correctWord / (correctWord + incorrectWord)) * 100;

  const renderCustom = () => {
    const int = parseInt(custom);

    if (int < 10) {
      return int;
    }
  };

  renderCustom();

  return (
    <div className="container mx-auto flex flex-col space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col space-y-5 w-4/5">
          <p className="font-sans font-medium text-base">Select Duration</p>
          <select
            className="font-serif font-normal text-base px-3 py-2 rounded-md border border-sky-500 outline-none shadow-none"
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
              handleSelect(e);
            }}
          >
            <option value={""}>Select...</option>
            {lengthOfGame.map((i) => (
              <option key={i.id} value={i.value}>
                {i.label}
              </option>
            ))}
          </select>

          <div className="flex flex-col space-y-2">
            <label className="font-sans">Enter a custom duration(min)</label>
            <input
              className="px-2 py-3 font-mono border-solid rounded-md border border-sky-500 bg-white outline-none shadow-none text-black"
              type={"number"}
              id="custom"
              name="custom"
              value={custom}
              onChange={(e) => {
                setCustom(e.target.value);
                handleCustomDuration(e);
              }}
              ref={inputRef}
            />
            <Button
              label={"Click to start custom duration"}
              marginTop="mt-3"
              onClick={() => {
                setCheckCustom(custom);
                setCheker(true);
              }}
              width="auto"
              className="px-4 float-left self-start"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          {duration !== 0 && (
            <NewTimer initialMinute={duration} initialSeconds={0} />
          )}

          {checker && (
            <NewTimer initialMinute={checkCustom} initialSeconds={0} />
          )}
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
            className="px-2 py-3 font-mono border-solid rounded-md border border-sky-500 bg-white outline-none shadow-none text-black w-full"
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
