import { PDF_STYLES } from '../styles'

export function renderFooter(doc, reportData, startY) {
  const { colors, margin, contentWidth, pageHeight } = PDF_STYLES
  let y = Math.max(startY, pageHeight - 55)

  // Official Portals Line
  doc.setTextColor(...colors.navy)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.text('OFFICIAL GOVERNMENT PORTALS & VERIFICATION LINKS', margin, y)
  y += 5

  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...colors.primary)
  const links = reportData.sources ? reportData.sources.map(s => `${s.name}: ${s.url}`).join('  |  ') : 'MyScheme Portal: https://myscheme.gov.in'
  doc.text(links, margin, y)

  // Help Box & Disclaimer Banner
  y += 8
  doc.setFillColor(...colors.bgLight)
  doc.setDrawColor(...colors.border)
  doc.roundedRect(margin, y, contentWidth, 18, 3, 3, 'FD')

  doc.setTextColor(...colors.navy)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('NEED ASSISTANCE AT CSC / SEVA KENDRA?', margin + 6, y + 6)

  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...colors.textMuted)
  doc.text('Visit your nearest Common Service Centre (CSC) or Gram Panchayat office with your Reference ID.', margin + 6, y + 12)

  // Page Numbers Footer
  const totalPages = doc.internal.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setDrawColor(...colors.border)
    doc.line(margin, pageHeight - 12, 210 - margin, pageHeight - 12)

    doc.setFontSize(8)
    doc.setTextColor(...colors.textMuted)
    doc.text(`JanMitra AI — Ref: ${reportData.report.reference_id}  |  Official Citizen Service Report`, margin, pageHeight - 6)
    doc.text(`Page ${i} of ${totalPages}`, 210 - margin, pageHeight - 6, { align: 'right' })
  }
}
