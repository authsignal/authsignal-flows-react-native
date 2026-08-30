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
      let authsignal = try self.client()

      let response = await authsignal.email.challenge()

      return try ResponseSerializer.serialize(response)
    }

    AsyncFunction("emailVerify") { (verificationCode: String) async throws -> [String: Any?] in
      let authsignal = try self.client()

      let response = await authsignal.email.verify(verificationCode: verificationCode)

      return try ResponseSerializer.serialize(response)
    }

    AsyncFunction("passkeyVerify") {
      (
        autofill: Bool,
        preferImmediatelyAvailableCredentials: Bool,
        syncCredentials: Bool
      ) async throws -> [String: Any?] in
      let authsignal = try self.client()

      let response = await authsignal.passkey.verify(
        autofill: autofill,
        preferImmediatelyAvailableCredentials: preferImmediatelyAvailableCredentials,
        syncCredentials: syncCredentials
      )

      return try ResponseSerializer.serialize(response)
    }

    Function("passkeyCancel") {
      self.authsignal?.passkey.cancel()
    }

    Function("passkeyIsSupported") { () throws -> Bool in
      try self.client().passkey.isSupported()
    }
  }

  private func client() throws -> AuthsignalFlows {
    guard let authsignal else {
      throw NotInitializedException()
    }

    return authsignal
  }
}
