import ExpoModulesCore

final class NotInitializedException: Exception {
  override var reason: String {
    "AuthsignalFlow has not been initialized. Call `initialize(tenantId, apiUrl)` first."
  }
}
