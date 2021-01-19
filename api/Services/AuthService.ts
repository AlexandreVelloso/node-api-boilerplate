import UserCredentials from '../DTOs/UserCredentialsDTO';

interface AuthService {

    login(email: string, password: string): Promise<UserCredentials>;

    register(name: string, email: string, password: string): Promise<UserCredentials>;

    refreshToken(refreshToken: string): Promise<UserCredentials>;

}

export default AuthService;