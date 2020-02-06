import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatProgressSpinnerModule,
  MatDialogModule,
  MatTableDataSource
} from '@angular/material';//importa material de angular io

const myModule = [ //Constante para integrar Angular material y no tener que excribirlo en imports y exports
  MatProgressSpinnerModule,
  MatDialogModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    myModule
  ],
  exports: [
    myModule
  ]
})
export class MaterialModule { }
