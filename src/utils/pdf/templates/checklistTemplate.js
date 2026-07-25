import { PDF_STYLES } from '../styles'

export function renderChecklist(doc, reportData, startY) {
  const { colors, margin, contentWidth } = PDF_STYLES
  let y = startY

  if (!reportData.documents_required || reportData.documents_required.length === 0) {
    return y
  }

  // Section Header
  doc.setTextColor(...colors.navy)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('MANDATORY DOCUMENT CHECKLIST FOR CSC / SEVA KENDRA', margin, y)
  y += 6

  // Table Container Box
  const rowHeight = 8
  const tableHeight = reportData.documents_required.length * rowHeight + 4
  doc.setFillColor(...colors.bgLight)
  doc.setDrawColor(...colors.border)
  doc.roundedRect(margin, y, contentWidth, tableHeight, 3, 3, 'FD')

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')

  reportData.documents_required.forEach((docItem, idx) => {
    const rowY = y + 7 + idx * rowHeight
    doc.setTextColor(...colors.primary)
    doc.setFont('helvetica', 'bold')
    doc.text(`[  ] ${docItem.category}:`, margin + 6, rowY)

    doc.setTextColor(...colors.textDark)
    doc.setFont('helvetica', 'normal')
    doc.text(docItem.name, margin + 42, rowY)
  })

  return y + tableHeight + 8
}
