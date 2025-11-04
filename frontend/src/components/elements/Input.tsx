// components/Input.tsx
import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export default function Input({ icon, className = "", ...props }: InputProps) {
  return (
    <div className="relative w-full">
      {icon && <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</span>}
      <input
        className={`w-full px-3 py-2 ${icon ? "pl-10" : ""} border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${className}`}
        {...props}
      />
    </div>
  );
}
