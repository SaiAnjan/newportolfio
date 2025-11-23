"use client";

import Link from "next/link";
import { useState } from "react";

export default function ResumePage() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Sai_Anjan_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="w-full bg-white fixed z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-sm text-gray-600 hover:text-black inline-flex items-center gap-2">
            <span>←</span>
            <span>Back to Homepage</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="text-sm text-gray-600 hover:text-black transition-colors border border-gray-300 px-4 py-2 rounded hover:border-black"
            >
              Download
            </button>
            <button
              onClick={handlePrint}
              className="text-sm text-gray-600 hover:text-black transition-colors border border-gray-300 px-4 py-2 rounded hover:border-black"
            >
              Print
            </button>
          </div>
        </div>
      </nav>

      {/* PDF Viewer */}
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <iframe
            src="/resume.pdf"
            className="w-full h-[calc(100vh-8rem)] border border-gray-200 rounded-lg"
            title="Resume PDF Viewer"
          />
        </div>
      </div>
    </main>
  );
}


