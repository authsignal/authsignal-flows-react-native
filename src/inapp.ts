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
  async getCredential({ username }: InAppCredentialInput = {}): Promise<AppCredential | null> {
    try {
      return await AuthsignalFlowsModule.inappGetCredential(username);
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }

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
   * @throws {InvalidPinError} if the PIN doesn't match.
   */
  async verifyPin({ pin, username }: VerifyPinInput): Promise<VerifyResponse> {
    try {
      return await AuthsignalFlowsModule.inappVerifyPin(pin, username);
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }

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
