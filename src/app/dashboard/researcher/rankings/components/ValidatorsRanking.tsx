  "use client"
import React, { useState } from 'react';
import TabNavigation from './TabNavigation';
import ValidatorsTable from './ValidatorsTable';
import ResearchersTable from './ResearchersTable';
import { Validator, Researcher } from '@/types/report';

// Sample data for validators
const mockValidators: Validator[] = [
  {
    rank: 1,
    username: 'Ebube',
    address: '0x4A7d5cB676...',
    audits: 8,
    reputation: 90,
    earned: 15000,
  },
  {
    rank: 2,
    username: 'Chika',
    address: '0x5B8f6cF45d...',
    audits: 12,
    reputation: 85,
    earned: 12500,
  },
  {
    rank: 3,
    username: 'Uche',
    address: '0x7C8e7fCeB3...',
    audits: 15,
    reputation: 92,
    earned: 18000,
  },
  {
    rank: 4,
    username: 'Adaobi',
    address: '0x8D9b5cC8A...',
    audits: 10,
    reputation: 88,
    earned: 14200,
  },
  {
    rank: 5,
    username: 'Ifij',
    address: '0x9E2gbcC98...',
    audits: 20,
    reputation: 91,
    earned: 19500,
  },
  {
    rank: 6,
    username: 'Nnamdi',
    address: '0xAf4dD5B3c...',
    audits: 6,
    reputation: 80,
    earned: 11000,
  },
  {
    rank: 7,
    username: 'Obinna',
    address: '0xB3eC9AHD7f...',
    audits: 18,
    reputation: 87,
    earned: 16750,
  },
  {
    rank: 8,
    username: 'Kelechi',
    address: '0xC5eB6F3E2...',
    audits: 14,
    reputation: 89,
    earned: 17000,
  },
];

// Sample data for researchers
const mockResearchers: Researcher[] = [
  {
    rank: 1,
    username: 'Ebube',
    address: '0x4A7d5cB676...',
    reports: 8,
    reputation: 90,
    earned: 15000,
  },
  {
    rank: 2,
    username: 'Chika',
    address: '0x5B8f6cF45d...',
    reports: 12,
    reputation: 85,
    earned: 12500,
  },
  {
    rank: 3,
    username: 'Uche',
    address: '0x7C8e7fCeB3...',
    reports: 15,
    reputation: 92,
    earned: 18000,
  },
  {
    rank: 4,
    username: 'Adaobi',
    address: '0x8D9b5cC8A...',
    reports: 10,
    reputation: 88,
    earned: 14200,
  },
  {
    rank: 5,
    username: 'Ifij',
    address: '0x9E2gbcC98...',
    reports: 20,
    reputation: 91,
    earned: 19500,
  },
  {
    rank: 6,
    username: 'Nnamdi',
    address: '0xAf4dD5B3c...',
    reports: 6,
    reputation: 80,
    earned: 11000,
  },
  {
    rank: 7,
    username: 'Obinna',
    address: '0xB3eC9AHD7f...',
    reports: 18,
    reputation: 87,
    earned: 16750,
  },
  {
    rank: 8,
    username: 'Kelechi',
    address: '0xC5eB6F3E2...',
    reports: 14,
    reputation: 89,
    earned: 17000,
  },
];

const tabs = [
  { id: 'researchers', label: 'Researchers Ranking' },
  { id: 'validators', label: 'Validators Ranking' },
];

interface ValidatorsRankingProps {
  userRank?: number; // Optional prop to highlight user's position
}

const ValidatorsRanking: React.FC<ValidatorsRankingProps> = ({ userRank = 1 }) => {
  const [activeTab, setActiveTab] = useState('researchers'); // Default to researchers tab

  return (
    <div className=" min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        {activeTab === 'researchers' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-white">
                Researchers Ranking
              </h1>
              <div className="bg-[#1F1F1F] text-white text-sm px-3 py-2 rounded-lg">
                <span className="text-gray-400">Your Rank |</span>
                <span className="ml-2 text-white font-semibold">{userRank}</span>
              </div>
            </div>
            <div className=" rounded-lg border border-gray-800">
              <ResearchersTable researchers={mockResearchers} userRank={userRank} />
            </div>
          </div>
        )}
        
        {activeTab === 'validators' && (
          <div>
            <h1 className="text-2xl font-bold text-white mb-6">
              Validators Ranking
            </h1>
            <div className=" rounded-lg border border-gray-800">
              <ValidatorsTable validators={mockValidators} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidatorsRanking;