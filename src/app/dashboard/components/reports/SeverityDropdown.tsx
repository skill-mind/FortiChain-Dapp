"use client"
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from "lucide-react";
import { ReportData } from '../../project-owner/reports/data';

interface Props {
    selectedSeverities: ReportData['severity'][];
    allSeverities: ReportData['severity'][];
    onSelectChange: (severity: ReportData['severity']) => void;
}

const SeverityDropdown: React.FC<Props> = ({ selectedSeverities, allSeverities, onSelectChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getButtonLabel = () => {
        if (selectedSeverities.length === 0) {
            return "Severity";
        } else if (selectedSeverities.length === 1) {
            return selectedSeverities[0];
        } else {
            return `${selectedSeverities.length} Selected`;
        }
    };

     const renderCheckmark = (isSelected: boolean) => (
        <Check
            className={`w-5 h-5 text-white ml-2 ${isSelected ? "opacity-100" : "opacity-0"}`}
        />
    );

    return (
        <div className="" ref={dropdownRef}>
            <button
                className="flex items-center justify-between px-4 py-2 rounded-lg bg-[#161113] border border-[#464043] text-[13px] focus:outline-none focus:border-gray-500 min-w-[120px]"
                onClick={() => setIsOpen(!isOpen)}
            >
                {getButtonLabel()}
                <ChevronDown className={`w-5 h-5 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute z-10 mt-2 w-[120px] rounded-[10px] shadow-lg bg-[#0B090A] border border-[#464043]  max-h-60 overflow-y-auto">
                    <ul className="space-y-1">
                        {allSeverities.map(severity => (
                            <li
                                key={severity}
                                className="flex items-center justify-between px-3 py-2 text-sm text-white hover:bg-[#2c2c2cb4] cursor-pointer"
                                onClick={() => onSelectChange(severity)}
                            >
                                <span>{severity}</span>
                                {renderCheckmark(selectedSeverities.includes(severity))}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SeverityDropdown;