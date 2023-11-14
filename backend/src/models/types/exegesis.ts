import { HttpIncomingMessage } from 'exegesis';
import { FileData } from '../file/fileData';

export interface HttpIncomingMessageWithFileData extends HttpIncomingMessage {
  fileData: FileData;
  requestBody: unknown;
}
