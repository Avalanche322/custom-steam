import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoaderComponent } from './../components/loader/loader.component';



@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [LoaderComponent]
})
export class SharedModule { }
