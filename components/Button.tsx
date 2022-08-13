import React from "react";

type buttonProps = {
  label?: string;
  onClick?: () => void;
};

function Button({ label, onClick }: buttonProps) {
  return (
    <button
      className="font-medium font-sans py-3 w-4/5 border border-solid border-blue-300 rounded-md cursor-pointer bg-blue-300 text-white mt-10 mx-auto right-2 absolute bottom-0"
      type={"button"}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
