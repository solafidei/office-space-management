import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Office } from '../office.model';
import { OfficesService } from '../offices.service';
import {MatDialog} from '@angular/material/dialog';
import { StaffCreateComponent } from 'src/app/staffs/staff-create/staff-create.component';

@Component({
  selector: 'app-office-view',
  templateUrl: './office-view.component.html',
  styleUrls: ['./office-view.component.css']
})
export class OfficeViewComponent implements OnInit, OnDestroy{
  office: Office;
  private mode = 'create';
  private officeId : string = '';
  constructor(public officeService: OfficesService, public route: ActivatedRoute, public dialog: MatDialog) {}
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
  onDelete(officeId: string){
    //this.officesService.deleteOffice(officeId);
  }

  ngOnDestroy(): void {
    //this.officesSub.unsubscribe();
  }
  openDialog() {
    const dialogRef = this.dialog.open(StaffCreateComponent);
    dialogRef.componentInstance.officeId = this.officeId;

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

