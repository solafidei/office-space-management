import { Injectable } from "@angular/core";
import { Office } from "./office.model";
import { HttpClient } from "@angular/common/http";
import { map, Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class OfficesService {
  private offices: Office[] = [];
  private officesUpdated = new Subject<Office[]>();
  constructor(private http : HttpClient, private router: Router) { }

  getOffices(){
    this.http.get<{message: string, offices: any}>('http://localhost:3000/api/offices')
    .pipe(map(officeData => {
      return officeData.offices.map((office : any) => {
        return {
          _id: office._id,
          name: office.name,
          address: office.address,
          email: office.email,
          phoneNumber: office.phoneNumber,
          maxCapacity: office.maxCapacity,
          color: office.color,
          staff: office.staff

      }});
    }))
     .subscribe((transformedOffice) => {
       this.offices = transformedOffice;
       this.officesUpdated.next([...this.offices]);
    });
  }

  getOfficesUpdateListener() {
    return this.officesUpdated.asObservable();
  }

}
