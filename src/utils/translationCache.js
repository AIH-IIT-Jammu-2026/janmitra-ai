const cacheStore = new Map()

export function getCachedTranslation(messageId, targetLang) {
  const key = `${messageId}_${targetLang}`
  return cacheStore.get(key) || null
}

export function setCachedTranslation(messageId, targetLang, translatedText) {
  const key = `${messageId}_${targetLang}`
  cacheStore.set(key, translatedText)
}
