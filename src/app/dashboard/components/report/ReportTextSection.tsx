import React, { ReactNode } from 'react';

interface ReportTextSectionProps {
    title: string;
    content: ReactNode;
}

export const ReportTextSection: React.FC<ReportTextSectionProps> = ({ title, content }) => {
    return (
    <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
        <div className="text-white">
        {typeof content === 'string' ? <p>{content}</p> : content}
        </div>
    </div>
    );
};