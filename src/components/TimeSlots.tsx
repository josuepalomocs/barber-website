import { useState } from "react";

interface TimeSlotsProps {}

export default function TimeSlots({}: TimeSlotsProps) {
  return (
    <div className="text-xs">
      <p className="text-neutral-500 mb-4">Pick a time</p>
      <ul className="grid grid-cols-2 gap-2">
        <li className="text-center rounded-lg border border-neutral-200 bg-white hover:bg-neutral-200">
          <button className="w-full h-full p-3">
            <time>9:00am</time>
          </button>
        </li>
        <li className="text-center rounded-lg border border-neutral-200 bg-white">
          <button className="w-full h-full">
            <time>9:15am</time>
          </button>
        </li>
        <li className="text-center p-3 rounded-lg border border-neutral-200 bg-white">
          <button className="">
            <time>9:30am</time>
          </button>
        </li>
        <li className="text-center p-3 rounded-lg border border-neutral-200 bg-white">
          <button className="">
            <time>9:45am</time>
          </button>
        </li>
        <li className="text-center p-3 rounded-lg border border-neutral-200 bg-white">
          <button className="">
            <time>10:00am</time>
          </button>
        </li>
        <li className="text-center p-3 rounded-lg border border-neutral-200 bg-white">
          <button className="">
            <time>10:15am</time>
          </button>
        </li>
        <li className="text-center p-3 rounded-lg border border-neutral-200 bg-white">
          <button className="">
            <time>10:30am</time>
          </button>
        </li>
        <li className="text-center p-3 rounded-lg border border-neutral-200 bg-white">
          <button className="">
            <time>10:45am</time>
          </button>
        </li>
        <li className="text-center p-3 rounded-lg border border-neutral-200 bg-white">
          <button className="">
            <time>11:00am</time>
          </button>
        </li>
        <li className="text-center p-3 rounded-lg border border-neutral-200 bg-white">
          <button className="">
            <time>11:15am</time>
          </button>
        </li>
        <li className="text-center p-3 rounded-lg border border-neutral-200 bg-white">
          <button className="">
            <time>11:30am</time>
          </button>
        </li>
        <li className="text-center p-3 rounded-lg border border-neutral-200 bg-white">
          <button className="">
            <time>11:45am</time>
          </button>
        </li>
        <li className="text-center p-3 rounded-lg border border-neutral-200 bg-white">
          <button className="">
            <time>12:00am</time>
          </button>
        </li>
        <li className="text-center p-3 rounded-lg border border-neutral-200 bg-white">
          <button className="">
            <time>12:15am</time>
          </button>
        </li>
        <li className="text-center p-3 rounded-lg border border-neutral-200 bg-white">
          <button className="">
            <time>12:30am</time>
          </button>
        </li>
        <li className="text-center p-3 rounded-lg border border-neutral-200 bg-white">
          <button className="">
            <time>12:45am</time>
          </button>
        </li>
      </ul>
    </div>
  );
}
