export const SUPPORTED_LANGUAGES = [
  { code: 'hi-IN', name: 'Hindi', native: 'हिन्दी' },
  { code: 'mr-IN', name: 'Marathi', native: 'मराठी' },
  { code: 'ta-IN', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te-IN', name: 'Telugu', native: 'తెలుగు' },
  { code: 'bn-IN', name: 'Bengali', native: 'বাংলা' },
  { code: 'gu-IN', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn-IN', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml-IN', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'pa-IN', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'or-IN', name: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'as-IN', name: 'Assamese', native: 'অসমীয়া' },
  { code: 'ur-IN', name: 'Urdu', native: 'اردو' },
  { code: 'sa-IN', name: 'Sanskrit', native: 'संस्कृतम्' },
  { code: 'ne-NP', name: 'Nepali', native: 'नेपाली' },
  { code: 'sd-IN', name: 'Sindhi', native: 'सिन्धी' },
  { code: 'kok-IN', name: 'Konkani', native: 'कोंकणी' },
  { code: 'mni-IN', name: 'Manipuri', native: 'ꯃꯩꯇꯩꯂꯣꯟ' },
  { code: 'doi-IN', name: 'Dogri', native: 'डोगरी' },
  { code: 'ks-IN', name: 'Kashmiri', native: 'कॉशुर' },
  { code: 'mai-IN', name: 'Maithili', native: 'मैथिली' },
  { code: 'sat-IN', name: 'Santali', native: 'ᱥᱟᱱᱛᱟᱲᱤ' },
  { code: 'en-IN', name: 'English', native: 'English' },
]

export const DEFAULT_LANGUAGE = 'en-IN'

export function normalizeLocale(locale) {
  if (!locale) return DEFAULT_LANGUAGE
  const clean = locale.toLowerCase().trim()

  if (clean.startsWith('hi')) return 'hi-IN'
  if (clean.startsWith('mr')) return 'mr-IN'
  if (clean.startsWith('ta')) return 'ta-IN'
  if (clean.startsWith('te')) return 'te-IN'
  if (clean.startsWith('bn')) return 'bn-IN'
  if (clean.startsWith('gu')) return 'gu-IN'
  if (clean.startsWith('kn')) return 'kn-IN'
  if (clean.startsWith('ml')) return 'ml-IN'
  if (clean.startsWith('pa')) return 'pa-IN'
  if (clean.startsWith('or')) return 'or-IN'
  if (clean.startsWith('ur')) return 'ur-IN'

  const match = SUPPORTED_LANGUAGES.find((l) => l.code.toLowerCase() === clean)
  return match ? match.code : DEFAULT_LANGUAGE
}
