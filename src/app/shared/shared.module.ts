import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MatCardModule, MatDialogModule, MatFormFieldModule, MatSelectModule, MatSnackBarModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

const modules = [
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatSelectModule,
  MatSnackBarModule,
  HttpClientModule,
  ReactiveFormsModule,
  CommonModule
]

@NgModule({
  imports: [
    modules
  ],
  exports: [
    modules
  ]
})
export class SharedModule {}
