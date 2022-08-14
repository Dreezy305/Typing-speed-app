import type { NextPage } from "next";
import React, { useState } from "react";
import Speed from "./Speed/Speed";

const Home: NextPage = () => {
  const [duration, setDuration] = useState("");
  const [custom, setCustom] = useState("");

  const timers = [{ id: 1, time: 1 }];

  return (
    <main>
      <section className="pt-7 mt-7 overflow-hidden">
        <Speed />
      </section>
    </main>
  );
};

export default Home;
