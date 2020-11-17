import { IntegrationService } from './../integration.service';
import { DiagramService } from './../diagram.service';
import { Component, OnInit } from '@angular/core';
import { Diagram } from '../diagram.model';

@Component({
  selector: 'app-diagram-read',
  templateUrl: './diagram-read.component.html',
  styleUrls: ['./diagram-read.component.css']
})
export class DiagramReadComponent implements OnInit {

  diagrams: Diagram[];
  displayedColumns = ['id', 'name'];

  constructor(
    //private diagramService: DiagramService,
    private integrationService: IntegrationService) { }

  ngOnInit(): void {
    // this.diagramService.read().subscribe(diagrams => {
    //   this.diagrams = diagrams;
    // })
    
    this.integrationService.read().subscribe(diagrams => {
      this.diagrams = diagrams.items;
    })
  }

}
