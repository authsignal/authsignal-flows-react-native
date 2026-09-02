import AuthsignalFlows
import ExpoModulesCore

/// Wraps a thrown `AuthsignalError` from the native SDK as an Expo `CodedError` so it
/// crosses the bridge as a promise rejection carrying a matching `.code` — the JS SDK
/// uses that code to reconstruct the same typed error on the other side.
final class AuthsignalFlowsError: Exception {
  init(_ error: AuthsignalError) {
    super.init(
      name: "AuthsignalFlowsError",
      description: error.errorDescription ?? "An error occurred.",
      code: error.code
    )
  }
}
