import { Staff } from "../staffs/staff.model";
export interface Office {
  _id: string,
  name: string,
  address: string,
  email: string,
  phoneNumber: string,
  maxCapacity: number,
  color : string,
  staff: Staff[]
}
