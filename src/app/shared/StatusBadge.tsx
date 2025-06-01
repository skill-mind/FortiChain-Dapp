// app/shared/StatusBadge.tsx

import React from 'react';
import clsx from 'clsx';

export default function StatusBadge({ status }: { status: string }) {
  const colors = {
    Completed: 'bg-green-100 text-green-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    Pending: 'bg-red-100 text-red-800',
  };

  return (
    <span
      className={clsx(
        'text-xs font-medium px-3 py-1 rounded-full',
        colors[status as keyof typeof colors]
      )}
    >
      {status}
    </span>
  );
}
