import { Router } from '@angular/router';
import { DiagramCreateComponent } from './../../components/diagram/diagram-create/diagram-create.component';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-diagram-crud',
  templateUrl: './diagram-crud.component.html',
  styleUrls: ['./diagram-crud.component.css']
})
export class DiagramCrudComponent implements OnInit {

  constructor(public dialog : MatDialog,
    private router: Router) { }

  ngOnInit(): void {
  }

  addDiagram():void {
    let dialogRef = this.dialog.open(DiagramCreateComponent, {
      maxHeight: '95vh',
      minWidth: '400px',
      width: '25vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.router.navigate([`/flow/${result.id}`])
      }
    });
  }

}
