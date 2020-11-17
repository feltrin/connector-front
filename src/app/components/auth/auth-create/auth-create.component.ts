import { NoneComponent } from 'angular6-json-schema-form';
import { AccountService } from './../account.service';
import { AuthModelService } from './../auth-model.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account } from '../account.model';
import { AuthModel } from '../authModel.model';

@Component({
  selector: 'app-auth-create',
  templateUrl: './auth-create.component.html',
  styleUrls: ['./auth-create.component.css']
})
export class AuthCreateComponent implements OnInit {
  yourWidgets = {
    submit: NoneComponent,  
  }
  oauthUrl = "http://localhost:8080/connector/oauth/auth"
  selectedValue: AuthModel;
  models : AuthModel[];

  account: Account = {
    config: {}
  }
  inputData : any;
  
  isDisabled: boolean;
  
  constructor(public dialogRef: MatDialogRef<AuthCreateComponent>, 
    private modelService: AuthModelService,
    private accountService: AccountService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if(this.data){
      this.modelService.readByType(this.data.types).subscribe(models=> {
        this.models = models.items;
      });
    }else{ 
      this.modelService.read().subscribe(models=> {
          this.models = models.items;
        });
    }
  }

  save(): void{
    this.account.config.outputSchema =  this.inputData;
    this.account.modelId = this.selectedValue.id;
    this.account.authType = this.selectedValue.type;
    this.account.active = true;
    this.account.componentId = this.data.componentId;
    const that = this;
    var popwin = null;

    var gMsg = function(e) {
      if(e.data){
        if(e.data.error){
          console.log("ERROR!!!")
        }else{
          that.account.config.authData = e.data;
    
          that.accountService.create(that.account).subscribe(account => {
            console.log("CRIADO SERVER");
            that.dialogRef.close(account);
          })
        }
      }

      window.removeEventListener("message", gMsg, false);
      popwin.close();
    } 
    
    if(this.selectedValue.type === "OAUTH2_CODE" ||
      this.selectedValue.type === "OAUTH2_IMPLICIT"){

      var url = `${this.oauthUrl}?oauth_type=${this.selectedValue.type}&client_id=${this.inputData.client_id}&scope=${this.inputData.scope}&provider=${this.inputData.authURL}`
      window.addEventListener('message', gMsg, false);
      popwin = window.open(url,'_black',  "toolbar=no,scrollbars=yes,status=yes,resizable=yes,location=no,menuBar=no,modal=yes");
    }else{
      console.log("DEFAULT!!");
      that.accountService.create(that.account).subscribe(account => {
       console.log("CRIADO SERVER");
       that.dialogRef.close(account);
      })
    }
  }

  yourOnChangesFn(inputData): void{
    this.inputData = inputData;
  }

  yourIsValidFn(data): void{
    this.isDisabled = data;
  }

  cancel(): void{
    this.dialogRef.close();
  }

}
