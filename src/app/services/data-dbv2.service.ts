import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Personv2 } from '../entities/personv2.interface';

export class DataDbv2Service {
  private formCollection: AngularFirestoreCollection<Personv2>; //Collection para los métodos
  constructor(private afs: AngularFirestore){
    this.formCollection = afs.collection<Personv2>('personsv2');//conección con el nombre de la coleción en Firebase
  }

  public createUser(newPerson: Personv2): void{ //Método para guardar un nuevo registro
    newPerson.nameToSearch = newPerson.name.toLowerCase();//Método para facilitar filtros
    this.formCollection.add(newPerson);
  }

  public getPersons():Observable<Personv2[]> {//Trae toda la información en un map de los objetos de la colección persons
    return this.formCollection.snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a =>{
          const data = a.payload.doc.data() as Personv2;
          const id = a.payload.doc.id;
          return {id,...data};
        })
        ));
  }

  public getOnePerson(id:string):Observable<Personv2>{//Método para recuperar solo un registro por medio del id asignado por la db
    return this.afs.doc<Personv2>(`persons/${id}`).valueChanges();
  }

  public editPerson(person:Personv2){//Metodo para actualizar la información de un registro
    return this.formCollection.doc(person.id).update(person);
  }
}
