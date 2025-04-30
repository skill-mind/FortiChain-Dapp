"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { mockProjectDetails } from "../../data/mock-data";
import prize1 from "../../../../../../../public/prize1.svg";
import prize2 from "../../../../../../../public/prize2.svg";
import prize3 from "../../../../../../../public/prize3.svg";
import ts from "../../../../../../../public/ts1.svg";
import rs from "../../../../../../../public/rs.svg";
import cairo from "../../../../../../../public/cairo.svg";
import py from "../../../../../../../public/py.svg";
import Image from "next/image";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Language {
  name: string;
  percentage: number;
}

export function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-3xl">
        <div className="flex items-center gap-4 mb-2">
          <div className="bg-[#BC8522] text-white rounded-md p-2 font-bold text-xl">
            DG
          </div>
          <div className="flex items-center space-x-2">
            <DialogTitle className="text-xl">
              {mockProjectDetails.name}
            </DialogTitle>
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              Ongoing
            </span>
          </div>
          <Button
            variant="ghost"
            className="ml-auto p-1 h-auto"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-zinc-300 mb-4 text-lg">
          {mockProjectDetails.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {mockProjectDetails.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="bg-white text-zinc-800 text-sm font-semibold px-4 py-1.5 rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center gap-2 rounded-lg border border-[#464043] p-2">
            <Image src={prize1} alt="icon" />
            <span className="text-zinc-400">Prize Pool:</span>
            <span className="text-white">{mockProjectDetails.prizePool}</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-[#464043] p-2">
            <Image src={prize2} alt="icon" />
            <span className="text-zinc-400">Date of Expiry:</span>
            <span className="text-white">{mockProjectDetails.expiryDate}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2 rounded-lg border border-[#464043] p-2">
            <Image src={prize3} alt="icon" />
            <span className="text-zinc-400">Defi Guard SmartContract</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-[#464043] p-2">
            <Image src={prize3} alt="icon" />
            <span className="text-zinc-400">Defi Guard SmartContract</span>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-medium mb-2">Languages</h3>
          <div className="space-y-5">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Image src={ts} alt="icon" />
                <h2>Typescript</h2>
                <span className="text-sm">45%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Image src={py} alt="icon" />
                <h2>Python</h2>
                <span className="text-sm">25%</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Image src={cairo} alt="icon" />
                <h2>Cairo</h2>
                <span className="text-sm">65%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Image src={rs} alt="icon" />
                <h2>Rust</h2>
                <span className="text-sm">25%</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
