import { Activity } from './../flow/flow.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { Environment } from './environment.model';

@Component({
  selector: 'app-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.css']
})
export class EnvironmentComponent implements OnInit {
  env : Environment = {
    name: "",
    baseURL: ""
  };

  constructor(public dialogRef: MatDialogRef<EnvironmentComponent>,
    @Inject(MAT_DIALOG_DATA) public activity: Activity,
    private envService: EnvironmentService
    ) { }

  ngOnInit(): void {
  }

  save(): void{
    this.env.componentId = this.activity.componentId;
    this.env.type = this.activity.type;

    this.envService.create(this.env).subscribe(env => {
      console.log("ENV CUSTOM CRIADO!!")
      console.log(env)
      this.dialogRef.close(env);
    })
  }

  cancel(): void{
    this.dialogRef.close();
  }

}
