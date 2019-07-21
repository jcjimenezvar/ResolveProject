import 'reflect-metadata';

import { IConfig } from '@config/vars';
import { ResolveStudioService } from '@services/resolveStudio/resolveStudioService';
import { createRequest, createResponse } from 'node-mocks-http';
import { ResolveStudioController } from './resolveStudio.controller';



class MockConfig implements IConfig {
  public getVars = () => {
    return {
      gcp: {
        gcsStorageFile: 'http://gcsStorageFile',
      }
    }
  }
}

describe('ResolveStudioController', () => {
  const config = new MockConfig()  

  const resolveStudioService = new ResolveStudioService(config)

  let resolveStudioController = new ResolveStudioController(
    resolveStudioService
  )

  test('instancia correctamente', () => {
    resolveStudioController = new ResolveStudioController(
      resolveStudioService
    )
    expect(resolveStudioController).toBeDefined()
  })
  
  /*test('POST uploadImage, Payload Correcto retorna 200', async done => {
    // Preparacion de HTTP props
    const body = mockValidacion
    const req = createRequest({
      body,
      // tslint:disable-next-line: object-literal-sort-keys
      method: 'POST',
      url: `soporte/v1/uploadImage`,
    })
    const res = createResponse()
    const next = () => {
      done()
    }

    // mock de servicio
    imageUploadService.uploadImage = jest.fn(d => {
      return Promise.resolve(mockResponse)
    })

    // llamo metodo del controller con las props
    await imageUploaderController.uploadImage(req, res, next)

    // finalizo response y verifico resultados
    res.end()
    const data = JSON.parse(res._getData())
    expect(res._getStatusCode()).toEqual(200)
    expect(data.errors).toBeFalsy()
    done()
  })*/
})
