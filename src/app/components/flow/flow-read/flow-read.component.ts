import { ClockComponent } from './../../clock/clock.component';
import { WebhookComponent } from './../../webhook/webhook.component';
import { IntegrationService } from './../../diagram/integration.service';
import { Activity } from './../flow.model';
import { ComponentRestComponent } from './../../component-rest/component-rest.component';
import { DiagramResponse } from './../../diagram/diagram.model';
import { ActivatedRoute, Router } from '@angular/router';


import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-flow-read',
  templateUrl: './flow-read.component.html',
  styleUrls: ['./flow-read.component.css']
})
export class FlowReadComponent implements OnInit {
  diagram: DiagramResponse;
  displayedColumns = ['id', 'label', 'action'];
  private lastActivity: string;
  constructor(
    // private diagramService: DiagramService,
    private integrationService: IntegrationService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog : MatDialog) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.integrationService.readById(id).subscribe(diagram => {
      this.diagram = diagram;
     
      if(Object.keys(diagram.flow.activities).length === 0){

        let dialogRef = this.dialog.open(ClockComponent, { 
          data: this.diagram,//{diagramId: this.diagram.id, activity:activity},
          maxHeight: '95vh',
          minWidth: '500px',
          width: '25vw'
        });

        //WEBHOOK
        // let dialogRef = this.dialog.open(WebhookComponent, { 
        //   data: this.diagram,//{diagramId: this.diagram.id, activity:activity},
        //   maxHeight: '95vh',
        //   minWidth: '500px',
        //   width: '25vw'

        // });

        dialogRef.afterClosed().subscribe(result => {
          if(result){
            this.diagram.flow.activities["start"] = result;
            console.log(result)
            this.lastActivity = "start"
          }
        });


      }
    })
    // this.diagramService.readById(id).subscribe(diagram => {
    //   this.diagram = diagram;
    // })
   }

  addRest(): void{
    var a = Math.random().toString(36).substring(2, 15) ;
    let activity: Activity = {
      id: a, 
      componentId: "8d52b588-1ff1-42f2-8e1e-2be746ae82ab", 
      label:"Petstore", 
      connections: {next:[], previous:[this.lastActivity]}
    }
    this.diagram.flow.activities[a] = activity
    this.diagram.flow.activities[this.lastActivity].connections.next.push(a);
    this.lastActivity = a;
  }

  // addWebhook(): void{
  //   var a = Math.random().toString(36).substring(2, 15) ;
  //   let activity: Activity = {
  //     id: a, componentId: "222", label:"Webhook", type:"WEBHOOK" ,
  //     connections: {next:[], previous:[]}
  //   }
  //   this.diagram.flow.start= a;
  //   this.current = a;
  //   this.diagram.flow.activities[a] = activity
  // }

  edit(activity: Activity): void{
    switch (activity.componentId) {
      case "222":
        let dialogRef = this.dialog.open(WebhookComponent, { 
          data: this.diagram,
          maxHeight: '95vh',
          minWidth: '500px',
          width: '25vw'

        });

        dialogRef.afterClosed().subscribe(result => {
          if(result){
            this.diagram.flow.activities["start"] = result;
            console.log(result)
            this.lastActivity = "start"
          }
        });
        break;

        case "333":
          let dialogRef2 = this.dialog.open(ClockComponent, { 
            data: this.diagram,
            maxHeight: '95vh',
            minWidth: '300px',
            width: '25vw'
  
          });
  
          dialogRef2.afterClosed().subscribe(result => {
            if(result){
              this.diagram.flow.activities["start"] = result;
              console.log(result)
              this.lastActivity = "start"
            }
          });
          break;

      case "8d52b588-1ff1-42f2-8e1e-2be746ae82ab":
        this.dialog.open(ComponentRestComponent, { 
          data: activity,
          maxHeight: '95vh',
          minWidth: '300px',
          width: '25vw'
        });
        break;
    
      default:
        break;
    }
    
  }

  save(): void{
    console.log(this.diagram)
     this.integrationService.updateSketch(this.diagram).subscribe(()=> 
      console.log("SAVE")
     ); 
  }

  publish(): void{
    console.log(this.diagram)
     this.integrationService.publishNewVersion(this.diagram).subscribe(()=> 
      console.log("PUBLISH")
     ); 
  }

  cancel(): void{
    this.router.navigate(['/diagrams'])
  }

  delete(activity: Activity): void{
    let previousId = activity.connections.previous[0];
    let nextId = activity.connections.next[0];
    let id = activity.id;

    console.log(activity.connections)
    if(nextId){
        console.log("ñ é o ultimo!")
        return;
    }else if(previousId){ 
        let previous = this.diagram.flow.activities[previousId];
        previous.connections.next.pop(activity.id)
    } else {
      id = "start";
    }
    
    console.log("deletou" + id)
    delete this.diagram.flow.activities[id];

  }

}
