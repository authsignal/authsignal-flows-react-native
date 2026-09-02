import type { PasskeyVerifyInput, VerifyResponse } from './AuthsignalFlows.types';
import AuthsignalFlowsModule from './AuthsignalFlowsModule';
import { AutofillRequestPendingError, mapNativeError } from './errors';

export class AuthsignalFlowPasskey {
  private autofillRequestPending = false;

  /**
   * @throws {UserCanceledError} if the user dismisses the prompt, or the device has no
   *   passkeys available.
   * @throws {AutofillRequestPendingError} if `autofill` is true and an autofill request
   *   is already pending.
   */
  async verify({
    autofill = false,
    preferImmediatelyAvailableCredentials = true,
    syncCredentials = false,
  }: PasskeyVerifyInput = {}): Promise<VerifyResponse> {
    if (autofill) {
      if (this.autofillRequestPending) {
        throw new AutofillRequestPendingError('An autofill request is already pending.');
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
