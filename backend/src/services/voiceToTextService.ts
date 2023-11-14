import config from "config";
import OpenAI from "openai";
import { File } from "@web-std/file";

export class VoiceToTextService {
  private openai: OpenAI;
  constructor() {
    const apiKey = config.get<string>("openAIToken");
    this.openai = new OpenAI({ apiKey });
  }

  async transcript(buffer: Buffer): Promise<string> {
    const file = new File([buffer], "audio.mp3", {
      type: "audio/mp3",
    });

    const transcription = await this.openai.audio.transcriptions.create({
      file,
      model: "whisper-1",
    });

    return transcription.text;
  }
}
