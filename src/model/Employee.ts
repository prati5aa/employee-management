import type { Department } from "./Department";
import type { EmployeeStatus } from "./EmployeeStatus";

export interface Employee{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    department: Department;
    designation: string;          
    salary: number;
    joiningDate: string;
    status: EmployeeStatus;
}