import type { AppDispatch } from "../../app/store";
import type { Employee } from "../../model/Employee";
import { setLoading, setEmployees, setError } from "./employeeSlice";

import { EmployeeRepository } from "../../repositories/EmployeeRepo";

import { EmployeeService } from "../../services/EmployeeService";

const service = new EmployeeService(EmployeeRepository);

export const fetchEmployees = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading());

  try {
    const employees = await service.getEmployees();

    dispatch(setEmployees(employees));
  } catch (error) {
    dispatch(setError("Unable to fetch employees"));
  }
};



export const createEmployee =
(employee: Employee) =>
async (dispatch: AppDispatch) => {

    try{

        await service.createEmployee(employee);

        dispatch(fetchEmployees());

    }

    catch{

        dispatch(
            setError(
                "Unable to create employee"
            )
        );

    }

};

export const updateEmployee =
(employee: Employee) =>
async (dispatch: AppDispatch)=>{

    try{
        await service.updateEmployee(employee);
        dispatch(fetchEmployees());
    }

    catch{
        dispatch(
            setError(
                "Unable to update employee"
            )
        );
    }
};



export const deleteEmployee =
(id:number)=>
async(dispatch:AppDispatch)=>{

    try{
        await service.deleteEmployee(id);
        dispatch(fetchEmployees());
    }

    catch{
        dispatch(
            setError(
                "Unable to delete employee"
            )
        );
    }
};


