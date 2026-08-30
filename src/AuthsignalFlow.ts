import { Platform } from 'react-native';

import AuthsignalFlowsModule from './AuthsignalFlowsModule';
import { AuthsignalFlowEmail } from './email';
import { AuthsignalFlowPasskey } from './passkey';

export type AuthsignalFlowOptions = {
  tenantId: string;
  apiUrl: string;
};

export class AuthsignalFlow {
  tenantId: string;
  apiUrl: string;

  email: AuthsignalFlowEmail;
  passkey: AuthsignalFlowPasskey;

  constructor({ tenantId, apiUrl }: AuthsignalFlowOptions) {
    if (Platform.OS !== 'ios') {
      throw new Error('Authsignal Flows currently only supports iOS');
    }

    this.tenantId = tenantId;
    this.apiUrl = apiUrl;

    AuthsignalFlowsModule.initialize(tenantId, apiUrl);

    this.email = new AuthsignalFlowEmail();
    this.passkey = new AuthsignalFlowPasskey();
  }

  setChallengeToken(challengeToken: string): void {
    AuthsignalFlowsModule.setChallengeToken(challengeToken);
  }
}
