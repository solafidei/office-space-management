import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Office } from "../office.model";
import { OfficesService } from "../offices.service";

@Component({
  selector: 'app-office-edit',
  templateUrl: './office-edit.component.html',
  styleUrls: ['./office-edit.component.css']
})
export class OfficeEditComponent implements OnInit{
  office: Office;
  private mode = 'create';
  private officeId : string = '';
  constructor(public officeService: OfficesService, public route: ActivatedRoute) {}
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
}
