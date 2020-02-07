import { Component, OnInit } from '@angular/core';
import { DataDbService } from '../../../services/data-db.service';
import { ExporterService } from '../../../services/exporter.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material';
import { Person } from '../../../entities/person.interface';
import { QuestionsService } from '../../../services/questions.service';
import { Question } from '../../../entities/question.interface';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  //patron para el correo
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  questions$:Observable<Question>;
  personForm: FormGroup;//nombre del formulario para captar la información en html
  ELEMENT_DATA: any[] = [
   {name: "", email: "", number: null, question1: "", answer1: "", question2:"", answer2:"", question3: "",  answer3: ""}
 ];
  dataSource = this.ELEMENT_DATA;



  createFormGroup() {//Método para captar la información del formulario registro con sus restricciones
    return new FormGroup({
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
  }

  constructor(private dbData: DataDbService, private exportService:ExporterService,private dbDataQuestions: QuestionsService) {
    this.personForm = this.createFormGroup();//inicializar el formulario
  }

  ngOnInit() {
    this.questions$=this.dbDataQuestions.getOneQuestion("wY9OmllN6M6saichWbY2");

  }

  onResetForm(){
    this.personForm.reset();
  }

  onSaveForm(question:Question){
     this.personForm.patchValue({
       question1: question.question1,
       question2: question.question2,
       question3: question.question3
     })

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
          console.log(this.personForm.value)
          console.log('not valid')
        }
    });
  }

  exportAsXLSX(question:Question):void{
     this.personForm.patchValue({
       question1: question.question1,
       question2: question.question2,
       question3: question.question3
     })
      this.dataSource[0].name=this.personForm.value.name;
      this.dataSource[0].email=this.personForm.value.email;
      this.dataSource[0].number=this.personForm.value.number;
      this.dataSource[0].question1=this.personForm.value.question1;
      this.dataSource[0].answer1=this.personForm.value.answer1;
      this.dataSource[0].question2=this.personForm.value.question2;
      this.dataSource[0].answer2=this.personForm.value.answer2;
      this.dataSource[0].question3=this.personForm.value.question3;
      this.dataSource[0].answer3=this.personForm.value.answer3;
       this.exportService.exportToExcel((this.dataSource), 'my_export');
     }

    private initValuesForm(question:Question):void{
      console.log(question)
       this.personForm.patchValue({
         question1: question.question1,
         question2: question.question2,
         question3: question.question3
       })
     }

   //getters para la validación en el formulario, en HTML por medio de ngIF
  get name() { return this.personForm.get('name'); }
  get email() { return this.personForm.get('email'); }
  get number() { return this.personForm.get('number'); }
  get question1() { return this.personForm.get('question1'); }
  get question2() { return this.personForm.get('question2'); }
  get question3() { return this.personForm.get('question3'); }
  get answer1() { return this.personForm.get('answer1'); }
  get answer2() { return this.personForm.get('answer2'); }
  get answer3() { return this.personForm.get('answer3'); }
}
