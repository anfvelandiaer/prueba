import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Question } from '../entities/question.interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private formCollection: AngularFirestoreCollection<Question>; //Collection para los métodos
  constructor(private afs: AngularFirestore){
    this.formCollection = afs.collection<Question>('questions');//conección con el nombre de la coleción en Firebase
  }

  public createQuestions(newQuestion: Question): void{ //Método para guardar un nuevo registro
    this.formCollection.add(newQuestion);
  }

  public getOneQuestion(id:string):Observable<Question>{//Método para recuperar solo un registro por medio del id asignado por la db
    return this.afs.doc<Question>(`questions/${id}`).valueChanges();
  }

  public editQuestion(question:Question){//Metodo para actualizar la información de un registro
    return this.formCollection.doc(question.id).update(question)
  }
}
