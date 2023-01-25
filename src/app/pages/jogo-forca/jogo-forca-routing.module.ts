import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JogoForcaComponent } from './components/jogo-forca.component';

const routes: Routes = [
  { path: '', component: JogoForcaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JogoForcaRoutingModule {}
