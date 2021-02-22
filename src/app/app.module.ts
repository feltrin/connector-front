import { PanelWrapperComponent } from './components/template/wrapper/panel-wrapper.component';
import { RepeatTypeComponent } from './components/template/repeat/repeat-section.type';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from '@angular/material/toolbar';
import { NavComponent } from './components/template/nav/nav.component'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatCardModule } from '@angular/material/card'
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button'
import { MatSnackBarModule } from '@angular/material/snack-bar'

import { RedDirective } from './directives/red.directive';
import { ForDirective } from './directives/for.directive';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'

import localePt from '@angular/common/locales/pt'
import { registerLocaleData } from '@angular/common';

import { AuthCreateComponent } from './components/auth/auth-create/auth-create.component';
import { AuthCrudComponent } from './views/auth-crud/auth-crud.component'

import { MaterialDesignFrameworkModule } from 'angular6-json-schema-form';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { AuthReadComponent } from './components/auth/auth-read/auth-read.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { AccountDeleteComponent } from './components/account/account-delete/account-delete.component';
import { AccountEditComponent } from './components/account/account-edit/account-edit.component';
import { DiagramCrudComponent } from './views/diagram-crud/diagram-crud.component';
import { DiagramCreateComponent } from './components/diagram/diagram-create/diagram-create.component';
import { DiagramReadComponent } from './components/diagram/diagram-read/diagram-read.component';
import { DiagramRead2Component } from './components/diagram/diagram-read2/diagram-read2.component';
import { FlowReadComponent } from './components/flow/flow-read/flow-read.component';
import { ComponentRestComponent } from './components/component-rest/component-rest.component';
import { WebhookComponent } from './components/webhook/webhook.component';
import { EnvironmentComponent } from './components/environment/environment.component';
import { ClockComponent } from './components/clock/clock.component';
// import { ComponentActionModelComponent } from './components/component-action-model/component-action-model.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';


registerLocaleData(localePt)

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RedDirective,
    ForDirective,
    AuthCreateComponent,
    AuthCrudComponent,
    AuthReadComponent,
    AccountDeleteComponent,
    AccountEditComponent,
    DiagramCrudComponent,
    DiagramCreateComponent,
    DiagramReadComponent,
    DiagramRead2Component,
    FlowReadComponent,
    ComponentRestComponent,
    WebhookComponent,
    EnvironmentComponent,
    ClockComponent,
    // ComponentActionModelComponent,
    RepeatTypeComponent, PanelWrapperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MaterialDesignFrameworkModule,
    MatDialogModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({ extras: { lazyRender: true }, 
      types: [{ name: "repeat", component: RepeatTypeComponent }],
      wrappers: [{ name: "expansion-panel", component: PanelWrapperComponent }]
    }),
    FormlyMaterialModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
