import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Office } from '../office.model';
import { OfficesService } from '../offices.service';
@Component({
  selector: 'app-office-create',
  templateUrl: './office-create.component.html',
  styleUrls: ['./office-create.component.css']
})
export class OfficeCreateComponent implements OnInit {
  mode = 'create';
  private officeId: string;
  office: Office;
  colorList = [{ id: 1, value: 'red' }, { id: 2, value: 'green' }, { id: 3, value: 'yellow' }, { id: 4, value: 'blue' }, { id: 5, value: 'orange' }, { id: 6, value: 'purple' }, { id: 6, value: 'black' }];
  selectedColor: string;
  circleClass: string = 'circle';
  constructor(public officeService: OfficesService, public route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('officeId')) {
        this.mode = 'edit';
        this.officeId = paramMap.get('officeId') || '';
        this.officeService.getOffice(this.officeId).subscribe(officeData => {
          this.office = officeData;
          this.colorClick(this.office.color);
        });
      }
      else {
        this.mode = 'create';
        this.officeId = null;
      }
    });
  }

  onSaveOffice(form: NgForm) {

    if (form.valid) {
      if (this.mode == 'create') {
        this.officeService.addOffice(form.value.name, form.value.address, form.value.email, form.value.phoneNumber, form.value.maxCapacity, this.selectedColor);
      }
      else {
        this.officeService.updateOffice(this.officeId, form.value.name, form.value.address, form.value.email, form.value.phoneNumber, form.value.maxCapacity, this.selectedColor, this.office.staff);
      }
    }
    form.resetForm();
  }

  colorClick(color: string) {
    this.selectedColor = color;
    var elementObject = document.getElementById(color);
    elementObject.classList.add('selector');
  }
}
