
import React, { useEffect, useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

export default function DateRangePickers() {
  const [defaultDate, setDefaultDate] = useState([new Date(), new Date()]);

  useEffect(() => {
    setDefaultDate([new Date(), new Date()]);
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangePicker']} style={{ outline: 'none' }}>
        <DateRangePicker defaultCalendarDate={defaultDate} />
      </DemoContainer>
    </LocalizationProvider>
  );
}


