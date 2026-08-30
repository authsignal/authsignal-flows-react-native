import type {
  AuthsignalResponse,
  PasskeyVerifyInput,
  VerifyResponse,
} from './AuthsignalFlows.types';
import AuthsignalFlowsModule from './AuthsignalFlowsModule';
import { handleNativeError } from './errors';

export class AuthsignalFlowPasskey {
  private autofillRequestPending = false;

  async verify({
    autofill = false,
    preferImmediatelyAvailableCredentials = true,
    syncCredentials = false,
  }: PasskeyVerifyInput = {}): Promise<AuthsignalResponse<VerifyResponse>> {
    if (autofill) {
      if (this.autofillRequestPending) {
        return {};
      }

      this.autofillRequestPending = true;
    }

    try {
      return await AuthsignalFlowsModule.passkeyVerify(
        autofill,
        preferImmediatelyAvailableCredentials,
        syncCredentials
      );
    } catch (ex) {
      return handleNativeError(ex);
    } finally {
      this.autofillRequestPending = false;
    }
  }

  cancel(): void {
    AuthsignalFlowsModule.passkeyCancel();
  }

  isSupported(): boolean {
    return AuthsignalFlowsModule.passkeyIsSupported();
  }
}
