"use client"

import { useState } from "react"
import { Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { mockReports } from "../data/mock-data"
import { getSeverityColor } from "../utils/helpers"
import type { Report } from "../types"

interface ReportsListProps {
  selectedTab: string
  setSelectedTab: (tab: string) => void
  onReportClick: (report: Report) => void
}

export function ReportsList({ selectedTab, setSelectedTab, onReportClick }: ReportsListProps) {
  // Filter states
  const [assignedResearcher, setAssignedResearcher] = useState<string | null>(null)
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null)

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="w-full md:w-auto">
          <Input
            placeholder="Search"
            className="bg-zinc-900 border-zinc-800 text-white"
            startIcon={<Search className="w-4 h-4 text-zinc-400" />}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-zinc-900 border-zinc-800 text-white">
                Assigned Researcher <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-900 border-zinc-800 text-white">
              <DropdownMenuItem className="flex items-center gap-2" onClick={() => setAssignedResearcher("Python")}>
                Python {assignedResearcher === "Python" && <span className="ml-auto">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2" onClick={() => setAssignedResearcher("JavaScript")}>
                JavaScript {assignedResearcher === "JavaScript" && <span className="ml-auto">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2" onClick={() => setAssignedResearcher("Rust")}>
                Rust {assignedResearcher === "Rust" && <span className="ml-auto">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2" onClick={() => setAssignedResearcher("Cairo")}>
                Cairo {assignedResearcher === "Cairo" && <span className="ml-auto">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2" onClick={() => setAssignedResearcher("Solidity")}>
                Solidity {assignedResearcher === "Solidity" && <span className="ml-auto">✓</span>}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-zinc-900 border-zinc-800 text-white">
                Select Languages <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-900 border-zinc-800 text-white">
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => {
                  if (selectedLanguages.includes("Python")) {
                    setSelectedLanguages(selectedLanguages.filter((lang) => lang !== "Python"))
                  } else {
                    setSelectedLanguages([...selectedLanguages, "Python"])
                  }
                }}
              >
                Python {selectedLanguages.includes("Python") && <span className="ml-auto">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => {
                  if (selectedLanguages.includes("JavaScript")) {
                    setSelectedLanguages(selectedLanguages.filter((lang) => lang !== "JavaScript"))
                  } else {
                    setSelectedLanguages([...selectedLanguages, "JavaScript"])
                  }
                }}
              >
                JavaScript {selectedLanguages.includes("JavaScript") && <span className="ml-auto">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => {
                  if (selectedLanguages.includes("Rust")) {
                    setSelectedLanguages(selectedLanguages.filter((lang) => lang !== "Rust"))
                  } else {
                    setSelectedLanguages([...selectedLanguages, "Rust"])
                  }
                }}
              >
                Rust {selectedLanguages.includes("Rust") && <span className="ml-auto">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => {
                  if (selectedLanguages.includes("Cairo")) {
                    setSelectedLanguages(selectedLanguages.filter((lang) => lang !== "Cairo"))
                  } else {
                    setSelectedLanguages([...selectedLanguages, "Cairo"])
                  }
                }}
              >
                Cairo {selectedLanguages.includes("Cairo") && <span className="ml-auto">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => {
                  if (selectedLanguages.includes("Solidity")) {
                    setSelectedLanguages(selectedLanguages.filter((lang) => lang !== "Solidity"))
                  } else {
                    setSelectedLanguages([...selectedLanguages, "Solidity"])
                  }
                }}
              >
                Solidity {selectedLanguages.includes("Solidity") && <span className="ml-auto">✓</span>}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-zinc-900 border-zinc-800 text-white">
                Severity <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-900 border-zinc-800 text-white">
              <DropdownMenuItem className="flex items-center gap-2" onClick={() => setSelectedSeverity("Critical")}>
                Critical {selectedSeverity === "Critical" && <span className="ml-auto">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2" onClick={() => setSelectedSeverity("High")}>
                High {selectedSeverity === "High" && <span className="ml-auto">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2" onClick={() => setSelectedSeverity("Medium")}>
                Medium {selectedSeverity === "Medium" && <span className="ml-auto">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2" onClick={() => setSelectedSeverity("Low")}>
                Low {selectedSeverity === "Low" && <span className="ml-auto">✓</span>}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue={selectedTab} value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="bg-zinc-900 mb-6">
          <TabsTrigger value="pending" className="data-[state=active]:bg-zinc-800">
            Pending Review ({mockReports.pending.length})
          </TabsTrigger>
          <TabsTrigger value="validated" className="data-[state=active]:bg-zinc-800">
            Validated ({mockReports.validated.length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="data-[state=active]:bg-zinc-800">
            Rejected ({mockReports.rejected.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockReports.pending.map((report, index) => (
              <Card
                key={index}
                className="bg-zinc-900 border-zinc-800 cursor-pointer hover:bg-zinc-800 transition-colors"
                onClick={() => onReportClick(report)}
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-zinc-400">{report.id}</span>
                    <span className="text-zinc-400">{report.date}</span>
                  </div>
                  <h3 className="text-white font-medium mb-4 line-clamp-2">{report.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-md text-xs font-medium ${getSeverityColor(report.severity)}`}>
                      {report.severity}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{report.cvssScore}</span>
                      <span className="text-zinc-400">{report.researcher}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="validated" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockReports.validated.map((report, index) => (
              <Card
                key={index}
                className="bg-zinc-900 border-zinc-800 cursor-pointer hover:bg-zinc-800 transition-colors"
                onClick={() => onReportClick(report)}
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-zinc-400">{report.id}</span>
                    <span className="text-zinc-400">{report.date}</span>
                  </div>
                  <h3 className="text-white font-medium mb-4 line-clamp-2">{report.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-md text-xs font-medium ${getSeverityColor(report.severity)}`}>
                      {report.severity}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{report.cvssScore}</span>
                      <span className="text-zinc-400">{report.researcher}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockReports.rejected.map((report, index) => (
              <Card
                key={index}
                className="bg-zinc-900 border-zinc-800 cursor-pointer hover:bg-zinc-800 transition-colors"
                onClick={() => onReportClick(report)}
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-zinc-400">{report.id}</span>
                    <span className="text-zinc-400">{report.date}</span>
                  </div>
                  <h3 className="text-white font-medium mb-4 line-clamp-2">{report.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-md text-xs font-medium ${getSeverityColor(report.severity)}`}>
                      {report.severity}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{report.cvssScore}</span>
                      <span className="text-zinc-400">{report.researcher}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
