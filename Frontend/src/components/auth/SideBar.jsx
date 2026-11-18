import React from "react";

import Feature from "./Feature.jsx";

const SideBar = () => {
  return (
    <section className="hidden min-h-screen w-full flex-col bg-[#242044] px-7 py-8 text-white sm:px-10 lg:flex lg:px-14 lg:py-12">
      <a href="/" className="w-fit text-3xl font-bold tracking-tight">
        edu<span className="text-violet-400">pay</span>
      </a>

      <div className="mt-10 h-1 w-20 rounded-full bg-violet-400" />

      <div className="mt-10">
        <h1 className="max-w-lg text-3xl font-bold leading-tight sm:text-4xl">
          Your learning journey starts here.
        </h1>
        <p className="mt-5 text-base text-violet-100/80">
          One account. Every learning experience.
        </p>
      </div>

      <p className="mt-12 text-xs font-bold tracking-wide text-violet-300">
        LEARN · TEACH · GROW
      </p>

      <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
        <h2 className="text-xl font-semibold">A platform built for progress</h2>
        <div className="mt-7 space-y-6">
          <Feature number="01" title="Learn at your own pace">
            Access courses, assignments and certificates.
          </Feature>
          <Feature number="02" title="Teach with confidence">
            Create courses and track learner progress.
          </Feature>
          <Feature number="03" title="One connected platform">
            Tools for every approved role.
          </Feature>
        </div>
      </div>

      <p className="mt-auto pt-10 text-xs text-violet-200/60">
        Trusted learning, teaching and progress.
      </p>
    </section>
  );
};

export default SideBar;
