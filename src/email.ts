import type {
  AuthsignalResponse,
  EmailChallengeResponse,
  VerifyResponse,
} from './AuthsignalFlows.types';
import AuthsignalFlowsModule from './AuthsignalFlowsModule';
import { handleNativeError } from './errors';

export class AuthsignalFlowEmail {
  async challenge(): Promise<AuthsignalResponse<EmailChallengeResponse>> {
    try {
      return await AuthsignalFlowsModule.emailChallenge();
    } catch (ex) {
      return handleNativeError(ex);
    }
  }

  async verify(verificationCode: string): Promise<AuthsignalResponse<VerifyResponse>> {
    try {
      return await AuthsignalFlowsModule.emailVerify(verificationCode);
    } catch (ex) {
      return handleNativeError(ex);
    }
  }
}
