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

/** `setChallengeToken` hasn't been called yet. */
export class FlowNotInitializedError extends AuthsignalError {
  constructor(message: string) {
    super('flow_not_initialized', message);
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
