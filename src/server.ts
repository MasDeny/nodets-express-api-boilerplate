import * as express from 'express';
import { Response, Request } from 'express';
// import { connection } from './datasources/mysqldb';
// import { RegisterRoutes } from './routers/routes';
import * as bodyParser from 'body-parser';
import * as swaggerUi from 'swagger-ui-express';
import 'reflect-metadata';
import { config } from 'dotenv';
import * as cors from 'cors';
import * as path from 'path';
import { RegisterRoutes } from './routers/routes';

// import { errorHandler, notFoundHandler } from './errors/errorHandler';

config()

class App {
  public app = express()
  public port:number

  constructor({ port }: { port:number }){
    this.port = port
    this.initServer()
    RegisterRoutes(this.app)
    this.swaggerUiInit
  }
  
  initServer = () => {
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    this.app.disable('x-powered-by');
    this.app.use(bodyParser.json());
    this.app.use(
      cors({
        credentials: true,
        origin: (_origin, callback) => {
          return callback(null, true);
        },
      })
    );
  };

  private swaggerUiInit = () => {
    this.app.use(
      '/api/docs',
      swaggerUi.serve,
      async (_req: Request, res: Response) => {
        return res.send(
          swaggerUi.generateHTML(await import('../public/swagger.json'))
        );
      }
    );
  };
  
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}

export { App }
