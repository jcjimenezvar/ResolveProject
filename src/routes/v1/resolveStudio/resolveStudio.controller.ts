import * as express from "express";
import { inject } from "inversify";
import { controller, httpPost, interfaces, next, request, response } from "inversify-express-utils";
import joi from "joi";
import { TYPES } from "../../../config/ioc/types";
import { IResolveStudioService } from "../../../services/resolveStudio";
import { resolveStudioSchema } from "./resolveStudio.model";

@controller("")
export class ResolveStudioController implements interfaces.Controller {
  constructor(
    @inject(TYPES.IResolveStudioService)
    private resolveStudioService: IResolveStudioService
  ) {}

  @httpPost("/resolveStudio")
  public async processInformation(
    @request() req: express.Request,
    @response() res: express.Response,
    @next() nextFunc: express.NextFunction
  ) {
    let ok = true;
    const dataPayload = req.body;
    // tslint:disable-next-line: no-console
    console.log('dataPayload', dataPayload)

    // Si la validación de los datos de la solicitud falla, entonces retornar error 400 / Invalid Request
    const validationResult = joi.validate(dataPayload, resolveStudioSchema);

    if (validationResult.error) {
      const httpResponse = {
        data: "",
        errors: ["invalid_request"]
      };
      res.status(422).json(httpResponse);
      nextFunc();
    } else {
      const httpResponse = { data: {} };

      try {
        httpResponse.data = await this.resolveStudioService.processInformation(
          dataPayload
        );
      } catch (error) {
        ok = false;
        res.status(500).json({ errors: error, str: JSON.stringify(error) });
      }

      if (ok) {
        res.json(httpResponse);
      }
      nextFunc();
    }
  }
}
