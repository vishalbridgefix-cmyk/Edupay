import React from "react";

const SideBar = () => {
  return (
    <section className="hidden h-screen w-full flex-col overflow-hidden bg-[#242044] px-6 py-5 text-white lg:flex xl:px-10 xl:py-8">
      <a href="/" className="w-fit text-3xl font-bold tracking-tight">
        edu<span className="text-violet-400">pay</span>
      </a>

      <div className="mt-5 h-1 w-20 shrink-0 rounded-full bg-violet-400" />
      <div className="mt-5 shrink-0">
        <h1 className="max-w-lg text-2xl font-bold leading-tight xl:text-4xl">
          Your learning journey starts here.
        </h1>
        <p className="mt-3 text-sm text-violet-100/80 xl:mt-5 xl:text-base">
          One account. Every learning experience.
        </p>
      </div>

      <p className="mt-12 text-xs font-bold tracking-wide text-violet-300">
        LEARN · TEACH · GROW
      </p>

      <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
        <h2 className="text-xl font-semibold">A platform built for progress</h2>
        <div className="mt-7 space-y-6">
          <div className="flex gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-400/30 text-xs font-bold text-violet-200">
              01
            </div>
            <div>
              <h3 className="text-sm font-semibold">Learn at your own pace</h3>
              <p className="mt-1 text-xs leading-5 text-violet-100/60">
                Access courses, assignments and certificates.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-400/30 text-xs font-bold text-violet-200">
              02
            </div>
            <div>
              <h3 className="text-sm font-semibold">Teach with confidence</h3>
              <p className="mt-1 text-xs leading-5 text-violet-100/60">
                Create courses and track learner progress.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-400/30 text-xs font-bold text-violet-200">
              03
            </div>
            <div>
              <h3 className="text-sm font-semibold">One connected platform</h3>
              <p className="mt-1 text-xs leading-5 text-violet-100/60">
                Tools for every approved role.
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-auto shrink-0 pt-4 text-xs text-violet-200/60">
        Trusted learning, teaching and progress.
      </p>
    </section>
  );
};

export default SideBar;
