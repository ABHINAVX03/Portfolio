import React from "react";
import TitleBlock from "./TitleBlock";

interface SheetFrameProps {
  id: string;
  title: string;
  dwgNo: string;
  sheetNo: number;
  totalSheets?: number;
  children: React.ReactNode;
}

export default function SheetFrame({
  id,
  title,
  dwgNo,
  sheetNo,
  totalSheets = 7,
  children,
}: SheetFrameProps) {
  return (
    <section id={id} className="sheet" aria-labelledby={`${id}-heading`}>
      {/* Top Zone Markers */}
      <div
        className="hidden md:flex justify-between font-mono text-[9px] text-[var(--muted)] pointer-events-none select-none pb-3 border-b border-[var(--grid-line)] mb-6"
        aria-hidden="true"
      >
        <span>ZONE {"//"} A</span>
        <span>B</span>
        <span>C</span>
        <span>D</span>
        <span>E</span>
        <span>ZONE {"//"} F</span>
      </div>

      {/* Main Sheet Body */}
      <div className="sheet-content">{children}</div>

      {/* Bottom Footer / Title Block Row */}
      <div className="mt-10 pt-4 border-t border-[var(--hairline)] flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-wider">
          <span>
            SPEC SHEET {sheetNo}/{totalSheets} {"//"} DWG {dwgNo}
          </span>
          <br />
          <span>ALL DIMENSIONS IN MILLIMETERS UNLESS SPECIFIED</span>
        </div>

        <TitleBlock
          title={title}
          dwgNo={dwgNo}
          sheetNo={sheetNo}
          totalSheets={totalSheets}
        />
      </div>
    </section>
  );
}
