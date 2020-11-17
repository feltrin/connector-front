import { FlowReadComponent } from './components/flow/flow-read/flow-read.component';

import { DiagramCrudComponent } from './views/diagram-crud/diagram-crud.component';
import { AuthCrudComponent } from './views/auth-crud/auth-crud.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: DiagramCrudComponent
  },
  {
    path: "diagrams",
    component: DiagramCrudComponent
  },
    {
    path: "flow/:id",
    component: FlowReadComponent
  },
  {
    path: "accounts",
    component: AuthCrudComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
