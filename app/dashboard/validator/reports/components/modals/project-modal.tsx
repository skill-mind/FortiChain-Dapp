"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { mockProjectDetails } from "../../data/mock-data"

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md">
        <div className="flex items-center gap-4 mb-2">
          <div className="bg-amber-600 text-white rounded-md p-2 font-bold text-xl">DG</div>
          <div>
            <DialogTitle className="text-xl">{mockProjectDetails.name}</DialogTitle>
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">Ongoing</span>
          </div>
          <Button variant="ghost" className="ml-auto p-1 h-auto" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-zinc-300 mb-4">{mockProjectDetails.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {mockProjectDetails.tags.map((tag, index) => (
            <span key={index} className="bg-zinc-800 text-white text-xs px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">Prize Pool:</span>
            <span className="text-white">{mockProjectDetails.prizePool}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">Date of Expiry:</span>
            <span className="text-white">{mockProjectDetails.expiryDate}</span>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Languages</h3>
          <div className="space-y-3">
            {mockProjectDetails.languages.map((lang, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex items-center gap-2 w-24">
                  {lang.name === "TypeScript" && <div className="bg-blue-600 text-white rounded p-1">TS</div>}
                  {lang.name === "Python" && (
                    <div className="bg-yellow-600 text-white rounded p-1">
                      <span className="text-xs">🐍</span>
                    </div>
                  )}
                  {lang.name === "Cairo" && (
                    <div className="bg-red-600 text-white rounded p-1">
                      <span className="text-xs">C</span>
                    </div>
                  )}
                  {lang.name === "Rust" && (
                    <div className="bg-orange-600 text-white rounded p-1">
                      <span className="text-xs">R</span>
                    </div>
                  )}
                  <span className="text-white">{lang.name}</span>
                </div>
                <div className="flex-1 bg-zinc-800 rounded-full h-2">
                  <div
                    className={`h-full rounded-full ${
                      lang.name === "TypeScript"
                        ? "bg-blue-600"
                        : lang.name === "Python"
                          ? "bg-yellow-600"
                          : lang.name === "Cairo"
                            ? "bg-red-600"
                            : "bg-orange-600"
                    }`}
                    style={{ width: `${lang.percentage}%` }}
                  ></div>
                </div>
                <span className="text-zinc-400 text-sm">{lang.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Repositories</h3>
          {mockProjectDetails.repositories.map((repo, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <div className="bg-zinc-800 p-2 rounded">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.581 9.5 21.278 9.5 21.017C9.5 20.778 9.492 20.055 9.489 19.189C6.728 19.788 6.139 17.81 6.139 17.81C5.685 16.631 5.028 16.329 5.028 16.329C4.132 15.677 5.097 15.69 5.097 15.69C6.094 15.76 6.629 16.746 6.629 16.746C7.508 18.332 8.97 17.858 9.526 17.604C9.618 16.931 9.883 16.457 10.175 16.17C7.955 15.883 5.619 15.015 5.619 11.129C5.619 10.047 6.02 9.166 6.649 8.482C6.546 8.232 6.203 7.218 6.747 5.916C6.747 5.916 7.57 5.652 9.487 6.869C10.292 6.65 11.15 6.54 12 6.536C12.85 6.54 13.707 6.65 14.513 6.869C16.43 5.652 17.251 5.916 17.251 5.916C17.797 7.218 17.453 8.232 17.351 8.482C17.979 9.166 18.38 10.047 18.38 11.129C18.38 15.024 16.04 15.88 13.813 16.163C14.172 16.51 14.5 17.207 14.5 18.255C14.5 19.712 14.488 20.687 14.488 21.017C14.488 21.28 14.648 21.586 15.154 21.487C19.125 20.162 22 16.416 22 12C22 6.477 17.523 2 12 2Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="text-white">{repo}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
