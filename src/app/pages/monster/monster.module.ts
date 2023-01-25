import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { MonsterComponent } from './components/monster.component';
import { MonsterRoutingModule } from './monster-routing.module';
import { MonsterLevelPipe } from './pipe/monster-level.pipe';
import { MonsterDetailsDialogComponent } from './components/monster-details-dialog/monster-details-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    MonsterRoutingModule
  ],
  declarations: [MonsterComponent, MonsterDetailsDialogComponent, MonsterLevelPipe]
})
export class MonsterModule { }
