import request from 'supertest';
import { matchersWithOptions } from 'jest-json-schema';

import connection from "../../database/connection";
import app from '../../api/app';
import errorSchema from '../schemas/ErrorSchema.json';
import loginResponseSchema from '../schemas/LoginResponseSchema.json';
import { generateUser, generateUserWithDefaultPassword } from '../utils/UserModel';

beforeAll(async () => {
    expect.extend(matchersWithOptions({
        schemas: [errorSchema, loginResponseSchema],
    }));

    test('Validate schemas', () => {
        expect(errorSchema).toBeValidSchema();
        expect(loginResponseSchema).toBeValidSchema();
    });
});

describe('Register', () => {
    beforeAll(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.migrate.rollback();
    });

    it('should be able to register user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'a@a.com',
                name: 'aa',
                password: '1234',
            });

        expect(response.status).toBe(200);

        const testSchema = {
            $ref: 'loginResponse#/definitions/login',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);

        const { user } = response.body;
        expect(user.name).toBe('aa');
        expect(user.email).toBe('a@a.com');
    });

    it('should not register a user with equal email', async () => {
        await generateUser('name', 'email@email.com');

        const response = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'name',
                email: 'email@email.com',
                password: '1234',
            });

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('Email already exists');
    });

    it('should give error 400 when name is not present', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'email@email.com',
                password: 'password',
            });

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('\"name\" is required');
    });

    it('should give error 400 when email is not present', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'name',
                password: 'password'
            });

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('\"email\" is required');
    });

    it('should give error 400 when email is invalid', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'name',
                email: 'not an email',
                password: 'password'
            });

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('\"email\" must be a valid email');
    });

    it('should give error 400 when password is not present', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'name',
                email: 'email@email.com'
            });

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('\"password\" is required');
    });
});

describe('Login', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    it('should login a user that is registered', async () => {
        const user = await generateUserWithDefaultPassword();

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: user.email,
                password: '1234'
            });

        expect(response.status).toBe(200);

        const testSchema = {
            $ref: 'loginResponse#/definitions/login',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);

        const { user: userResponse } = response.body;
        expect(userResponse.name).toBe(user.name);
        expect(userResponse.email).toBe(user.email);
    });

    it('should validate user credentials', async () => {
        await generateUser('name', 'email');

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'wrong@email.com',
                password: 'wrong',
            });

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('Email or password incorrect');
    });

    it('should give error 400 when email is not present', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                password: 'password'
            });

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('\"email\" is required');
    });

    it('should give error 400 when password is not present', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'email@email.com'
            });

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('\"password\" is required');
    });

    it('should give error 400 when email is invalid', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'name',
                email: 'not an email',
                password: 'password'
            });

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('\"email\" must be a valid email');
    });
});

describe('Refresh token', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    it('should refresh user token', async () => {
        const user = await generateUser('name', 'a@a.com');

        const response = await request(app)
            .post('/api/auth/refresh')
            .send({
                refresh_token: user.refresh_token
            });

        expect(response.status).toBe(200);
    });

    it('should give error 400 when refresh token is not present', async () => {
        const response = await request(app)
            .post('/api/auth/refresh')
            .send();

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('\"refresh_token\" is required');
    });
});