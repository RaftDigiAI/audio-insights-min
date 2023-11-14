import { ExegesisContext } from "exegesis";
import { Logger } from "../log/logger";
import { AnalyzeAudioRequest } from "../models/requests/analyzeAudioRequest";
import { AnalyzeAudioResponse } from "../models/responses/analyzeAudioResponse";
import { HttpIncomingMessageWithFileData } from "../models/types/exegesis";
import { VoiceToTextService } from "../services/voiceToTextService";
import { AnalyzeCriteriaService } from "../services/analyseCriteriaService";

export async function analyze(
  context: ExegesisContext
): Promise<AnalyzeAudioResponse> {
  try {
    const request = (context.req as HttpIncomingMessageWithFileData)
      .requestBody as AnalyzeAudioRequest;
    const fileData = (context.req as HttpIncomingMessageWithFileData).fileData;
    if (
      !fileData.name.toLowerCase().endsWith(".txt") &&
      !fileData.name.toLowerCase().endsWith(".mp3")
    ) {
      context.res.status(400).json({
        message: "Invalid file type",
        code: 400,
      });
    }
    let results = request.criteria.map((c) => {
      return {
        ...c,
        answer: false,
      };
    });

    let transcription = "";
    if (fileData.name.toLowerCase().endsWith(".txt")) {
      transcription = fileData.data.toString();
    }

    if (fileData.name.toLowerCase().endsWith(".mp3")) {
      const voiceToTextService = new VoiceToTextService();
      transcription = await voiceToTextService.transcript(fileData.data);
    }

    const analyzeService = new AnalyzeCriteriaService();
    for (const criterion of request.criteria) {
      const result = await analyzeService.analyze(criterion, transcription);

      results = results.map((r) => {
        if (r.id === criterion.id) {
          return {
            ...r,
            answer: result,
          };
        }
        return r;
      });
    }

    return {
      results,
      transcription: transcription,
    };
  } catch (err) {
    Logger.Error("Failed to analyze a file", { err });
    throw err;
  }
}
