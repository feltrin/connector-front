import { Router } from '@angular/router';
import { Diagram } from './../diagram/diagram.model';
import { ComponentActionService } from './../component-action.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActionResponse } from './../action.model';
import { NoneComponent } from 'angular6-json-schema-form';
import { Activity } from './../flow/flow.model';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {
  yourWidgets = {
    submit: NoneComponent,  
  }
  
  activity : Activity;
  original: Activity;
  inputData : any;
  isDisabled: boolean;
  selectedAction: string;

  actions: ActionResponse[] = [{ id: "XXXXXXXX-bcd5-48c4-8fac-a1bb8e511ee5", name: 'Repeat',}];

  actionsDetails: ActionResponse[] = [{
    id: "XXXXXXXX-bcd5-48c4-8fac-a1bb8e511ee5",
    name: 'Repeat',
    type: "QUARTZ",
    model: { 
      "inputSchema": {
        "schema": {
          "type": "object",
          "properties": {
              "interval": {
                  "type": "string",
                  "oneOf": [
                    {
                      "title": "5 minutos",
                      "const": "5"
                    },
                    {
                      "title": "10 minutos",
                      "const": "10"
                    },
                    {
                      "title": "15 minutos",
                      "const": "15"
                    },
                    {
                      "title": "20 minutos",
                      "const": "20"
                    }
                  ]
                }
              },
              "required": [ "interval"]
        },
        "layout": ["interval"]
          
      },
        "outputSchema": {
          "schema": {
            "type": "object",
            "properties": {

            }
          }
        }
      }
  }]

  constructor(public dialogRef: MatDialogRef<ClockComponent>,
    @Inject(MAT_DIALOG_DATA) public diagram: Diagram,
    private actionService: ComponentActionService,
    public dialog : MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.activity = this.diagram.flow.activities["start"];

    this.original = {...this.activity};

    if(!this.activity){
      var id = Math.random().toString(36).substring(2, 15) ;
      this.activity = {
        id: id, componentId: "333", label:"Quartz", type:"QUARTZ" ,
        connections: {next:[], previous:[]}
      }
    }else{
      this.selectedAction = this.activity.configSchema?.id;
    }
    

    // this.actionService.read(this.activity.componentId).subscribe(actions => {
    //   this.actions = actions.items;
    // })
  }

  actionChange(_id: string): void {
    let action = this.actionsDetails.find(({id}) => id === _id);

    // // this.actionService.readById(_id).subscribe(action => {

      this.activity.label = action.name; 
      this.activity.type = action.type;
      this.activity.configSchema = action.model;
      this.activity.configSchema.id = action.id; 
    
    // // })
  }

  yourOnChangesFn(inputData): void{
    this.inputData = inputData;
    console.log(inputData);
  }

  yourIsValidFn(data): void{
    this.isDisabled = data;
  }

  save(): void{
    this.diagram.flow.async= false;
    this.activity.configurations = this.inputData;
   
    console.log("save()")
    console.log(this.activity)
    this.dialogRef.close(this.activity)
  }

  cancel(): void{
    this.activity.label = this.original.label;
    this.activity.configSchema = this.original.configSchema;
    this.activity.configurations = this.original.configurations;
    this.dialogRef.close();
    if(!this.diagram.flow.activities["start"]){
      this.router.navigate(['/diagrams'])    
    }
  }
}
