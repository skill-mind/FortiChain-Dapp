"use client";

import type React from "react";

import { useContext, useState } from "react";
import { ArrowLeft, Bell, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProjectsContext } from "@/context/project-context";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

export function IncreaseReward({ id }: { id: string }) {
  const { projects, wallet, updateProject } = useContext(ProjectsContext);
  const router = useRouter();
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState("1,000.00");
  const [autoTopUp, setAutoTopUp] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Find the project by ID
  const project = projects.find((p) => p.id === id);

  // Mock balances
  const escrowBalance = "$5,210.34";
  const walletBalance = "$2,210.34";
  const currentBounty = project?.bountyAllocated
    ? `$${project.bountyAllocated}`
    : "$4,210.34";

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers, commas, and periods
    const value = e.target.value.replace(/[^0-9.,]/g, "");
    setAmount(value);
  };

  const handleBoostBounty = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmBoost = () => {
    setShowConfirmModal(false);
    setSubmitting(true);

    setTimeout(() => {
      // Calculate new bounty amount
      const currentAmount = Number.parseFloat(
        project?.bountyAllocated?.replace(/,/g, "") || "0"
      );
      const additionalAmount = Number.parseFloat(
        amount.replace(/,/g, "") || "0"
      );
      const newTotal = (currentAmount + additionalAmount).toLocaleString(
        "en-US",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      );

      updateProject(id, {
        bountyAllocated: newTotal,
      });

      setSubmitting(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  const goBackToProject = () => {
    router.push(`/dashboard/project-owner/projects/${id}`);
  };

  if (!project) {
    return <div className="flex-1 p-6 text-white">Project not found</div>;
  }

  // Calculate new total bounty for display
  const currentAmountNum = Number.parseFloat(
    project?.bountyAllocated?.replace(/,/g, "") || "0"
  );
  const additionalAmountNum = Number.parseFloat(
    amount.replace(/,/g, "") || "0"
  );
  const newTotalBounty = (
    currentAmountNum + additionalAmountNum
  ).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="flex-1">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft size={18} />
          </button>
          <span className="text-gray-400">Go Back</span>
        </div>
      </div>

      <div className="">
        <h1 className="text-2xl font-bold text-white text-center mb-8">
          Increase Reward
        </h1>

        {!submitting && !showSuccessModal ? (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="bg-[#1A1A1A] border border-gray-800 rounded-md p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">
                  Escrow Balance (Available for Allocation):
                </span>
                <span className="text-white font-medium">{escrowBalance}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">
                  Wallet Balance (Available for use):
                </span>
                <span className="text-white font-medium">{walletBalance}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">
                  Current Bounty Allocation:
                </span>
                <span className="text-white font-medium">{currentBounty}</span>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm text-gray-400">Additional Bounty</label>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-[#121212] border-gray-700 text-white w-20"
                    >
                      {currency}
                      <ChevronDown size={16} className="ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="bg-[#121212] border-gray-700"
                  >
                    <DropdownMenuItem
                      className="text-white"
                      onClick={() => setCurrency("USD")}
                    >
                      USD
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-white"
                      onClick={() => setCurrency("ETH")}
                    >
                      ETH
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-white"
                      onClick={() => setCurrency("BTC")}
                    >
                      BTC
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Input
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="Amount"
                  className="bg-[#121212] border-gray-700 text-white flex-1"
                />
              </div>
              <p className="text-xs text-gray-500">Approx. ${amount}</p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="autoTopUp"
                checked={autoTopUp}
                onCheckedChange={(checked) => setAutoTopUp(checked as boolean)}
                className="data-[state=checked]:bg-blue-600"
              />
              <label
                htmlFor="autoTopUp"
                className="text-sm text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Automatically top up from wallet if escrow balance is
                insufficient
              </label>
            </div>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
              onClick={handleBoostBounty}
            >
              Boost Bounty
            </Button>
          </div>
        ) : submitting ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-t-blue-600 border-gray-700 rounded-full animate-spin mb-4"></div>
            <p className="text-white">Processing bounty increase...</p>
          </div>
        ) : null}

        {/* Confirm Modal */}
        <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
          <DialogContent className="bg-[#1A1A1A] border-gray-800 p-6 max-w-md">
            <h2 className="text-xl font-bold text-white text-center mb-4">
              Confirm Bounty Boost
            </h2>
            <p className="text-gray-400 text-center text-sm mb-6">
              Please review the details before proceeding.
            </p>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Previous Bounty</span>
                <span className="text-white">{currentBounty}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Additional Bounty</span>
                <span className="text-white">${amount}</span>
              </div>

              <div className="flex justify-between font-medium">
                <span className="text-gray-400">New Total Bounty</span>
                <span className="text-white">${newTotalBounty}</span>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                className="bg-transparent border-gray-700 text-white"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleConfirmBoost}
              >
                Confirm & Boost
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Success Modal */}
        <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
          <DialogContent className="bg-[#1A1A1A] border-gray-800 p-6 max-w-md">
            <h2 className="text-xl font-bold text-white text-center mb-4">
              Bounty Boosted
            </h2>
            <p className="text-gray-400 text-center text-sm mb-6">
              Your reward has been successfully increased and is now live!
            </p>
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-white" />
              </div>
            </div>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white w-full"
              onClick={goBackToProject}
            >
              Go Back
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
