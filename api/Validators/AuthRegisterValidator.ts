import Joi from '@hapi/joi';

import BaseValidator from './BaseValidator';
import ValidationException from '../Exceptions/ValidationException';

class AuthRegisterValidator implements BaseValidator {

    validate(req: any) {
        const { name, email, password } = req.body;

        const schema = Joi.object({
            name: Joi.string()
                .required(),    

            email: Joi.string()
                .email()
                .required(),

            password: Joi.string()
                .required(),
        });

        const validated = schema.validate({
            name,
            email,
            password,
        });

        if (validated.error) {
            const errorMessage = validated.error
                .details[0]
                .message;
            throw new ValidationException(errorMessage);
        }

        return validated.value;
    }

}

export default AuthRegisterValidator;