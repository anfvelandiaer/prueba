export interface Personv2{//interface de objeto para el coleccionable en firestore
  id:string;
  name:string;
  nameToSearch:string;
  email:string;
  number:number;
  numberOfQuestions:number;
  questions:string[number];
  answers:string[number];
}
