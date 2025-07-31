"use client";

import { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { sv } from "date-fns/locale";

export default function DateSelector() {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  console.log("Selected date:", selectedDate);
  const selectedDateRef = useRef<Date | null>(selectedDate);
  selectedDateRef.current = selectedDate;

  const [timeLeft, setTimeLeft] = useState<String>("00:00:00:00");

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      const targetDate = selectedDateRef.current;
      if (!targetDate) return;

      const diff = calculateTimeDifference(now, targetDate);
      setTimeLeft(diff);
    }

    updateTime(); // kör direkt

    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function calculateTimeDifference(start: Date, end: Date) {
    const diffMs = end.getTime() - start.getTime();

    if (diffMs <= 0) {
      return "00:00:00:00";
    }

    const totalSeconds = Math.floor(diffMs / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formatedTime = (days > 0 ? String(days).padStart(2, "0") : "00") + ":" + String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");

    return formatedTime;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <h2 className="text-2xl">Välj ett datum:</h2>
      <DatePicker
        locale={sv}
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat={"yyyy-MM-dd"}
        inline
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />

      { selectedDate && (
        <div>
          <h2 className="text-2xl py-8">Återstående tid:</h2>
          <div className="flex gap-2 text-center mt-8">
            {timeLeft.split("").map((char, index) => {
              const isColon = char === ":";
              return isColon ? (
                <span key={index} className="text-2xl font-bold">:</span>) : ( 
                  <div key={index}>
                    <span className="text-4xl font-bold bg-orange-100 p-4 border-4 border-yellow-600 rounded-2xl">{char}</span>
                  </div>
                );
            })}
          </div>
        </div>
      )}
    </div>
  );
}