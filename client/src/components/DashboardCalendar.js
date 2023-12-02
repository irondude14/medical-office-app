import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import { useSelector } from 'react-redux';

function DashboardCalendar({ appointments }) {
  // const appointments = useSelector((state) => state.appointments.value);
  const [date, setDate] = useState(new Date());

  const onChange = (nextDate) => {
    setDate(nextDate);
  };

  const appointmentCheck = (date) => {
    return appointments.some((appointment) => {
      const appointmentDate = new Date(appointment.date_time);
      return appointmentDate.toDateString() === date.toDateString();
    });
  };

  const tileClassName = ({ date, view }) => {
    // Add a class to dates with appointments
    if (view === 'month' && appointmentCheck(date)) {
      return 'highlight';
    }
  };

  console.log(appointments);

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={date}
        tileClassName={tileClassName}
      />
    </div>
  );
}

export default DashboardCalendar;
