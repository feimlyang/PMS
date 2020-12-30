import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import { Patient } from '../patients/model/patient';
import {PatientsService} from '../patients/service/patients.service';

function genderValidator(control: FormControl): { [s: string]: boolean } | null {
  const validgender = ['Female', 'Male'];
  if (!validgender.includes(control.value)) {
    return {invalidCategory: true};
  }
}

function maritalValidator(control: FormControl): { [s: string]: boolean } | null {
  const validCategories = ['Single', 'Married', 'WidowisClickedAdded', 'Divorced'];
  if (!validCategories.includes(control.value)) {
    return {invalidCategory: true};
  }
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  message: string;
  hideMsg = true;
  msgStyle = {
    color: null,
    'background-color': 'white',
    'font-size': '150%',
  };

  patientForm = this.builder.group({
    insuranceNum: ['', [Validators.required, Validators.pattern('[1-9]\\d{8}')]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern('[1-9]\\d{9}')]],
    birthDate: ['', Validators.required],
    gender: ['', [Validators.required, genderValidator] ],
    marital: ['', [Validators.required, maritalValidator] ],
    externalDocId: ['', [Validators.required, Validators.pattern('[1-9]\\d{5}')]],
    nokfirstName: ['', Validators.required],
    noklastName: ['', Validators.required],
    nokrelationship: ['', Validators.required],
    nokaddress: ['', Validators.required],
    nokphone: ['', [Validators.required, Validators.pattern('[1-9]\\d{9}')]]
  });

  get insuranceNum(): AbstractControl {return this.patientForm.get('insuranceNum'); }
  get firstName(): AbstractControl {return this.patientForm.get('firstName'); }
  get lastName(): AbstractControl {return this.patientForm.get('lastName'); }
  get address(): AbstractControl {return this.patientForm.get('address'); }
  get phone(): AbstractControl {return this.patientForm.get('phone'); }
  get birthDate(): AbstractControl {return this.patientForm.get('birthDate'); }
  get gender(): AbstractControl {return this.patientForm.get('gender'); }
  get marital(): AbstractControl {return this.patientForm.get('marital'); }
  get externalDocId(): AbstractControl {return this.patientForm.get('externalDocId'); }
  get nokfirstName(): AbstractControl {return this.patientForm.get('nokfirstName'); }
  get noklastName(): AbstractControl {return this.patientForm.get('noklastName'); }
  get nokrelationship(): AbstractControl {return this.patientForm.get('nokrelationship'); }
  get nokaddress(): AbstractControl {return this.patientForm.get('nokaddress'); }
  get nokphone(): AbstractControl {return this.patientForm.get('nokphone'); }


  clickedAdd = false;

  constructor(private builder: FormBuilder,
              private patientsService: PatientsService
              ) { }

  ngOnInit(): void {
  }

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

  clickAdd(): void {
    this.clickedAdd = true;
  }

  get isClickedAdd(): boolean {
    return this.clickedAdd;
  }

  onSubmit(): void {
    const newPatient =  new Patient(Number(
      this.patientForm.value.insuranceNum),
      this.patientForm.value.firstName,
      this.patientForm.value.lastName,
      this.patientForm.value.address,
      Number(this.patientForm.value.phone),
      this.patientForm.value.birthDate,
      this.patientForm.value.gender,
      this.patientForm.value.marital,
      Number(this.patientForm.value.externalDocId),
      this.patientForm.value.nokfirstName,
      this.patientForm.value.noklastName,
      this.patientForm.value.nokrelationship,
      this.patientForm.value.nokaddress,
      Number(this.patientForm.value.nokphone)
      );

    this.patientsService.addPatient(newPatient).subscribe(
      (response) => {
        this.showMessage('info', `Successful registration with the insurance number ${response.insuranceNum}`);
      },
      (_: any) => {
        this.showMessage('error', 'Unable to add the patient');
      }
    );

    this.patientForm.reset();


  }


}
