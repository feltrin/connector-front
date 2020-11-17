import { AuthCreateComponent } from './../../components/auth/auth-create/auth-create.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-auth-crud',
  templateUrl: './auth-crud.component.html',
  styleUrls: ['./auth-crud.component.css']
})
export class AuthCrudComponent implements OnInit {

  constructor(public dialog : MatDialog) { }

  ngOnInit(): void {
  }

  addAuth():void {
    let dialogRef = this.dialog.open(AuthCreateComponent, {
      maxHeight: '95vh',
      minWidth: '400px',
      width: '25vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
