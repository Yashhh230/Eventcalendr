import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AddEditComponent } from 'src/app/shared/add-edit/add-edit.component';
import { NgbAlertModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/shared/services/login.service';


@Component({
  selector: 'app-tableview',
  standalone: true,
  imports: [CommonModule, NgbAlertModule , NgFor , NgIf],
  templateUrl: './tableview.component.html',
  styleUrls: ['./tableview.component.scss']
})
export class TableviewComponent implements OnInit {
  eventList: any 

  constructor(private modalService: NgbModal , public main : LoginService) { }

  ngOnInit(): void {
    console.log(this.main.forContact,"this is value")
    this.eventList = this.main.forContact 
  }

  open() {
    this.modalService.open(AddEditComponent);
  }

  

  getLocalStorage() {
    let value = localStorage.getItem('EventForm')
    if (value) {
      return JSON.parse(value)
    }
  }

}
