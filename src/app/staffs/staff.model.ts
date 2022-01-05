import { Office } from "../offices/office.model";

export interface Staff {
  _id: string,
  firstName: string,
  lastName: string,
  officeId: string
}
