import React from 'react';
import { BackButton } from '../../components/report/BackButton';

interface ReportLayoutProps {
    children: React.ReactNode;
    actions?: React.ReactNode;
}

export const ReportLayout: React.FC<ReportLayoutProps> = ({ children, actions }) => {
    return (
        <div className="w-full px-4 sm:px-6 md:px-8">
            <div className="w-full max-w-[1200px] mt-5 mx-auto flex flex-col gap-4 
                        transition-all duration-300 ease-in-out">
                <BackButton />
                <div className="w-full border border-[#464043] rounded-[12px] p-4 sm:p-6 md:p-10 
                                bg-[#1C1618] flex flex-col gap-6 md:gap-10
                                shadow-md hover:shadow-lg transition-all duration-300
                                overflow-hidden">
                    <div className="w-full overflow-x-auto thin-scrollbar">
                        {children}
                    </div>
                    {actions && (
                        <div className="w-full max-w-[421px] flex flex-col sm:flex-row items-center gap-4 sm:gap-6 self-start
                                    animate-slideUp transition-all duration-500 delay-100">
                            {actions}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};