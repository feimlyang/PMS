import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { PatientsComponent } from './patients/patients.component';
import { UserComponent } from './user/user.component';
import { PatientComponent } from './patients/patient/patient.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AdmissionComponent } from './admission/admission.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PatientsComponent,
    UserComponent,
    PatientComponent,
    AdmissionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
