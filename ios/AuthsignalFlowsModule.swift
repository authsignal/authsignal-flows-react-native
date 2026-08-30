import AuthsignalFlows
import ExpoModulesCore

public class AuthsignalFlowsModule: Module {
  private var authsignal: AuthsignalFlows?

  public func definition() -> ModuleDefinition {
    Name("AuthsignalFlows")

    Function("initialize") { (tenantId: String, apiUrl: String) in
      self.authsignal = AuthsignalFlows(tenantId: tenantId, apiUrl: apiUrl)
    }

    Function("setChallengeToken") { (challengeToken: String) throws in
      try self.client().setChallengeToken(challengeToken: challengeToken)
    }

    AsyncFunction("emailChallenge") { () async throws -> [String: Any?] in
      try await self.run { try await self.client().email.challenge() }
    }

    AsyncFunction("emailVerify") { (verificationCode: String) async throws -> [String: Any?] in
      try await self.run { try await self.client().email.verify(verificationCode: verificationCode) }
    }

    AsyncFunction("passkeyVerify") {
      (
        autofill: Bool,
        preferImmediatelyAvailableCredentials: Bool,
        syncCredentials: Bool
      ) async throws -> [String: Any?] in
      try await self.run {
        try await self.client().passkey.verify(
          autofill: autofill,
          preferImmediatelyAvailableCredentials: preferImmediatelyAvailableCredentials,
          syncCredentials: syncCredentials
        )
      }
    }

    Function("passkeyCancel") {
      self.authsignal?.passkey.cancel()
    }

    Function("passkeyIsSupported") { () throws -> Bool in
      try self.client().passkey.isSupported()
    }
  }

  /// Runs an SDK call and converts any thrown `AuthsignalError` into an Expo `CodedError`,
  /// so on the JS side it surfaces as a promise rejection with a matching `.code` rather
  /// than resolving with a `{ data, error, errorCode }` tuple.
  private func run<T: Encodable>(_ operation: () async throws -> T) async throws -> [String: Any?] {
    do {
      let value = try await operation()

      return try ResponseSerializer.serialize(value)
    } catch let error as AuthsignalError {
      throw AuthsignalFlowsError(error)
    }
  }

  private func client() throws -> AuthsignalFlows {
    guard let authsignal else {
      throw NotInitializedException()
    }

    return authsignal
  }
}
