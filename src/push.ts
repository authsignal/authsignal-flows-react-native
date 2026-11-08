import type {
  AppCredential,
  PushAddCredentialInput,
  PushChallenge,
  PushChallengeResponse,
  PushUpdateChallengeInput,
  PushUpdateCredentialInput,
  PushVerifyResponse,
  VerifyResponse,
} from './AuthsignalFlows.types';
import AuthsignalFlowsModule from './AuthsignalFlowsModule';
import { mapNativeError } from './errors';

export class AuthsignalFlowPush {
  async challenge(): Promise<PushChallengeResponse> {
    try {
      return await AuthsignalFlowsModule.pushChallenge();
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }

  async verify(): Promise<PushVerifyResponse> {
    try {
      return await AuthsignalFlowsModule.pushVerify();
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }

  async getCredential(): Promise<AppCredential | null> {
    try {
      return await AuthsignalFlowsModule.pushGetCredential();
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }

  async addCredential({
    pushToken,
    requireUserAuthentication = false,
    keychainAccess,
  }: PushAddCredentialInput = {}): Promise<VerifyResponse> {
    try {
      return await AuthsignalFlowsModule.pushAddCredential(
        pushToken,
        requireUserAuthentication,
        keychainAccess
      );
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }

  /**
   * @throws {CredentialNotFoundError} if the device has no push key.
   */
  async removeCredential(): Promise<void> {
    try {
      await AuthsignalFlowsModule.pushRemoveCredential();
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }

  /**
   * @throws {CredentialNotFoundError} if the device has no push key.
   */
  async updateCredential({
    pushToken,
    resetExpiry = false,
  }: PushUpdateCredentialInput = {}): Promise<void> {
    try {
      await AuthsignalFlowsModule.pushUpdateCredential(pushToken, resetExpiry);
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }

  /**
   * @throws {CredentialNotFoundError} if the device has no push key.
   */
  async getChallenge(): Promise<PushChallenge | null> {
    try {
      return await AuthsignalFlowsModule.pushGetChallenge();
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }

  /**
   * @throws {CredentialNotFoundError} if the device has no push key.
   */
  async updateChallenge({
    challengeId,
    approved,
    verificationCode,
  }: PushUpdateChallengeInput): Promise<void> {
    try {
      await AuthsignalFlowsModule.pushUpdateChallenge(challengeId, approved, verificationCode);
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }
}
