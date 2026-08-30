import AuthsignalFlows
import Foundation

/// Converts an `AuthsignalResponse<T>` from the Authsignal Flows iOS SDK into a plain
/// dictionary that Expo Modules can bridge to a JS object, e.g. `{ data, error, errorCode }`.
enum ResponseSerializer {
  static func serialize<T: Encodable>(_ response: AuthsignalResponse<T>) throws -> [String: Any?] {
    return [
      "data": try response.data.map(encodeAsDictionary),
      "error": response.error,
      "errorCode": response.errorCode,
    ]
  }

  private static func encodeAsDictionary<T: Encodable>(_ value: T) throws -> [String: Any?] {
    let jsonData = try JSONEncoder().encode(value)
    let jsonObject = try JSONSerialization.jsonObject(with: jsonData, options: [.fragmentsAllowed])

    return (jsonObject as? [String: Any?]) ?? [:]
  }
}
