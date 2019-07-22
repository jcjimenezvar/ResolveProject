import 'reflect-metadata';

import bodyParser from 'body-parser';
import cors from 'cors';
import expressFileupload from 'express-fileupload';
import helmet from 'helmet';
import { InversifyExpressServer } from 'inversify-express-utils';
import { createLightship } from 'lightship';
import mongoose from 'mongoose';
import { container } from './config/ioc/inversify.config';
import './config/ioc/loader';
import { TYPES } from './config/ioc/types';
import { ConfigService } from './config/vars/configService';



import dotenv = require('dotenv')
if (process.env.NODE_ENV !== 'production') {
  dotenv.load()
}

// Inicializar configuracion desde ambiente

const config = new ConfigService()
const configErr = config.load()
if (configErr) throw new Error(configErr)

// registrar instancia de config en container de dependencias
container.bind<any>(TYPES.IConfig).toConstantValue(config)


// Obtener variables de configuración desde entorno
const httpPort = config.getVars().server.port
const httpRootPath = config.getVars().server.rootPath

// conFiguracion de la base de datos

mongoose.connect('mongodb://localhost:27017/resolveStudio', { useNewUrlParser: true })
  // tslint:disable-next-line: no-console
  .then(db => console.log('Db conected')).catch(err => {console.log(err)})

// Configurar wrap de Express con Inversify para proveer inversión de control e inyección de dependencias
const server = new InversifyExpressServer(container, null, {
    rootPath: httpRootPath,
  })
  
  server.setConfig(expressApp => {    
    expressApp.use(expressFileupload())
    expressApp.use(bodyParser.json())
    expressApp.use(helmet())
    expressApp.use(cors())    
  })
  const app = server.build()

  const lightship = createLightship({ port: 9000 })

  lightship.registerShutdownHandler(() => {
    httpServer.close()
  })

  const httpServer = app.listen(httpPort, () => {
    // tslint:disable-next-line: no-console
    console.log('Api started at localhost on port', httpPort)
    // agrego un tiempo de 10 segundos de warm up para enviar señal de readyness y recibir tráfico
    setTimeout(() => {
      lightship.signalReady()
    }, 10000)
  })
  
  exports = module.exports = app