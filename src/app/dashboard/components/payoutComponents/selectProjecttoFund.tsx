// src/app/dashboard/payout/components/FundEscrowModal.tsx
"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ChevronDown, Search } from "lucide-react";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { useAccount } from "@starknet-react/core";
import {
  FORTICHAIN_CONTRACT_ADDRESS,
  useContractWriteUtility,
} from "@/hooks/useBlockchain";
import { FORTICHAIN_ABI } from "@/app/abi/fortichain-abi";
import SuccessModal from "./SuccessModal";
import { byteArray, cairo, CallData, RpcProvider, shortString } from "starknet";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ProjectsTable } from "../../project-owner/projects/components/project-table";
import { ProjectsContext } from "@/context/project-context";

export const myProvider = new RpcProvider({
  nodeUrl: process.env.NEXT_PUBLIC_RPC_URL,
});

interface FundModalProps {
  onClose: () => void;
  fundModal: () => void;
}

export default function ProjectToFundModal({
  onClose,
  fundModal,
}: FundModalProps) {

  const { projects } = useContext(ProjectsContext);


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-[#211a1d] bg-opacity-80 backdrop-blur-md"></div>
      <button
        onClick={onClose}
        className="absolute top-6 left-6 text-gray-300 hover:text-white flex items-center z-20"
      >
        <ArrowLeft size={20} className="mr-2" />
        <span>Back to Payouts</span>
      </button>
      <div className="relative bg-[#1b1618] border border-[#464043] rounded-2xl py-8 px-8 w-[90%] max-w-5xl z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white">
            Select Escrow To Fund
          </h2>
        </div>

        <div className="flex-1 p-6 bg-[#161113] border border-[#464043] rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Projects</h2>
            </div>

            <div className="flex gap-3 items-center">
              <div className="relative w-64 bg-[#161113]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search"
                  className="pl-10 bg-[#161113] border-[#464043] text-gray-300"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-transparent border-[#464043] text-white"
                  >
                    All
                    <ChevronDown size={16} className="ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>All</DropdownMenuItem>
                  <DropdownMenuItem>Completed</DropdownMenuItem>
                  <DropdownMenuItem>Ongoing</DropdownMenuItem>
                  <DropdownMenuItem>Closed</DropdownMenuItem>
                  <DropdownMenuItem>Paused</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

                  <ProjectsTable projects={projects} type="fund" fundModal={fundModal}  />
        </div>
      </div>
    </div>
  );
}
