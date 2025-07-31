import { createOpenAI } from '@ai-sdk/openai';

export const echo = (token: string) =>
  createOpenAI({
    baseURL: 'https://echo.router.merit.systems',
    apiKey: token,
  });
