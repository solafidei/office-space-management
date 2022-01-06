import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Staff } from "../staff.model";
import { StaffsService } from "../staffs.service";

@Component({
  selector: 'app-staff-create',
  templateUrl: './staff-create.component.html'
})
export class StaffCreateComponent implements OnInit{
  @Input() public officeId;
  @Input() public staff: Staff;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, public StaffService: StaffsService, private diag: MatDialog) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstNameFormCtrl: [this.staff?.firstName, Validators.required],
      lastNameFormCtrl: [this.staff?.lastName, Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      avatarCtrl: ['', Validators.required]
    });
    console.log(this.staff);
  }
  saveStaff(){
    if (this.firstFormGroup.valid)
    {
      const firstName = this.firstFormGroup.controls['firstNameFormCtrl'].value;
      const lastName = this.firstFormGroup.controls['lastNameFormCtrl'].value;
      if (this.staff)
      {
        this.StaffService.updateStaff(this.staff._id, firstName, lastName, this.officeId);
      }
      else {
        this.StaffService.addStaff(firstName, lastName, this.officeId);
      }
      this.diag.closeAll();
    }
  }
}
