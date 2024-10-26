import React, { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import DatePicker from "react-datepicker";
import DatePickerCustomHeaderTwoMonth from "../../DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "../../DatePickerCustomDay";
import ClearDataButton from "../../ClearDataButton";


// Helper function to format dates as "YYYY-MM-DD"
const formatDate = (date) => {
    return date ? date.toISOString().split("T")[0] : null;
};

const ReturnDateBox = ({
    className = "[ lg:nc-flex-2 ]",
    fieldClassName = "[ nc-hero-field-padding ]",
    onDateChange,
    hasButtonSubmit = true,
    onSubmit
}) => {
    const today = new Date();
    const twoDaysLater = new Date(today);
    twoDaysLater.setDate(today.getDate() + 2);

    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(twoDaysLater);

    const onChangeDate = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        if (start && end) {
            console.log({
                checkin: formatDate(start),
                checkout: formatDate(end),
            });
        }
    };

    useEffect(() => {
        if (onDateChange) {
            onDateChange({ startDate, endDate });
        }
    }, [startDate, endDate, onDateChange]);

    const renderInput = () => {
        return (
            <>
                <div className="text-neutral-300">
                    <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
                </div>
                <div className="flex-grow text-left">
                    <span className="block xl:text-lg font-semibold">
                        {startDate?.toLocaleDateString("en-US", {
                            month: "short",
                            day: "2-digit",
                        }) || "Add dates"}
                        {endDate
                            ? " - " +
                            endDate?.toLocaleDateString("en-US", {
                                month: "short",
                                day: "2-digit",
                            })
                            : ""}
                    </span>
                    <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
                        {"Check in - Check out"}
                    </span>
                </div>
            </>
        );
    };

    return (
        <Popover className={`StayDatesRangeInput z-10 relative flex ${className}`}>
            {({ open }) => (
                <>

                    <div
                        className={`flex-1 z-10 flex items-center focus:outline-none ${open ? "nc-hero-field-focused" : ""
                            }`}
                    >
                        <Popover.Button
                            className={`flex-1 z-10 flex relative ${fieldClassName} items-center space-x-3 focus:outline-none ${open ? "nc-hero-field-focused" : ""}`}
                        >
                            {renderInput()}
                            {startDate && open && (
                                <ClearDataButton onClick={() => onChangeDate([null, null])} />
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

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="absolute left-1/2 z-10 mt-3 top-full w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                            <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white p-8">
                                <DatePicker
                                    selected={startDate}
                                    onChange={onChangeDate}
                                    startDate={startDate}
                                    endDate={endDate}
                                    selectsRange
                                    monthsShown={2}
                                    showPopperArrow={false}
                                    inline
                                    minDate={today}
                                    renderCustomHeader={(p) => (
                                        <DatePickerCustomHeaderTwoMonth {...p} />
                                    )}
                                    renderDayContents={(day, date) => (
                                        <DatePickerCustomDay dayOfMonth={day} date={date} />
                                    )}
                                />
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
};

export default ReturnDateBox;