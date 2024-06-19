import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditComponent } from 'src/app/shared/add-edit/add-edit.component';
import { NgbAlertModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-tableview',
  standalone: true,
  imports: [CommonModule,NgbAlertModule],
  templateUrl: './tableview.component.html',
  styleUrls: ['./tableview.component.scss']
})
export class TableviewComponent { 
  eventList: any

	constructor(private modalService: NgbModal) {}

	open() {
		 this.modalService.open(AddEditComponent);
		// modalRef.componentInstance.name = 'World';
	}



}
