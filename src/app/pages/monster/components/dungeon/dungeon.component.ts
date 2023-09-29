import { Component, OnInit } from "@angular/core";
import { MonsterModel } from "../../model/MonsterModel";
import { MonsterService } from "../../service/monster.service";

@Component({
  selector: 'app-dungeon',
  templateUrl: './dungeon.component.html',
  styleUrls: ['./dungeon.component.css'],
})
export class DungeonComponent implements OnInit {
  constructor(private monsterService: MonsterService) {}

  monsters: MonsterModel[] = [];

  monsterModelFieldsCanBeFiltered: string[] = [
    'level',
    'biomeId',
    'bookId',
    'existsSouth',
    'existsNorth',
    'existsCenter',
    'existsWest',
    'existsEast',
  ];

  monsterModelFieldsValuesToBeFiltered: any[] = [
    2,
    2,
    1,
    true,
    false,
    true,
    false,
    true,
  ];

  ngOnInit() {
    this.listMonsters();
  }

  listMonsters() {
    this.monsterService.getAll().subscribe({
      next: (res) => {
        this.monsters = res.data;
        this.filterMonstersByValues();
      },
    });
  }

  filterMonstersByValues() {
    const monsterValidations = this.validateMonsters();
    this.monsters = this.filterMonsters(monsterValidations);
  }

  validateMonsters(): Set<{id: number, validations: boolean[]}> {
    const monsterValidations = new Set<{id: number, validations: boolean[]}>();
    var validations: boolean[] = [];
    this.monsters.forEach((monster) => {
      for (let i = 0; i < this.monsterModelFieldsCanBeFiltered.length; i++) {
        const field = this.monsterModelFieldsCanBeFiltered[i];
        validations.push(
          Reflect.get(monster, field) == this.monsterModelFieldsValuesToBeFiltered[i]
        );
        if (field == 'existsEast') {
          monsterValidations.add(
            {id: monster.id, validations: validations}
          );
          validations = [];
        }
      }
    });
    return monsterValidations;
  }

  filterMonsters(monsterValidations: Set<{id: number, validations: boolean[]}>): MonsterModel[] {
    const monsters: MonsterModel[] = [];
    monsterValidations.forEach(
      (idAndValidations) => {
        if (!idAndValidations.validations.includes(false)) {
          monsters.push(this.monsters.filter(mon => mon.id == idAndValidations.id)[0]);
        }
      }
    );
    return monsters;
  }
}
