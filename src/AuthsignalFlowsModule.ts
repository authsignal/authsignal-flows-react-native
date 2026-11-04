import { NativeModule, requireNativeModule } from 'expo';

import type {
  EmailChallengeResponse,
  SmsChallengeResponse,
  VerifyResponse,
  WhatsappChallengeResponse,
} from './AuthsignalFlows.types';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
declare class AuthsignalFlowsModule extends NativeModule<{}> {
  initialize(tenantId: string, apiUrl: string, clientId?: string): void;
  setChallengeToken(challengeToken: string): void;

  emailChallenge(email?: string): Promise<EmailChallengeResponse>;
  emailVerify(verificationCode: string): Promise<VerifyResponse>;

  smsChallenge(phoneNumber?: string): Promise<SmsChallengeResponse>;
  smsVerify(verificationCode: string): Promise<VerifyResponse>;

  whatsappChallenge(phoneNumber?: string): Promise<WhatsappChallengeResponse>;
  whatsappVerify(verificationCode: string): Promise<VerifyResponse>;

  passkeyRegister(username?: string, displayName?: string): Promise<VerifyResponse>;
  passkeyVerify(
    autofill: boolean,
    preferImmediatelyAvailableCredentials: boolean,
    syncCredentials: boolean
  ): Promise<VerifyResponse>;
  passkeyCancel(): void;
  passkeyIsSupported(): boolean;

  sessionGetAccessToken(): Promise<string | null>;
  sessionRevoke(): Promise<void>;
}

export default requireNativeModule<AuthsignalFlowsModule>('AuthsignalFlows');
