import { PDF_STYLES } from '../styles'

export function renderActionPlan(doc, reportData, startY) {
  const { colors, margin, contentWidth } = PDF_STYLES
  let y = startY

  if (!reportData.action_plan || reportData.action_plan.length === 0) {
    return y
  }

  // Section Header
  doc.setTextColor(...colors.navy)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('STEP-BY-STEP APPLICATION ACTION PLAN', margin, y)
  y += 6

  reportData.action_plan.forEach((step, idx) => {
    doc.setFillColor(255, 255, 255)
    doc.setDrawColor(...colors.border)
    doc.roundedRect(margin, y, contentWidth, 12, 3, 3, 'FD')

    doc.setTextColor(...colors.primary)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text(step.title || `Step ${idx + 1}`, margin + 6, y + 8)

    doc.setTextColor(...colors.textMuted)
    doc.setFont('helvetica', 'normal')
    doc.text(step.description || '', margin + 75, y + 8)

    y += 15
  })

  return y + 2
}
