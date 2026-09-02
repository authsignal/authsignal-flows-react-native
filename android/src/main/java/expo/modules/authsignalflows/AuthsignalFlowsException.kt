package expo.modules.authsignalflows

import com.authsignal.flows.AuthsignalFlowsError
import expo.modules.kotlin.exception.CodedException

internal class AuthsignalFlowsException(error: AuthsignalFlowsError) :
  CodedException(
    code = error.code,
    message = error.message ?: "An error occurred.",
    cause = error
  )
