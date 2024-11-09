"use client";

import React, { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { UserPlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import ClearDataButton from "../ClearDataButton";
import NcInputNumber from "../NcInputNumber";

const GuestsInput = ({
  fieldClassName = "[ nc-hero-field-padding ]",
  className = "[ nc-flex-1 ]",
  hasButtonSubmit = true,
  onRoomDataChange,
  onSubmit,
  loader,
}) => {
  const [rooms, setRooms] = useState([
    {
      adults: 1,
      children: 0,
      childrenAges: [],
    },
  ]);

  const handleAddRoom = () => {
    setRooms([
      ...rooms,
      {
        adults: 1,
        children: 0,
        childrenAges: [],
      },
    ]);
  };

  const handleRemoveRoom = (roomIndex) => {
    setRooms(rooms.filter((_, index) => index !== roomIndex));
  };

  const handleChangeRoomData = (value, roomIndex, type) => {
    const updatedRooms = [...rooms];
    if (type === "adults") {
      updatedRooms[roomIndex].adults = value;
    } else if (type === "children") {
      const prevChildren = updatedRooms[roomIndex].children;
      updatedRooms[roomIndex].children = value;
      if (value > prevChildren) {
        updatedRooms[roomIndex].childrenAges = [
          ...updatedRooms[roomIndex].childrenAges,
          ...Array(value - prevChildren).fill(""),
        ];
      } else {
        updatedRooms[roomIndex].childrenAges = updatedRooms[
          roomIndex
        ].childrenAges.slice(0, value);
      }
    } else if (type === "childAge") {
      updatedRooms[roomIndex].childrenAges[value.index] = value.age;
    }

    setRooms(updatedRooms);
  };

  const totalGuests = rooms.reduce(
    (acc, room) => acc + room.adults + room.children,
    0
  );

  useEffect(() => {
    const payload = rooms.map((room) => ({
      adults: room.adults,
      childrenAges: room.childrenAges,
    }));
    onRoomDataChange(payload);
  }, [rooms]);

  return (
    <Popover className={`flex relative ${className}`}>
      {({ open }) => (
        <>
          <div
            className={`flex-1 z-10 flex items-center focus:outline-none ${
              open ? "nc-hero-field-focused" : ""
            }`}
          >
            <Popover.Button
              className={`relative z-10 flex-1 flex text-left items-center ${fieldClassName} space-x-3 focus:outline-none`}
            >
              <div className="text-neutral-300">
                <UserPlusIcon className="w-5 h-5 lg:w-7 lg:h-7" />
              </div>
              <div className="flex-grow">
                <span className="block text-2xl font-bold">
                  {totalGuests || ""} Guests
                </span>
                <span className="block mt-1 text-[1rem] text-neutral-400 leading-none font-light">
                  {totalGuests ? "Guests" : "Add guests"}
                </span>
              </div>

              {!!totalGuests && open && (
                <ClearDataButton
                  onClick={() =>
                    setRooms([{ adults: 1, children: 0, childrenAges: [] }])
                  }
                />
              )}
            </Popover.Button>

            {hasButtonSubmit && (
              <div className="pr-2 xl:pr-4">
                <a
                  onClick={onSubmit}
                  type="button"
                  className="h-14 md:h-16 w-full md:w-16 rounded-full bg-primary-6000 hover:bg-primary-700 flex items-center justify-center text-neutral-50 focus:outline-none"
                >
                  <span className="mr-3 md:hidden">Search</span>
                  {loader ? (
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 200 200"
                    >
                      <radialGradient
                        id="a2"
                        cx=".66"
                        fx=".66"
                        cy=".3125"
                        fy=".3125"
                        gradientTransform="scale(1.5)"
                      >
                        <stop offset="0" stop-color="#FFFFFF"></stop>
                        <stop
                          offset=".3"
                          stop-color="#FFFFFF"
                          stop-opacity=".9"
                        ></stop>
                        <stop
                          offset=".6"
                          stop-color="#FFFFFF"
                          stop-opacity=".6"
                        ></stop>
                        <stop
                          offset=".8"
                          stop-color="#FFFFFF"
                          stop-opacity=".3"
                        ></stop>
                        <stop
                          offset="1"
                          stop-color="#FFFFFF"
                          stop-opacity="0"
                        ></stop>
                      </radialGradient>
                      <circle
                        transform-origin="center"
                        fill="none"
                        stroke="url(#a2)"
                        stroke-width="15"
                        stroke-linecap="round"
                        stroke-dasharray="200 1000"
                        stroke-dashoffset="0"
                        cx="100"
                        cy="100"
                        r="70"
                      >
                        <animateTransform
                          type="rotate"
                          attributeName="transform"
                          calcMode="spline"
                          dur="2"
                          values="360;0"
                          keyTimes="0;1"
                          keySplines="0 0 1 1"
                          repeatCount="indefinite"
                        ></animateTransform>
                      </circle>
                      <circle
                        transform-origin="center"
                        fill="none"
                        opacity=".2"
                        stroke="#FFFFFF"
                        stroke-width="15"
                        stroke-linecap="round"
                        cx="100"
                        cy="100"
                        r="70"
                      ></circle>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
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
                  )}
                </a>
              </div>
            )}
          </div>

          {open && (
            <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -left-0.5 right-0.5 bg-white"></div>
          )}

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl">
              {rooms.map((room, roomIndex) => (
                <div key={roomIndex} className="mb-6">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-semibold">Room {roomIndex + 1}</h3>
                    {roomIndex > 0 && (
                      <button
                        className="text-red-500"
                        onClick={() => handleRemoveRoom(roomIndex)}
                      >
                        <TrashIcon className="h-5 w-5" />{" "}
                        {/* Add Trash Icon here */}
                      </button>
                    )}
                  </div>

                  <NcInputNumber
                    className="w-full"
                    defaultValue={room.adults}
                    onChange={(value) =>
                      handleChangeRoomData(value, roomIndex, "adults")
                    }
                    max={10}
                    min={1}
                    label="Adults"
                  />
                  <NcInputNumber
                    className="w-full mt-4"
                    defaultValue={room.children}
                    onChange={(value) =>
                      handleChangeRoomData(value, roomIndex, "children")
                    }
                    max={4}
                    label="Children"
                    desc="Ages 2–12"
                  />

                  {room.children > 0 &&
                    room.childrenAges.map((age, childIndex) => (
                      <div key={childIndex} className="mt-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Age of Child {childIndex + 1}
                        </label>
                        <input
                          type="number"
                          className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-200 rounded-md"
                          value={age}
                          onChange={(e) =>
                            handleChangeRoomData(
                              { index: childIndex, age: e.target.value },
                              roomIndex,
                              "childAge"
                            )
                          }
                          min={2}
                          max={12}
                        />
                      </div>
                    ))}
                </div>
              ))}

              <button
                type="button"
                className="w-full mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                onClick={handleAddRoom}
              >
                Add Room
              </button>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default GuestsInput;
