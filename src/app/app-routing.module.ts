import { NgModule } from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import { OfficeListComponent } from "./offices/office-list/office-list.component";

const routes : Routes = [
  {path: '', component: OfficeListComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
