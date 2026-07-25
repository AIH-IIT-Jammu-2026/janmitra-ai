export function setupPdfFonts(doc, langCode = 'en-IN') {
  // Sets default font and encoding for standard jsPDF
  doc.setFont('helvetica', 'normal')
  return 'helvetica'
}
