import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from '../../auth/account.service';
import { AuthModelService } from '../../auth/auth-model.service';
import { AuthModel } from '../../auth/authModel.model';
import { Account } from '../../auth/account.model';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {
  model: AuthModel;
  oauthUrl = "http://localhost:8080/connector/oauth/auth"

  constructor(public dialogRef: MatDialogRef<AccountEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Account,
    private accountService: AccountService,
    private modelService: AuthModelService) { }

  ngOnInit(): void {
    this.modelService.readById(this.data.modelId).subscribe(data => {
      this.model = data.items[0];
    })

  }

  submitForm(data) {
    this.data.config.outputSchema =  data;
    const that = this;
    var popwin = null;

    var gMsg = function(e) {
      console.log(e.data);

      if(e.data){
        if(e.data.error){
          console.log("ERROR!!!")
        }else{
          that.data.config.authData = e.data;
    
          that.accountService.update(that.data).subscribe(() => {
            console.log("CRIADO SERVER");
            that.dialogRef.close();
          })
        }

        window.removeEventListener("message", gMsg, false);
        popwin.close();
      }
    } 

    if(this.model.type === "OAUTH2_CODE" ||
    this.model.type === "OAUTH2_IMPLICIT"){
      var url = `${this.oauthUrl}?oauth_type=${this.model.type}&client_id=${data.client_id}&scope=${data.scope}&provider=${data.authURL}`
      window.addEventListener('message', gMsg, false);
      popwin = window.open(url,'_black',  "toolbar=no,scrollbars=yes,status=yes,resizable=yes,location=no,menuBar=no,modal=yes");
    }else{
      console.log("DEFAULT!!");
      that.accountService.update(that.data).subscribe(() => {
       console.log("CRIADO SERVER");
       that.dialogRef.close();
      })
    }

  }

}
