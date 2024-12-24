"use client";
import LoaderWrapper from "@/components/common/loadingWrappers/loader-wrapper";
import React, { useState } from "react";
import WeeklyCalendar from "./weekly-calendar";
import { useAppSelector } from "@/store/hooks";
import { Calendar } from "@/components/ui/calendar";
import { DatePickerWithRange } from "./date-range-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
export function CalendarAppointments() {
  const { appointments, loading, fetched } = useAppSelector(
    (s) => s.appointments
  );
  const [date, setDate] = React.useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 6),
  });
  return (
    <LoaderWrapper loading={loading && !fetched} type="appointments">
      <div className="flex">
        <div className={cn("grid gap-2")}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={(e) => e && setDate(e)}
                // numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="w-full">
          <WeeklyCalendar appointments={appointments} dateRange={date} />
        </div>
      </div>
    </LoaderWrapper>
  );
}
