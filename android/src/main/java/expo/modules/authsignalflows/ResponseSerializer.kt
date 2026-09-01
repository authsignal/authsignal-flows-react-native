package expo.modules.authsignalflows

import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.doubleOrNull
import kotlinx.serialization.json.encodeToJsonElement
import kotlinx.serialization.json.longOrNull

internal object ResponseSerializer {
  @PublishedApi
  internal val json = Json { encodeDefaults = true }

  inline fun <reified T> serialize(value: T): Map<String, Any?> {
    val element = json.encodeToJsonElement(value)

    @Suppress("UNCHECKED_CAST")
    return (toKotlin(element) as? Map<String, Any?>) ?: emptyMap()
  }

  fun toKotlin(element: JsonElement): Any? = when (element) {
    is JsonNull -> null
    is JsonArray -> element.map { toKotlin(it) }
    is JsonObject -> element.entries.associate { (key, value) -> key to toKotlin(value) }
    is JsonPrimitive -> element.toKotlinValue()
  }

  private fun JsonPrimitive.toKotlinValue(): Any? {
    if (isString) return content

    return booleanOrNull ?: longOrNull ?: doubleOrNull ?: content
  }
}
