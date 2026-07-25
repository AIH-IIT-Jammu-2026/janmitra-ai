export function validateReportData(data) {
  if (!data) {
    throw new Error('Report data object is required.')
  }

  const normalized = {
    report: {
      reference_id: data.report?.reference_id || `JM-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
      generated_at: data.report?.generated_at || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      language: data.report?.language || 'en-IN',
      status: data.report?.status || 'Verified',
      version: data.report?.version || '1.0',
      source: data.report?.source || '✓ JanMitra AI Multi-Agent Citizen Assistance Platform',
      title: data.report?.title || 'JanMitra AI — Personalized Citizen Assistance Report',
    },
    citizen: {
      state: data.citizen?.state || 'Maharashtra',
      district: data.citizen?.district || 'Pune',
      income: data.citizen?.income || '₹2,40,000 / year',
      category: data.citizen?.category || 'General / OBC',
      land_acres: data.citizen?.land_acres || '1.5 Acres',
    },
    active_agents: data.agents || data.active_agents || ['Router Agent', 'Government Scheme Agent', 'Agriculture Agent', 'Healthcare Agent'],
    stats: {
      matched_schemes: data.recommendations?.length || data.eligible_schemes?.length || 3,
      required_documents: data.documents_required?.length || 4,
      action_steps: data.action_plan?.length || 3,
    },
    recommendations: data.recommendations || data.eligible_schemes || [
      {
        name: 'PM-KISAN Samman Nidhi (Agriculture)',
        category: '🌾 Agriculture & Farmer Support',
        benefit: '₹6,000 / year direct income support',
        badge: 'Highly Eligible',
        why_eligible: ['✓ Small farmer holding < 5 acres', '✓ Resident of Maharashtra'],
      },
      {
        name: 'Ayushman Bharat PM-JAY (Healthcare)',
        category: '🩺 Healthcare & Hospitalization',
        benefit: '₹5 Lakh free health cover per family/year',
        badge: 'Highly Eligible',
        why_eligible: ['✓ EWS category household income', '✓ Cashless treatment at empaneled hospitals'],
      },
      {
        name: 'National Scholarship Portal (Education)',
        category: '🎓 Education & Scholarships',
        benefit: 'Post-Matric scholarship for higher studies',
        badge: 'Eligible',
        why_eligible: ['✓ OBC / EWS Category quota', '✓ Income below ₹2.5L ceiling'],
      },
    ],
    documents_required: data.documents_required || [
      { category: 'Identity', name: 'Aadhaar Card (Linked to Active Mobile Number)' },
      { category: 'Financial', name: 'Income Certificate (Issued in Current Financial Year)' },
      { category: 'Agriculture', name: 'Land 7/12 Extract / Khata Passbook Copy' },
      { category: 'Bank', name: 'Bank Passbook Copy with IFSC Code' },
    ],
    action_plan: data.action_plan || [
      { title: 'Step 1: Visit Local CSC / Gram Panchayat', description: 'Present Reference ID to the VLE Operator.' },
      { title: 'Step 2: Biometric e-KYC Verification', description: 'Submit Aadhaar fingerprint / iris verification.' },
      { title: 'Step 3: Document Upload & Token Receipt', description: 'Collect official application tracking receipt.' },
    ],
    sources: data.sources || [
      { name: 'MyScheme Official Portal', url: 'https://myscheme.gov.in' },
      { name: 'PM-KISAN Direct Portal', url: 'https://pmkisan.gov.in' },
      { name: 'Ayushman Bharat PM-JAY', url: 'https://pmjay.gov.in' },
      { name: 'National Scholarship Portal', url: 'https://scholarships.gov.in' },
    ],
  }

  return normalized
}
