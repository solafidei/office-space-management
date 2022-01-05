import { Injectable } from "@angular/core";
import { Office } from "../offices/office.model";
import { Staff } from "./staff.model";
import { HttpClient } from "@angular/common/http";
import { map, Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class StaffsService {
  constructor(private http : HttpClient, private router: Router) { }
  addStaff(firstName: string, lastName: string, officeId: string){
    const staff : Staff = {_id: null, firstName: firstName, lastName: lastName, officeId: officeId};
    this.http.post<{message: string}>('http://localhost:3000/api/staffs', staff).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
