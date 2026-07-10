import type { Employee } from "../model/Employee";

export interface IEmployeeRepository {
  getEmployees(): Promise<Employee[]>;
  getEmployeeById(id: number): Promise<Employee>;
  createEmployee(employee: Employee): Promise<Employee>;
  updateEmployee(employee: Employee): Promise<Employee>;
  deleteEmployee(id: number): Promise<void>;
}

export class EmployeeService {
  constructor(private repository: IEmployeeRepository) {}

  async getEmployees() {
    return this.repository.getEmployees();
  }

  async createEmployee(employee: Employee) {
    if (!employee.firstName.trim()) {
      throw new Error("First name is required");
    }

    if (!employee.email.trim()) {
      throw new Error("Email is required");
    }

    if (employee.salary <= 0) {
      throw new Error("Salary must be greater than zero");
    }

    employee.firstName = employee.firstName.trim();
    employee.lastName = employee.lastName.trim();

    return this.repository.createEmployee(employee);
  }

  async updateEmployee(employee: Employee) {
    return this.repository.updateEmployee(employee);
  }

  async deleteEmployee(id: number) {
    return this.repository.deleteEmployee(id);
  }
}