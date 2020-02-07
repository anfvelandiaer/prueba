import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormComponent } from './components/v1/form/form.component';
import { ListComponent } from './components/v1/list/list.component';
import { FormQuestionComponent } from './components/v1/form-question/form-question.component';

//control de rutas
const routes: Routes = [
  { path: 'home', component:FormComponent },
  { path: 'list', component:ListComponent },
  { path: 'questions', component:FormQuestionComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }//si se establece una ruta sin path se direcciona al home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
