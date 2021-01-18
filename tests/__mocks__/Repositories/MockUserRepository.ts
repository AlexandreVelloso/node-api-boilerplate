import UserRepository from "../../../api/Repositories/UserRepository";

class MockUserRepository implements UserRepository {

    findByEmail(email: string): any {
        if (email !== 'email@email.com') {
            return undefined;
        }

        function verifyPassword(password: string) {
            return password === 'password';
        }

        return {
            name: 'name',
            email: 'email@email.com',
            password: 'password',
            refresh_token: 'refresh_token',
            verifyPassword: verifyPassword
        }
    }

    findByRefreshToken(refreshToken: string): any {
        if (refreshToken === '') {
            return undefined;
        }

        return {
            name: 'name',
            email: 'email@email.com',
            password: 'password',
            refresh_token: 'refresh_token',
        }
    }

    insert(email: string, name: string, password: string, refreshToken: string): any {
        return {
            name,
            email,
            password: 'hashPassword',
            refresh_token: 'refresh_token',
        }
    }

    updatePasswordByEmail(email: string, password: string): any { }

    findById(id: number): any {
        if (id <= 0 || id > 1000) {
            return undefined;
        }

        return {
            name: 'name',
            email: 'email@email.com',
            password: 'password',
            refresh_token: 'refresh_token',
        }
    }
}

export default MockUserRepository;