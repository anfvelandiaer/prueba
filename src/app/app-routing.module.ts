import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormComponent } from './components/form/form.component';
import { ListComponent } from './components/list/list.component';
import { UpdateComponent } from './components/update/update.component';

//control de rutas
const routes: Routes = [
  { path: 'home', component:FormComponent },
  { path: 'list', component:ListComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }//si se establece una ruta sin path se direcciona al home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
