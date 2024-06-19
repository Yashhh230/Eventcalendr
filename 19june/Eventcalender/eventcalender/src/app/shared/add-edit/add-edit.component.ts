import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule , FormsModule],
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
  
  
export class AddEditComponent implements OnInit {

  
   ngOnInit(): void {
      this.addEdit()   
   }

  contactForm!:any  
  addEdit() {
    
    this.contactForm = new FormGroup({
      id:new FormControl(),
      Title: new FormControl('', Validators.required),
      Start: new FormControl('', Validators.required),
      End: new FormControl('', [Validators.required, Validators.email]),
      description: new FormControl('', 
        Validators.required ),
      address: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      hobby: new FormArray([]),
    });
  }
}
