import { Injectable } from "@angular/core";
import { Office } from "./office-list/office.model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class OfficeService {
  constructor(private http : HttpClient, private router: Router) { }

}
