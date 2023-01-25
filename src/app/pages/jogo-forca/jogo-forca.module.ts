import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JogoForcaComponent } from './components/jogo-forca.component';
import { JogoForcaRoutingModule } from './jogo-forca-routing.module';

import {MatButtonModule} from '@angular/material/button';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    JogoForcaRoutingModule
  ],
  declarations: [JogoForcaComponent]
})
export class JogoForcaModule { }
