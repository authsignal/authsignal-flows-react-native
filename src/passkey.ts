import type { PasskeyVerifyInput, VerifyResponse } from './AuthsignalFlows.types';
import AuthsignalFlowsModule from './AuthsignalFlowsModule';
import { mapNativeError } from './errors';

export class AuthsignalFlowPasskey {
  private autofillRequestPending = false;

  /**
   * @throws {UserCanceledError} if the user dismisses the prompt, or the device has no
   *   passkeys available.'
   * @returns `undefined` if an autofill request was already pending and this call was
   *   skipped as a result — that's a benign no-op, not an error.
   */
  async verify({
    autofill = false,
    preferImmediatelyAvailableCredentials = true,
    syncCredentials = false,
  }: PasskeyVerifyInput = {}): Promise<VerifyResponse | undefined> {
    if (autofill) {
      if (this.autofillRequestPending) {
        return undefined;
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
      throw mapNativeError(ex);
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
