import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StaffsService } from "../staffs.service";

@Component({
  selector: 'app-staff-create',
  templateUrl: './staff-create.component.html'
})
export class StaffCreateComponent implements OnInit{
  @Input() public officeId;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, public StaffService: StaffsService) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstNameFormCtrl: ['', Validators.required],
      lastNameFormCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      avatarCtrl: ['', Validators.required]
    });
    console.log(this.officeId);
  }
  addStaff(){
    if (this.firstFormGroup.valid)
    {
      const firstName = this.firstFormGroup.controls['firstNameFormCtrl'].value;
      const lastName = this.firstFormGroup.controls['firstNameFormCtrl'].value;
      this.StaffService.addStaff(firstName, lastName, this.officeId);
    }
  }
}
