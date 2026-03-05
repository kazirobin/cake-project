import React from "react";

const PlayWinCake = () => {
  return (
    <section className="bg-[#FCF2F7] px-4 py-12 transition-colors duration-500 md:px-24 dark:from-[#0f0f14] dark:to-[#16161d]">
      {/* In this div, I applied shadow for the card */}
      <div className="mx-auto max-w-7xl rounded-3xl bg-white/70 p-8 shadow-[0_70px_100px_-20px_rgba(0,0,0,0.18),0_-15px_30px_-18px_rgba(0,0,0,0.08)] backdrop-blur-xl md:p-12 dark:bg-white/5 dark:shadow-[0_45px_100px_-20px_rgba(0,0,0,0.75),0_-12px_30px_-18px_rgba(0,0,0,0.5)]">
        <div className="grid gap-10 md:grid-cols-5">
          {/* LEFT SIDE */}
          <div className="flex flex-col justify-center md:col-span-2">
            <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-purple-500">
              ARCADE LOUNGE
            </p>

            <h2 className="mb-6 text-3xl leading-tight font-bold text-gray-900 md:text-4xl dark:text-white">
              Play & win cake <br /> power-ups
            </h2>

            <p className="mb-8 max-w-md text-gray-600 dark:text-gray-400">
              We moved our mini-games to a dedicated arcade so the homepage
              stays buttery smooth. Take a peek at the highlights below, then
              jump into the lounge to test your reflexes, memory, and precision.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 font-medium text-white shadow-lg transition hover:scale-105">
                ✨ Enter Arcade
              </button>

              <button className="rounded-full border border-purple-400 px-6 py-3 font-medium text-purple-600 transition hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-white/10">
                View Leaderboards
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="grid gap-6 md:col-span-3">
            {/* Top cards */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Card 1 */}
              <div className="rounded-2xl bg-gradient-to-br from-pink-100 via-purple-100 to-pink-50 p-6 shadow-md dark:from-pink-500/20 dark:via-purple-500/20 dark:to-pink-400/10">
                <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-purple-600">
                  CAKE DASH
                </p>
                <h3 className="mb-5 text-xl font-semibold text-gray-900 dark:text-white">
                  Reflex Frenzy
                </h3>
                {/* List */}
                <ul className="mb-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-center justify-start gap-2">
                    <span className="mt-[2px] text-[8px] leading-none">🟢</span>
                    <span>Wait for the oven glow.</span>
                  </li>

                  <li className="flex items-center justify-start gap-2">
                    <span className="mt-[2px] text-[8px] leading-none">🔴</span>
                    <span>Tap as fast as frosting melts.</span>
                  </li>

                  <li className="flex items-center justify-start gap-2">
                    <span className="mt-[2px] text-[8px] leading-none">🟡</span>
                    <span>Shave milliseconds off your best.</span>
                  </li>
                </ul>
                <div className="inline-block rounded-lg bg-white/60 px-3 py-2 text-sm font-medium text-purple-700 dark:bg-white/10 dark:text-purple-300">
                  Personal record snapshot: 238ms
                </div>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl bg-gradient-to-br from-teal-100 via-cyan-100 to-emerald-50 p-6 shadow-md dark:from-teal-500/20 dark:via-cyan-500/20 dark:to-emerald-400/10">
                <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-teal-700">
                  FLAVOR MATCH
                </p>
                <h3 className="mb-5 text-xl font-semibold text-gray-900 dark:text-white">
                  Memory Mixer
                </h3>

                <div className="mb-4 flex justify-between gap-3">
                  <div className="flex flex-col items-center justify-center gap-1 rounded-lg bg-white/70 px-4 py-2 text-xs dark:bg-white/10">
                    <span className="text-lg">🍓</span>
                    <span>Berry</span>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-1 rounded-lg bg-white/70 px-4 py-2 text-xs dark:bg-white/10">
                    <span className="text-lg">🍫</span>
                    <span>Choco</span>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-1 rounded-lg bg-white/70 px-4 py-2 text-xs dark:bg-white/10">
                    <span className="text-lg">🍵</span>
                    <span>Matcha</span>
                  </div>
                </div>

                <div className="inline-block rounded-lg bg-white/60 px-3 py-2 text-sm font-medium text-teal-800 dark:bg-white/10 dark:text-teal-300">
                  Fastest pairing: 41.2s / 14 moves
                </div>
              </div>
            </div>

            {/* Bottom wide card */}
            <div className="rounded-2xl bg-gradient-to-br from-orange-100 via-pink-100 to-rose-50 p-6 shadow-md dark:from-orange-500/20 dark:via-pink-500/20 dark:to-rose-400/10">
              <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-orange-600">
                LAYER STACK
              </p>
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Tower Builder
              </h3>

              {/* <div className="grid items-center gap-6 md:grid-cols-2"> */}
              <div className="grid items-center gap-6 md:grid-cols-3">
                {/* Left side → 2 columns */}
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Stop each sliding tier just right to build the most
                    delicious skyline. Momentum brings extra sparkle, topple
                    adds slow-motion crumble.
                  </p>

                  <div className="mt-5 inline-block rounded-lg bg-white/60 px-3 py-2 text-xs font-medium text-red-700 dark:bg-white/10 dark:text-orange-300">
                    🔒 Unlock bonus tier at 12 layers
                  </div>
                </div>

                {/* Right side → 1 column */}
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="h-4 w-full rounded-full bg-cyan-500"></div>
                  <div className="h-4 w-5/6 rounded-full bg-cyan-500"></div>
                  <div className="h-4 w-4/5 rounded-full bg-cyan-500"></div>
                  <div className="h-4 w-3/4 rounded-full bg-cyan-500"></div>
                  <div className="h-4 w-2/3 rounded-full bg-cyan-500"></div>
                  <div className="h-4 w-1/2 rounded-full bg-cyan-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayWinCake;
