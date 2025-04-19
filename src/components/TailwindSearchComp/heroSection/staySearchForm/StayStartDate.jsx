import React, { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import DatePicker from "react-datepicker";
import DatePickerCustomHeaderTwoMonth from "../DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "../DatePickerCustomDay";
import ClearDataButton from "../ClearDataButton";

const StayStartDate = ({
  className = "[ lg:nc-flex-2 ]",
  fieldClassName = "[ nc-hero-field-padding-return ]",
  onStartDateChange,
  //   hasButtonSubmit = true,
  //   onSubmit,
}) => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const [startDate, setStartDate] = useState(tomorrow);

  const onChangeDate = (date, closePopover) => {
    setStartDate(date);
    // if (date) {
    //   console.log({
    //     checkin: formatDate(date),
    //   });
    // }
    closePopover();
  };

  useEffect(() => {
    if (onStartDateChange) {
      onStartDateChange({ startDate });
    }
  }, [startDate, onStartDateChange]);

  const renderInput = () => {
    return (
      <>
        <div className="text-neutral-300">
          <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow text-left">
          <span className="block text-base md:text-2xl font-bold">
            {startDate?.toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "2-digit",
            }) || "Add date"}
          </span>
          <span className="block mt-1 text-[0.8rem] text-neutral-400 leading-none font-light">
            {"Departure Date"}
          </span>
        </div>
      </>
    );
  };

  return (
    <Popover className={`relative flex ${className}`}>
      {({ open, close }) => (
        <>
          <div
            className={`flex-1 z-10 flex items-center focus:outline-none ${
              open ? "nc-hero-field-focused" : ""
            }`}
          >
            <Popover.Button
              className={`relative z-10 flex-1 flex text-left items-center ${fieldClassName} space-x-3 focus:outline-none`}
            >
              {renderInput()}
              {startDate && open && (
                <ClearDataButton onClick={() => onChangeDate(null)} />
              )}
            </Popover.Button>
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
            <Popover.Panel className=" absolute left-1/2 md:left-0 z-30 mt-[-40px] top-full w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white p-8">
                <DatePicker
                  selected={startDate}
                  onChange={(dates) => onChangeDate(dates, close)}
                  startDate={startDate}
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

export default StayStartDate;
