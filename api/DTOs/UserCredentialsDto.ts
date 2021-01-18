export interface LoginCredentials {
    id: number;
    name: string;
    email: string;
}

export default interface UserCredentials {
    user: LoginCredentials;
    access_token: string;
    refresh_token: string;
}