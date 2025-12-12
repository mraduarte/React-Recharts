import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { format } from "date-fns";

export async function exportStyledPDF(elementId, options) {
  const {
    title = "Relatório de Dashboard",
    subtitle = "Gerado automaticamente",
    logoUrl,
    orientation = "portrait",
    fileName = "dashboard.pdf",
    theme = "light",
    kpis = [],
  } = options || {};

  const isDark = theme === "dark";

  const bgColor = isDark ? "#1f2937" : "#ffffff";
  const titleColor = isDark ? "#f9fafb" : "#111827";
  const subtitleColor = isDark ? "#d1d5db" : "#374151";

  // PÁGINA 1 — CAPA

  const pdf = new jsPDF({
    orientation,
    unit: "px",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Fundo da capa
  pdf.setFillColor(bgColor);
  pdf.rect(0, 0, pageWidth, pageHeight, "F");

  // Logo opcional
  if (logoUrl) {
    try {
      pdf.addImage(logoUrl, "PNG", pageWidth / 2 - 40, 40, 80, 80);
    } catch {
      console.warn("Erro ao carregar o logo no PDF");
    }
  }

  // Título
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(titleColor);
  pdf.setFontSize(28);
  pdf.text(title, pageWidth / 2, 160, { align: "center" });

  // Subtítulo
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(14);
  pdf.setTextColor(subtitleColor);
  pdf.text(subtitle, pageWidth / 2, 195, { align: "center" });

  // Data
  pdf.setFontSize(12);
  pdf.text(
    `Gerado em ${format(new Date(), "dd/MM/yyyy HH:mm")}`,
    pageWidth / 2,
    230,
    { align: "center" }
  );

  // Passa para próxima página
  pdf.addPage();

  // PÁGINA 2 — KPIs PRINCIPAIS

  pdf.setFillColor(bgColor);
  pdf.rect(0, 0, pageWidth, pageHeight, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(titleColor);
  pdf.setFontSize(22);
  pdf.text("KPIs Principais", 40, 60);

  const cardWidth = (pageWidth - 120) / 2;
  const cardHeight = 110;
  let x = 40;
  let y = 100;

  kpis.forEach((kpi, index) => {
    const color = kpi.color || "#6366f1";

    // Card fundo
    pdf.setFillColor(color);
    pdf.roundedRect(x, y, cardWidth, cardHeight, 12, 12, "F");

    // KPI Label
    pdf.setFontSize(16);
    pdf.setTextColor("#ffffff");
    pdf.text(kpi.label, x + 20, y + 40);

    // KPI Value
    pdf.setFontSize(24);
    pdf.text(kpi.value, x + 20, y + 85);

    // Próximo card
    if ((index + 1) % 2 === 0) {
      x = 40;
      y += cardHeight + 30;
    } else {
      x += cardWidth + 40;
    }
  });

  pdf.addPage();

  // PÁGINA 3 — DASHBOARD (do DOM)

  pdf.setFillColor(bgColor);
  pdf.rect(0, 0, pageWidth, pageHeight, "F");

  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Elemento não encontrado:", elementId);
    return;
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
  });

  const imgData = canvas.toDataURL("image/png");

  const contentWidth = pageWidth - 40;
  const contentHeight = (canvas.height * contentWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 20, 20, contentWidth, contentHeight);

  // Download final
  pdf.save(fileName);
}
