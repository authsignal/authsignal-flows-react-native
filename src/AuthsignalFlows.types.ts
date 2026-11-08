export enum VerificationMethod {
  EMAIL_OTP = 'EMAIL_OTP',
  SMS = 'SMS',
  WHATSAPP = 'WHATSAPP',
  PASSKEY = 'PASSKEY',
  IN_APP = 'IN_APP',
  QR_CODE = 'QR_CODE',
  PUSH = 'PUSH',
  AUTHENTICATOR_APP = 'AUTHENTICATOR_APP',
}

export enum ActionStepType {
  VERIFICATION_REQUIRED = 'VERIFICATION_REQUIRED',
  ENROLLMENT_REQUIRED = 'ENROLLMENT_REQUIRED',
  ENROLLMENT_OPTIONAL = 'ENROLLMENT_OPTIONAL',
}

export enum FlowState {
  CHALLENGE_REQUIRED = 'CHALLENGE_REQUIRED',
  CHALLENGE_FAILED = 'CHALLENGE_FAILED',
  CHALLENGE_SUCCEEDED = 'CHALLENGE_SUCCEEDED',
}

export type ActionStep = {
  stepType: ActionStepType;
  verificationMethods: VerificationMethod[];
};

export type CompletedActionStep = {
  stepType: ActionStepType;
  verificationMethod?: VerificationMethod;
  userAuthenticatorId?: string;
};

export type FlowAction = {
  state: FlowState;
  nextStep?: ActionStep;
  completedSteps?: CompletedActionStep[];
};

export type FlowUserAuthenticator = {
  userAuthenticatorId: string;
  verificationMethod: VerificationMethod;
  email?: string;
  phoneNumber?: string;
  username?: string;
  displayName?: string;
};

export type FlowUser = {
  userId: string;
  email?: string;
  phoneNumber?: string;
  username?: string;
  displayName?: string;
  authenticators: FlowUserAuthenticator[];
};

export type VerifyResponse = {
  action: FlowAction;
  challengeToken: string;
  user: FlowUser;
};

export type EmailChallengeResponse = {
  retryAfterSeconds?: number;
};

export type SmsChallengeResponse = {
  retryAfterSeconds?: number;
};

export type WhatsappChallengeResponse = {
  retryAfterSeconds?: number;
};

export type PasskeyRegisterInput = {
  username?: string;
  displayName?: string;
};

export type PasskeyVerifyInput = {
  autofill?: boolean;
  preferImmediatelyAvailableCredentials?: boolean;
  syncCredentials?: boolean;
};

export enum KeychainAccess {
  afterFirstUnlock = 'afterFirstUnlock',
  afterFirstUnlockThisDeviceOnly = 'afterFirstUnlockThisDeviceOnly',
  whenUnlocked = 'whenUnlocked',
  whenUnlockedThisDeviceOnly = 'whenUnlockedThisDeviceOnly',
  whenPasscodeSetThisDeviceOnly = 'whenPasscodeSetThisDeviceOnly',
}

export type AppCredential = {
  credentialId: string;
  createdAt: string;
  userId: string;
  lastAuthenticatedAt?: string;
  expiresAt?: string;
};

export type InAppCredentialInput = {
  username?: string;
};

export type InAppAddCredentialInput = {
  username?: string;
  requireUserAuthentication?: boolean;
  keychainAccess?: KeychainAccess;
};

export type CreatePinInput = {
  pin: string;
  username: string;
};

export type VerifyPinInput = {
  pin: string;
  username: string;
};

export type DeletePinInput = {
  username: string;
};

export type PushChallengeResponse = {
  verificationCode?: string;
};

export enum PushChallengeStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export type PushVerifyResponse = {
  status: PushChallengeStatus;
  action?: FlowAction;
  challengeToken?: string;
  user?: FlowUser;
};

export type PushChallenge = {
  challengeId: string;
  actionCode?: string;
  deviceId?: string;
  userAgent?: string;
  ipAddress?: string;
  expiresAt?: number;
};

export type PushAddCredentialInput = {
  pushToken?: string;
  requireUserAuthentication?: boolean;
  keychainAccess?: KeychainAccess;
};

export type PushUpdateCredentialInput = {
  pushToken?: string;
  resetExpiry?: boolean;
};

export type PushUpdateChallengeInput = {
  challengeId: string;
  approved: boolean;
  verificationCode?: string;
};
