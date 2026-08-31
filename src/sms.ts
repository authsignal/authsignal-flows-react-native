import type { SmsChallengeResponse, VerifyResponse } from './AuthsignalFlows.types';
import AuthsignalFlowsModule from './AuthsignalFlowsModule';
import { mapNativeError } from './errors';

export class AuthsignalFlowSms {
  async challenge(phoneNumber?: string): Promise<SmsChallengeResponse> {
    try {
      return await AuthsignalFlowsModule.smsChallenge(phoneNumber);
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }

  /**
   * @throws {InvalidCodeError} if `verificationCode` doesn't match.
   */
  async verify(verificationCode: string): Promise<VerifyResponse> {
    try {
      return await AuthsignalFlowsModule.smsVerify(verificationCode);
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }
}
