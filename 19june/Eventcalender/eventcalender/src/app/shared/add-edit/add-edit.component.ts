import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../services/login.service';
import { CalendarEvent } from 'angular-calendar';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule , FormsModule ,NgbDatepickerModule  ],
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
  
  
export class AddEditComponent implements OnInit {
  // submitted = false
  // profileImage:any
  // Start: any;
  //   constructor(public modal: NgbActiveModal ,public main : LoginService){}
  //  ngOnInit(): void {
  //    this.addEdit() 
  //    if (!localStorage.getItem('EventForm')) {
  //     localStorage.setItem('EventForm', JSON.stringify([]));
  //   }
  //  }
  // contactForm!:any  
  // addEdit() {
  //   this.contactForm = new FormGroup({
  //     id:new FormControl(Date.now()),
  //     Title: new FormControl('', Validators.required),
  //     Start: new FormControl('', Validators.required),
  //     End: new FormControl('', [Validators.required]),
  //     description: new FormControl('', 
  //       Validators.required ),
  //     address: new FormControl('', Validators.required),
  //     image: new FormControl('', Validators.required),
  //     zip : new FormControl('',Validators.required)
  //   });
  // }
  // FormSumbit() {
  //   this.submitted = true
  //   const studentList: any[] = this.getLocalStorge();
  //   this.modal.close('Save click')
  //   // this.contactForm.value.id = this.getLocalStorge()? Math.max(...this.getLocalStorge().map((s: any) => s.id)) + 1
  //   //   : 1;
  //   this.main.forContact.next(this.getLocalStorge())
  //   this.contactForm.value.Start = this.setDate()
  //     studentList.push(this.contactForm.value)
  //     localStorage.setItem('EventForm', JSON.stringify(studentList)); 
  // }
  // getLocalStorge() {
  //   let value = localStorage.getItem('EventForm')
  //   if (value) {
  //     return JSON.parse(value)
  //   }
  // }
  // setDate() {
  //   let date = new Date(this.Start),
  //     month = ("0" + (date.getMonth() + 1)).slice(-2),
  //     day = ("0" + date.getDate()).slice(-2);
  //   this.contactForm.patchValue({ Start: [date.getFullYear(), month, day].join("-") })
  // }

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})


  @Input() event: CalendarEvent | null = null; // Input for event data
  @Input() Start: Date | null = null; // Input for start date/time

  @Output() eventSaved: EventEmitter<any> = new EventEmitter(); // Event emitter for saving event

  submitted = false;
  contactForm!: FormGroup;
forDate:any
  constructor(public modal: NgbActiveModal) { }

  // setDate() {
  //   let date = new Date(this.Start),
  //     month = ("0" + (date.getMonth() + 1)).slice(-2),
  //     day = ("0" + date.getDate()).slice(-2);
  //   this.contactForm.patchValue({ Start: [date.getFullYear(), month, day].join("-") })
  // }
  getStartFormatted(): string {
    if (this.Start) {
      const datePipe = new DatePipe('en-US');
      return datePipe.transform(this.Start, 'yyyy-MM-dd') || '';
    }
    return '';
  }

  ngOnInit(): void {    
    this.initForm();
    console.log(this.event, "event")
  }

  initForm() {
    this.contactForm = new FormGroup({
      id: new FormControl(this.event?.id || Date.now()),
      Title: new FormControl(this.event?.title || '', Validators.required),
      Start: new FormControl(this.getStartFormatted(), Validators.required),
      End: new FormControl(this.event?.end || '', Validators.required),
      description: new FormControl(this.event?.meta?.description || '', Validators.required),
      address: new FormControl(this.event?.meta?.address || '', Validators.required),
      image: new FormControl(this.event?.meta?.image || '', Validators.required),
      zip: new FormControl(this.event?.meta?.zip || '', Validators.required)
    });
  }

  FormSumbit() {
    this.submitted = true;
    if (this.contactForm.valid) {
      console.log(this.contactForm.value.Start,"this.start")
      this.eventSaved.emit(this.contactForm.value);
      this.modal.close('Save click');
    }
  }

}


