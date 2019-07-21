import "reflect-metadata";

import { IConfig } from "@config/vars";
import { Storage } from "@google-cloud/storage";
import { gcs } from "@services/resolveStudio/googleCloudStorage";
import { ResolveStudioService } from "@services/resolveStudio/resolveStudioService";
import fs from "fs";
jest.mock("fs");
import { PassThrough } from "stream";

class MockConfig implements IConfig {
  public getVars = () => {
    return {
      gcp: {
        gcsStorageFile: "http://gcsStorageFile"
      },
      logger: {
        level: "info"
      }
    };
  };
}

describe("ResolveStudioService", () => {
  const config = new MockConfig();
  let resolveStudioService = new ResolveStudioService(config);

  test("ImageUploadService instancia correctamente", () => {
    resolveStudioService = new ResolveStudioService(config);
    expect(resolveStudioService).toBeDefined();
  });

  /*test("uploadImage devuelve referencias de imagenes enviadas", async () => {
    const payload = {
      clientId: "client-id",
      img_image1: "image1",
      img_image2: "image2",
      img_image3: "image3",
      img_image4: "image4"
    };
    gcs.bucket = jest.fn().mockImplementation(() => {
      return {
        file: () => {
          return {
            createWriteStream: () => ({})
          };
        }
      };
    });

    PassThrough.prototype.end = jest.fn().mockImplementation(() => ({}));
    PassThrough.prototype.pipe = jest.fn().mockImplementation(() => {
      return {
        on: () => {
          return {
            on: (str: string, callback: any) => {
              callback();
            }
          };
        }
      };
    });

    try {
      const imageResp: any = await imageUploadService.uploadImage(payload);
      const images = imageUploadService.getImagesPayload("img_", payload);
      expect(imageResp.status).toBe(true);
      expect(imageResp).toBeTruthy();
      expect(imageResp.imagesRef).toBeTruthy();
      expect(Object.keys(imageResp.imagesRef).length).toBe(
        Object.keys(images).length
      );
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });*/
});
