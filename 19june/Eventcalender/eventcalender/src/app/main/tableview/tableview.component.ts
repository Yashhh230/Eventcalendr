import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AddEditComponent } from 'src/app/shared/add-edit/add-edit.component';
import {
  NgbAlertModule,
  NgbModal,
  NgbOffcanvas,
} from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-tableview',
  standalone: true,
  imports: [CommonModule, NgbAlertModule, NgFor, NgIf],
  templateUrl: './tableview.component.html',
  styleUrls: ['./tableview.component.scss'],
})
export class TableviewComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    public main: LoginService,
    public offcanvas: NgbOffcanvas
  ) {}
  eventList: any;
  ngOnInit(): void {
    this.eventList = this.getLocalStorage;
  }
  open() {
    this.modalService.open(AddEditComponent);
  }
  get getLocalStorage() { 
    let value = localStorage.getItem('EventForm');
    if (value) {
      return JSON.parse(value);
    }
  }

  Edit(students: any) {
    const canvas = this.offcanvas.open(AddEditComponent, { position: 'end' });
    canvas.componentInstance.event = students;
  }
}
