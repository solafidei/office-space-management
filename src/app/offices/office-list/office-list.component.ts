import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Office } from "./office.model";

@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.css']
})

export class OfficeListComponent implements OnInit, OnDestroy{

  offices : Office[] = [
    {_id: '2daDqda', name: 'First Office'}
  ]
  constructor() {}

  ngOnDestroy(): void {

  }
  ngOnInit(): void {

  }

}
