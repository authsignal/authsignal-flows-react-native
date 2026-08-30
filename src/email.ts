import type { EmailChallengeResponse, VerifyResponse } from './AuthsignalFlows.types';
import AuthsignalFlowsModule from './AuthsignalFlowsModule';
import { mapNativeError } from './errors';

export class AuthsignalFlowEmail {
  async challenge(): Promise<EmailChallengeResponse> {
    try {
      return await AuthsignalFlowsModule.emailChallenge();
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }

  /**
   * @throws {InvalidCodeError} if `verificationCode` doesn't match.
   */
  async verify(verificationCode: string): Promise<VerifyResponse> {
    try {
      return await AuthsignalFlowsModule.emailVerify(verificationCode);
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }
}
