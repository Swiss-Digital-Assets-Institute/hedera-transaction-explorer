"use client"

// Component source from Shadcn Date Range Picker 
// modified to match desired style and date ranges
import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerRangeProps {
  className?: string;
  value?: string;
  onChange: (selectedDate: string) => void;
  firstValue?: string;
}

export function DatePickerRange({
  className,
  value,
  onChange,
  firstValue,
}: DatePickerRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(() =>{
    if (firstValue){
      const dateParts = firstValue.split(", ")[0].split("/");
      const year = parseInt(dateParts[2]);
      const month = parseInt(dateParts[0]) - 1;
      const day = parseInt(dateParts[1]);
      return {
        from: new Date(year, month, day, 0, 0, 0),
        to: new Date(),
      }
    } else {
      return {
        from: addDays(new Date(),-20),
        to: new Date(),
      }
    }
  })

  // Checks to see which date is bigger in order to properly add them to the calendar
  const handleDateChange = (selectedDate: DateRange | undefined) => {
    if (selectedDate && selectedDate.from && selectedDate.to && date && date.from && date.to){
      const formattedFrom = format(selectedDate?.from, "MM/dd/yyyy");
      const formattedTo = format(selectedDate?.to, "MM/dd/yyyy");

      if(selectedDate.from < date.from){
        setDate({
          from: selectedDate.from,
          to: date.to
        })
        onChange(formattedFrom)
      } else {
        setDate({
          from: date.from,
          to: selectedDate.to,
        })
        onChange(formattedTo);
      }
      
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
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
            <CalendarIcon className="mr-2 h-4 w-4" />
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
            onSelect={handleDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
