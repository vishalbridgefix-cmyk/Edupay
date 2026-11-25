


import { ArrowRight } from "lucide-react";

function SectionHeading({ title, action, onActionClick }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-2">

      <h2 className="text-lg font-bold text-[#24213d] sm:text-xl">
        {title}
      </h2>

      {action && (
        <button
          type="button"
          onClick={onActionClick}
          className="flex shrink-0 items-center gap-1 text-sm font-semibold text-violet-600 transition hover:text-violet-800"
        >
          {action}

          <ArrowRight size={14} />
        </button>
      )}

    </div>
  );
}

export default SectionHeading;
