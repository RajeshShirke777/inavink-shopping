import {Component, Inject} from '@angular/core';  
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';  

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent {
  constructor(public dialogRef: MatDialogRef<ProgressSpinnerComponent>   
    , @Inject(MAT_DIALOG_DATA) public data: any) {} 
}