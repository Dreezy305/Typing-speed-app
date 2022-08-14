import React from "react";

type buttonProps = {
  label?: string;
  onClick?: () => void;
  theme?: string;
  marginTop?: string;
  width?: string;
};

function Button({ label, onClick, theme, marginTop, width }: buttonProps) {
  return (
    <button
      className={`font-medium font-sans py-3 border border-solid  rounded-md cursor-pointer  text-white mx-auto ${
        theme === "success"
          ? "bg-lime-400 border-lime-400"
          : theme === "error"
          ? "bg-red-400 border-red-400"
          : "bg-blue-300 border-blue-300"
      } ${marginTop} whitespace-nowrap ${width}`}
      type={"button"}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
