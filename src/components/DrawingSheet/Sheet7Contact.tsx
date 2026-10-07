import React from "react";
import SheetFrame from "./SheetFrame";

export default function Sheet7Contact() {
  return (
    <SheetFrame id="contact" title="REQUEST FOR INFORMATION (RFI)" dwgNo="AG-007" sheetNo={7}>
      <div className="flex flex-col gap-6">
        <div className="border-b border-[var(--hairline)] pb-2 flex flex-col sm:flex-row justify-between items-baseline gap-2">
          <div>
            <span className="font-mono text-xs text-[var(--accent)] uppercase font-bold tracking-wider">
              INQUIRY & DISPATCH // DIRECT TRANSMISSION
            </span>
            <h2 id="contact-heading" className="text-2xl sm:text-3xl font-semibold">
              Request for Information (RFI)
            </h2>
          </div>
          <span className="font-mono text-xs text-[var(--muted)]">SEC. 7.1</span>
        </div>

        <p className="text-base text-[var(--ink)] max-w-[62ch] leading-relaxed">
          Open to full-time engineering roles, backend systems architecture discussions, and technical collaborations. I do not use decorative contact forms that hide message status; dispatch directly to my inbox or connect via professional registries.
        </p>

        {/* Transmission Box */}
        <div className="border border-[var(--hairline)] p-6 bg-[var(--paper)] max-w-[720px]">
          <span className="font-mono text-xs uppercase text-[var(--muted)] block mb-2 font-bold">
            PRIMARY DIRECT CONTACT (MAILTO)
          </span>

          <div className="mb-6">
            <a
              href="mailto:guptaabhinav697@gmail.com"
              className="text-2xl sm:text-3xl font-mono font-bold text-[var(--accent)] hover:underline break-all"
            >
              guptaabhinav697@gmail.com
            </a>
          </div>

          <div className="border-t border-[var(--grid-line)] pt-4 flex flex-col gap-2">
            <span className="font-mono text-xs uppercase text-[var(--muted)] font-bold">
              NETWORK REGISTRIES & CODES
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
              <a
                href="https://github.com/ABHINAVX03"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-[var(--hairline)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors flex justify-between items-center"
              >
                <span>GITHUB</span>
                <span className="text-[var(--muted)]">@ABHINAVX03 ↗</span>
              </a>

              <a
                href="https://www.linkedin.com/in/abhinav-gupta-367369167/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-[var(--hairline)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors flex justify-between items-center"
              >
                <span>LINKEDIN</span>
                <span className="text-[var(--muted)]">abhinav-gupta ↗</span>
              </a>

              <a
                href="https://leetcode.com/u/ABHINAVX03/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-[var(--hairline)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors flex justify-between items-center"
              >
                <span>LEETCODE</span>
                <span className="text-[var(--muted)]">500+ Solved ↗</span>
              </a>

              <a
                href="https://www.hackerrank.com/profile/ABHINAVX03"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-[var(--hairline)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors flex justify-between items-center"
              >
                <span>HACKERRANK</span>
                <span className="text-[var(--muted)]">Profile ↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </SheetFrame>
  );
}
