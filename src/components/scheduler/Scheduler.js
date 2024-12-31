import React, { useState, useEffect } from "react";
import Scheduler from "react-mui-scheduler";

export default function ComScheduler({ data }) {
  const [schedulerData, setSchedulerData] = useState(data);

  useEffect(() => {
    setSchedulerData([...data]);
  }, [data]);

  const handleCellClick = (event, row, day) => {
    console.log(event);
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
      key={JSON.stringify(schedulerData)}
      locale="en"
      events={schedulerData}
      legacyStyle={false}
      options={{
        startWeekOn: "mon",
        defaultMode: "month",
        minWidth: 540,
        maxWidth: 540,
        minHeight: 540,
        maxHeight: 540,
      }}
      toolbarProps={{
        showDatePicker: true,
      }}
      onEventsChange={handleEventsChange}
      onCellClick={handleCellClick}
      onTaskClick={handleEventClick}
      onAlertCloseButtonClicked={handleAlertCloseButtonClicked}
    />
  );
}
