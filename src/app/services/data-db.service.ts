import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Person } from '../entities/person.interface';

@Injectable({
  providedIn: 'root'
})

//Service para el CRUD con firebase, API en environments/environment

export class DataDbService {
  private formCollection: AngularFirestoreCollection<Person>; //Collection para los métodos
  constructor(private afs: AngularFirestore){
    this.formCollection = afs.collection<Person>('persons');//conección con el nombre de la coleción en Firebase
  }

  public createUser(newPerson: Person): void{ //Método para guardar un nuevo registro
    newPerson.nameToSearch = newPerson.name.toLowerCase();//Método para facilitar filtros
    this.formCollection.add(newPerson);
  }

  public getPersons():Observable<Person[]> {//Trae toda la información en un map de los objetos de la colección persons
    return this.formCollection.snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a =>{
          const data = a.payload.doc.data() as Person;
          const id = a.payload.doc.id;
          return {id,...data};
        })
        ));
  }

  public getOnePerson(id:string):Observable<Person>{//Método para recuperar solo un registro por medio del id asignado por la db
    return this.afs.doc<Person>(`persons/${id}`).valueChanges();
  }

  public editPerson(person:Person){//Metodo para actualizar la información de un registro
    return this.formCollection.doc(person.id).update(person)
  }

  public delete(person:Person){//Metodo para eliminarun registro, no tiene uso en la aplicación
      return this.formCollection.doc(person.id).delete();
  }
}
