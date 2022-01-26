import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-editvendor',
  templateUrl: './editvendor.component.html',
  styleUrls: ['./editvendor.component.css']
})

export class EditvendorComponent implements OnInit {
  dt!: DialogData;

  constructor(
    public dialogRef: MatDialogRef<EditvendorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}
  ngOnInit() {
    this.dt=this.data;
    console.log(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

