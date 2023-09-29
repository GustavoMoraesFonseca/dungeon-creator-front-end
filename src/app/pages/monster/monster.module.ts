import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { MonsterComponent } from './components/monster.component';
import { MonsterRoutingModule } from './monster-routing.module';
import { MonsterLevelPipe } from './pipe/monster-level.pipe';
import { MonsterDetailsDialogComponent } from './components/monster-details-dialog/monster-details-dialog.component';
import { DungeonComponent } from './components/dungeon/dungeon.component';
import { MonsterHeaderComponent } from './components/monster-header/monster-header.component';
import { MonsterHeaderDialogParamsComponent } from './components/monster-header/monster-header-dialog-params/monster-header-dialog-params.component';

@NgModule({
  imports: [SharedModule, MonsterRoutingModule],
  declarations: [
    DungeonComponent,
    MonsterComponent,
    MonsterDetailsDialogComponent,
    MonsterLevelPipe,
    MonsterHeaderComponent,
    MonsterHeaderDialogParamsComponent
  ],
})
export class MonsterModule {}
