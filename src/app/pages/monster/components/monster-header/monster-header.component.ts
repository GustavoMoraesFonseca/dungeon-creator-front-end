import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MonsterHeaderDialogParamsComponent } from './monster-header-dialog-params/monster-header-dialog-params.component';
import { BiomeModel } from '../../model/BiomeModel';
import { BookModel } from '../../model/BookModel';
import { MonsterTypeModel } from '../../model/MonsterTypeModel';

@Component({
  selector: 'app-monster-header',
  templateUrl: './monster-header.component.html',
  styleUrls: ['./monster-header.component.css']
})
export class MonsterHeaderComponent implements OnInit {
  @Output() eventEmitter = new EventEmitter();
  @Input() monsterTypes!: MonsterTypeModel[];
  @Input() biomes!: BiomeModel[];
  @Input() books!: BookModel[];

  form!: FormGroup;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  public buildForm(): void {
    this.form = this.fb.group({
      level: [0],
      bookId: [0],
      biomeId: [0],
      monsterTypeId: [0],
      playersLevel: [0],
      region: ['']
    });
  }

  openDialogSetParams() {
    this.dialog.open(MonsterHeaderDialogParamsComponent, {
      data: {
        biomes: this.biomes,
        books: this.books,
        monsterTypes: this.monsterTypes
      }
    }).afterClosed().subscribe(data => this.eventEmitter.emit(data))
  }
}
