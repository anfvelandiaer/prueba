import { Component, OnInit } from '@angular/core';
import { DataDbService } from '../../../services/data-db.service';
import { ExporterService } from '../../../services/exporter.service';
import { Observable } from 'rxjs';
import { Person } from '../../../entities/person.interface';
import { MatDialog } from '@angular/material/dialog'
import { UpdateComponent } from '../update/update.component'
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public persons$: Observable<Person[]>;//$Convención para observable, observable que brinda la información de todos los objetos
  public person$: Observable<Person>;//para recuperar la información del objeto a actualizar
  public elements:Person[];

  constructor(private dbData: DataDbService, public dialog: MatDialog, private exportService:ExporterService) {

   }

   ngOnInit() {
     this.persons$ = this.dbData.getPersons();//Asignar al observable los datos de la db
   }

   onEditPerson(person:Person){
     this.openDialog(person);//dialogo con la vista update para poder editar la información y abrir un cuadro externo
   }

   openDialog(person:Person):void{
     const config={//extracción de la información del registro para precargar los datos al actualizar
       data:person
     }
     const dialogRef = this.dialog.open(UpdateComponent, config);//conexión con el update
     dialogRef.afterClosed().subscribe(result=> {
       console.log(`Dialog result ${result}`)//establecer el resultado al finalizar el update
     })
   }

   exportAsXLSX(persons:Person[]):void{
        this.exportService.exportToExcel(persons, 'my_export');
      }



}
