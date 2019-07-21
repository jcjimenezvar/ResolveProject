import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { IResolveStudioService } from '.';
import { TYPES } from '../../config/ioc/types';
import { IConfig } from '../../config/vars';

@provide(TYPES.IResolveStudioService)
export class ResolveStudioService implements IResolveStudioService {
  private bucketName: string = `${this.config.getVars().gcp.gcsBucket}`
  private storage: string = `${this.config.getVars().gcp.gcsStorageFile}`
  private objReferences: any = {}
  private gcs = this.googleCloudStorage()
  private contador: number = 0
  private totalReq: number = 0 

  constructor(
    @inject(TYPES.IConfig) private config: IConfig,    
  ) {}

  public uploadImage = (payload: any) => {
    const objResponse = {
      imagesRef: {},
      status: false,
    }
    
    /*const objImg = this.getImagesPayload('img_', payload)
    const clientId = payload.clientId
    let fileName: string = ''
    let contentFile: string = ''
    let file: string = ''
    let myBucket: any = ''
    let fileBucket: any = ''
    let now: any = ''
    myBucket = this.gcs.bucket(this.bucketName)
    this.totalReq = Object.keys(objImg).length*/

    /*return new Promise((resolve, reject) => {
      for (const i in objImg) {
        if (objImg.hasOwnProperty(i)) {
          contentFile = objImg[i]
          now = Date.now()
          file = `${clientId}${this.contador}-${now}`
          fileName = `${file}.txt`
          // this.objReferences[i] = file
          objResponse.imagesRef[i] = file
          this.contador += 1
          fileBucket = myBucket.file(fileName)
          const bufferStream = new PassThrough()

          bufferStream.end(Buffer.from(contentFile, 'utf-8'))
          bufferStream
            .pipe(
              fileBucket.createWriteStream({
                metadata: {
                  contentType: 'text/plain',
                  metadata: { custom: 'metadata' },
                },
                public: false,
                validation: 'md5',
              })
            )
            .on('error', (error: any) => {              
              throw new Error(error)
            })
            .on('finish', () => {
              if (this.contador === this.totalReq) {
                objResponse.status = true
                return resolve(objResponse)
              }
            })
        }
      }
    })*/
  }

  public existsFileGCSDelete = async (objImg: any) => {
    for (const i in objImg) {
      if (objImg.hasOwnProperty(i)) {
        try {
          const referencia = `${objImg[i]}.txt`
          await this.gcs
            .bucket(this.bucketName)
            .file(referencia)
            .exists()
          const valor = { referencia }
          await this.deleteFileStorage(valor)
        } catch (error) {          
          throw new Error(error)
        }
      }
    }
    return true
  }

  public deleteFileStorage = async (payload: any) => {
    try {
      const referencia = payload.referencia
      await this.gcs
        .bucket(this.bucketName)
        .file(`${referencia}.txt`)
        .delete()
      return true
    } catch (error) {
      throw new Error(error)
    }
  }

  public getImageStorage = async (imagenes: any) => {
    const imagenesGCS: any = []

    for (const i in imagenes) {
      if (imagenes.hasOwnProperty(i)) {
        try {
          let imageExists: any
          imageExists = true // await this.existsFileGCS(imagenes[i])

          if (!imageExists) {
            return false
          }
          const referencia = `${imagenes[i]}`
          const bucketName = `${this.bucketName}`
          const srcFilename = `${referencia}.txt`
          const destFilename = `${this.config.basePath}${
            this.storage
          }${referencia}.txt`

          const options = {
            destination: destFilename,
          }
          // Downloads the file

          try {
            if (imageExists) {
              await this.gcs
                .bucket(bucketName)
                .file(srcFilename)
                .download(options)
            } else {
              return false
            }
          } catch (error) {
            throw new Error(error)
          }

          const contenido = await fs.readFileSync(`${destFilename}`, 'utf8')
          if (contenido === '') {
            return false
          }
          imagenesGCS.push(contenido)

          const valor = { referencia }

          await this.deleteFileStorage(valor)          
        } catch (error) {
          throw new Error(error)
        }
      }
    }
    return imagenesGCS
  }

  public googleCloudStorage() {
    const gcs = new Storage({
      keyFilename: `${this.config.getVars().gcp.gcsStorageKey}`,
      projectId: `${this.config.getVars().gcp.gcsStorageId}`,
    })
    return gcs
  }
}
