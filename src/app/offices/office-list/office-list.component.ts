import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Office } from "../office.model";
import { OfficesService } from '../offices.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.css']
})

export class OfficeListComponent implements OnInit, OnDestroy{

  offices : Office[] = []
  private officesSub : Subscription = new Subscription;
  constructor(public officesService : OfficesService) {}

  ngOnInit(): void {
    this.officesService.getOffices();
    this.officesSub = this.officesService.getOfficesUpdateListener().subscribe((offices: Office[]) => {
      this.offices = offices;
    });
  }

  onDelete(officeId: string){
    this.officesService.deleteOffice(officeId);
  }

  ngOnDestroy(): void {
    this.officesSub.unsubscribe();
  }
}
