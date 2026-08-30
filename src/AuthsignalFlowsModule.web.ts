import { registerWebModule, NativeModule } from 'expo';

const unsupported = (): never => {
  throw new Error(
    'Authsignal Flows currently only supports iOS. Web support is not available yet.'
  );
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
class AuthsignalFlowsModule extends NativeModule<{}> {
  initialize = unsupported;
  setChallengeToken = unsupported;
  emailChallenge = unsupported;
  emailVerify = unsupported;
  passkeyVerify = unsupported;
  passkeyCancel = unsupported;
  passkeyIsSupported = (): boolean => false;
}

export default registerWebModule(AuthsignalFlowsModule, 'AuthsignalFlowsModule');
