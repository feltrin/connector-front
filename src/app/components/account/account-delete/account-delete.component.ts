import { AccountService } from './../../auth/account.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account } from '../../auth/account.model';

@Component({
  selector: 'app-account-delete',
  templateUrl: './account-delete.component.html',
  styleUrls: ['./account-delete.component.css']
})
export class AccountDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AccountDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Account,
    private service: AccountService) { }

  ngOnInit(): void {
  }

  remove(): void{
    this.service.delete(this.data.id).subscribe(() => {
      console.log("REMOVIDA!!");
      this.dialogRef.close();
    });
  }

}
