import { EventEmitter, Injectable } from '@angular/core';  
import { Event, NavigationEnd, Router } from '@angular/router';  
import { MatDialog, MatDialogRef } from '@angular/material/dialog';   
import { ProgressSpinnerComponent } from '../components/shared/progress-spinner/progress-spinner.component';
  
@Injectable()  
export class SpinnerService {  
  
  
    constructor(private router: Router, private dialog: MatDialog) {  
  
    }  
  
    start(message?): MatDialogRef<ProgressSpinnerComponent> {  
        
        const dialogRef = this.dialog.open(ProgressSpinnerComponent,{  
            disableClose: true ,  
            data: message == ''|| message == undefined ? "Loading..." : message  
        });  
        return dialogRef;  
      };  
  
    stop(ref:MatDialogRef<ProgressSpinnerComponent>){  
        ref.close();  
    }    
}  