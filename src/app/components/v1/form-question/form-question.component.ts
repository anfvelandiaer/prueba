import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionsService } from '../../../services/questions.service';
import { Question } from '../../../entities/question.interface';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.css']
})
export class FormQuestionComponent implements OnInit {


  public questionForm = new FormGroup({
    id: new FormControl('', Validators.required),
    question1: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    question2: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    question3: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
  });//nombre del formulario para captar la información en html
  questions$:Observable<Question>;
  constructor(private dbData: QuestionsService) {
  }

  ngOnInit() {
    this.questions$=this.dbData.getOneQuestion("wY9OmllN6M6saichWbY2");
    this.initValuesForm();
  }

  getQuestions(){

  }
  onResetForm(){
    this.questionForm.reset();
  }

  onEditForm(question:Question){
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
            this.dbData.editQuestion(question).then(()=>{
              Swal.fire('Confirmado','Las preguntas han sido modificadas.','success');
          }).catch((error)=>{
            Swal.fire('Error','Ha ocurrido un error en su petición',error)
          });
        }
    });
  }

  private initValuesForm():void{
    this.questionForm.patchValue({
      id: "wY9OmllN6M6saichWbY2"
    })
  }

  //getters para la validación en el formulario, en HTML por medio de ngIF
  get question1() { return this.questionForm.get('question1'); }
  get question2() { return this.questionForm.get('question2'); }
  get question3() { return this.questionForm.get('question3'); }

}
