import React from 'react';

interface ActionButtonProps {
    variant?: 'primary' | 'danger' | 'secondary';
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ 
    variant = 'primary', 
    children, 
    className = '',
    onClick 
}) => {
    const baseClasses = 'w-[198px] h-[57px] flex items-center justify-center rounded-[10px] py-3.5 px-8 font-inter font-semibold text-base';
    
    const variantClasses = {
        primary: 'bg-white text-black',
        danger: 'border border-[#6B6668] text-[#FF3737]',
        secondary: 'bg-[#0000FF] text-white'
    };

    return (
        <button 
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        onClick={onClick}
        >
        {children}
        </button>
    );
};

// Specific action buttons for Success page
export const SuccessActions = () => {
    return (
        <>
        <ActionButton variant="primary">
            View Project
        </ActionButton>
        <ActionButton variant="danger">
            Delete Report
        </ActionButton>
        </>
    );
};