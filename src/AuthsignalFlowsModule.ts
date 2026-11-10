import { NativeModule, requireNativeModule } from 'expo';

import type {
  AppCredential,
  EmailChallengeResponse,
  PushChallenge,
  PushChallengeResponse,
  PushVerifyResponse,
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
  passkeyShouldPromptToCreatePasskey(username?: string): Promise<boolean>;
  passkeyIsSupported(): boolean;

  inappGetCredential(username?: string): Promise<AppCredential | null>;
  inappAddCredential(
    requireUserAuthentication: boolean,
    keychainAccess?: string,
    username?: string
  ): Promise<VerifyResponse>;
  inappRemoveCredential(username?: string): Promise<void>;
  inappVerify(username?: string): Promise<VerifyResponse>;
  inappCreatePin(pin: string, username: string): Promise<VerifyResponse>;
  inappVerifyPin(pin: string, username: string): Promise<VerifyResponse>;
  inappDeletePin(username: string): Promise<void>;
  inappGetAllPinUsernames(): string[];

  pushChallenge(): Promise<PushChallengeResponse>;
  pushVerify(): Promise<PushVerifyResponse>;
  pushGetCredential(): Promise<AppCredential | null>;
  pushAddCredential(
    pushToken: string | undefined,
    requireUserAuthentication: boolean,
    keychainAccess?: string
  ): Promise<VerifyResponse>;
  pushRemoveCredential(): Promise<void>;
  pushUpdateCredential(pushToken: string | undefined, resetExpiry: boolean): Promise<void>;
  pushGetChallenge(): Promise<PushChallenge | null>;
  pushUpdateChallenge(
    challengeId: string,
    approved: boolean,
    verificationCode?: string
  ): Promise<void>;

  sessionGetAccessToken(): Promise<string | null>;
  sessionRevoke(): Promise<void>;
}

export default requireNativeModule<AuthsignalFlowsModule>('AuthsignalFlows');
