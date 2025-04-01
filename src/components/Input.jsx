import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref,
) {
  const id = useId();

  // Special handling for file inputs
  if (type === "file") {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-1 inline-block pl-1" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          type="file"
          className={`w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-black duration-200 outline-none file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 focus:bg-gray-50 ${className} `}
          ref={ref}
          {...props}
          id={id}
        />
      </div>
    );
  }

  // Regular input handling
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1 inline-block pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-black duration-200 outline-none focus:bg-gray-50 ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
