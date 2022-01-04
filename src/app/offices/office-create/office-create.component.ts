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
export class OfficeCreateComponent implements OnInit{
  mode = 'create';
  private officeId: string;
  office : Office;
  constructor(public officeService: OfficesService, public route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('officeId'))
      {
        this.mode = 'edit';
        this.officeId = paramMap.get('officeId') || '';
        this.officeService.getOffice(this.officeId).subscribe(officeData => {
          this.office = officeData;
        });
      }
      else {
        this.mode = 'create';
        this.officeId = null;
      }
    });
  }

  onSaveOffice(form: NgForm)
  {

    if (form.valid)
    {
      if (this.mode == 'create')
      {
        this.officeService.addOffice(form.value.name, form.value.address, form.value.email, form.value.phoneNumber, form.value.maxCapacity, "green");
      }
      else {
        this.officeService.updateOffice(this.officeId, form.value.name, form.value.address, form.value.email, form.value.phoneNumber, form.value.maxCapacity, "green");
      }
    }
    form.resetForm();
  }

}
