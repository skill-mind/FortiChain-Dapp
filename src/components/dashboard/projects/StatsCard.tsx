import React from 'react';
import { IconType } from 'react-icons';

interface StatsCardProps {
  icon: IconType;
  value: string | number;
  label: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon: Icon, value, label }) => {
  return (
    <div className="bg-[#2D2D2D] rounded-lg p-6 flex flex-col gap-4">
      <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <div>
        <h3 className="text-3xl font-semibold text-white mb-1">{value}</h3>
        <p className="text-gray-400">{label}</p>
      </div>
    </div>
  );
};

export default StatsCard; 