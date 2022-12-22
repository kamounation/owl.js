import winston from "winston";
import { ErrorRes } from "./errorHandler";

export class Logger {
  error(err: ErrorRes) {
    throw new Error("Method not implemented.");
  }
  public config: string;
  constructor(nodeEnv: string) {
    this.config = nodeEnv;
  }
  /**
   * checks if the info passed through the logger is an error, if true it passes the stack as the message to the info and returns
   */
  private enumerateErrorFormat = winston.format((info: any) => {
    if (info instanceof Error) {
      Object.assign(info, { message: info.stack });
    }
    return info;
  });

  public logger = winston.createLogger({
    // @ts-expect-error
    level: this.config === "development" ? "debug" : "info",
    format: winston.format.combine(
      this.enumerateErrorFormat(),
      // @ts-expect-error
      this.config === "development"
        ? winston.format.colorize()
        : winston.format.uncolorize(),
      winston.format.splat(),
      winston.format.printf(({ level, message }) => `${level}: ${message}`)
    ),
    transports: [
      new winston.transports.Console({
        stderrLevels: ["error"],
      }),
    ],
  });
}
