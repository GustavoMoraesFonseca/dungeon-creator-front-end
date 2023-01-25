import { MonsterService } from './../service/monster.service';
import { Component, OnInit } from '@angular/core';
import { MonsterModel } from '../model/MonsterModel';
import { MatDialog } from '@angular/material';
import { MonsterDetailsDialogComponent } from './monster-details-dialog/monster-details-dialog.component';

@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.css']
})
export class MonsterComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private monsterService: MonsterService
  ) { }

  monsters: MonsterModel[] = [];

  emptyMonsterObj: MonsterModel = {
    id: 0,
    name: '',
    level: 0,
    biomeId: 0,
    bookId: 0,
    page: 0,
    existsCenter: false,
    existsEast: false,
    existsNorth: false,
    existsSouth: false,
    existsWest: false
  };

  ngOnInit() {
    this.listMonsters();
  }

  listMonsters() {
    this.monsterService.getAll().subscribe({
      next: (res) => this.monsters = res.data
    });
  }

  openDialogToUpdateMonster(monster: MonsterModel) {
    this.dialog.open(MonsterDetailsDialogComponent, {
      data: {
        monster: monster
      }
    });
  }

  openDialogToCreateMonster() {
    this.dialog.open(MonsterDetailsDialogComponent, {
      data: {
        monster: this.emptyMonsterObj
      }
    });
  }
}
