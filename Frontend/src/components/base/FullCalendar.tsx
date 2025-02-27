import ReactFullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useRef } from 'react';
import { CalendarOptions } from '@fullcalendar/core';
import { useCalendarContext } from 'providers/CalendarProvider';
import { useAppContext } from 'providers/AppProvider';
import { INITIALIZE_CALENDAR } from 'reducers/CalendarReducer';

interface FullCalendarProps extends CalendarOptions {}

const FullCalendar = ({ ...rest }: FullCalendarProps) => {
  const calendarRef = useRef<ReactFullCalendar>(null);
  const {
    config: { isRTL }
  } = useAppContext();

  const { view, calendarDispatch } = useCalendarContext();

  useEffect(() => {
    const api = calendarRef.current?.getApi();
    if (api) {
      calendarDispatch({ type: INITIALIZE_CALENDAR, payload: api });
    }
  }, []);

/* 

GROK:

// Handle day click and trigger database query
const handleDayClick = (date: Date) => {
  // Format the date for your query (e.g., "2025-02-24")
  const formattedDate = date.toISOString().split('T')[0];
  
  // Example: Dispatch an action or fetch data
  console.log(`Clicked day: ${formattedDate}`);
  // Replace this with your database query logic, e.g., fetch from Phoenix backend
  fetch(`/api/events?date=${formattedDate}`)
    .then(response => response.json())
    .then(data => {
      // Handle the data (e.g., open a modal or update state)
      calendarDispatch({
        type: SET_CALENDAR_STATE, // Adjust to your reducer
        payload: { selectedDate: formattedDate, events: data },
      });
    })
    .catch(error => console.error('Error fetching events:', error));
};

// Customize day cell content to make the number clickable
const renderDayCellContent = (info: { date: Date; dayNumberText: string }) => {
 

return (
    <span
      style={{ cursor: 'pointer', color: '#007bff' }} // Style as a clickable link
      onClick={() => handleDayClick(info.date)}
    >
      {info.dayNumberText}
    </span>
  );
};
*/  
  return (
    <ReactFullCalendar
      ref={calendarRef}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView={view}
      headerToolbar={false}
      dayMaxEvents={3}
      stickyHeaderDates={false}
      editable
      selectable
      selectMirror
      direction={isRTL ? 'rtl' : 'ltr'}
      eventTimeFormat={{
        hour: 'numeric',
        minute: '2-digit',
        omitZeroMinute: true,
        meridiem: true
      }}
// GROK:      dayCellContent={renderDayCellContent} // Add this to customize day cells
      {...rest}
    />
  );
};

export default FullCalendar;
