
import { IResolveStudioService } from '..'

export class ResolveStudioService implements IResolveStudioService {
  public processInformation = jest.fn((payload: any) => Promise.resolve({}))  
}
