import { Component, OnInit } from '@angular/core';
import { Patient } from '../model/patient';
import {ActivatedRoute} from '@angular/router';
import {PatientsService} from '../service/patients.service';
import {Subscription} from 'rxjs';
import {repeat} from 'rxjs/operators';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  selectedPatient: Patient;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private patientsService: PatientsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const insuranceNum = params.insuranceNum;
      this.subscription = this.patientsService.getPatient(insuranceNum).subscribe(
        (responseData: Patient) => {
          console.log(responseData);
          this.selectedPatient = responseData;
        },
        (_: any) => {
          this.selectedPatient = null;
        });
    });
  }

}
