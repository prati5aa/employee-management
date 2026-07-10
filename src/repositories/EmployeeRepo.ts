import api from "../api/api";
import { ENDPOINTS } from "../api/ends";
import type { Employee } from "../model/Employee";

export const EmployeeRepository = {
  async getEmployees(): Promise<Employee[]> {
    const response = await api.get<Employee[]>(ENDPOINTS.EMPLOYEES);

    return response.data;
  },
  
  async getEmployeeById(id: number): Promise<Employee> {
    const response = await api.get<Employee>(`${ENDPOINTS.EMPLOYEES}/${id}`);

    return response.data;
  },

  async createEmployee(employee: Employee): Promise<Employee> {
    const response = await api.post<Employee>(ENDPOINTS.EMPLOYEES, employee);

    return response.data;
  },

  async updateEmployee(employee: Employee): Promise<Employee> {
    const response = await api.put<Employee>(
      `${ENDPOINTS.EMPLOYEES}/${employee.id}`,
      employee,
    );

    return response.data;
  },

  async deleteEmployee(id: number): Promise<void> {
    await api.delete(`${ENDPOINTS.EMPLOYEES}/${id}`);
  },
};
