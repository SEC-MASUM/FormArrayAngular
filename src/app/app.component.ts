import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'FormArray';
  items!: FormArray;

  prForm = this.fb.group({
    code: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required]),
    prItem: this.fb.array([]),
  });

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.AddNewRow();
  }

  AddNewRow() {
    this.items = this.prForm.get('prItem') as FormArray;
    this.items.push(this.GenerateRow());
  }

  removeItem(index: number) {
    this.items = this.prForm.get('prItem') as FormArray;
    this.items.removeAt(index);
  }

  get prItem() {
    return this.prForm.controls['prItem'] as FormArray;
  }

  GenerateRow() {
    return this.fb.group({
      name: new FormControl('', [Validators.required]),
      unit: new FormControl('', Validators.required),
      unitPrice: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    console.log(this.prForm.value);
  }
}

// <table formArrayName="prItem">
//           <tbody>
//             <tr *ngFor="let item of prItem.controls; let i = index">
//               <td>
//                 <input placeholder="Name" formControlName="name" />
//               </td>
//               <td>
//                 <input placeholder="Unit" formControlName="unit" />
//               </td>
//               <td>
//                 <input placeholder="Unit Price" formControlName="unitPrice" />
//               </td>
//               <td>
//                 <button
//                   mat-raised-button
//                   color="accent"
//                   (click)="removeItem(i)"
//                 >
//                   (-) Remove Item
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
