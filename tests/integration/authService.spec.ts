import AuthService from '../../api/Services/AuthService';
import AuthServiceImpl from '../../api/Services/impl/AuthServiceImpl';
import ValidationException from '../../api/Exceptions/ValidationException';
import UnauthorizedOperationException from '../../api/Exceptions/UnauthorizedOperationException';
import UserRepositoryImpl from '../../api/Repositories/impl/UserRepositoryImpl';

jest.mock('../../api/Repositories/impl/UserRepositoryImpl');

let authService: AuthService;

beforeAll(() => {
    authService = new AuthServiceImpl({
        userRepository: new UserRepositoryImpl(),
    });
});

describe('Register', () => {
    it('should be able to register user', async () => {
        const name = 'name';
        const email = 'newEmail@email.com';
        const password = 'password';

        const result = await authService.register(name, email, password);

        expect(result).toHaveProperty('user');
        expect(result).toHaveProperty('access_token');
        expect(result).toHaveProperty('refresh_token');

        expect(result.user).toHaveProperty('id');
        expect(result.user).toHaveProperty('name');
        expect(result.user).toHaveProperty('email');
    });

    it('should throw exception when email already exists', () => {
        const name = 'name';
        const email = 'email@email.com';
        const password = 'password';

        expect(authService.register(name, email, password))
            .rejects
            .toEqual(new ValidationException('Email already exists'));
    });
});

describe('Login', () => {
    it('should be able to login user', async () => {
        const email = 'email@email.com';
        const password = 'password';

        const result = await authService.login(email, password);

        expect(result).toHaveProperty('user');
        expect(result).toHaveProperty('access_token');
        expect(result).toHaveProperty('refresh_token');

        expect(result.user).toHaveProperty('id');
        expect(result.user).toHaveProperty('name');
        expect(result.user).toHaveProperty('email');
    });

    it('should throw error when user not exists', () => {
        const email = 'newEmail@email.com';
        const password = 'password';

        expect(authService.login(email, password))
            .rejects
            .toEqual(new ValidationException('Email or password incorrect'))
    });

    it('should throw error when user not exists', () => {
        const email = 'email@email.com';
        const password = 'incorrect password';

        expect(authService.login(email, password))
            .rejects
            .toEqual(new ValidationException('Email or password incorrect'))
    });
});

describe('Refresh token', () => {
    it('should reset user token', async () => {
        const refreshToken = 'valid token';

        const result = await authService.refreshToken(refreshToken);

        expect(result).toHaveProperty('user');
        expect(result).toHaveProperty('access_token');
        expect(result).toHaveProperty('refresh_token');

        expect(result.user).toHaveProperty('id');
        expect(result.user).toHaveProperty('name');
        expect(result.user).toHaveProperty('email');
    });

    it('should fail when not found the refresh token', () => {
        const refreshToken = '';

        expect(authService.refreshToken(refreshToken))
            .rejects
            .toEqual(new UnauthorizedOperationException('Invalid refresh token'));
    });
});