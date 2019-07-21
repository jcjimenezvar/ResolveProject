
import { IResolveStudioService } from '..'

export class ResolveStudioService implements IResolveStudioService {
  public uploadImage = jest.fn((payload: any) => Promise.resolve({}))
  public uploadStorage = jest.fn((payload: any) => Promise.resolve({}))
  public existsFileDelete = jest.fn((payload: any) => Promise.resolve({}))
  public existsFileGCSDelete = jest.fn((payload: any) => Promise.resolve({}))
  public deleteFile = jest.fn((payload: any) => Promise.resolve({}))
  public deleteFileStorage = jest.fn((payload: any) => Promise.resolve({}))
  public getImageStorage = jest.fn((payload: any) => Promise.resolve({}))
  public listObjects = jest.fn((payload: any) => Promise.resolve({}))
}
