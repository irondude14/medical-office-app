import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import { useSelector } from 'react-redux';

function DashboardCalendar({ appointments }) {
  // const appointments = useSelector((state) => state.appointments.value);

  console.log(appointments);

  return <div>Calendar</div>;
}

export default Calendar;
