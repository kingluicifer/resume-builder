'use client';

import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import { CVData } from '@/types/cv';
import { cvSchema } from '@/lib/cvSchema';

interface ExportButtonProps {
  data: CVData;
}

export default function ExportButton({ data }: ExportButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Automatically clear error message as soon as the user fixes the validation errors
  useEffect(() => {
    if (errorMsg) {
      const result = cvSchema.safeParse(data);
      if (result.success) {
        setErrorMsg(null);
      }
    }
  }, [data, errorMsg]);

  const handleDownloadPDF = async () => {
    setErrorMsg(null);

    // Validate data against Zod schema before export
    const result = cvSchema.safeParse(data);
    if (!result.success) {
      // Fixed: Zod uses .issues instead of .errors
      const firstError = result.error?.issues?.[0];
      if (firstError) {
        const fieldName = firstError.path.join(' › ');
        setErrorMsg(`${fieldName || 'Form'}: ${firstError.message}`);
      } else {
        setErrorMsg('Validation failed. Please check your form entries.');
      }
      return;
    }

    const element = document.getElementById('cv-print-area');
    if (!element) return;

    try {
      setIsGenerating(true);
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      setErrorMsg('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleDownloadPDF}
        disabled={isGenerating}
        className="flex items-center gap-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 text-white px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition transform hover:scale-105 cursor-pointer"
      >
        <Download size={14} className={isGenerating ? 'animate-bounce' : ''} />
        {isGenerating ? 'Generating PDF...' : 'Download PDF'}
      </button>
      {errorMsg && (
        <span className="text-[11px] text-rose-400 font-medium max-w-xs text-right animate-pulse">
          ⚠️ {errorMsg}
        </span>
      )}
    </div>
  );
}