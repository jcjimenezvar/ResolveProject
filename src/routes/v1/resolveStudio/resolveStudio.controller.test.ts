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
  
  test('POST processInformation, Payload Correcto retorna 200', async done => {
    // Preparacion de HTTP props
    const body = {
      neighborhood: "Mitte"
    }
    const req = createRequest({
      body,
      // tslint:disable-next-line: object-literal-sort-keys
      method: 'POST',
      url: `/resolveStudio/v1/resolveStudio`,
    })
    const res = createResponse()
    const next = () => {
      done()
    }

    // mock de servicio
    resolveStudioService.processInformation = jest.fn(d => {
      return true
    })

    // llamo metodo del controller con las props
    await resolveStudioController.processInformation(req, res, next)

    // finalizo response y verifico resultados
    res.end()
    const data = JSON.parse(res._getData())
    expect(data).toBeTruthy()
    expect(res._getStatusCode()).toEqual(200)
    expect(data.errors).toBeFalsy()
    done()
  })
})

