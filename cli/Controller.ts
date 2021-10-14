import BaseController from './BaseController';
import LoginCredentialsDTO from '../Dtos/LoginCredentialsDTO';
import TesteDTO from '../Dtos/TesteDTO';
import BaseValidator from '../Validators/BaseValidator';
import TesteService from '../Services/TesteService';

class TesteController extends BaseController {

    private TesteService: TesteService;
    private idValidator: BaseValidator;
    private indexTesteValidator: BaseValidator;
    private createTesteValidator: BaseValidator;
    private updateTesteValidator: BaseValidator;

    public constructor(opts: any) {
        super();

        this.idValidator = opts.idValidator;
        this.indexTesteValidator = opts.indexTesteValidator;
        this.createTesteValidator = opts.createTesteValidator;
        this.updateTesteValidator = opts.updateTesteValidator;
        this.TesteService = opts.TesteService;
    }

    protected async indexImpl(req: any, user: LoginCredentialsDTO): Promise<TesteDTO[]> {
        const {
            field,
        } = this.indexTesteValidator
            .validate(req);

        const Teste: TesteDTO[] = await this.TesteService
            .index(field);

        return Teste;
    }

    protected async getImpl(req: any, user: LoginCredentialsDTO): Promise<TesteDTO> {
        const { id: testeId } = this.idValidator
            .validate(req);

        const teste: TesteDTO = await this.TesteService
            .get(testeId);

        return teste;
    }

    protected async createImpl(req: any, user: LoginCredentialsDTO): Promise<TesteDTO> {
        const {
            field,
        } = this.createTesteValidator
            .validate(req);

        const teste: TesteDTO = await this.TesteService
            .create(field);

        return teste;
    }

    protected async updateImpl(req: any, user: LoginCredentialsDTO): Promise<TesteDTO> {
        const {
            field,
        } = this.updateTesteValidator
            .validate(req);

        const teste: TesteDTO = await this.TesteService
            .update(field);

        return teste;
    }

    protected async deleteImpl(req: any, user: LoginCredentialsDTO): Promise<void> {
        const { id: testeId } = this.idValidator
            .validate(req);

        await this.TesteService.delete(testeId);
    }

}

export default TesteController;