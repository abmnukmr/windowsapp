import { NgModule } from '@angular/core';
import { VaiotiTextComponent } from './vaioti-text';
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations: [VaiotiTextComponent],
  imports: [
    IonicPageModule.forChild(VaiotiTextComponent),
  ],
  exports: [VaiotiTextComponent]
})
export class VaiotiTextComponentModule {}
