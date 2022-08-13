import React from "react";

type buttonProps = {
  label?: string;
  onClick?: () => void;
  theme?: string;
};

function Button({ label, onClick, theme }: buttonProps) {
  return (
    <button
      className={`font-medium font-sans py-3 w-4/5 border border-solid  rounded-md cursor-pointer  text-white mt-10 mx-auto ${
        theme === "success"
          ? "bg-lime-400 border-lime-400"
          : theme === "error"
          ? "bg-red-400 border-red-400"
          : "bg-blue-300 border-blue-300"
      }`}
      type={"button"}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
