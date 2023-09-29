import { BookModel } from './../../model/BookModel';
import { BiomeModel } from './../../model/BiomeModel';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponseModel } from 'src/app/shared/model/ResponseModel';
import { MonsterModel } from '../../model/MonsterModel';
import { MonsterService } from '../../service/monster.service';
import { MonsterTypeModel } from '../../model/MonsterTypeModel';
import { ParamsDependenciesModel } from '../../model/ParamsDependenciesModel';

@Component({
  selector: 'app-monster-details-dialog',
  templateUrl: './monster-details-dialog.component.html',
  styleUrls: ['./monster-details-dialog.component.css']
})
export class MonsterDetailsDialogComponent {
  form: FormGroup = this.fb.group({
    id: [this.data.monster.id],
    name: [this.data.monster.name+'', Validators.required],
    level: [this.data.monster.level, Validators.required],
    page: [this.data.monster.page+'', Validators.required],
    biomeId: [this.data.monster.biomeId, Validators.required],
    bookId: [this.data.monster.bookId, Validators.required],
    monsterTypeId: [this.data.monster.monsterTypeId, Validators.required],
    existsSouth: [this.data.monster.existsSouth, Validators.required],
    existsNorth: [this.data.monster.existsNorth, Validators.required],
    existsCenter: [this.data.monster.existsCenter, Validators.required],
    existsWest: [this.data.monster.existsWest, Validators.required],
    existsEast: [this.data.monster.existsEast, Validators.required]
  });

  monster!: MonsterModel;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private monsterService: MonsterService,
    public dialogRef: MatDialogRef<MonsterDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ParamsDependenciesModel
  ) { }

  getCommonSubscribe(): {next: any, error: any} {
    return {
      next: (res: ResponseModel<any>) => {
        this.monster = res.data;
        this.monsterService.showSnackBar('Executado com êxito', false, 1000);
      },
      error: (e: Error) => {
        this.monsterService.showSnackBar(e.message, true, 1000);
      }
    }
  }

  saveMonster(): void {
    const body = this.form.value as MonsterModel;
    this.data.monster.id == 0?
      this.monsterService.post(body).subscribe(this.getCommonSubscribe())
        :this.monsterService.put(body).subscribe(this.getCommonSubscribe());
  }

  deleteMonster(): void {
    if (confirm('Tem certeza que deseja EXCLUIR essa Criatura?')) {
      this.monsterService.delete(this.data.monster.id).subscribe(this.getCommonSubscribe())
    }
  }
}
