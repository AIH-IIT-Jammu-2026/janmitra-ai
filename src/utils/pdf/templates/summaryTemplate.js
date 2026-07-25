import { PDF_STYLES } from '../styles'

export function renderSummary(doc, reportData, startY) {
  const { colors, margin, contentWidth } = PDF_STYLES
  let y = startY

  // Summary Container Box
  doc.setFillColor(...colors.bgLight)
  doc.setDrawColor(...colors.border)
  doc.roundedRect(margin, y, contentWidth, 32, 4, 4, 'FD')

  // Section Heading
  doc.setTextColor(...colors.navy)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('CITIZEN & SESSION PROFILE', margin + 6, y + 10)

  // Details Line 1
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...colors.textDark)
  doc.text(`State: ${reportData.citizen.state}   |   District: ${reportData.citizen.district}   |   Category: ${reportData.citizen.category}`, margin + 6, y + 18)

  // Details Line 2
  doc.text(`Annual Income: ${reportData.citizen.income}   |   Land Holding: ${reportData.citizen.land_acres}`, margin + 6, y + 25)

  // Quick Stats Row
  y += 38
  const statBoxWidth = 56
  const stats = [
    { label: 'Matched Schemes', val: reportData.stats.matched_schemes, color: colors.primary },
    { label: 'Required Documents', val: reportData.stats.required_documents, color: colors.navy },
    { label: 'Action Steps', val: reportData.stats.action_steps, color: colors.success },
  ]

  stats.forEach((s, idx) => {
    const x = margin + idx * (statBoxWidth + 6)
    doc.setFillColor(...s.color)
    doc.roundedRect(x, y, statBoxWidth, 18, 3, 3, 'F')

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text(String(s.val), x + 10, y + 12)

    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.text(s.label, x + 22, y + 11)
  })

  return y + 26
}
