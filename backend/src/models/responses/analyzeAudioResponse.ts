export type AnalyzeAudioResponse = {
  results: {
    id: number;
    criterion: string;
    answer: boolean;
  }[];
  transcription: string;
};
