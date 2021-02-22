import { Component } from "@angular/core";
import { FieldWrapper } from "@ngx-formly/core";

// @Component({
//   selector: "formly-wrapper-panel",
//   template: `
//     <div class="card">
//       <h3 class="card-header">{{ to.label }}</h3>
//       <div class="card-body">
//         <ng-container #fieldComponent></ng-container>
//       </div>
//     </div>
//   `
// })

@Component({
  selector: "formly-wrapper-panel",
  template: `
    <div class="accordion" id="accordionExample">
      <div class="card">
        <div class="card-header" id="headingOne">
          <h5 class="mb-0">
            <button
              class="btn btn-link"
              type="button"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              {{ to.label }}
            </button>
          </h5>
        </div>
        <div
          id="collapseOne"
          class="collapse show"
          aria-labelledby="headingOne"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            <ng-container #fieldComponent></ng-container>
          </div>
        </div>
      </div>
    </div>
  `
})

// @Component({
//   selector: "formly-wrapper-panel",
//   template: `
//     <div class="panel-group">
//   <div class="panel panel-default">
//     <div class="panel-heading">
//       <h4 class="panel-title">
//         <a data-toggle="collapse" href="#collapse2">{{ to.label }}</a>
//       </h4>
//     </div>
//     <div id="collapse2" class="panel-collapse collapse show">
//       <div class="panel-body"><ng-container #fieldComponent></ng-container></div>

//     </div>
//   </div>
// </div>
//   `
// })
export class PanelWrapperComponent extends FieldWrapper {}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
