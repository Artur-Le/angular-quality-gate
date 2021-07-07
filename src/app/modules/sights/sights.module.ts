import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { FormComponent } from './form/form.component';
import {ModalModule} from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [DetailsComponent, FormComponent],
  exports: [
    DetailsComponent
  ],
  imports: [
    CommonModule,

  ]
})
export class SightsModule { }
