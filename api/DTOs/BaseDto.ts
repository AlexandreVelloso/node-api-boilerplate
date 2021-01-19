abstract class BaseDTO {
    static modelToDTO(_model: any): any {
        throw new Error('Method not implemented.');
    }

    static toDTO(t: any): any;
    static toDTO(t: any[]): any[];

    static toDTO(t: any): any {
        if (Array.isArray(t)) {
            return t.map(model => this.modelToDTO(model));
        }

        return this.modelToDTO(t);
    }
}

export default BaseDTO;