import React from "react";
import Sheet1Hero from "@/components/DrawingSheet/Sheet1Hero";
import Sheet2Nexora from "@/components/DrawingSheet/Sheet2Nexora";
import Sheet3DrawingList from "@/components/DrawingSheet/Sheet3DrawingList";
import Sheet4About from "@/components/DrawingSheet/Sheet4About";
import Sheet5BOM from "@/components/DrawingSheet/Sheet5BOM";
import Sheet6History from "@/components/DrawingSheet/Sheet6History";
import Sheet7Contact from "@/components/DrawingSheet/Sheet7Contact";
import Footer from "@/components/DrawingSheet/Footer";

export default function Home() {
  return (
    <>
      <div className="sheet-wrapper">
        {/* Sheet 1: Specification Overview (Hero & Info Card) */}
        <Sheet1Hero />

        {/* Sheet 2: Nexora System Architecture (Schematic & Benchmark) */}
        <Sheet2Nexora />

        {/* Sheet 3: Drawing List (Project Register) */}
        <Sheet3DrawingList />

        {/* Sheet 4: General Notes (About & Formation) */}
        <Sheet4About />

        {/* Sheet 5: Bill of Materials (Defensible Skills) */}
        <Sheet5BOM />

        {/* Sheet 6: Revision History (Education & Experience Log) */}
        <Sheet6History />

        {/* Sheet 7: Request for Information (Contact & Transmission) */}
        <Sheet7Contact />
      </div>
    </>
  );
}