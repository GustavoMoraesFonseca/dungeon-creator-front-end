import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'jogo-da-forca', pathMatch: 'full' },
  { path: 'jogo-da-forca', loadChildren: () => import('./pages/jogo-forca/jogo-forca.module').then(m => m.JogoForcaModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
