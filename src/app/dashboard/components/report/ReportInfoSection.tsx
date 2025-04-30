import React from 'react';
import { StatusBadge } from './StatusBadge';

interface ReportInfoSectionProps {
    severity: string;
    cvssScore: string;
    vulnerableUrl: string;
    vulnerableParam: string;
    }
    
    export const ReportInfoSection: React.FC<ReportInfoSectionProps> = ({
        severity,
        cvssScore,
        vulnerableUrl,
        vulnerableParam
    }) => {
        return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div>
            <h3 className="text-gray-400 text-sm mb-2">Severity</h3>
            <StatusBadge status={severity} />
            </div>
            <div>
            <h3 className="text-gray-400 text-sm mb-2">CVSS Score</h3>
            <p className="text-white font-medium">{cvssScore}</p>
            </div>
            <div>
            <h3 className="text-gray-400 text-sm mb-2">Vulnerable URL/Area</h3>
            <p className="text-white break-words">{vulnerableUrl}</p>
            </div>
            <div>
            <h3 className="text-gray-400 text-sm mb-2">Vulnerable Form/Parameter</h3>
            <p className="text-white">{vulnerableParam}</p>
            </div>
        </div>
        );
    };