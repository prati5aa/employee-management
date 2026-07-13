import api from "../api/api";
import { ENDPOINTS } from "../api/ends";
import type { User } from "../model/User";

export const AuthRepository = {

    async login( email: string, password: string): Promise<User | null> {

        const response =
            await api.get<User[]>(`${ENDPOINTS.LOGIN}?email=${email}&password=${password}` );

        if( response.data.length>0)
            {return response.data[0]}
        else
           return  null;
    },
};