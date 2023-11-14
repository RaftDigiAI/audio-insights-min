import { BodyParser, Callback, HttpIncomingMessage } from 'exegesis';
import http from 'http';
import { File, Files, IncomingForm } from 'formidable';
import { promises } from 'fs';
import { FileData } from '../models/file/fileData';
import { HttpIncomingMessageWithFileData } from '../models/types/exegesis';

export class FormDataParser implements BodyParser {
  parseReq(req: HttpIncomingMessage, res: http.ServerResponse, next: Callback<unknown>) {
    const form = new IncomingForm({
      keepExtensions: true,
      multiples: false
    });
    form.parse(req, (err, fields, files: Files) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error parsing form data');
        next();
        return;
      }

      if (fields.request?.length) {
        const request = JSON.parse(fields.request?.[0]);
        (req as HttpIncomingMessageWithFileData).requestBody = request;
      }

      let file: File;
      if (files.file instanceof Array) {
        file = files.file[0];
      } else {
        file = files.file as unknown as File;
      }

      if (!file) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('No file uploaded');
        return;
      }

      const fileBlob = promises.readFile(file.filepath);
      fileBlob
        .then((data: Buffer) => {
          const fileData: FileData = {
            data,
            name: file.originalFilename || file.newFilename
          };
          (req as HttpIncomingMessageWithFileData).fileData = fileData;
        })
        .finally(() => {
          promises.unlink(file.filepath);
          next();
        });
    });
  }
}
