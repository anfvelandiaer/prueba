import { Component, OnInit, Input,Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataDbService } from '../../../services/data-db.service';
import { Observable } from 'rxjs';
import { Person } from '../../../entities/person.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  //patron para el correo
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//Método para captar la información del formulario registro con sus restricciones
  public person$: Observable<Person>;//para recuperar la información del objeto a actualizar
  public personForm = new FormGroup({
    id:new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    number: new FormControl('', Validators.required),
    question1: new FormControl(''),
    question2: new FormControl(''),
    question3: new FormControl(''),
    answer1: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    answer2: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    answer3: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
  });

  //inicializa la comunicación con el dialogo en list
  constructor(private route: ActivatedRoute, private dbData: DataDbService, public dialog:MatDialogRef<UpdateComponent>, @Inject(MAT_DIALOG_DATA) public data:Person) {
  }

  onResetForm(){
    this.personForm.reset();
  }

  ngOnInit() {
    this.initValuesForm();
  }

  editPerson(person:Person){
    //Inicio de SweetAlert para confirmar la accion a realizar
    Swal.fire({
      title:'Confirmar',
      text: `La información será actualizada, puede modificarla nuevamente mas ademlante`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor: "#d33",
      confirmButtonText: 'Modificar'
    }).then(result =>{
      if(result.value){
            //sí el usuario confirma querer editar los registros
            this.dbData.editPerson(person).then(()=>{
              Swal.fire('Confirmado','La encuesta ha sido modificada.','success')
          }).catch((error)=>{
            Swal.fire('Error','Ha ocurrido un error en su petición',error)
          });
        }
    });

  }

  //carga el formulario con los datos del resgistro a modificar
  private initValuesForm():void{
    this.personForm.patchValue({
      id: this.data.id,
      name: this.data.name,
      email: this.data.email,
      number: this.data.number,
      question1: this.data.question1,
      question2: this.data.question2,
      question3: this.data.question3,
      answer1: this.data.answer1,
      answer2: this.data.answer2,
      answer3: this.data.answer3
    })
  }


}
