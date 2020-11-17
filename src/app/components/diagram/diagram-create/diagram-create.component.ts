import { IntegrationService } from './../integration.service';
import { Diagram } from './../diagram.model';
import { MatDialogRef } from '@angular/material/dialog';
import { DiagramService } from '../diagram.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diagram-create',
  templateUrl: './diagram-create.component.html',
  styleUrls: ['./diagram-create.component.css']
})
export class DiagramCreateComponent implements OnInit {
  
  diagram: Diagram = {
    name: '',
    flow: {
      activities: {}
    }
  }

  constructor(public dialogRef: MatDialogRef<DiagramCreateComponent>,
    //private diagramService: DiagramService,
    private integrationService: IntegrationService) { }

  ngOnInit(): void {}

  createDiagram(): void{
    this.integrationService.createSketch(this.diagram).subscribe(diagram => {
      this.dialogRef.close(diagram);
    })
    // this.diagramService.create(this.diagram).subscribe(diagram => {
    //   this.dialogRef.close(diagram);
    // })
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
