import { createSlice } from "@reduxjs/toolkit";
import type { Employee } from "../../model/Employee";


interface EmployeeState {
    employees: Employee[];
    loading: boolean;
    error: string | null;
}


const initialState: EmployeeState = {
    employees: [],
    loading: false,
    error: null,
};


const employeeSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        setLoading(state) {
            state.loading = true;
        },

        setEmployees(
            state,
            action
        ) {
            state.loading = false;

            state.employees =action.payload;

        },


        setError(
            state,
            action
        ) {

            state.loading = false;

            state.error =
                action.payload;

        },


    }

});


export const {
    setLoading,
    setEmployees,
    setError

} = employeeSlice.actions;


export default employeeSlice.reducer;