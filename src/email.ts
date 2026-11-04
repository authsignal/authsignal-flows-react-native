import type { EmailChallengeResponse, VerifyResponse } from './AuthsignalFlows.types';
import AuthsignalFlowsModule from './AuthsignalFlowsModule';
import { mapNativeError } from './errors';

export class AuthsignalFlowEmail {
  async challenge(email?: string): Promise<EmailChallengeResponse> {
    try {
      return await AuthsignalFlowsModule.emailChallenge(email);
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }

  /**
   * @throws {InvalidCodeError} if `verificationCode` doesn't match.
   * @throws {FlowExpiredError} if the flow has expired.
   */
  async verify(verificationCode: string): Promise<VerifyResponse> {
    try {
      return await AuthsignalFlowsModule.emailVerify(verificationCode);
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }
}
