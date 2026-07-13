import type { AppDispatch } from "../../app/store";
import { AuthRepository } from "../../repositories/AuthRepositories";
import { AuthService } from "../../services/AuthService";
import {
  setLoading,
  loginSuccess,
  loginFailure,
  logout,
} from "./authSlice";




const service = new AuthService(AuthRepository);

export const login =
  (email: string, password: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading());

    try {
      const user = await service.login(email, password);

      if (!user) {
        dispatch(loginFailure("Invalid email or password"));
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
    

      dispatch(loginSuccess(user));
    } catch {
      dispatch(loginFailure("Login failed"));
    }
  };

export const signOut = () => (dispatch: AppDispatch) => {
  localStorage.removeItem("user");
  dispatch(logout());
};