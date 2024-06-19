import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEvent, CalendarModule, CalendarView, CalendarWeekModule  } from 'angular-calendar';


@Component({
  selector: 'app-calenderview',
  standalone: true,
  imports: [CommonModule ,  CalendarModule],
  templateUrl: './calenderview.component.html',
  styleUrls: ['./calenderview.component.scss']
})
export class CalenderviewComponent {

  activeDayIsOpen: boolean = true;

  // view: CalendarView = CalendarView.Month;

  // CalendarView = CalendarView;

  // viewDate: Date = new Date();

  // events: CalendarEvent[] = [];

  // clickedDate: any;
  // clickedColumn: any;

  /**

Sets the calender page view */
  // etView(view: CalendarView) { this.view = view; }
  CalendarView = CalendarView;
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  clickedDate: any;

  clickedColumn: any;
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  setView(view: CalendarView) {
    this.view = view;
  }
  
}
