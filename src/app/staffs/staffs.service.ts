import { Injectable } from "@angular/core";
import { Staff } from "./staff.model";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class StaffsService {
  private staffs: Staff[] = [];
  private staffsUpdated = new Subject<Staff[]>();

  constructor(private http: HttpClient, private router: Router) { }

  addStaff(firstName: string, lastName: string, avatarSrc: string, officeId: string) {
    const staff: Staff = { _id: null, firstName: firstName, lastName: lastName, avatarSrc: avatarSrc, officeId: officeId };
    this.http.post<{ message: string, staffId: string }>('http://localhost:3000/api/staffs', staff).subscribe((responseData) => {
      const staffId = responseData.staffId;
      this.staffs.push(staff);
      staff._id = officeId;
      this.staffsUpdated.next([...this.staffs]);
      this.router.navigate(['/']);
    });
  }

  updateStaff(_id: string, firstName: string, lastName: string, avatarSrc: string, officeId: string) {
    const staff: Staff = { _id: _id, firstName: firstName, lastName: lastName, avatarSrc, officeId };
    this.http.put('http://localhost:3000/api/staffs/' + _id, staff)
      .subscribe(response => {
        const updatedStaffs = [...this.staffs];
        const oldStaffIndex = updatedStaffs.findIndex(s => s._id == staff._id);
        updatedStaffs[oldStaffIndex] = staff;
        this.staffs = updatedStaffs;
        this.staffsUpdated.next([...this.staffs]);
        this.router.navigate(['/']);
      });
  }

  deleteStaff(staffId: string, officeId: string) {
    this.http.delete('http://localhost:3000/api/staffs/' + staffId).subscribe((response) => { console.log(response); this.router.navigate(['/view/',officeId]) });
  }
}
