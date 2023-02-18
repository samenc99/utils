import { HttpException, Logger } from '@nestjs/common';
import { EMessage } from '../enum/message.enum';
import { Response } from 'express';

export abstract class ControllerAbstract {
  protected logger: Logger;

  protected constructor() {
    this.logger = new Logger((this as any).constructor.name);
  }

  async handleRequest<T>(
    res: Response,
    facadeCallback: () => Promise<any>,
    status = 200,
  ): Promise<T | Error> {
    try {
      return await this.handleResponse(res, facadeCallback, status);
    } catch (err) {
      return this.handleError(res, err);
    }
  }

  async handleResponse<T>(
    res: Response,
    facadeCallback: () => Promise<any>,
    status = 200,
  ): Promise<T> {
    const data = await facadeCallback();

    res.status(status);
    res.json(data);
    return data;
  }

  handleError(res: Response, err: any): Error {
    console.log(err);

    if (err instanceof HttpException && err.getStatus() < 500) {
      res.status(err.getStatus());
      res.json({ message: err.message });
      return err;
    }

    res.status(500);
    res.json({ message: EMessage.INTERNAL_ERROR });
    return err;
  }
}
