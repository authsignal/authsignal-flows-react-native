import Foundation

/// Converts a value returned by the Authsignal Flows iOS SDK into a plain dictionary
/// that Expo Modules can bridge to a JS object.
enum ResponseSerializer {
  static func serialize<T: Encodable>(_ value: T) throws -> [String: Any?] {
    let jsonData = try JSONEncoder().encode(value)
    let jsonObject = try JSONSerialization.jsonObject(with: jsonData, options: [.fragmentsAllowed])

    return (jsonObject as? [String: Any?]) ?? [:]
  }
}
