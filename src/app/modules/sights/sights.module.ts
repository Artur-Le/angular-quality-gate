import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailsComponent} from './details/details.component';
import {FormComponent} from './form/form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../../app-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [DetailsComponent, FormComponent],
  exports: [
    DetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule
  ]
})
export class SightsModule {
}
