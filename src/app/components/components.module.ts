import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { AddButtonComponent } from './add-button/add-button.component';



@NgModule({
  declarations: [ModalComponent, AddButtonComponent],
  exports: [ModalComponent, AddButtonComponent],
  imports: [
    CommonModule, ReactiveFormsModule
  ]
})
export class ComponentsModule { }
