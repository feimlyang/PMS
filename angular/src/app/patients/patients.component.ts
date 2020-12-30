import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Routes} from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { AuthenticationService } from '../authentication.service';

export const patientsRoute: Routes = [
  {path: ':insuranceNum', component: PatientComponent}
];

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  submit(value: string): void {
    this.router.navigate(['./', value], {relativeTo: this.route});
  }

  get isLogin(): boolean {
    return true;
  }

}
