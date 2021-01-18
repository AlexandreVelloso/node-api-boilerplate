import randtoken from 'rand-token';

import UserModel from '../../../database/models/UserModel';
import { sign } from '../../Utils/JwtToken';
import ValidationException from '../../Exceptions/ValidationException';
import UnauthorizedOperationException from '../../Exceptions/UnauthorizedOperationException';
import AuthService from '../AuthService';
import UserCredentials from '../../DTOs/UserCredentialsDTO';
import UserRepository from '../../Repositories/UserRepository';

class AuthServiceImpl implements AuthService {

    private userRepository: UserRepository;

    public constructor(opts: any) {
        this.userRepository = opts.userRepository;
    }

    generateToken(user: UserModel) {
        return sign({
            id: user.id,
            name: user.name,
            email: user.email,
        });
    }

    generateUserResponse(user: UserModel): UserCredentials {
        const accessToken = `Bearer ${this.generateToken(user)}`;

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            access_token: accessToken,
            refresh_token: user.refresh_token,
        };
    };

    async login(email: string, password: string): Promise<UserCredentials> {
        const user = await this.userRepository
            .findByEmail(email);

        if (!user || !await user.verifyPassword(password)) {
            throw new ValidationException('Email or password incorrect');
        }

        return this.generateUserResponse(user);
    }

    async register(name: string, email: string, password: string): Promise<UserCredentials> {
        const userDB = await this.userRepository
            .findByEmail(email);

        if (userDB) {
            throw new ValidationException('Email already exists');
        }

        const refreshToken = randtoken.uid(256);

        const user = await this.userRepository
            .insert(email, name, password, refreshToken);

        return this.generateUserResponse(user);
    }

    async refreshToken(refreshToken: string): Promise<UserCredentials> {
        const user = await this.userRepository
            .findByRefreshToken(refreshToken);

        if (!user) {
            throw new UnauthorizedOperationException('Invalid refresh token');
        }

        return this.generateUserResponse(user);
    }
}

export default AuthServiceImpl;