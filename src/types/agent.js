/**
 * Agent definition helper for JanMitra AI multi-agent system
 */

export const AGENT_TYPES = {
  SCHEMES: 'Government Schemes',
  HEALTH: 'Healthcare',
  EDUCATION: 'Education',
  EMPLOYMENT: 'Employment',
  AGRICULTURE: 'Agriculture',
  LEGAL: 'Legal Assistance',
  EMERGENCY: 'Emergency Response',
}

export const AGENT_CONFIGS = {
  [AGENT_TYPES.SCHEMES]: { icon: '🏛️', color: '#2563EB', badgeBg: 'rgba(37,99,235,0.15)' },
  [AGENT_TYPES.HEALTH]: { icon: '🩺', color: '#10B981', badgeBg: 'rgba(16,185,129,0.15)' },
  [AGENT_TYPES.EDUCATION]: { icon: '🎓', color: '#8B5CF6', badgeBg: 'rgba(139,92,246,0.15)' },
  [AGENT_TYPES.EMPLOYMENT]: { icon: '💼', color: '#F59E0B', badgeBg: 'rgba(245,158,11,0.15)' },
  [AGENT_TYPES.AGRICULTURE]: { icon: '🌾', color: '#22C55E', badgeBg: 'rgba(34,197,94,0.15)' },
  [AGENT_TYPES.LEGAL]: { icon: '⚖️', color: '#EF4444', badgeBg: 'rgba(239,68,68,0.15)' },
  [AGENT_TYPES.EMERGENCY]: { icon: '🚨', color: '#DC2626', badgeBg: 'rgba(220,38,38,0.15)' },
}
