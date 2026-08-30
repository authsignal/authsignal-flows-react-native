import { NativeModule, requireNativeModule } from 'expo';

import type {
  AuthsignalResponse,
  EmailChallengeResponse,
  VerifyResponse,
} from './AuthsignalFlows.types';

declare class AuthsignalFlowsModule extends NativeModule<{}> {
  initialize(tenantId: string, apiUrl: string): void;
  setChallengeToken(challengeToken: string): void;

  emailChallenge(): Promise<AuthsignalResponse<EmailChallengeResponse>>;
  emailVerify(verificationCode: string): Promise<AuthsignalResponse<VerifyResponse>>;

  passkeyVerify(
    autofill: boolean,
    preferImmediatelyAvailableCredentials: boolean,
    syncCredentials: boolean
  ): Promise<AuthsignalResponse<VerifyResponse>>;
  passkeyCancel(): void;
  passkeyIsSupported(): boolean;
}

export default requireNativeModule<AuthsignalFlowsModule>('AuthsignalFlows');
