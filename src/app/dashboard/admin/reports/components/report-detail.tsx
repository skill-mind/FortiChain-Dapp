"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Report } from "../types"
import poc1 from '../../../../../../public/poc1.svg';
import poc2 from '../../../../../../public/poc2.svg';
import poc3 from '../../../../../../public/poc3.svg';
import Image from "next/image";

interface ReportDetailProps {
  report: Report
  onBackClick: () => void
}

export function ReportDetail({ report, onBackClick }: ReportDetailProps) {
  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" className="text-white text-[18px]" onClick={onBackClick}>
          <ArrowLeft className="h-5 w-8 mr-2" />
          Go Back
        </Button>
      </div>

      <div className="bg-[#1C1618] border text-[#f6f6f6] border-[#464043] rounded-lg p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Local File Inclusion (LFI) on Home Page - https://example.com/home</h1>
          <span
            className={`px-3 py-1.5 rounded-2xl text-sm font-medium ${
              report.status === "Approved"
                ? "bg-[#01A901] text-white"
                : report.status === "Rejected"
                  ? "bg-red-600 text-white"
                  : "bg-blue-600 text-white"
            }`}
          >
            {report.status}
          </span>
        </div>

        <div className="flex space-x-20 gap-6 mb-6 border-b border-[#464043] pb-6">
          <div>
            <h3 className="mb-2">Researcher Reward</h3>
            <p className="text-white font-medium">${report.researcherReward || "211.36"}</p>
          </div>
          <div>
            <h3 className="mb-2">Validator Reward</h3>
            <p className="text-white font-medium">${report.validatorReward || "8.6"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 border-b border-zinc-800 pb-6">
          <div>
            <h3 className="mb-2">Severity</h3>
            <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-md">Critical</span>
          </div>
          <div>
            <h3 className="mb-2">CVSS Score</h3>
            <p className="text-white">8.6</p>
          </div>
          <div>
            <h3 className="mb-2">Vulnerable URL/Area</h3>
            <p className="text-white">https://example.com/home - Home Page</p>
          </div>
          <div>
            <h3 className="mb-2">Vulnerable Form/Parameter</h3>
            <p className="text-white">Broken Access Control</p>
          </div>
        </div>

        <div className="mb-6 border-b border-zinc-800 pb-6">
          <h2 className="text-xl font-semibold mb-4">Vulnerability Description</h2>
          <p className="text-zinc-200">
            Attackers can exploit the Filename parameter to access sensitive files (e.g., /etc/passwd) by sending a
            crafted request, exposing critical server data.
          </p>
        </div>

        <div className="mb-6 border-b border-zinc-800 pb-6">
          <h2 className="text-xl font-semibold mb-4">Impact of Vulnerability</h2>
          <p className="text-zinc-200">
            The vulnerability of Local File Inclusion (LFI) on the home page "https://example.com/home" can be
            attributed to the impact of the filename parameter. This vulnerability allows an attacker to manipulate the
            filename parameter in the URL to include arbitrary local files from the server.
          </p>
        </div>

        <div className="mb-6 border-b border-zinc-800 pb-6">
          <h2 className="text-xl font-semibold mb-4">Steps to reproduce</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li className="text-zinc-200">Go to the Home Page (https://example.com/home).</li>
            <li className="text-zinc-200">Select any file from the selection section.</li>
            <li className="text-zinc-200">
              Intercept the request in the Burp Suite Proxy tool and send it to the request repeater tab in Burp Suite
              Proxy tool.
            </li>
          </ol>
        </div>

        <div className="mb-6 pb-6">
          <h2 className="text-xl font-semibold mb-4">Proof of Concept (PoC)</h2>
          <div className="flex space-x-6 items-center flex-wrap gap-4">
            <div className="">
              <Image src={poc1} alt="PoC Screenshot 1" className="w-full h-auto rounded" />
            </div>
            <div className="">
              <Image src={poc2} alt="PoC Screenshot 2" className="w-full h-auto rounded" />
            </div>
            <div className="">
              <Image src={poc3} alt="PoC Screenshot 3" className="w-full h-auto rounded" />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Mitigation Steps for Local File Inclusion</h2>
          <ol className="list-decimal pl-5 space-y-4">
            <li className="text-zinc-200">
              Implement input validation and sanitize user input to prevent the <br /> inclusion of unauthorized file paths or
              malicious input.
            </li>
            <li className="text-zinc-200">
              Avoid using user-supplied input directly in file inclusion functions. <br /> Instead, use a whitelist approach or
              predefined file mappings.
            </li>
          </ol>
        </div>

        <div className="mt-8">
          <Button className="bg-white py-6 px-12 hover:bg-zinc-700 text-black">View Project</Button>
        </div>
      </div>
    </div>
  )
}
