import { CalendarApi } from '@fullcalendar/core';
import { EventImpl } from '@fullcalendar/core/internal';
import {
  PropsWithChildren,
  useContext,
  Dispatch,
  createContext,
  useReducer
} from 'react';
import {
  CALENDAR_ACTION_TYPE,
  calendarReducer
} from 'reducers/CalendarReducer';

export type CalendarView = 'dayGridMonth' | 'timeGridWeek';

export interface CalendarEvent {
  id?: string;
  title: string;
  start: Date | string;
  end?: Date | string;
  url?: string;
  [key: string]: any;
}

export interface CalendarState {
  calendarApi: CalendarApi | null;
  title: string;
  view: CalendarView;
  selectedEvent: EventImpl | null;
  openNewEventModal: boolean;
  selectedStartDate: Date | string;
  selectedEndDate: Date | string;
  selectedDate?: string; // Add this
  dayEvents?: CalendarEvent[]; // Add this for the day's events
}

interface CalendarContextInterface extends CalendarState {
  calendarDispatch: Dispatch<CALENDAR_ACTION_TYPE>;
}

export const CalendarContext = createContext({} as CalendarContextInterface);

const CalendarProvider = ({ children }: PropsWithChildren) => {
  const initialState: CalendarState = {
    calendarApi: null,
    title: '',
    view: 'dayGridMonth',
    selectedEvent: null,
    openNewEventModal: false,
    selectedStartDate: '',
    selectedEndDate: ''
  };

  const [calendarState, calendarDispatch] = useReducer(
    calendarReducer,
    initialState
  );

  return (
    <CalendarContext.Provider
      value={{
        ...calendarState,
        calendarDispatch
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => useContext(CalendarContext);

export default CalendarProvider;
