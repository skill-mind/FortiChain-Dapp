// app/shared/Card.tsx

import React from 'react';
import StatusBadge from './StatusBadge';
import { motion } from 'framer-motion';

interface CardProps {
  title: string;
  description: string;
  status: string;
}

export default function Card({ title, description, status }: CardProps) {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <StatusBadge status={status} />
    </motion.div>
  );
}
