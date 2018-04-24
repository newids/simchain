// src/app/api-response.ts

export interface ApiResponse {
  success: boolean;
  message: string;
  errors: any;
  data: any;
}
