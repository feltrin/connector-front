import { Router } from '@angular/router';
import { Diagram } from './../diagram/diagram.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Activity } from './../flow/flow.model';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-webhook',
  templateUrl: './webhook.component.html',
  styleUrls: ['./webhook.component.css']
})
export class WebhookComponent implements OnInit {
  activity: Activity;
  

  constructor(public dialogRef: MatDialogRef<WebhookComponent>,
    @Inject(MAT_DIALOG_DATA) public diagram: Diagram,
    private router: Router) { }

  ngOnInit(): void {
    this.activity = this.diagram.flow.activities["start"];
    if(!this.activity){
      var id = Math.random().toString(36).substring(2, 15) ;
      this.activity = {
        id: id, componentId: "222", label:"Webhook", type:"WEBHOOK" ,
        connections: {next:[], previous:[]}
      }
    
      const url = `http://localhost:8085/connector-engine/webhook/runflow/${id}`;
      this.activity.configurations = {url: url};
    }
  }

  save(): void{
    this.diagram.flow.async= false;
    //this.diagram.flow.activities["start"] = this.activity;
    console.log(this.activity)
    this.dialogRef.close(this.activity);    
  }

  cancel(): void{
    this.dialogRef.close();
    if(!this.diagram.flow.activities["start"]){
      this.router.navigate(['/diagrams'])    
    }
  }

}
