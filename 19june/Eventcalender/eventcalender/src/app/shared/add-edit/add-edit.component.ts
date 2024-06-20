import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  NgbActiveModal,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../services/login.service';
import { CalendarEvent } from 'angular-calendar';
import { Title } from '@angular/platform-browser';
import { constructNow } from 'date-fns';

@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbDatepickerModule,
  ],
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
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
    styleUrls: ['./add-edit.component.scss'],
  })
  @Input()
  event: CalendarEvent | null = null; // Input for event data
  @Input() Start: Date | null = null; // Input for start date/time

  @Output() eventSaved: EventEmitter<any> = new EventEmitter(); // Event emitter for saving event

  submitted = false;
  contactForm!: FormGroup;
  forDate: any;
  // constructor(public modal: NgbActiveModal) { }
  EventList: any;
  image: any;
  formatList: any[] = [];
  // setDate() {
  //   let date = new Date(this.Start),
  //     month = ("0" + (date.getMonth() + 1)).slice(-2),
  //     day = ("0" + date.getDate()).slice(-2);
  //   this.contactForm.patchValue({ Start: [date.getFullYear(), month, day].join("-") })
  // }
  getStartFormatted(value:any) {
    let date = new Date(value);
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = date.getFullYear();
    let hour = '' + date.getHours();
    let min = '' + date.getMinutes();
    let sec = '' + date.getSeconds();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hour.length < 2) hour = '0' + hour;
    if (min.length < 2) min = '0' + min;
    if (sec.length < 2) sec = '0' + sec;
    return [year, month, day].join('-') + 'T' + [hour, min, sec].join(':');
  }

  ngOnInit(): void {
    
    this.initForm();
    if (this.event) {
      console.log("this.event", this.event)
      let img = this.event.image
      this.event.image = '';
      this.contactForm.patchValue(this.event)
    }
    if (!localStorage.getItem('EventForm')) {
      localStorage.setItem('EventForm', JSON.stringify([]));
    }
    this.EventList = this.getLocalStorage
    // this.contactForm.controls['Start'].setValue(this.getStartFormatted(this.Start))
  }
  get getLocalStorage() {
    let value = localStorage.getItem('EventForm');
    if (value) {
      return JSON.parse(value);
    }
  }

  getProfilePhoto(event: any) {
    if (event.target.files[0].size > 20971) {
      alert('File is too large');
    } else {
      let reader = new FileReader();
      reader.onload = () => {
        this.image = reader.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  initForm() {
    this.contactForm = new FormGroup({
      id: new FormControl(Date.now()),
      Title: new FormControl('', Validators.required),
      Start: new FormControl( Validators.required),
      End: new FormControl(),
      description: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      image: new FormControl(''),
      zip: new FormControl('', Validators.required),
    });
  }

  FormSumbit() {
    this.submitted = true;
    if (this.contactForm.valid) {
      this.contactForm.value.image=this.image
      if (this.event) {
        let forChange = this.getLocalStorage().findIndex(
          (item: any) => item.id == this.event?.id
        );
        this.formatList[forChange] = this.contactForm.value;
      } else {
        this.EventList.push(this.contactForm.value);
        console.log(this.EventList,"this is eventLIst")
      }
      localStorage.setItem('EventForm', JSON.stringify(this.EventList)  );
      this.eventSaved.emit(null)
    }
  }
}
