import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PatientsComponent } from './patients/patients.component';
import { UserComponent } from './user/user.component';
import {LoggedInGuard} from './logged-in.guard';
import {PatientComponent} from './patients/patient/patient.component';
import {AdmissionComponent} from './admission/admission.component';

const patientsRoutes: Routes = [
  {path: ':insuranceNum', component: PatientComponent}
];


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {
    path: 'user',
    component: UserComponent
    // canActivate: [ LoggedInGuard ]
  },
  {path: 'patients', component: PatientsComponent,
    children: patientsRoutes},
  {path: 'admit', component: AdmissionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
