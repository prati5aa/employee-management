import api from "../api/api";
import { ENDPOINTS } from "../api/ends";
import type { User } from "../model/User";

export const AuthRepository = {

    async login( email: string, password: string): Promise<User | null> {

        const response =
            await api.get<User[]>(`${ENDPOINTS.LOGIN}?email=${email}&password=${password}` );

        return response.data.length
            ? response.data[0]
            : null;
    },
};