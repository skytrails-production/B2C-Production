import React, { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";

import { UserPlusIcon } from "@heroicons/react/24/outline";
import NcInputNumber from "../NcInputNumber";
import ClearDataButton from "../ClearDataButton";
import ButtonSubmit from "../ButtonSubmit";

const HolidayGuestInput = ({

    fieldClassName = "[ nc-hero-field-padding ]",
    className = "[ nc-flex-1 ]",
    buttonSubmitHref = "",
    hasButtonSubmit = true,
    onRoomDataChange,
    onSubmit
}) => {


    const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(1);
    const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(0);

    const handleChangeData = (value, type) => {
        if (type === "guestAdults") {
            setGuestAdultsInputValue(value);
        }
        if (type === "guestChildren") {
            setGuestChildrenInputValue(value);
        }
    };


    useEffect(() => {
        const payload = {
            adults: guestAdultsInputValue,
            child: guestChildrenInputValue,
        };
        onRoomDataChange(payload);
    }, [guestAdultsInputValue, guestChildrenInputValue]);

    const totalGuests = guestChildrenInputValue + guestAdultsInputValue;

    return (
        <Popover className={`flex relative ${className}`}>
            {({ open, close }) => (
                <>
                    <div
                        className={`flex-1 z-10 flex items-center focus:outline-none ${open ? "nc-hero-field-focused" : ""
                            }`}
                    >
                        <Popover.Button
                            className={`relative z-10 flex-1 flex text-left items-center ${fieldClassName} space-x-3 focus:outline-none`}
                        >
                            <div className="text-neutral-300">
                                <UserPlusIcon className="w-5 h-5 lg:w-7 lg:h-7" />
                            </div>
                            <div className="flex-grow">
                                <span className="block xl:text-lg font-semibold">
                                    {totalGuests || ""} Guests
                                </span>
                                <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
                                    {totalGuests ? "Guests" : "Add guests"}
                                </span>
                            </div>

                            {!!totalGuests && open && (
                                <ClearDataButton
                                    onClick={() => {
                                        setGuestAdultsInputValue(0);
                                        setGuestChildrenInputValue(0);
                                    }}
                                />
                            )}
                        </Popover.Button>

                        {hasButtonSubmit && (

                            <div className="pr-2 xl:pr-4">
                                {/* <ButtonSubmit href={buttonSubmitHref} /> */}
                                <a
                                    onClick={onSubmit}
                                    type="button"
                                    className="h-14 md:h-16 w-full md:w-16 rounded-full bg-primary-6000 hover:bg-primary-700 flex items-center justify-center text-neutral-50 focus:outline-none"
                                >
                                    <span className="mr-3 md:hidden">Search</span>
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
                                </a>
                            </div>

                        )}
                    </div>

                    {open && (
                        <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -left-0.5 right-0.5 bg-white "></div>
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
                        <Popover.Panel className="absolute right-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white  top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl">
                            <NcInputNumber
                                className="w-full"
                                defaultValue={guestAdultsInputValue}
                                onChange={(value) => handleChangeData(value, "guestAdults")}
                                max={10}
                                min={1}
                                label="Adults"
                                desc="Ages 13 or above"
                            />
                            <NcInputNumber
                                className="w-full mt-6"
                                defaultValue={guestChildrenInputValue}
                                onChange={(value) => handleChangeData(value, "guestChildren")}
                                max={4}
                                label="Children"
                                desc="Ages 2–12"
                            />

                            <div className="mt-6 flex justify-end">
                                <button
                                    type="button"
                                    className="w-full mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                    onClick={() => close()}
                                >
                                    Okay
                                </button>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
};

export default HolidayGuestInput;
