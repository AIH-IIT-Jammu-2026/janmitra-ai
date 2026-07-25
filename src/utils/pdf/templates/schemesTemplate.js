import { PDF_STYLES } from '../styles'

export function renderSchemes(doc, reportData, startY) {
  const { colors, margin, contentWidth } = PDF_STYLES
  let y = startY

  const items = reportData.recommendations || reportData.eligible_schemes || []

  if (!items || items.length === 0) {
    return y
  }

  // Section Header
  doc.setTextColor(...colors.navy)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('RECOMMENDATIONS & EXPERT FINDINGS', margin, y)
  y += 6

  items.forEach((s) => {
    // Recommendation Container Box
    const boxHeight = 28
    doc.setFillColor(255, 255, 255)
    doc.setDrawColor(...colors.border)
    doc.roundedRect(margin, y, contentWidth, boxHeight, 3, 3, 'FD')

    // Title & Subtitle Benefit
    doc.setTextColor(...colors.primary)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text(s.name, margin + 6, y + 8)

    doc.setTextColor(...colors.success)
    doc.setFontSize(9)
    doc.text(s.benefit || s.category || '', margin + 6, y + 15)

    // Why Eligible / Recommendation Rationale
    doc.setTextColor(...colors.textMuted)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    const whyText = Array.isArray(s.why_eligible) ? s.why_eligible.join('   ') : (s.why_eligible || '')
    doc.text(`Rationale: ${whyText}`, margin + 6, y + 22)

    y += boxHeight + 6
  })

  return y
}
