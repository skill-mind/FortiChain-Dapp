// app/admin/project/index.tsx

import React from 'react';
import Card from '@/app/shared/Card';

const projects = [
  {
    id: 1,
    title: 'Validator Node Setup',
    description: 'Step-by-step validator guide with staking rules.',
    status: 'In Progress',
  },
  {
    id: 2,
    title: 'Tokenomics Audit',
    description: 'Audit results and improvement proposals.',
    status: 'Completed',
  },
  {
    id: 3,
    title: 'Smart Contract Review',
    description: 'Pending review by security team.',
    status: 'Pending',
  },
];

export default function AdminProjectPage() {
  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Project Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card
            key={project.id}
            title={project.title}
            description={project.description}
            status={project.status}
          />
        ))}
      </div>
    </div>
  );
}
