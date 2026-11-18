import React from "react";

const Feature = ({ number, title, children }) => {
  return (
    <div className="flex gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-400/30 text-xs font-bold text-violet-200">
        {number}
      </div>
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-violet-100/60">{children}</p>
      </div>
    </div>
  );
};

export default Feature;
