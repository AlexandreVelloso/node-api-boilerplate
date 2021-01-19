import { Response } from 'express';

import ErrorHandlerMiddleware from '../Middleware/ErrorHandlerMiddleware';
import { LoginCredentials } from '../DTOs/UserCredentialsDTO';

abstract class BaseController {

    public async index(req: any, res: Response) {
        const user: LoginCredentials = req.auth.user;

        try {
            const response = await this.indexImpl(user);
            return this.ok(res, response);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }

    public async get(req: any, res: Response) {
        const user: LoginCredentials = req.auth.user;

        try {
            const response = await this.getImpl(req, user);
            return this.ok(res, response);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }

    public async create(req: any, res: Response) {
        const user: LoginCredentials = req.auth.user;

        try {
            const response = await this.createImpl(req, user);
            return this.created(res, response);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }

    public async update(req: any, res: Response) {
        const user: LoginCredentials = req.auth.user;

        try {
            const response = await this.updateImpl(req, user);
            return this.ok(res, response);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }

    public async delete(req: any, res: Response) {
        const user: LoginCredentials = req.auth.user;

        try {
            await this.deleteImpl(req, user);
            return this.ok(res);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }

    protected abstract indexImpl(user: LoginCredentials): Promise<void | any>;

    protected abstract getImpl(req: any, user: LoginCredentials): Promise<void | any>;

    protected abstract createImpl(req: any, user: LoginCredentials): Promise<void | any>;

    protected abstract updateImpl(req: any, user: LoginCredentials): Promise<void | any>;

    protected abstract deleteImpl(req: any, user: LoginCredentials): Promise<void | any>;

    public jsonResponse(res: Response, code: number, json: any) {
        return res.status(code).json(json)
    }

    private ok(res: Response, dto?: any): any {
        if (!!dto) {
            return this.jsonResponse(res, 200, dto);
        }

        return res.end();
    }

    private created(res: Response, dto?: any): any {
        if (!!dto) {
            return this.jsonResponse(res, 201, dto);
        }

        return res.status(201).end();
    }
}

export default BaseController;