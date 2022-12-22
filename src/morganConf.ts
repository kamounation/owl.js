import morgan from "morgan";
import { Logger } from "./logger";
const logger = new Logger("developement");

morgan.token("message", (req: any, res: any) => res.locals.errorMessage || "");

export class MorganFactory {
  constructor() {}

  private getIpFormat = () =>
    logger.config === "production" ? ":remote-addr - " : "";
  successResponseFormat = `${this.getIpFormat()}:method :url :status - :response-time ms`;
  errorResponseFormat = `${this.getIpFormat()}:method :url :status - :response-time ms - message: :message`;

  public successHandler = morgan(this.successResponseFormat, {
    skip: (req: any, res: any) => res.statusCode >= 400,
    stream: { write: (message: string) => logger.logger.info(message.trim()) },
  });

  public errorHandler = morgan(this.errorResponseFormat, {
    skip: (req: any, res: any) => res.statusCode < 400,
    stream: { write: (message: string) => logger.logger.error(message.trim()) },
  });
}
