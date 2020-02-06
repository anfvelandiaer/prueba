import { Component, OnInit } from '@angular/core';
import { DataDbService } from '../../services/data-db.service';
import { ExporterService } from '../../services/exporter.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material';
import { Person } from '../../entities/person.interface';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})



export class FormComponent implements OnInit {
  //patron para el correo
   ELEMENT_DATA: any[] = [
    {name: "", email: "", number: null, favoriteFood: "", favoriteArtist:"", favoritePlace: ""}
  ];


  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  createFormGroup() {//Método para captar la información del formulario registro con sus restricciones
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      number: new FormControl('', Validators.required),
      favoriteFood: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      favoriteArtist: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      favoritePlace: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    });
  }

  personForm: FormGroup;//nombre del formulario para captar la información en html
  constructor(private dbData: DataDbService, private exportService:ExporterService) {
    this.personForm = this.createFormGroup();//inicializar el formulario
  }

  ngOnInit() {

  }

  onResetForm(){
    this.personForm.reset();
  }

  onSaveForm(){
    //Inicio de SweetAlert para confirmar la accion a realizar
    Swal.fire({
      title:'Confirmar',
      text: `La información será registrada en la base de datos`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor: "#d33",
      confirmButtonText: 'Registrar'
    }).then(result =>{
      if(result.value && this.personForm.valid){
            this.dbData.createUser(this.personForm.value);
            this.onResetForm();
        }else{
          console.log('not valid')
        }
    });
  }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = this.ELEMENT_DATA;
  exportAsXLSX():void{
      this.dataSource[0].name=this.personForm.value.name;
      this.dataSource[0].email=this.personForm.value.email;
      this.dataSource[0].number=this.personForm.value.number;
      this.dataSource[0].favoriteFood=this.personForm.value.favoriteFood;
      this.dataSource[0].favoriteArtist=this.personForm.value.favoriteArtist;
      this.dataSource[0].favoritePlace=this.personForm.value.favoritePlace;
       this.exportService.exportToExcel((this.dataSource), 'my_export');
     }

   //getters para la validación en el formulario, en HTML por medio de ngIF
  get name() { return this.personForm.get('name'); }
  get email() { return this.personForm.get('email'); }
  get number() { return this.personForm.get('number'); }
  get favoriteFood() { return this.personForm.get('favoriteFood'); }
  get favoriteArtist() { return this.personForm.get('favoriteArtist'); }
  get favoritePlace() { return this.personForm.get('favoritePlace'); }


}
