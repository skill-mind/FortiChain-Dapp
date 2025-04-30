import React from 'react';
import Link from 'next/link';

export const BackButton: React.FC = () => {
  return (
    <Link 
      href="/dashboard/researcher/reports" 
      className="flex items-center gap-2 text-white hover:text-gray-300 
                transition-all duration-300 transform hover:translate-x-[-5px] w-fit"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 10H5M5 10L10 15M5 10L10 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span>Go Back</span>
    </Link>
  );
};