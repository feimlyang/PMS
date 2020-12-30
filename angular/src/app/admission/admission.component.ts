import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {AdmissionService} from './admission.service';
import {Admission} from './model/admission';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})
export class AdmissionComponent implements OnInit {

  constructor(private builder: FormBuilder,
              private admissionService: AdmissionService) {
  }

  requestForm = this.builder.group({
    insuranceNum: ['', [Validators.required, Validators.pattern('[1-9]\\d{8}')]],
    comment: ['', Validators.required]
  });

  get insuranceNum(): AbstractControl {
    return this.requestForm.get('insuranceNum');
  }

  get comment(): AbstractControl {
    return this.requestForm.get('comment');
  }

  //login user nurseId
  nurseId = '5fcf540a30a51e1e887a92c7';
  isDivisionCompleted = true;
  availableBeds = [];
  isPatientAdmitted = true;
  numOfBedSelected = null;

  ngOnInit(): void {
    this.admissionService.getDivision(this.nurseId).subscribe(
      (response) => {
        console.log(response.beds);
        console.log(response.status);
        if (response.status === 'incompleted') {
          this.isDivisionCompleted = false;
        }

        for (let i = 0; i < response.beds.length; ++i) {
          if (response.beds[i] == null) {
            this.availableBeds.push(i + 1);
          }
        }

        console.log(this.isDivisionCompleted);
        console.log(this.availableBeds);
      }
    );
  }

  message: string;
  hideMsg = true;
  msgStyle = {
    color: null,
    'font-size': '150%',
  };

  showMessage(type: string, msg: string): void {
    this.msgStyle.color = type === 'error' ? 'red' : 'blue';
    this.message = msg;
    this.hideMsg = false;
    setTimeout(
      () => {
        this.hideMsg = true;
      }, 3000
    );
  }

  submitRequest(): void {
    const newAdmission = new Admission(
      Number(this.requestForm.value.insuranceNum),
      this.nurseId,
      this.numOfBedSelected,
      this.requestForm.value.comment);


    this.admissionService.admitPatient(newAdmission).subscribe(
      (response) => {
        console.log(response);
          this.showMessage('info', 'patient is successfully admitted');
      },
      (error) => {
          this.showMessage('error', 'try again!');
      }
    );
  }

  selectBed(numOfBed): void {
    this.numOfBedSelected = numOfBed;
    console.log('you clicked bed', numOfBed);
  }

  sendRequest(): void {
    const newAdmission = new Admission(
      Number(this.requestForm.value.insuranceNum),
      this.nurseId,
      null,
      this.requestForm.value.comment);

    this.admissionService.addAdmissionRequest(newAdmission).subscribe(
      (response) => {
        console.log(response);
        this.showMessage('info', 'Request sent to waiting list');
      },
      (error) => {
        this.showMessage('error', 'try again!');
      }
    );

  }


}
