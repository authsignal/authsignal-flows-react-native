export class AuthsignalError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);

    this.name = new.target.name;
    this.code = code;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/** The verification code entered by the user didn't match. */
export class InvalidCodeError extends AuthsignalError {
  constructor(message: string) {
    super('invalid_code', message);
  }
}

/** The user dismissed the passkey prompt, or the device has no passkeys available. */
export class UserCanceledError extends AuthsignalError {
  constructor(message: string) {
    super('user_canceled', message);
  }
}

/** The passkey returned by the platform is already registered and excluded from this request. */
export class MatchedExcludedCredentialError extends AuthsignalError {
  constructor(message: string) {
    super('matched_excluded_credential', message);
  }
}

/** No `clientId` was provided and `setChallengeToken` hasn't been called yet. */
export class FlowNotInitializedError extends AuthsignalError {
  constructor(message: string) {
    super('flow_not_initialized', message);
  }
}

/** The flow has expired. Challenge methods start a new flow automatically, but `verify` calls throw this. */
export class FlowExpiredError extends AuthsignalError {
  constructor(message: string) {
    super('flow_expired', message);
  }
}

/** The device has no in-app credential, or (on Android) no passkeys available. */
export class CredentialNotFoundError extends AuthsignalError {
  constructor(message: string) {
    super('credential_not_found', message);
  }
}

/** The PIN isn't at least 4 digits. */
export class InvalidPinFormatError extends AuthsignalError {
  constructor(message: string) {
    super('invalid_pin_format', message);
  }
}

/** The PIN entered doesn't match the one stored on this device. */
export class InvalidPinError extends AuthsignalError {
  constructor(message: string) {
    super('invalid_pin', message);
  }
}

/** The request failed before reaching the API, e.g. no network connection. */
export class NetworkError extends AuthsignalError {
  constructor(message: string) {
    super('network_error', message);
  }
}

export class AutofillRequestPendingError extends AuthsignalError {
  constructor(message: string) {
    super('autofill_request_pending', message);
  }
}

/** A native or API error that doesn't have a more specific type above. */
export class UnknownAuthsignalError extends AuthsignalError {}

const ERROR_TYPES: Record<string, new (message: string) => AuthsignalError> = {
  invalid_code: InvalidCodeError,
  user_canceled: UserCanceledError,
  matched_excluded_credential: MatchedExcludedCredentialError,
  flow_not_initialized: FlowNotInitializedError,
  flow_expired: FlowExpiredError,
  credential_not_found: CredentialNotFoundError,
  invalid_pin_format: InvalidPinFormatError,
  invalid_pin: InvalidPinError,
  network_error: NetworkError,
};

export function mapNativeError(ex: unknown): AuthsignalError {
  if (ex instanceof Error) {
    const code = 'code' in ex && typeof ex.code === 'string' ? ex.code : 'unknown_error';
    const ErrorType = ERROR_TYPES[code];

    return ErrorType ? new ErrorType(ex.message) : new UnknownAuthsignalError(code, ex.message);
  }

  return new UnknownAuthsignalError('unknown_error', 'An unknown error occurred.');
}
