import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

//imports de los componentes de la aplicación, y servicios para la db
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { DataDbService} from './services/data-db.service';
import { ListComponent } from './components/list/list.component';
import { UpdateComponent } from './components/update/update.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ListModule } from './components/list/list.module';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ListComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ListModule
  ],
  entryComponents:[UpdateComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
