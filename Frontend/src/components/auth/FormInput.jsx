import React from "react";

const FormInput = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  className = "",
  required = false,
  rightElement,
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full rounded-[0.65rem] border bg-white px-4 py-[0.9rem] text-sm text-[#19182f] outline-none transition duration-150 placeholder:text-[#a1a1b5] focus:border-violet-500 focus:ring-[3px] focus:ring-violet-500/10 
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                : "border-gray-200"
            } 
              ${rightElement ? "pr-16" : ""}`}
          {...props}
        />

        {rightElement && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-xs font-medium text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FormInput;
