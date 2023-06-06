import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit  {


  constructor(private dialog : MatDialog, public router: Router){

  }

  ngOnInit(): void {
  }


  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    })
  }


}
