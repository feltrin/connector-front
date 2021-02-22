import { Component } from "@angular/core";
import { FieldArrayType } from "@ngx-formly/core";

// @Component({
//   selector: 'formly-repeat-section',
//   template: `
//     <formly-field *ngFor="let field of field.fieldGroup" [field]="field"></formly-field>
//     <div style="margin:30px 0;">
//       <button class="btn btn-primary" type="button" (click)="add()">{{ to.label }}</button>
//       <button class="btn btn-primary" type="button" (click)="remove()">-</button>
//     </div>
//   `,
// })

@Component({
  selector: "formly-repeat-section",
  template: `
    <div *ngFor="let field of field.fieldGroup; let i = index" class="row">
      <formly-field class="col" [field]="field"></formly-field>
      <div class="col-sm-2 d-flex align-items-center">
        <button class="btn btn-danger" type="button" (click)="remove(i)">
          Remove
        </button>
      </div>
    </div>
    <div style="margin:30px 0;">
      <button class="btn btn-primary" type="button" (click)="add()">
        {{ to.label }}
      </button>
    </div>
  `
})
export class RepeatTypeComponent extends FieldArrayType {}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
