import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MonsterDetailsDialogComponent } from '../../monster-details-dialog/monster-details-dialog.component';
import { ParamsDependenciesModel } from '../../../model/ParamsDependenciesModel';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MonsterFilterRequestModel } from '../../../model/MonsterFilterParamsModel';
import { MonsterService } from '../../../service/monster.service';
import { MonsterFilterResponseModel } from '../../../model/MonsterFilterResponseModel';

@Component({
  selector: 'app-monster-header-dialog-params',
  templateUrl: './monster-header-dialog-params.component.html',
  styleUrls: ['./monster-header-dialog-params.component.css']
})
export class MonsterHeaderDialogParamsComponent {
  monsters!: MonsterFilterResponseModel[];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ParamsDependenciesModel,
    private fb: FormBuilder,
    private monsterService: MonsterService,
    public dialogRef: MatDialogRef<MonsterDetailsDialogComponent>
  ) {}

  form: FormGroup = this.fb.group({
    level: [0],
    playersLevel: [0],
    biomeId: [0],
    bookId: [0],
    region: ['all'],
    monsterTypeId: [0],
    isRandomMonster: [false]
  });

  public filterMonstersByParams(): void {
    const params: MonsterFilterRequestModel = this.form.value;
    this.monsterService.getMonstersByParams(params).subscribe({
      next: (res) => {
        this.monsters = res.data
        this.dialogRef.close(res.data);
      },
      error: (err: Error) => {
        this.monsterService.showSnackBar(err.message, true);
      }
    });
  }
}
