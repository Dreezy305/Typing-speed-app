import type { NextPage } from "next";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [duration, setDuration] = useState("");
  const [custom, setCustom] = useState("");

  const timers = [{ id: 1, time: 1 }];

  return (
    <section className={`${styles.section}`}>
      <div className={styles.timerContainer}>
        <div className={styles.duration}>
          <h6>Choose a Duration(secs)</h6>
          <select
            className={styles.select}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            id="duration"
            name="duration"
          >
            <option value={""} selected disabled hidden>
              Select...
            </option>
            <option value={1}>1 mins</option>
            <option value={2}>2 mins</option>
            <option value={3}>3 mins</option>
            <option value={4}>4 mins</option>
            <option value={5}>5 mins</option>
          </select>
          <div className={styles.custom}>
            <label className={`${styles.label} text-lg font-extrabold`}>
              Custom Duration
            </label>
            <input
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              type={"number"}
              id="custom"
              name="custom"
            />
          </div>
        </div>

        {/* DOWN */}
        {/* <div className="">
          <h6>Choose a Duration(secs)</h6>
          <select
            className={styles.select}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value={""} selected disabled hidden>
              Select...
            </option>
            <option value={1}>1 mins</option>
            <option value={2}>2 mins</option>
            <option value={3}>3 mins</option>
            <option value={4}>4 mins</option>
            <option value={5}>5 mins</option>
          </select>
        </div> */}

        {/* <div className="">
          <h6>Choose a Duration(secs)</h6>
          <select
            className={styles.select}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value={""} selected disabled hidden>
              Select...
            </option>
            <option value={1}>1 mins</option>
            <option value={2}>2 mins</option>
            <option value={3}>3 mins</option>
            <option value={4}>4 mins</option>
            <option value={5}>5 mins</option>
          </select>
          <p>{duration}(s)</p>
        </div> */}
      </div>
    </section>
  );
};

export default Home;
