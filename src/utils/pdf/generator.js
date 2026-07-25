import { jsPDF } from 'jspdf'
import { validateReportData } from './validator'
import { setupPdfFonts } from './fontManager'
import { renderHeader } from './templates/headerTemplate'
import { renderSummary } from './templates/summaryTemplate'
import { renderSchemes } from './templates/schemesTemplate'
import { renderChecklist } from './templates/checklistTemplate'
import { renderActionPlan } from './templates/actionPlanTemplate'
import { renderFooter } from './templates/footerTemplate'

export function generateCitizenActionPlanPDF(rawData) {
  try {
    const reportData = validateReportData(rawData)
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
    })

    setupPdfFonts(doc, reportData.report.language)

    let y = 0
    y = renderHeader(doc, reportData, y)
    y = renderSummary(doc, reportData, y)
    y = renderSchemes(doc, reportData, y)
    y = renderChecklist(doc, reportData, y)
    y = renderActionPlan(doc, reportData, y)
    renderFooter(doc, reportData, y)

    // Descriptive filename format
    const cleanRef = reportData.report.reference_id.replace(/[^a-zA-Z0-9-]/g, '_')
    const fileName = `JanMitra_ActionPlan_${cleanRef}.pdf`

    doc.save(fileName)
    return { success: true, fileName }
  } catch (err) {
    console.error('PDF Generation Error:', err)
    throw err
  }
}
