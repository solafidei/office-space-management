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
    this.http.get<{message: string, offices: Office}>('http://localhost:3000/api/offices')
    .pipe(map(officeData => {
      return officeData.offices;

      })
    ).subscribe((transformedOffice : any) => {
       this.offices = transformedOffice;
       this.officesUpdated.next([...this.offices]);
    });
  }

  getOfficesUpdateListener() {
    return this.officesUpdated.asObservable();
  }

  getOffice(id: string) {
    return this.http.get('http://localhost:3000/api/offices/'+id).pipe(map((officeData : Office) => {
      return officeData;
    }));
  }

  addOffice(name: string, address: string, email: string, phoneNumber: string, maxCapacity: number, color: string){
    const office : Office = {_id: null, name: name, address: address, email: email, phoneNumber: phoneNumber, maxCapacity: maxCapacity, color: color, staff: []};
    this.http.post<{message: string, officeId: string}>('http://localhost:3000/api/offices', office)
      .subscribe(responseData => {
        const officeId = responseData.officeId;
        this.offices.push(office);
        office._id = officeId;
        this.officesUpdated.next([...this.offices]);
        this.router.navigate(['/']);
      });
  }

  updateOffice(_id: string, name: string, address: string, email: string, phoneNumber: string, maxCapacity: number, color: string) {
    const office : Office = {_id: _id, name: name, address: address, email: email, phoneNumber: phoneNumber, maxCapacity: maxCapacity, color: color, staff: []};
    this.http.put('http://localhost:3000/api/offices/'+_id, office)
      .subscribe(response => {
        console.log(response);
        const updatedOffices = [...this.offices];
        const oldOfficeIndex = updatedOffices.findIndex(o => o._id == office._id);
        updatedOffices[oldOfficeIndex] = office;
        this.offices = updatedOffices;
        this.officesUpdated.next([...this.offices]);
        this.router.navigate(['/']);
      });
  }

  deleteOffice(officeId: string){

  }
}
