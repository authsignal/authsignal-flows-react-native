import type {
  PasskeyRegisterInput,
  PasskeyShouldPromptInput,
  PasskeyVerifyInput,
  VerifyResponse,
} from './AuthsignalFlows.types';
import AuthsignalFlowsModule from './AuthsignalFlowsModule';
import { AutofillRequestPendingError, mapNativeError } from './errors';

export class AuthsignalFlowPasskey {
  private autofillRequestPending = false;

  /**
   * Creates a passkey for the user and adds it as an authenticator.
   *
   * @throws {UserCanceledError} if the user dismisses the prompt.
   * @throws {MatchedExcludedCredentialError} if the user already has a passkey for this
   *   account on the device.
   */
  async register({ username, displayName }: PasskeyRegisterInput = {}): Promise<VerifyResponse> {
    try {
      return await AuthsignalFlowsModule.passkeyRegister(username, displayName);
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }

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

  async shouldPromptToCreatePasskey({ username }: PasskeyShouldPromptInput = {}): Promise<boolean> {
    try {
      return await AuthsignalFlowsModule.passkeyShouldPromptToCreatePasskey(username);
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }

  isSupported(): boolean {
    return AuthsignalFlowsModule.passkeyIsSupported();
  }
}
