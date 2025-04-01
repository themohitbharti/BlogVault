import React, { forwardRef } from "react";
import { useId } from "react";

function Select({ label, options, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div>
      {label && <label className="" htmlFor={id}></label>}
      <select
        name=""
        id={id}
        {...props}
        ref={ref}
        className={`w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-black duration-200 outline-none focus:bg-gray-50 ${className}`}
      >
        {options?.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default forwardRef(Select);
