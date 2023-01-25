import { Component, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ResponseModel } from 'src/app/shared/model/ResponseModel';
import { MonsterModel } from '../../model/MonsterModel';
import { MonsterService } from '../../service/monster.service';

@Component({
  selector: 'app-monster-details-dialog',
  templateUrl: './monster-details-dialog.component.html',
  styleUrls: ['./monster-details-dialog.component.css']
})
export class MonsterDetailsDialogComponent {
  name        = new FormControl(this.data.monster.name+'', Validators.required);
  level       = new FormControl(this.data.monster.level, Validators.required);
  page        = new FormControl(this.data.monster.page+'', Validators.required);
  biomeId     = new FormControl(this.data.monster.biomeId, Validators.required);
  bookId      = new FormControl(this.data.monster.bookId, Validators.required);
  existsSouth = new FormControl(this.data.monster.existsSouth, Validators.required);
  existsNorth = new FormControl(this.data.monster.existsNorth, Validators.required);
  existsCenter= new FormControl(this.data.monster.existsCenter, Validators.required);
  existsWest  = new FormControl(this.data.monster.existsWest, Validators.required);
  existsEast  = new FormControl(this.data.monster.existsEast, Validators.required);

  form: FormGroup = this.fb.group({
    id: [this.data.monster.id],
    name: this.name,
    level: this.level,
    page: this.page,
    biomeId: this.biomeId,
    bookId: this.bookId,
    existsSouth: this.existsSouth,
    existsNorth: this.existsNorth,
    existsCenter: this.existsCenter,
    existsWest: this.existsWest,
    existsEast: this.existsEast
  });

  monster!: MonsterModel;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private monsterService: MonsterService,
    public dialogRef: MatDialogRef<MonsterDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {monster: MonsterModel}
  ) { }

  getCommonSubscribe(): {next: any, error: any} {
    return {
      next: (res: ResponseModel<any>) => {
        this.monster = res.data;
      },
      error: (e: Error) => {
        console.log(e.message);
      }
    }
  }

  saveMonster() {
    console.log(this.form.value)

    this.data.monster.id == 0?
      this.monsterService.post(this.form.value as MonsterModel).subscribe(this.getCommonSubscribe())
        :this.monsterService.put(this.form.value as MonsterModel).subscribe(this.getCommonSubscribe());
  }

  deleteMonster() {
    if (confirm('Tem certeza que deseja EXCLUIR essa Criatura?')) {
      this.monsterService.delete(this.data.monster.id).subscribe(this.getCommonSubscribe())
    }
  }
}
