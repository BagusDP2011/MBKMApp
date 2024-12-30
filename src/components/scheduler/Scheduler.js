import React, { useState } from "react";
import Scheduler from "react-mui-scheduler";

export default function ComScheduler() {
  const [state] = useState({
    options: {
      transitionMode: "zoom", // or fade
      startWeekOn: "mon", // or sun
      defaultMode: "month", // or week | day | timeline
      minWidth: 540,
      maxWidth: 540,
      minHeight: 540,
      maxHeight: 540,
    },
    toolbarProps: {
    //   showSearchBar: true,
    //   showSwitchModeButtons: true,
      showDatePicker: true,
    },
  });

  const events = [
    {
      id: "event-1",
      label: "Menganalisa dan membuat sebuah user persona untuk studi kasus pengguna user yang berpengaruh dalam aplikasi MBKM ini",
      color: "#2196F3",
      date: "2024-12-29",
      createdAt: new Date(),
      createdBy: "Kristina Mayer",
    },
    {
      id: "event-2",
      label: "Medical consultation",
      color: "#2196F3",
      date: "2024-12-29",
      createdAt: new Date(),
      createdBy: "Kristina Mayer",
    }
  ];

  const handleCellClick = (event, row, day) => {
    console.log(event)
  };

  const handleEventClick = (event, item) => {
    // Do something...
  };

  const handleEventsChange = (item) => {
    // Do something...
  };

  const handleAlertCloseButtonClicked = (item) => {
    // Do something...
  };

  return (
    <Scheduler
      locale="en"
      events={events}
      legacyStyle={false}
      options={state?.options}
      alertProps={state?.alertProps}
      toolbarProps={state?.toolbarProps}
      onEventsChange={handleEventsChange}
      onCellClick={handleCellClick}
      onTaskClick={handleEventClick}
      onAlertCloseButtonClicked={handleAlertCloseButtonClicked}
    />
  );
}
