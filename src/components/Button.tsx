"use client";

import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  isDisabled: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, isDisabled }) => {
  return (
    <button
      disabled={isDisabled}
      className={`w-content h-9 rounded-lg ${isDisabled ? "cursor-not-allowed bg-gray-300 text-gray-600" : "cursor-pointer bg-blue-600 text-white"} px-4`}
      onClick={onClick}
    >
      <span className="text-sm font-semibold leading-6">{label}</span>
    </button>
  );
};
export default Button;
