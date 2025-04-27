"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { StatusBadge } from '../../components/report/StatusBadge';
import { sampleReports } from '../../components/type/sampleData';
import { Report } from '../../components/type/Report';

const Reports: React.FC = () => {
  const router = useRouter();
  const [reports, setReports] = useState<Report[]>(sampleReports);
  const [totalReports, setTotalReports] = useState<number>(0);
  const [approvedReports, setApprovedReports] = useState<number>(0);
  const [rejectedReports, setRejectedReports] = useState<number>(0);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);

  useEffect(() => {
    setTotalReports(reports.length);
    setApprovedReports(reports.filter(report => report.status === 'Approved').length);
    setRejectedReports(reports.filter(report => report.status === 'Rejected').length);
  }, [reports]);
  
  const filteredReports = reports.filter(report => {
    if (statusFilter && report.status !== statusFilter) return false;
    if (severityFilter && report.severity !== severityFilter) return false;
    return true;
  });
  
  const handleViewReport = (report: Report) => {
    const base = '/dashboard/researcher/reports';
    
    switch(report.status) {
      case 'Approved':
        router.push(`${base}/success/${report.id}`);
        break;
      case 'Rejected':
        router.push(`${base}/reject/${report.id}`);
        break;
      case 'Pending':
      default:
        router.push(`${base}/${report.id}`);
    }
  };
  
  const handleStatusFilter = (status: string) => {
    setStatusFilter(statusFilter === status ? null : status);
  };
  
  const handleSeverityFilter = (severity: string) => {
    setSeverityFilter(severityFilter === severity ? null : severity);
  };
  
  const fadeIn = "transition-opacity duration-300 ease-in-out";
  const scaleIn = "transition-transform duration-300 ease-in-out";

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className={`w-full md:w-1/3 rounded-[20px] border border-[#464043] p-6 flex flex-col gap-2.5 bg-[#110D0F] ${scaleIn} hover:scale-[1.02]`}>
          <div className="w-8 h-8">
            <img 
                src="/Vector-2.svg" 
                alt="Vector" 
                className=""
              />
          </div>
          
          <div className="font-sora font-bold text-[28px] leading-[100%] text-white">
            {totalReports}
          </div>
          
          <div className="font-inter font-light text-[14px] leading-[150%] text-white">
            Total Reports Submitted
          </div>
        </div>

        <div className={`w-full md:w-1/3 rounded-[20px] border border-[#464043] p-6 flex flex-col gap-2.5 bg-[#110D0F] ${scaleIn} hover:scale-[1.02]`}>
          <div className="w-8 h-8">
            <img 
                src="/ic_outline-pending-actions.svg" 
                alt="ic-outline" 
                className=""
              />
          </div>
          
          <div className="font-sora font-bold text-[28px] leading-[100%] text-white">
            {approvedReports}
          </div>
          
          <div className="font-inter font-light text-[14px] leading-[150%] text-white">
            Approved Reports
          </div>
        </div>

        <div className={`w-full md:w-1/3 rounded-[20px] border border-[#464043] p-6 flex flex-col gap-2.5 bg-[#110D0F] ${scaleIn} hover:scale-[1.02]`}>
          <div className="w-8 h-8">
            <img 
                  src="/Vector-3.svg" 
                  alt="vector-3" 
                  className=""
                />
          </div>
          
          <div className="font-sora font-bold text-[28px] leading-[100%] text-white">
            {rejectedReports}
          </div>
          
          <div className="font-inter font-light text-[14px] leading-[150%] text-white">
            Rejected Reports
          </div>
        </div>
      </div>

       {/* Reports List Section */}
      <div className={`w-full rounded-[20px] border border-[#464043] bg-[#161113] mt-8 ${fadeIn}`}>
        <div className="flex flex-col md:flex-row justify-between items-center px-6 py-5 gap-4">
          <h2 className="text-[24px] font-sora font-semibold text-white leading-[100%]">
            Reports
          </h2>
          
          <div className="flex flex-wrap gap-4">
            <div className="relative">
              <div 
                className="h-[42px] flex items-center gap-1.5 px-4 border border-[#464043] cursor-pointer"
                onClick={() => {
                  const dropdown = document.getElementById('statusDropdown');
                  if (dropdown) dropdown.classList.toggle('hidden');
                }}
              >
                <img 
                  src="/Vector.svg" 
                  alt="vector" 
                  className=""
                />
                <span className="text-white text-sm">Status {statusFilter ? `(${statusFilter})` : ''}</span>
              </div>
              
              <div id="statusDropdown" className="absolute z-10 mt-2 w-40 hidden bg-[#211A1D] border border-[#464043] rounded-lg shadow-lg">
                <ul className="py-2">
                  {['Approved', 'Rejected', 'Pending'].map((status) => (
                    <li 
                      key={status} 
                      className="px-4 py-2 text-white hover:bg-[#2D272B] cursor-pointer"
                      onClick={() => {
                        handleStatusFilter(status);
                        const dropdown = document.getElementById('statusDropdown');
                        if (dropdown) dropdown.classList.add('hidden');
                      }}
                    >
                      {status}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="relative">
              <div 
                className="h-[42px] flex items-center gap-1.5 px-4 border border-[#464043] cursor-pointer"
                onClick={() => {
                  const dropdown = document.getElementById('severityDropdown');
                  if (dropdown) dropdown.classList.toggle('hidden');
                }}
              >
                <img 
                  src="/Vector.svg" 
                  alt="vector" 
                  className=""
                />
                <span className="text-white text-sm">Severity Level {severityFilter ? `(${severityFilter})` : ''}</span>
              </div>
              
              <div id="severityDropdown" className="absolute z-10 mt-2 w-40 hidden bg-[#211A1D] border border-[#464043] rounded-lg shadow-lg">
                <ul className="py-2">
                  {['Critical', 'High', 'Medium', 'Low'].map((severity) => (
                    <li 
                      key={severity} 
                      className="px-4 py-2 text-white hover:bg-[#2D272B] cursor-pointer"
                      onClick={() => {
                        handleSeverityFilter(severity);
                        const dropdown = document.getElementById('severityDropdown');
                        if (dropdown) dropdown.classList.add('hidden');
                      }}
                    >
                      {severity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Report List Content */}
        <div className="px-6 pb-6 pt-4 overflow-x-auto">
          <div className="flex justify-between items-center bg-[#211A1D] rounded-t-[10px] p-5 min-w-[700px]">
            <div className="w-[15%] text-white font-inter font-medium text-base">Report ID</div>
            <div className="w-[30%] text-white font-inter font-medium text-base">Project Name</div>
            <div className="w-[20%] text-white font-inter font-medium text-base">Severity</div>
            <div className="w-[20%] text-white font-inter font-medium text-base">Status</div>
            <div className="w-[15%] text-white font-inter font-medium text-base">Action</div>
          </div>
          
          {filteredReports.length > 0 ? (
            filteredReports.map((report, index) => (
              <div 
                key={report.id} 
                className={`flex justify-between items-center p-5 ${
                  index !== filteredReports.length - 1 ? 'border-b border-[#464043]' : ''
                } ${fadeIn} min-w-[700px]`}
              >
                <div className="w-[15%] text-white font-inter font-normal text-sm">{report.id}</div>
                <div className="w-[30%] text-white font-inter font-normal text-sm">{report.projectName}</div>
                <div className="w-[20%]">
                  <StatusBadge status={report.severity} />
                </div>
                <div className="w-[20%]">
                  <StatusBadge status={report.status} />
                </div>
                <div 
                  className="w-[15%] text-[#0000FF] font-inter font-normal text-sm cursor-pointer hover:underline"
                  onClick={() => handleViewReport(report)}
                >
                  View Report
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-400">
              No reports match the selected filters
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;