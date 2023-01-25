import { NgModule } from '@angular/core';
import { JogoForcaComponent } from './components/jogo-forca.component';
import { JogoForcaRoutingModule } from './jogo-forca-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    JogoForcaRoutingModule
  ],
  declarations: [JogoForcaComponent]
})
export class JogoForcaModule { }
