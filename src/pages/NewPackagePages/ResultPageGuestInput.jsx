import React from "react";
import { Popover } from "@headlessui/react";

const ResultPageGuestInput = ({ hasButtonSubmit = true, onSubmit }) => {
  return (
    <Popover className={`flex relative z-30 `}>
      {({ open }) => (
        <>
          <div
            className={` z-10 flex items-center focus:outline-none ${
              open ? "nc-hero-field-focused" : ""
            }`}
          >
            {hasButtonSubmit && (
              <div className="pr-3 md:pr-2 lg:pr-2 xl:pr-2">
                <a
                  onClick={onSubmit}
                  type="button"
                  className="flex items-center justify-center w-10 rounded-full h-10 md:h-12 md:w-12 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </>
      )}
    </Popover>
  );
};

export default ResultPageGuestInput;
