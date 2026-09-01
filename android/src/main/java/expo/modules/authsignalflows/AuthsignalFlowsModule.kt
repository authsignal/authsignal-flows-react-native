package expo.modules.authsignalflows

import com.authsignal.flows.AuthsignalFlows
import com.authsignal.flows.AuthsignalFlowsError
import expo.modules.kotlin.functions.Coroutine
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class AuthsignalFlowsModule : Module() {
  private var authsignal: AuthsignalFlows? = null

  override fun definition() = ModuleDefinition {
    Name("AuthsignalFlows")

    Function("initialize") { tenantId: String, apiUrl: String ->
      authsignal = AuthsignalFlows(tenantId = tenantId, apiUrl = apiUrl)
    }

    Function("setChallengeToken") { challengeToken: String ->
      client().setChallengeToken(challengeToken)
    }

    AsyncFunction("emailChallenge") Coroutine { email: String? ->
      runSdkCall { client().email.challenge(email) }
    }

    AsyncFunction("emailVerify") Coroutine { verificationCode: String ->
      runSdkCall { client().email.verify(verificationCode) }
    }

    AsyncFunction("smsChallenge") Coroutine { phoneNumber: String? ->
      runSdkCall { client().sms.challenge(phoneNumber) }
    }

    AsyncFunction("smsVerify") Coroutine { verificationCode: String ->
      runSdkCall { client().sms.verify(verificationCode) }
    }

    AsyncFunction("whatsappChallenge") Coroutine { phoneNumber: String? ->
      runSdkCall { client().whatsapp.challenge(phoneNumber) }
    }

    AsyncFunction("whatsappVerify") Coroutine { verificationCode: String ->
      runSdkCall { client().whatsapp.verify(verificationCode) }
    }

    AsyncFunction("passkeyVerify") Coroutine {
      autofill: Boolean,
      preferImmediatelyAvailableCredentials: Boolean,
      syncCredentials: Boolean ->
      val activity = appContext.throwingActivity

      runSdkCall {
        client().passkey.verify(
          activity = activity,
          autofill = autofill,
          preferImmediatelyAvailableCredentials = preferImmediatelyAvailableCredentials,
          syncCredentials = syncCredentials
        )
      }
    }

    Function("passkeyCancel") {
      authsignal?.passkey?.cancel()
    }

    Function("passkeyIsSupported") {
      client().passkey.isSupported()
    }
  }

  private suspend inline fun <reified T> runSdkCall(crossinline operation: suspend () -> T): Map<String, Any?> {
    return try {
      ResponseSerializer.serialize(operation())
    } catch (error: AuthsignalFlowsError) {
      throw AuthsignalFlowsException(error)
    }
  }

  private fun client(): AuthsignalFlows = authsignal ?: throw NotInitializedException()
}
