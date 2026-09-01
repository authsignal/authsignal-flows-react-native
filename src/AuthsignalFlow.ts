import { Platform } from 'react-native';

import AuthsignalFlowsModule from './AuthsignalFlowsModule';
import { AuthsignalFlowEmail } from './email';
import { AuthsignalFlowPasskey } from './passkey';
import { AuthsignalFlowSms } from './sms';
import { AuthsignalFlowWhatsapp } from './whatsapp';

export type AuthsignalFlowOptions = {
  tenantId: string;
  apiUrl: string;
};

export class AuthsignalFlow {
  tenantId: string;
  apiUrl: string;

  email: AuthsignalFlowEmail;
  sms: AuthsignalFlowSms;
  whatsapp: AuthsignalFlowWhatsapp;
  passkey: AuthsignalFlowPasskey;

  constructor({ tenantId, apiUrl }: AuthsignalFlowOptions) {
    if (Platform.OS !== 'ios' && Platform.OS !== 'android') {
      throw new Error('Authsignal Flows currently only supports iOS and Android');
    }

    this.tenantId = tenantId;
    this.apiUrl = apiUrl;

    AuthsignalFlowsModule.initialize(tenantId, apiUrl);

    this.email = new AuthsignalFlowEmail();
    this.sms = new AuthsignalFlowSms();
    this.whatsapp = new AuthsignalFlowWhatsapp();
    this.passkey = new AuthsignalFlowPasskey();
  }

  setChallengeToken(challengeToken: string): void {
    AuthsignalFlowsModule.setChallengeToken(challengeToken);
  }
}
