import type { VerifyResponse, WhatsappChallengeResponse } from './AuthsignalFlows.types';
import AuthsignalFlowsModule from './AuthsignalFlowsModule';
import { mapNativeError } from './errors';

export class AuthsignalFlowWhatsapp {
  async challenge(phoneNumber?: string): Promise<WhatsappChallengeResponse> {
    try {
      return await AuthsignalFlowsModule.whatsappChallenge(phoneNumber);
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }

  /**
   * @throws {InvalidCodeError} if `verificationCode` doesn't match.
   */
  async verify(verificationCode: string): Promise<VerifyResponse> {
    try {
      return await AuthsignalFlowsModule.whatsappVerify(verificationCode);
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }
}
