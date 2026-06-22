import React from "react";

export default function Input({
  type,
  placeholder,
  id,
  name,
  value,
  onChange,
}) {
  return (
    <label htmlFor={id} className="w-full flex flex-col gap-1">
      <h1 className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {name}:
      </h1>

      <input
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required
        className="
          px-3 py-2 h-10 w-full
          border border-gray-300 dark:border-gray-600
          rounded-md

          bg-white dark:bg-gray-900
          text-black dark:text-white
          placeholder-gray-400 dark:placeholder-gray-500

          focus:outline-none
          focus:ring-2 focus:ring-blue-500
          focus:border-transparent

          transition-all duration-300
        "
      />
    </label>
  );
}