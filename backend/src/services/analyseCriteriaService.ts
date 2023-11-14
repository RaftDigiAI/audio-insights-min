import config from "config";
import { Criterion } from "../models/criteria/criterion";
import OpenAI from "openai";

export class AnalyzeCriteriaService {
  private openai: OpenAI;
  constructor() {
    const apiKey = config.get<string>("openAIToken");
    this.openai = new OpenAI({ apiKey });
  }

  async analyze(criterion: Criterion, conversation: string): Promise<boolean> {
    const prompt = `You are an expert evaluating whether criterion is met for a given conversation in Russian.
    Please analyze the conversation and return yes if the criterion is met and no if it is not.
    ---
    Conversation: ${conversation}
    ---
    Criterion: ${criterion.criterion}
    ---
    Please answer yes or no without any additional comments.
    `;

    const model = config.get<string>("openAIModel");
    const chatCompletion = await this.openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: model,
    });

    const result = chatCompletion.choices[0].message.content;
    return result?.toLowerCase() === "yes";
  }
}
