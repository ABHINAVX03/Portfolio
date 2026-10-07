import React from "react";
import { BUILD_INFO } from "@/config/buildInfo";

interface TitleBlockProps {
  title: string;
  dwgNo: string;
  sheetNo: number;
  totalSheets?: number;
}

export default function TitleBlock({
  title,
  dwgNo,
  sheetNo,
  totalSheets = 7,
}: TitleBlockProps) {
  return (
    <div
      className="title-block"
      role="region"
      aria-label={`Drawing Title Block for ${title}`}
    >
      <div className="title-block-cell">
        <span className="title-block-label">TITLE</span>
        <span className="title-block-val">{title}</span>
      </div>
      <div className="title-block-cell">
        <span className="title-block-label">DWG NO</span>
        <span className="title-block-val">{dwgNo}</span>
      </div>
      <div className="title-block-cell">
        <span className="title-block-label">SHEET</span>
        <span className="title-block-val">
          {sheetNo} OF {totalSheets}
        </span>
      </div>
      <div className="title-block-cell">
        <span className="title-block-label">REV</span>
        <span className="title-block-val">{BUILD_INFO.commitHash}</span>
      </div>
      <div className="title-block-cell">
        <span className="title-block-label">DATE</span>
        <span className="title-block-val">{BUILD_INFO.commitDate}</span>
      </div>
      <div className="title-block-cell">
        <span className="title-block-label">DRAWN BY</span>
        <span className="title-block-val">{BUILD_INFO.drawnBy}</span>
      </div>
    </div>
  );
}
