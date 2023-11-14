export type AnalyzeAudioResponse = {
  data: {
    results: {
      id: number;
      criterion: string;
      answer: boolean;
    }[];
    transcription: string;
  };
};
