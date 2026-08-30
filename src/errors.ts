import type { AuthsignalResponse } from './AuthsignalFlows.types';

export function handleNativeError(ex: unknown): AuthsignalResponse<never> {
  if (ex instanceof Error) {
    const errorCode = 'code' in ex && typeof ex.code === 'string' ? ex.code : undefined;

    return { error: ex.message, errorCode };
  }

  return { error: 'An unknown error occurred.' };
}
