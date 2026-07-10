import type { User } from "../model/User";

export interface IAuthRepository {
  login(email: string, password: string): Promise<User | null>;
}

export class AuthService {
  constructor(private repository: IAuthRepository) {}

  async login(email: string, password: string) {
    if (!email.trim()) throw new Error("Email required");

    if (!password.trim()) throw new Error("Password required");

    return this.repository.login(email, password);
  }
}
