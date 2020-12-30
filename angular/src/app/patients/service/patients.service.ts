import { Injectable } from '@angular/core';
import {Patient } from '../model/patient';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  // private patients = [
  //   new Patient(123456789, 'Example', 'Client', '110 example address', 6131111111, '1999-01-01', 'female', 'single', 123456, 'mother', 'pnok', 'mother', 'exaple address', 6133333333),
  //   new Patient(987654321, 'Aha', 'Patient', '432 example address', 6132222222, '1980-01-01', 'male', 'single', 654321, 'ded', 'pnok', 'father', 'exaple address', 6134444444)
  // ];

  constructor(private http: HttpClient) { }

  public getPatient(insuranceNum: string): Observable<Patient>{
    return this.http.get<Patient>('http://localhost:3000/patient/' + insuranceNum);
  }

  public addPatient(newPatient: Patient): Observable<Patient> {
    return this.http.post<Patient>('http://localhost:3000/patient/', newPatient);
  }

}
