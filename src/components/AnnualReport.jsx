import React from "react";

export default function AnnualReport() {
  const PDF_PATH = "/annual-report.pdf";

  return (
    <iframe
      src={`${PDF_PATH}#zoom=page-fit`}
      title="Annual Report"
      className="block w-screen h-[calc(100svh-60px)] border-0"
    />
  );
}