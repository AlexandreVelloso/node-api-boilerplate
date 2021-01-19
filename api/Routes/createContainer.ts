import { createContainer, asClass, Lifetime, AwilixContainer, asValue } from 'awilix';
import AuthController from '../Controllers/AuthController';

import UserRepositoryImpl from '../Repositories/impl/UserRepositoryImpl';
import AuthServiceImpl from '../Services/impl/AuthServiceImpl';
import AuthLoginValidator from '../Validators/AuthLoginValidator';
import AuthRefreshTokenValidator from '../Validators/AuthRefreshTokenValidator';
import AuthRegisterValidator from '../Validators/AuthRegisterValidator';

function createAppContainer(): AwilixContainer {
    const container = createContainer();
    const opts = {
        lifetime: Lifetime.SINGLETON
    };
    const HOUR = 60 * 60;
    const DAY = HOUR * 24;

    container.register({
        authController: asClass(AuthController, opts),

        authService: asClass(AuthServiceImpl, opts),

        userRepository: asClass(UserRepositoryImpl, opts),

        authLoginValidator: asClass(AuthLoginValidator, opts),
        authRegisterValidator: asClass(AuthRegisterValidator, opts),
        authRefreshTokenValidator: asClass(AuthRefreshTokenValidator, opts),

        ttlSeconds: asValue(DAY * 7),
    });

    return container;
}

export default createAppContainer;