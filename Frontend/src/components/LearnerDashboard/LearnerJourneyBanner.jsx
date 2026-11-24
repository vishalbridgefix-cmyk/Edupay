
import { ArrowRight } from "lucide-react";

function LearnerJourneyBanner({ onContinue }) {
  return (
    <section className="relative flex min-h-[135px] items-center overflow-hidden rounded-2xl bg-[#252044] px-5 py-5 sm:min-h-[145px] sm:px-7">
      <div className="relative z-10 max-w-[85%] sm:max-w-[75%]">
        <p className="mb-2 text-xs font-semibold tracking-wide text-violet-200">
          YOUR LEARNING JOURNEY
        </p>

        <h1 className="text-2xl font-bold leading-tight text-white sm:text-[27px]">
          Small steps. Big progress.
        </h1>

        <p className="mt-2 text-sm text-gray-300">
          You're building great momentum — keep it going!
        </p>

        <button
          type="button"
          onClick={onContinue}
          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#7054ed] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#8069f5]"
        >
          Continue learning
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 sm:block sm:right-12">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-violet-500/25 sm:h-24 sm:w-24">
          <div className="h-11 w-11 rounded-full bg-[#7054ed] sm:h-12 sm:w-12" />
          <div className="absolute -right-1 top-0 h-6 w-6 rounded-full bg-[#a997ff] sm:h-7 sm:w-7" />
        </div>
      </div>
    </section>
  );
}

export default LearnerJourneyBanner;
