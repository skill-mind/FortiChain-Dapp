"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  AlertTriangle, 
  Shield, 
  Clock, 
  User, 
  ExternalLink,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Bookmark,
  BookmarkCheck
} from "lucide-react";
import { useGetReport, UnifiedReport } from "@/hooks/useGetReport";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import poc1 from '../../../../../../public/poc1.svg';
import poc2 from '../../../../../../public/poc2.svg';
import poc3 from '../../../../../../public/poc3.svg';
import bookmark from '../../../../../../public/bookmark.svg';
import not_bookmark from '../../../../../../public/notbookmark.svg';

export interface GetReportProps {
  reportId: string;
  className?: string;
  variant?: 'full' | 'compact' | 'dashboard';
  showSkeleton?: boolean;
  onReportLoad?: (report: UnifiedReport) => void;
  onError?: (error: string) => void;
  // Dashboard-specific props
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
  onBackClick?: () => void;
  onApprovePayoutClick?: () => void;
  onViewProjectClick?: () => void;
  onRequestMoreInfoClick?: () => void;
  onRejectReportClick?: () => void;
  // Additional action buttons
  actionButtons?: React.ReactNode;
}

const GetReport: React.FC<GetReportProps> = ({
  reportId,
  className = "",
  variant = 'full',
  showSkeleton = true,
  onReportLoad,
  onError,
  isBookmarked = false,
  onToggleBookmark,
  onBackClick,
  onApprovePayoutClick,
  onViewProjectClick,
  onRequestMoreInfoClick,
  onRejectReportClick,
  actionButtons
}) => {
  const { report, loading, error, isEmpty, refetch } = useGetReport(reportId);

  // Notify parent when report loads
  useEffect(() => {
    if (report && onReportLoad) {
      onReportLoad(report);
    }
  }, [report, onReportLoad]);

  // Notify parent of errors
  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  const handleRetry = () => {
    refetch();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'low': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'info': return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return <XCircle className="w-4 h-4" />;
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <AlertCircle className="w-4 h-4" />;
      case 'low': return <Shield className="w-4 h-4" />;
      case 'info': return <CheckCircle2 className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const formatTimestamp = (timestamp: number) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Loading skeleton
  if (loading && showSkeleton) {
    return (
      <div className={`bg-[#1C1618] border border-[#464043] rounded-lg p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 bg-[#464043] rounded w-1/3"></div>
            <div className="h-5 bg-[#464043] rounded w-20"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-[#464043] rounded w-full"></div>
            <div className="h-4 bg-[#464043] rounded w-3/4"></div>
            <div className="h-4 bg-[#464043] rounded w-1/2"></div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="h-16 bg-[#464043] rounded"></div>
            <div className="h-16 bg-[#464043] rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`bg-[#1C1618] border border-red-500/20 rounded-lg p-6 ${className}`}>
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Error Loading Report</h3>
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (isEmpty) {
    return (
      <div className={`bg-[#1C1618] border border-[#464043] rounded-lg p-6 ${className}`}>
        <div className="text-center">
          <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Report Found</h3>
          <p className="text-gray-400">Report with ID {reportId} could not be found or has no content.</p>
        </div>
      </div>
    );
  }

  // Main content
  if (!report) {
    return null;
  }

  // Compact view for lists
  if (variant === 'compact') {
    return (
      <div className={`bg-[#1C1618] border border-[#464043] rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-white truncate">{report.title}</h3>
          <div className={`px-2 py-1 rounded-full text-xs border flex items-center gap-1 ${getSeverityColor(report.severity || 'Medium')}`}>
            {getSeverityIcon(report.severity || 'Medium')}
            {report.severity}
          </div>
        </div>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{report.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>ID: {report.id}</span>
          <span>{formatTimestamp(report.created_at)}</span>
        </div>
      </div>
    );
  }

  // Dashboard view that matches existing UI patterns
  if (variant === 'dashboard') {
    return (
      <div className={`p-6 border border-[#464043] rounded-lg ${className}`}>
        {/* Header with back button and bookmark */}
        <div className="flex items-center mb-6">
          {onBackClick && (
            <Button
              variant="ghost"
              className="text-white mr-2 text-xl"
              onClick={onBackClick}
            >
              <ArrowLeft className="h-5 w-8 mr-2" />
              Back to Reports
            </Button>
          )}
        </div>

        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold flex-1 pr-4">
            {report.title} - {report.url}
          </h1>
          {onToggleBookmark && (
            <button className="text-white w-10" onClick={onToggleBookmark}>
              {isBookmarked ? (
                <Image src={bookmark} alt="Bookmarked" className="rounded" />
              ) : (
                <Image src={not_bookmark} alt="Not Bookmarked" className="rounded" />
              )}
            </button>
          )}
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div>
            <h3 className="text-zinc-400 mb-2">Severity</h3>
            <span className={`px-3 py-1 rounded-md text-xs font-medium ${getSeverityColor(report.severity || 'Medium')}`}>
              {report.severity}
            </span>
          </div>
          <div>
            <h3 className="text-zinc-400 mb-2">CVSS Score</h3>
            <span className="text-white">{report.cvssScore || 'N/A'}</span>
          </div>
          <div>
            <h3 className="text-zinc-400 mb-2">Vulnerable URL/Area</h3>
            <span className="text-white">{report.url || 'N/A'}</span>
          </div>
          <div>
            <h3 className="text-zinc-400 mb-2">Vulnerable Form/Parameter</h3>
            <span className="text-white">{report.vulnerableParameter || 'N/A'}</span>
          </div>
        </div>

        {/* Vulnerability Description */}
        {report.vulnerabilityDescription && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Vulnerability Description</h2>
            <p className="text-zinc-200">{report.vulnerabilityDescription}</p>
          </div>
        )}

        {/* Impact */}
        {report.vulnerabilityImpact && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Impact of Vulnerability</h2>
            <p className="text-zinc-200">{report.vulnerabilityImpact}</p>
          </div>
        )}

        {/* Steps to Reproduce */}
        {report.stepsToReproduce && report.stepsToReproduce.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Steps to reproduce</h2>
            <ol className="list-decimal pl-5 space-y-2">
              {report.stepsToReproduce.map((step, index) => (
                <li key={index} className="text-zinc-200">{step}</li>
              ))}
            </ol>
          </div>
        )}

        {/* Proof of Concept */}
        {report.proofOfConcept && report.proofOfConcept.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Proof of Concept (PoC)</h2>
            <div className="flex items-center space-x-4 gap-4">
              <div className="rounded-md p-2">
                <Image src={poc1} alt="PoC Screenshot 1" className="w-full h-auto rounded" />
              </div>
              <div className="rounded-md p-2">
                <Image src={poc2} alt="PoC Screenshot 2" className="w-full h-auto rounded" />
              </div>
              <div className="rounded-md p-2">
                <Image src={poc3} alt="PoC Screenshot 3" className="w-full h-auto rounded" />
              </div>
            </div>
          </div>
        )}

        {/* Mitigation Steps */}
        {report.mitigationSteps && report.mitigationSteps.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Mitigation Steps</h2>
            <ol className="list-decimal pl-5 space-y-2">
              {report.mitigationSteps.map((step, index) => (
                <li key={index} className="text-zinc-200">{step}</li>
              ))}
            </ol>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 ml-10">
          {onApprovePayoutClick && (
            <Button
              className="bg-[#0000FF] py-2 hover:bg-blue-700 text-white"
              onClick={onApprovePayoutClick}
            >
              Approve Payout
            </Button>
          )}
          {onViewProjectClick && (
            <Button
              variant="outline"
              className="border-zinc-700 py-2 px-6 text-[#000] bg-white"
              onClick={onViewProjectClick}
            >
              View Project
            </Button>
          )}
          {onRequestMoreInfoClick && (
            <Button
              variant="outline"
              className="border-zinc-700 py-2 text-white px-4 bg-zinc-800"
              onClick={onRequestMoreInfoClick}
            >
              Request More Info
            </Button>
          )}
          {onRejectReportClick && (
            <Button
              variant="ghost"
              className="text-red-500 hover:text-red-400 hover:bg-zinc-800"
              onClick={onRejectReportClick}
            >
              Reject Report
            </Button>
          )}
          {actionButtons}
        </div>
      </div>
    );
  }

  // Default full view with modern card design
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-[#1C1618] border border-[#464043] rounded-lg p-6 ${className}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white mb-2">{report.title}</h2>
          <p className="text-gray-400 text-sm">{report.description}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm border flex items-center gap-2 ${getSeverityColor(report.severity || 'Medium')}`}>
          {getSeverityIcon(report.severity || 'Medium')}
          {report.severity}
        </div>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#110D0F] border border-[#464043] rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-gray-400">Report ID</span>
          </div>
          <p className="text-white font-mono text-sm">{report.id}</p>
        </div>

        <div className="bg-[#110D0F] border border-[#464043] rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <User className="w-4 h-4 text-green-400" />
            <span className="text-xs text-gray-400">Researcher</span>
          </div>
          <p className="text-white font-mono text-sm truncate">{report.researcher_address}</p>
        </div>

        <div className="bg-[#110D0F] border border-[#464043] rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-gray-400">Created</span>
          </div>
          <p className="text-white text-sm">{formatTimestamp(report.created_at)}</p>
        </div>

        <div className="bg-[#110D0F] border border-[#464043] rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-gray-400">Project ID</span>
          </div>
          <p className="text-white text-sm">{report.project_id}</p>
        </div>
      </div>

      {/* Summary */}
      {report.summary && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Executive Summary</h3>
          <div className="bg-[#110D0F] border border-[#464043] rounded-lg p-4">
            <p className="text-gray-300 leading-relaxed">{report.summary}</p>
          </div>
        </div>
      )}

      {/* Findings */}
      {report.findings && report.findings.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">
            Findings ({report.findings.length})
          </h3>
          <div className="space-y-4">
            {report.findings.map((finding, index) => (
              <div key={index} className="bg-[#110D0F] border border-[#464043] rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{finding.vulnerability}</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-red-400 font-medium">Impact:</span>
                    <span className="text-gray-300 ml-2">{finding.impact}</span>
                  </div>
                  <div>
                    <span className="text-green-400 font-medium">Recommendation:</span>
                    <span className="text-gray-300 ml-2">{finding.recommendation}</span>
                  </div>
                  {finding.location && (
                    <div>
                      <span className="text-blue-400 font-medium">Location:</span>
                      <span className="text-gray-300 ml-2 font-mono">{finding.location}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[#464043]">
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>Status: {report.status}</span>
          <span>Updated: {formatTimestamp(report.updated_at)}</span>
        </div>
        {report.cid && (
          <a
            href={`${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}${report.cid}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View on IPFS
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default GetReport;
