import AuthsignalFlowsModule from './AuthsignalFlowsModule';
import { mapNativeError } from './errors';

export class AuthsignalFlowSession {
  /**
   * Returns a valid access token, refreshing it first if it's about to expire.
   *
   * Resolves to `null` if there is no session, or if the session can no longer be refreshed.
   *
   * @throws {NetworkError} if a refresh fails to reach the API. The session is kept.
   */
  async getAccessToken(): Promise<string | null> {
    try {
      return await AuthsignalFlowsModule.sessionGetAccessToken();
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }

  /**
   * Ends the session. Local state is always cleared, even if the session can't be revoked on the server.
   */
  async revoke(): Promise<void> {
    try {
      await AuthsignalFlowsModule.sessionRevoke();
    } catch (ex) {
      throw mapNativeError(ex);
    }
  }
}
