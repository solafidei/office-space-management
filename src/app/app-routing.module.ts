import { NgModule } from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import { OfficeEditComponent } from "./offices/office-edit/office-edit.component";
import { OfficeCreateComponent } from "./offices/office-create/office-create.component";
import { OfficeListComponent } from "./offices/office-list/office-list.component";

const routes : Routes = [
  {path: '', component: OfficeListComponent},
  {path: 'create', component: OfficeCreateComponent},
  {path: 'edit/:officeId', component: OfficeCreateComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
