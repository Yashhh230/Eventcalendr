import { Component, OnInit } from '@angular/core';
import { CommonModule, NgSwitch, NgSwitchCase } from '@angular/common';
import { CalendarEvent, CalendarModule, CalendarMonthViewDay, CalendarView, CalendarWeekModule  } from 'angular-calendar';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AddEditComponent } from 'src/app/shared/add-edit/add-edit.component';
import { Subject } from 'rxjs';
import { startOfDay, endOfDay } from 'date-fns';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { CustomCalendarEvent } from 'src/app/shared/customcalender';




@Component({
  selector: 'app-calenderview',
  standalone: true,
  imports: [CommonModule, CalendarModule , NgSwitch ,NgSwitchCase],
  templateUrl: './calenderview.component.html',
  styleUrls: ['./calenderview.component.scss']
})
export class CalenderviewComponent implements OnInit {

  view: CalendarView = CalendarView.Month
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  refresh: Subject<any> = new Subject();
  clickedColumn:any
  clickedDate: Date | null = null; // Define clickedDate property
  activeDayIsOpen: boolean = true;
  CalendarView = CalendarView
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const storedEvents = localStorage.getItem('EventForm');
    console.log('storedEvents')
    if (storedEvents) {
      const parsedEvents = JSON.parse(storedEvents);
      console.log(this.events , "this.events")
      this.events = parsedEvents.map((event: any) => this.transformEvent(event));
    }
  }

  transformEvent(event: any): CustomCalendarEvent {
    return {
      id: event.id,
      title: event.Title,
      start: new Date(event.Start),
      end: new Date(event.End),
      description: event.description,
      location: event.address,
      imageUrl: event.image,
      zip: event.zip
    };
  }

  handleDayClicked(event: { day: CalendarMonthViewDay }) {
    const selectedDate = event.day.date;
    this.openModal(null, selectedDate);
  }

  openModal(event: CalendarEvent | null, selectedDate: Date) {
    const modalOptions: NgbModalOptions = {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    };
    
    const modalRef = this.modalService.open(AddEditComponent, modalOptions);
    modalRef.componentInstance.Start = selectedDate;
  
    // modalRef.componentInstance.event = event;
    
    // modalRef.componentInstance.eventSaved.subscribe((newEvent: any) => {
    //   if (event) {
    //     console.log(event ,"event")
    //     this.events = this.events.map((e) => (e.id === event.id ? { ...e, ...this.transformEvent(newEvent) } : e));
    //   } else {
    //     const newCalendarEvent = this.transformEvent(newEvent);
    //     this.events = [...this.events, { id: Date.now(), ...newCalendarEvent }];
    //   }
    //   localStorage.setItem('EventForm', JSON.stringify(this.events));
    //  
    // });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  forEvent(event:any) {
    console.log(event)
  }
}


