import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Patient} from '../patients/model/patient';
import {Admission} from './model/admission';
import {Division} from './model/division';

@Injectable({
  providedIn: 'root'
})
export class AdmissionService {

  constructor(private http: HttpClient) { }

  public isAdmitted(insuranceNum: string): Observable<Boolean>{
    return this.http.get<Boolean>('http://localhost:3000/patient/isAdmitted/' + insuranceNum);
  }

  public admitPatient(newAdmission: Admission): Observable<any>{
    return this.http.post('http://localhost:3000/admission/admit/', newAdmission,
      {responseType: 'text'});
  }

  public addAdmissionRequest(newAdmission: Admission): Observable<any>{
    return this.http.put('http://localhost:3000/admission/request/', newAdmission,
      {responseType: 'text'});
  }

  public getDivision(nurseId: string): Observable<Division>{
    return this.http.get<Division>('http://localhost:3000/division/' + nurseId);
  }
}

