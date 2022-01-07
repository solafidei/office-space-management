import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OfficeCreateComponent } from "./offices/office-create/office-create.component";
import { OfficeListComponent } from "./offices/office-list/office-list.component";
import { OfficeViewComponent } from "./offices/office-view/office-view.component";

const routes: Routes = [
  { path: '', component: OfficeListComponent },
  { path: 'create', component: OfficeCreateComponent },
  { path: 'edit/:officeId', component: OfficeCreateComponent },
  { path: 'view/:officeId', component: OfficeViewComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
