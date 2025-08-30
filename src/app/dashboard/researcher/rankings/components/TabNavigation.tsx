import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="flex bg-[#101011] w-fit rounded-full p-1 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={` px-7 text-sm font-medium rounded-full transition-colors ${
            activeTab === tab.id
              ? 'bg-[#312F2F] rounded-full py-1 px-2 text-white'
              : 'border-transparent text-gray-400 hover:text-white '
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;