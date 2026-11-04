import type {
  AppCredential,
  CreatePinInput,
  DeletePinInput,
  InAppAddCredentialInput,
  InAppCredentialInput,
  VerifyPinInput,
  VerifyResponse,
} from './AuthsignalFlows.types';
import AuthsignalFlowsModule from './AuthsignalFlowsModule';
import { mapNativeError } from './errors';

export class AuthsignalFlowInApp {
  /**
   * Returns the credential for this device, or `null` if the device has no in-app key.
   */
  async getCredential({ username }: InAppCredentialInput = {}): Promise<AppCredential | null> {
    try {
      return await AuthsignalFlowsModule.inappGetCredential(username);
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }

  /**
   * Creates a key on this device and adds it as an in-app authenticator for the current flow.
   */
  async addCredential({
    username,
    requireUserAuthentication = false,
    keychainAccess,
  }: InAppAddCredentialInput = {}): Promise<VerifyResponse> {
    try {
      return await AuthsignalFlowsModule.inappAddCredential(
        requireUserAuthentication,
        keychainAccess,
        username
      );
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }

  /**
   * Removes the in-app authenticator for this device and deletes the key.
   *
   * @throws {CredentialNotFoundError} if the device has no in-app key.
   */
  async removeCredential({ username }: InAppCredentialInput = {}): Promise<void> {
    try {
      await AuthsignalFlowsModule.inappRemoveCredential(username);
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }

  /**
   * Verifies the current flow step by signing a challenge with this device's key.
   * Starts a new flow if a client ID is configured and no flow is in progress.
   *
   * @throws {CredentialNotFoundError} if the device has no in-app key.
   */
  async verify({ username }: InAppCredentialInput = {}): Promise<VerifyResponse> {
    try {
      return await AuthsignalFlowsModule.inappVerify(username);
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }

  /**
   * Adds an in-app credential for `username` and protects it with a PIN stored on this device.
   *
   * @throws {InvalidPinFormatError} if the PIN isn't at least 4 digits.
   */
  async createPin({ pin, username }: CreatePinInput): Promise<VerifyResponse> {
    try {
      return await AuthsignalFlowsModule.inappCreatePin(pin, username);
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }

  /**
   * Checks the PIN for `username`, then verifies the current flow step with its in-app credential.
   *
   * @throws {InvalidPinError} if the PIN doesn't match.
   */
  async verifyPin({ pin, username }: VerifyPinInput): Promise<VerifyResponse> {
    try {
      return await AuthsignalFlowsModule.inappVerifyPin(pin, username);
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }

  /**
   * Removes the in-app credential for `username` and deletes its PIN.
   */
  async deletePin({ username }: DeletePinInput): Promise<void> {
    try {
      await AuthsignalFlowsModule.inappDeletePin(username);
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }

  getAllPinUsernames(): string[] {
    return AuthsignalFlowsModule.inappGetAllPinUsernames();
  }
}
