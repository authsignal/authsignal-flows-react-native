import AuthsignalFlowsModule from './AuthsignalFlowsModule';
import { mapNativeError } from './errors';

export class AuthsignalFlowSession {
  /**
   * @throws {NetworkError} if a refresh fails to reach the API. The session is kept.
   */
  async getAccessToken(): Promise<string | null> {
    try {
      return await AuthsignalFlowsModule.sessionGetAccessToken();
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }

  async revoke(): Promise<void> {
    try {
      await AuthsignalFlowsModule.sessionRevoke();
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }
}
