import axios, { AxiosInstance } from 'axios';
import { AnalyzeAudioRequest } from '../models/requests/analyzeAudioRequest';
import { AnalyzeAudioResponse } from '../models/responses/analyzeAudioResponse';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_HOST
    });
  }
  analyze = (request: AnalyzeAudioRequest, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('request', JSON.stringify(request));
    return this.axiosInstance.post<AnalyzeAudioRequest, AnalyzeAudioResponse>(
      `/analyze`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Referrer-Policy': 'no-referrer'
        },
        data: formData
      }
    );
  };
}

export default new ApiService();
