import { Storage } from "@google-cloud/storage";
import fs from "fs";
import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";
import { IResolveStudioService } from ".";
import { TYPES } from "../../config/ioc/types";
import { IConfig } from "../../config/vars";

@provide(TYPES.IResolveStudioService)
export class ResolveStudioService implements IResolveStudioService {
  private bucketName: string = `${this.config.getVars().gcp.gcsBucket}`;
  private storage: string = `${this.config.getVars().gcp.gcsStorageFile}`;
  private objReferences: any = {};
  private gcs = this.googleCloudStorage();
  private contador: number = 0;
  private totalReq: number = 0;

  constructor(@inject(TYPES.IConfig) private config: IConfig) {}

  public processInformation = (payload: any) => {
    const neighborhood: string = payload.neighborhood;    
    let myBucket: any = "";
    myBucket = this.gcs.bucket(this.bucketName);
    // tslint:disable-next-line: no-console
    console.log(neighborhood);
    return true
  };

  public googleCloudStorage() {
    const gcs = new Storage({
      keyFilename: `${this.config.getVars().gcp.gcsStorageKey}`,
      projectId: `${this.config.getVars().gcp.gcsStorageId}`
    });
    return gcs;
  }
}
