package expo.modules.authsignalflows

import expo.modules.kotlin.exception.CodedException

internal class NotInitializedException :
  CodedException(message = "AuthsignalFlow has not been initialized. Call `initialize(tenantId, apiUrl)` first.")
