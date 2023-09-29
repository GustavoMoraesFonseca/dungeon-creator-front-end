import { MonsterService } from './../service/monster.service';
import { Component, OnInit } from '@angular/core';
import { MonsterModel } from '../model/MonsterModel';
import { MatDialog } from '@angular/material/dialog';
import { MonsterDetailsDialogComponent } from './monster-details-dialog/monster-details-dialog.component';
import { BiomeService } from '../service/biome.service';
import { BookService } from '../service/book.service';
import { BiomeModel } from '../model/BiomeModel';
import { BookModel } from '../model/BookModel';
import { MonsterTypeService } from '../service/monster-type.service';
import { MonsterTypeModel } from '../model/MonsterTypeModel';
import { MonsterFilterResponseModel } from '../model/MonsterFilterResponseModel';

@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.css']
})
export class MonsterComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private monsterService: MonsterService,
    private biomeService: BiomeService,
    private bookService: BookService,
    private monsterTypeService: MonsterTypeService
  ) { }

  monsters: MonsterFilterResponseModel[] = [];
  biomes: BiomeModel[] = [];
  books: BookModel[] = [];
  monsterTypes: MonsterTypeModel[] = [];

  emptyMonsterObj: MonsterModel = {
    id: 0,
    name: '',
    level: 0,
    biomeId: 0,
    bookId: 0,
    monsterTypeId: 0,
    page: 0,
    existsCenter: false,
    existsEast: false,
    existsNorth: false,
    existsSouth: false,
    existsWest: false
  };

  ngOnInit() {
    this.listMonsters();
    this.listBiome();
    this.listBook();
    this.listMonsterType();
  }

  public setMonstersFromChild(event: any) {
    if (event) {
      this.monsters = event;
    }
  }

  private setMonsters(monsters: MonsterModel[]) {
    monsters.forEach(mon => {
      var monFill: MonsterFilterResponseModel = {
        monstersQtd: 0,
        bookName: '',
        biomeName: '',
        monsterTypeName: '',
        id: mon.id,
        name: mon.name,
        level: mon.level,
        page: mon.page,
        biomeId: mon.biomeId,
        bookId: mon.bookId,
        monsterTypeId: mon.monsterTypeId,
        existsSouth: mon.existsSouth,
        existsNorth: mon.existsNorth,
        existsCenter: mon.existsCenter,
        existsWest: mon.existsWest,
        existsEast: mon.existsEast
      };

      this.monsters.push(monFill);
    })
  }

  listMonsters() {
    this.monsterService.getAll().subscribe({
      next: (res) => this.setMonsters(res.data)
    });
  }

  listBiome() {
    this.biomeService.getAll().subscribe({
      next: (res) => this.biomes = res.data
    });
  }

  listBook() {
    this.bookService.getAll().subscribe({
      next: (res) => this.books = res.data
    });
  }

  listMonsterType() {
    this.monsterTypeService.getAll().subscribe({
      next: (res) => this.monsterTypes = res.data
    });
  }

  openDialogToUpdateMonster(monster: MonsterModel) {
    this.dialog.open(MonsterDetailsDialogComponent, {
      data: {
        monster: monster,
        biomes: this.biomes,
        books: this.books,
        monsterTypes: this.monsterTypes
      }
    });
  }

  openDialogToCreateMonster() {
    this.dialog.open(MonsterDetailsDialogComponent, {
      data: {
        monster: this.emptyMonsterObj,
        biomes: this.biomes,
        books: this.books,
        monsterTypes: this.monsterTypes
      }
    });
  }

  getBiomeNameById(monster: MonsterFilterResponseModel) {
    return monster.biomeName == ''?
      this.biomes.filter(biome => biome.id == monster.biomeId)[0].name : monster.biomeName;
  }

  getBookNameById(monster: MonsterFilterResponseModel) {
    return monster.bookName == ''?
      this.books.filter(book => book.id == monster.bookId)[0].name : monster.bookName;
  }

  getMonsterTypeNameById(monster: MonsterFilterResponseModel) {
    return monster.monsterTypeName == ''?
      this.monsterTypes.filter(monsterType => monsterType.id == monster.monsterTypeId)[0].name : monster.monsterTypeName;
  }

  getMonstersQtd(monstersQtd: number): string {
    return monstersQtd == 2147483647? 'À vontade' : monstersQtd+'x';
  }
}
