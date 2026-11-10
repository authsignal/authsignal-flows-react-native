import AuthsignalFlows
import ExpoModulesCore

public class AuthsignalFlowsModule: Module {
  private var authsignal: AuthsignalFlows?

  public func definition() -> ModuleDefinition {
    Name("AuthsignalFlows")

    Function("initialize") { (tenantId: String, apiUrl: String, clientId: String?) in
      self.authsignal = AuthsignalFlows(tenantId: tenantId, apiUrl: apiUrl, clientId: clientId)
    }

    Function("setChallengeToken") { (challengeToken: String) throws in
      try self.client().setChallengeToken(challengeToken: challengeToken)
    }

    AsyncFunction("emailChallenge") { (email: String?) async throws -> [String: Any?] in
      try await self.run { try await self.client().email.challenge(email: email) }
    }

    AsyncFunction("emailVerify") { (verificationCode: String) async throws -> [String: Any?] in
      try await self.run { try await self.client().email.verify(verificationCode: verificationCode) }
    }

    AsyncFunction("smsChallenge") { (phoneNumber: String?) async throws -> [String: Any?] in
      try await self.run { try await self.client().sms.challenge(phoneNumber: phoneNumber) }
    }

    AsyncFunction("smsVerify") { (verificationCode: String) async throws -> [String: Any?] in
      try await self.run { try await self.client().sms.verify(verificationCode: verificationCode) }
    }

    AsyncFunction("whatsappChallenge") { (phoneNumber: String?) async throws -> [String: Any?] in
      try await self.run { try await self.client().whatsapp.challenge(phoneNumber: phoneNumber) }
    }

    AsyncFunction("whatsappVerify") { (verificationCode: String) async throws -> [String: Any?] in
      try await self.run { try await self.client().whatsapp.verify(verificationCode: verificationCode) }
    }

    AsyncFunction("passkeyRegister") {
      (username: String?, displayName: String?) async throws -> [String: Any?] in
      try await self.run {
        try await self.client().passkey.register(username: username, displayName: displayName)
      }
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

    AsyncFunction("passkeyShouldPromptToCreatePasskey") { (username: String?) async throws -> Bool in
      try await self.runValue { try await self.client().passkey.shouldPromptToCreatePasskey(username: username) }
    }

    Function("passkeyIsSupported") { () throws -> Bool in
      try self.client().passkey.isSupported()
    }

    AsyncFunction("inappGetCredential") { (username: String?) async throws -> [String: Any?]? in
      guard let credential = try await self.runValue({ try await self.client().inapp.getCredential(username: username) })
      else {
        return nil
      }

      return try ResponseSerializer.serialize(credential)
    }

    AsyncFunction("inappAddCredential") {
      (requireUserAuthentication: Bool, keychainAccess: String?, username: String?) async throws -> [String: Any?] in
      try await self.run {
        try await self.client().inapp.addCredential(
          keychainAccess: Self.keychainAccess(from: keychainAccess),
          userPresenceRequired: requireUserAuthentication,
          username: username
        )
      }
    }

    AsyncFunction("inappRemoveCredential") { (username: String?) async throws in
      try await self.runValue { try await self.client().inapp.removeCredential(username: username) }
    }

    AsyncFunction("inappVerify") { (username: String?) async throws -> [String: Any?] in
      try await self.run { try await self.client().inapp.verify(username: username) }
    }

    AsyncFunction("inappCreatePin") { (pin: String, username: String) async throws -> [String: Any?] in
      try await self.run { try await self.client().inapp.createPin(pin: pin, username: username) }
    }

    AsyncFunction("inappVerifyPin") { (pin: String, username: String) async throws -> [String: Any?] in
      try await self.run { try await self.client().inapp.verifyPin(pin: pin, username: username) }
    }

    AsyncFunction("inappDeletePin") { (username: String) async throws in
      try await self.runValue { try await self.client().inapp.deletePin(username: username) }
    }

    Function("inappGetAllPinUsernames") { () throws -> [String] in
      try self.client().inapp.getAllPinUsernames()
    }

    AsyncFunction("pushChallenge") { () async throws -> [String: Any?] in
      try await self.run { try await self.client().push.challenge() }
    }

    AsyncFunction("pushVerify") { () async throws -> [String: Any?] in
      try await self.run { try await self.client().push.verify() }
    }

    AsyncFunction("pushGetCredential") { () async throws -> [String: Any?]? in
      guard let credential = try await self.runValue({ try await self.client().push.getCredential() }) else {
        return nil
      }

      return try ResponseSerializer.serialize(credential)
    }

    AsyncFunction("pushAddCredential") {
      (pushToken: String?, requireUserAuthentication: Bool, keychainAccess: String?) async throws -> [String: Any?] in
      try await self.run {
        try await self.client().push.addCredential(
          pushToken: pushToken,
          keychainAccess: Self.keychainAccess(from: keychainAccess),
          userPresenceRequired: requireUserAuthentication
        )
      }
    }

    AsyncFunction("pushRemoveCredential") { () async throws in
      try await self.runValue { try await self.client().push.removeCredential() }
    }

    AsyncFunction("pushUpdateCredential") { (pushToken: String?, resetExpiry: Bool) async throws in
      try await self.runValue {
        try await self.client().push.updateCredential(pushToken: pushToken, resetExpiry: resetExpiry)
      }
    }

    AsyncFunction("pushGetChallenge") { () async throws -> [String: Any?]? in
      guard let challenge = try await self.runValue({ try await self.client().push.getChallenge() }) else {
        return nil
      }

      return try ResponseSerializer.serialize(challenge)
    }

    AsyncFunction("pushUpdateChallenge") {
      (challengeId: String, approved: Bool, verificationCode: String?) async throws in
      try await self.runValue {
        try await self.client().push.updateChallenge(
          challengeId: challengeId,
          approved: approved,
          verificationCode: verificationCode
        )
      }
    }

    AsyncFunction("sessionGetAccessToken") { () async throws -> String? in
      try await self.runValue { try await self.client().session.getAccessToken() }
    }

    AsyncFunction("sessionRevoke") { () async throws in
      try await self.client().session.revoke()
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

  private func runValue<T>(_ operation: () async throws -> T) async throws -> T {
    do {
      return try await operation()
    } catch let error as AuthsignalError {
      throw AuthsignalFlowsError(error)
    }
  }

  private static func keychainAccess(from value: String?) -> KeychainAccess {
    switch value {
    case "afterFirstUnlock": return .afterFirstUnlock
    case "afterFirstUnlockThisDeviceOnly": return .afterFirstUnlockThisDeviceOnly
    case "whenUnlocked": return .whenUnlocked
    case "whenPasscodeSetThisDeviceOnly": return .whenPasscodeSetThisDeviceOnly
    default: return .whenUnlockedThisDeviceOnly
    }
  }

  private func client() throws -> AuthsignalFlows {
    guard let authsignal else {
      throw NotInitializedException()
    }

    return authsignal
  }
}
