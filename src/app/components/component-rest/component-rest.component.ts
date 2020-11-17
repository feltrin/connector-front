import { AccountService } from './../auth/account.service';
import { EnvironmentComponent } from './../environment/environment.component';
import { EnvironmentResponse } from './../environment/environment.model';
import { EnvironmentService } from './../environment/environment.service';

import { ActionResponse } from './../action.model';
import { ComponentActionService } from './../component-action.service';

import { AuthCreateComponent } from './../auth/auth-create/auth-create.component';
import { Account } from './../auth/account.model';
import { AuthDataService } from './../auth/auth-data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Activity } from './../flow/flow.model';
import { Component, OnInit, Inject } from '@angular/core';
import { NoneComponent} from 'angular6-json-schema-form';


interface ActionModelRest {
  id: string,
  name: string,
  type?: any,
  model?: any
}

@Component({
  selector: 'app-component-rest',
  templateUrl: './component-rest.component.html',
  styleUrls: ['./component-rest.component.css']
})
export class ComponentRestComponent implements OnInit {
  yourWidgets = {
    submit: NoneComponent,  
  }
  
  accounts: Account[] = []
  inputData : any;
  activity: Activity; 
  isDisabled: boolean;
  selectedAction: string;
  selectedEnv: string;
  selectedAccount : string;
  envs: EnvironmentResponse[];
  actions: ActionResponse[];

  // envsModel: any [] = [
  //   { id: "fad1b799-524e-4181-8fad-9559c4cde753", label: "Petstore v2", componentId:"99172796-85e0-498d-9429-01a749e13305", type: "REST", baseURL: "https://petstore.swagger.io/v2"},
  //   { id: "2", label: "linkedin2", componentId:"61ffef9a-bf0b-406c-9ebd-b064dc215c55", type: "REST", baseURL: "https://www.linkedin.com"},
  //   { id: "3", label: "linkedin2", componentId:"1", type: "SOAP", baseURL: "https://www.linkedin.com"}
  // ]
    
  // actions: ActionModelRest[] = [
  //   {id: 'f457a3ff-29f1-4057-92ef-8bb487714bbf', label: 'Find pet by ID'},
  //   {id: '8ef3764c-5c3a-4fe2-99b3-1431924a6b10', label: 'Add new pet'}
  // ];
  //{ "type": "flex", "flex-flow": "row wrap", "items": [ "first_name", "last_name" ] },
  actionsDetails: ActionModelRest[] = [{
    id: "edaca4bc-bcd5-48c4-8fac-a1bb8e511ee5",
    name: 'Find pet by ID',
    type: "REST",
    model: { 
      "allowCustomEnv" : true,
      "allowedAuthTypes" : ["OAUTH2_PASSWORD"],
      "inputSchema": {
        "schema": {
          "type": "object",
          "properties": {
              "path":{"type": "string", "widget": "hidden", "default": "/pet/{{petId}}", "readonly": true},
              "method": {"type": "string", "widget": "hidden", "default": "GET", "readonly": true},
              "inPath":{
                  "type": "object",
                  "title": "Path param",
                  "expandable": true,
                  "expanded": true,

                  "properties": {
                        "petId": {
                          "type": "string",
                          "description": "int"
                        }
                  },
                  "required": ["petId"]
              }
          },
          "required": ["inPath"]
        },
        "layout": [
          {
          "title": "Path param",
          "expandable": true,
          "expanded": true,
          "items": [
            "inPath.petId" 
          ]
        }
        ]
      },
        "outputSchema": {
          "schema": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer"
              },
              "name": {
                "type": "string"
              },
              "status": {
                "type": "string"
              },
              "category" : {
                "type": "object",
                  "properties": {
                    "id": {"type": "integer"},
                    "name": {"type": "string"}
                  }
              },
              "tags": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": { "type": "integer" },
                    "name": { "type": "string" }
                  }
                }
              },
              "photoUrls": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
  },

  {
    id : 'fd07b7cd-fcc2-4d3c-9f8f-2317f9a67803_',
    name: 'GET Middleware Configuration',
    type: "REST",
    model: { 
      allowedAuthTypes : ["OAUTH2_PASSWORD"],
      "allowCustomEnv" : true,
      inputSchema: {
        "schema": {
          "type": "object",
          "properties": {
              "path":{"type": "string", "default": "/configurations", "readonly": true},
              "method": {"type": "string", "default": "GET", "readonly": true},
              "inHeader":{
                  "type": "object",
                  "properties": {
                      "content-type": {
                          "type": "string",
                          "description": "str",
                          "enum": [ "application/json"]
                        }
                  },
                  "required": [
                    "content-type"
                  ]
              }
              
          },
          "required": ["inHeader"]
        },
        "layout": [ 
            {
          "title": "Header",
          "expandable": true,
          "expanded": true,
          "items": [
            "inHeader.content-type"
          ]
        }        
        ]
      },
        outputSchema: {}
      }
  },
  {
    id : 'fd07b7cd-fcc2-4d3c-9f8f-2317f9a67803',
    name: 'App new pet',
    type: "REST",
    model: { 
      allowedAuthTypes : [],
      "allowCustomEnv" : false,
      inputSchema: {
        "schema": {
          "type": "object",
          "properties": {
              "path":{"type": "string", "default": "/pet", "readonly": true},
              "method": {"type": "string", "default": "POST", "readonly": true},
              "inBody":{
                  "type": "object",
                  "properties": {
                      "id": {
                          "type": "string",
                          "description": "int",
                          "default": 0
                        },
                        "name": {
                          "type": "string",
                          "description": "str",
                          "default": "string"
                        },
                        "status": {
                          "type": "string",
                          "description": "str",
                          "default": "available"
                        }
                        
                  }
              },
              "inHeader":{
                  "type": "object",
                  "properties": {
                      "content-type": {
                          "type": "string",
                          "description": "str",
                          "enum": [ "application/json"]
                        }
                  },
                  "required": [
                    "content-type"
                  ]
              }
              
          },
          "required": ["inBody", "inHeader"]
          
        },
        "layout": [ 
            {
          "title": "Header",
          "expandable": true,
          "expanded": true,
          "items": [
            "inHeader.content-type"
          ]
        },
          {
          "title": "Body",
          "expandable": true,
          "expanded": true,
          "items": [
            "inBody.id", "inBody.status", "inBody.name"
          ]
        }
        
        ]
      },
        outputSchema: {
          "schema": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer"
              },
              "name": {
                "type": "string"
              },
              "status": {
                "type": "string"
              },
              "category" : {
                "type": "object",
                  "properties": {
                    "id": {"type": "integer"},
                    "name": {"type": "string"}
                  }
              },
              "tags": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": { "type": "integer" },
                    "name": { "type": "string" }
                  }
                }
              },
              "photoUrls": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
  }
]

  constructor(public dialogRef: MatDialogRef<ComponentRestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Activity,
    private authDataService: AccountService,
    private envService: EnvironmentService,
    private actionService: ComponentActionService,
    public dialog : MatDialog) { }

  ngOnInit(): void {
    this.activity = {...this.data};

    this.selectedAction = this.data.configSchema?.id;
    this.selectedEnv = this.data.configurations?.envId;

    this.actionService.read(this.data.componentId).subscribe(actions => {
      this.actions = actions.items;
    })
  
    if(this.data?.configSchema?.allowCustomEnv){
      this.envService.read(this.data.componentId, this.data.type, this.data?.configSchema?.allowCustomEnv).subscribe(envs => {
        this.envs = envs.items;
      })
      //this.envs = this.envsModel.filter(env => env.type === this.data.type && env.componentId === this.data.componentId);
    }
  }

  actionChange(_id: string): void {
    let action = this.actionsDetails.find(({id}) => id === _id);

    // this.actionService.readById(_id).subscribe(action => {

      this.data.label = action.name; 
      this.data.type = action.type;
      this.data.configSchema = action.model;
      this.data.configSchema.id = action.id; 
      
      this.envService.read(this.data.componentId, action.type, action?.model.allowCustomEnv).subscribe(envs => {
        this.envs = envs.items;
  
        if(!action?.model.allowCustomEnv){
          this.selectedEnv = this.envs[0].id;
        }
      })
      
      if(action?.model.allowedAuthTypes.length > 0){
          this.authDataService.readByComponentIdAndType(this.data.componentId,
            action?.model.allowedAuthTypes).subscribe(accounts => {
              this.accounts = accounts.items;
            })
      }
    
    // })
   
  }

  addEnvironment(): void {
    let dialogRef = this.dialog.open(EnvironmentComponent, {
      minHeight: '400px',
      minWidth: '400px',
      width: '25vw',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.envs.push(result)
        this.selectedEnv = result.id
      }
    });
  }

  addAccount(): void {
      let dialogRef = this.dialog.open(AuthCreateComponent, {
        minHeight: '400px',
        minWidth: '400px',
        width: '25vw',
        data: {types: this.data.configSchema?.allowedAuthTypes, componentId : this.data.componentId}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.accounts.push(result)
          this.selectedAccount = result.id
        }
      });
  }

  yourOnChangesFn(inputData): void{
    this.inputData = inputData;
    console.log(inputData);
  }

  yourIsValidFn(data): void{
    this.isDisabled = data;
  }

  save(): void{
    this.data.configurations = this.inputData;
    this.data.configurations.envId = this.selectedEnv;
    this.data.configurations.accountId = this.selectedAccount;
    
    console.log("save()")
    console.log(this.data)

    this.dialogRef.close();
  }

  cancel(): void{
    this.data.label = this.activity.label;
    this.data.configSchema = this.activity.configSchema;
    this.data.configurations = this.activity.configurations;
    this.dialogRef.close();
  }
}
