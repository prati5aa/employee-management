import type { User } from "../model/User";


export interface IAuthRepository {
  login(email: string, password: string): Promise<User | null>;
}

export class AuthService {
  constructor(private repository: IAuthRepository) {}

  async login(email: string, password: string) {
    if (!email.trim()) throw new Error("Email required");

    if (!password.trim()) throw new Error("Password required");

       const user = await this.repository.login(email, password);
        
       if (!user) {
      throw new Error("Invalid email or password");
    }

      localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');

  

    return user;
    
  }
    
 
}
