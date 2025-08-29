// Simple client-side PDF. If jspdf is installed, we use it; else we open a print page.
export function generatePdf({ intake, summary }) {
  let jsPDF = null;
  try {
    // eslint-disable-next-line no-undef
    jsPDF = window.jspdf?.jsPDF || require("jspdf").jsPDF;
  } catch (_) {}

  if (jsPDF) {
    const doc = new jsPDF();
    let y = 14;
    doc.setFontSize(18);
    doc.text("SereneMind – Wellness Check-in", 14, y); y += 10;

    doc.setFontSize(12);
    doc.text(`Name: ${intake.name || "-"}`, 14, y); y += 7;
    doc.text(`Email: ${intake.email || "-"}`, 14, y); y += 7;
    doc.text(`Date: ${intake.date || "-"}`, 14, y); y += 10;

    doc.setFontSize(14);
    doc.text("Session Summary", 14, y); y += 8;

    const lines = doc.splitTextToSize(summary || "-", 180);
    doc.text(lines, 14, y);

    doc.save("SereneMind_Report.pdf");
  } else {
    const html = `
      <h2>SereneMind – Wellness Check-in</h2>
      <p><b>Name:</b> ${intake.name || "-"}<br/>
         <b>Email:</b> ${intake.email || "-"}<br/>
         <b>Date:</b> ${intake.date || "-"}</p>
      <h3>Session Summary</h3>
      <pre style="white-space:pre-wrap">${(summary || "-")
        .replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>`;
    const w = window.open("", "_blank");
    w.document.write(html);
    w.document.close();
    w.print();
  }
}