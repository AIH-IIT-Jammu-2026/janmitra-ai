import { PDF_STYLES } from '../styles'

export function renderHeader(doc, reportData, startY) {
  const { colors, margin } = PDF_STYLES

  // Top Accent Banner
  doc.setFillColor(...colors.navy)
  doc.rect(0, 0, 210, 24, 'F')

  // Gold line
  doc.setFillColor(...colors.cyan)
  doc.rect(0, 24, 210, 1.5, 'F')

  // Title Text on Banner
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold')
  doc.text('JanMitra AI — Personalized Citizen Assistance Report', margin, 15)

  // Subtitle Metadata
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text(`Ref ID: ${reportData.report.reference_id}  |  Date: ${reportData.report.generated_at}`, margin, 21)

  // Right Badge
  doc.setFillColor(...colors.success)
  doc.roundedRect(165, 8, 30, 10, 3, 3, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text(reportData.report.status.toUpperCase(), 180, 14.5, { align: 'center' })

  return 34
}
