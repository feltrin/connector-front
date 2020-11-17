import { AccountEditComponent } from './../../account/account-edit/account-edit.component';
import { AccountDeleteComponent } from './../../account/account-delete/account-delete.component';
import { Account, AccountAPI } from './../account.model';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-auth-read',
  templateUrl: './auth-read.component.html',
  styleUrls: ['./auth-read.component.css']
})
export class AuthReadComponent implements OnInit {
  accounts : Account [];

  isChecked = true;

  constructor(private accountService: AccountService,
    private dialog : MatDialog) { }

  ngOnInit(): void {
    this.accountService.read().subscribe(data=> {
      //this.accounts = data.items; //AccountAPI
      this.accounts = data.items; //Account
    });
  }

  remove(account: Account): void{
    this.dialog.open(AccountDeleteComponent, {
      data: account
    });
  }

  edit(account: Account): void{
    this.dialog.open(AccountEditComponent, {
      data: account
    });
  }

  active(account: Account): void{
    console.log(account.id)
    this.accountService.activate(account).subscribe(() => {
      console.log("active!!");
    });
  }

}
