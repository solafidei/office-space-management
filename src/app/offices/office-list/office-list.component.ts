import { Component, OnDestroy, OnInit } from "@angular/core";
import { Office } from "../office.model";
import { OfficesService } from '../offices.service';
import { Observable, Subscription } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.css']
})

export class OfficeListComponent implements OnInit, OnDestroy {

  offices: Office[] = []
  private officesSub: Subscription = new Subscription;
  constructor(public officesService: OfficesService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.officesService.getOffices();
    this.officesSub = this.officesService.getOfficesUpdateListener().subscribe((offices: Office[]) => {
      this.spinner.hide();
      this.offices = offices;
    });
  }

  onDelete(officeId: string) {
    this.officesService.deleteOffice(officeId);
  }

  ngOnDestroy(): void {
    this.officesSub.unsubscribe();
  }
}
