import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Staff } from "../staff.model";
import { StaffsService } from "../staffs.service";

@Component({
  selector: 'app-staff-create',
  templateUrl: './staff-create.component.html',
  styleUrls: ['./staff-create.component.css']
})
export class StaffCreateComponent implements OnInit {
  @Input() public officeId;
  @Input() public staff: Staff;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  color = "accent";
  selectedAvatar: string;
  imageList = [
    {
      src: 'https://cdn.vox-cdn.com/thumbor/KyCEOQLzElD_JMOA2-WrnbnTnbo=/0x123:1400x823/fit-in/1200x600/cdn.vox-cdn.com/uploads/chorus_asset/file/21730161/avatar_the_last_airbender_image.jpeg',
      caption: 'AirBender',
    },
    {
      src: 'https://picsum.photos/200',
      caption: 'Random',
    },
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9JAQE_4vHLLqa8783-gL0oBGzmfwxevVVYw&usqp=CAU',
      caption: 'Dragonknight'
    },
    {
      src: 'https://s.alicdn.com/@sc04/kf/Hc58b0a9d0248448595d6417e9c995474M.jpg_300x300.jpg',
      caption: 'roshan'
    }];

  constructor(private _formBuilder: FormBuilder, public StaffService: StaffsService, private diag: MatDialog) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstNameFormCtrl: [this.staff?.firstName, Validators.required],
      lastNameFormCtrl: [this.staff?.lastName, Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      avatarCtrl: ['', Validators.required]
    });
    console.log(this.staff);
    this.imageSelected(this.staff?.avatarSrc);
  }
  saveStaff() {
    if (this.firstFormGroup.valid) {
      const firstName = this.firstFormGroup.controls['firstNameFormCtrl'].value;
      const lastName = this.firstFormGroup.controls['lastNameFormCtrl'].value;
      if (this.staff) {
        this.StaffService.updateStaff(this.staff._id, firstName, lastName, this.selectedAvatar, this.officeId);
      }
      else {
        this.StaffService.addStaff(firstName, lastName, this.selectedAvatar, this.officeId);
      }
      this.diag.closeAll();
    }
  }

  imageSelected(src: string) {
    this.selectedAvatar = src;
    var elementObject = document.getElementById(src);
    elementObject.classList.add('selector');
  }
}
