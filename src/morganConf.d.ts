export declare class MorganFactory {
    constructor();
    private getIpFormat;
    successResponseFormat: string;
    errorResponseFormat: string;
    successHandler: (req: any, res: any, callback: (err?: Error) => void) => void;
    errorHandler: (req: any, res: any, callback: (err?: Error) => void) => void;
}
