import { Component, OnInit, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-location-info',
  templateUrl: './location-info.component.html',
  styleUrls: ['./location-info.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class LocationInfoComponent implements OnInit {
  //public product;
  //public selectedProductImageIndex;

  @ViewChild('locationinfo', { static: true }) locationinfo;

  constructor(
    public dialogRef: MatDialogRef<LocationInfoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {}) {
               }

  ngOnInit() {

  }

  public close(): void {
    this.dialogRef.close();
  }


}
