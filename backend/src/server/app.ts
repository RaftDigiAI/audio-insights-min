import * as exegesis from "exegesis";
import config from "config";
import cors, { CorsOptions } from "cors";
import exegesisExpress from "exegesis-express";
import exegesisSwaggerUIPlugin from "exegesis-plugin-swagger-ui-express";
import express, { NextFunction, Request, Response } from "express";
import http from "http";
import path from "path";
import { Logger } from "../log/logger";
import { FormDataParser } from "../middleware/formDataMiddleware";

async function createServer() {
  const app = express();
  const corsOptions: CorsOptions = {
    origin: config.get<string>("cors.allowedOrigins").split(","),
  };

  Logger.Info("Using CORS options", corsOptions);
  app.use(cors(corsOptions));

  const options: exegesis.ExegesisOptions = {
    controllers: path.resolve(__dirname, "../controllers"),
    allowMissingControllers: false,
    mimeTypeParsers: {
      "multipart/form-data": new FormDataParser(),
    },
    plugins: [
      exegesisSwaggerUIPlugin({
        app: app,
        path: "/api-docs",
        swaggerUIOptions: {
          explorer: true,
        },
      }),
    ],
  };

  const exegesisMiddleware = await exegesisExpress(
    path.resolve(__dirname, "./openapi.yaml"),
    options
  );

  // If you have any body parsers, this should go before them.
  app.use(exegesisMiddleware);
  app.disable("x-powered-by");
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Return a 404
  app.use((req, res) => {
    res.status(404).json({ message: `Not found` });
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    Logger.Error("Internal error occurred", { err, url: req.url });
    const errorMessage = "Something went wrong. Please try again later.";
    res.status(500).json({ error: errorMessage });
  });

  const server = http.createServer(app);

  server.setTimeout(5 * 60 * 1000);

  return server;
}

const port = 5001;
createServer()
  .then((server) => {
    server.listen(port);
    Logger.Info(`Listening on port ${port}`);
    Logger.Info(`Swagger UI is available at http://localhost:${port}/api-docs`);
  })
  .catch((err) => {
    Logger.Error(err.stack);
    process.exit(1);
  });
