import { CalendarEvent } from "angular-calendar";

export interface CustomCalendarEvent extends CalendarEvent {
    description?: string;
    location?: string;
    imageUrl?: string;
    zip?: string;
  }