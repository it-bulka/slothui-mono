import { useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Typography } from '@/shared/ui';

type EventDateTimePickerProps = {
  value?: Date;
  onChange?: (value: Date) => void;
  minDate?: Date;
};

export const EventDateTimePicker = ({ value: selectedDate = new Date(), onChange, minDate }: EventDateTimePickerProps) => {

  const dateOnly = useMemo(() => {
    const d = new Date(selectedDate);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [selectedDate]);

  const timeOnly = useMemo(() => {
    const t = new Date(selectedDate);
    t.setFullYear(1970, 0, 1);
    return t;
  }, [selectedDate]);

  const handleDateChange = (newDate: Date | null) => {
    if (!newDate) return;
    const combined = new Date(selectedDate);
    combined.setFullYear(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
    onChange?.(combined);
  };

  const handleTimeChange = (newTime: Date | null) => {
    if (!newTime) return;
    const combined = new Date(selectedDate);
    combined.setHours(newTime.getHours(), newTime.getMinutes(), 0, 0);
    onChange?.(combined);
  };

  return (
    <div className="flex gap-3 items-center py-2">
      <Typography bold>Date:</Typography>
      {/* DATE */}
      <DatePicker
        selected={dateOnly}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        minDate={minDate}
        placeholderText="Select date"
        className="w-[100px]"
      />

      <Typography bold>Time:</Typography>
      {/* TIME */}
      <DatePicker
        selected={timeOnly}
        onChange={handleTimeChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="HH:mm"
        placeholderText="Select time"
        className="w-[60px]"
      />
    </div>
  );
};
