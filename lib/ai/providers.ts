import { customProvider } from 'ai';
import { echo } from './echo/provider';
import { artifactModel, chatModel, titleModel } from './models.test';
import { isTestEnvironment } from '../constants';

export const myProvider = isTestEnvironment
  ? (_: string) =>
      customProvider({
        languageModels: {
          'chat-model': chatModel,
          'title-model': titleModel,
          'artifact-model': artifactModel,
        },
      })
  : (token: string) =>
      customProvider({
        languageModels: {
          'chat-model': echo(token).chat('gpt-4.1'),
          'title-model': echo(token).chat('gpt-4.1-nano'),
          'artifact-model': echo(token).chat('gpt-4.1'),
        },
      });
