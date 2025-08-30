import { useState, useEffect } from 'react';
import { Validator } from '@/types/report';

export const useValidators = () => {
  const [validators, setValidators] = useState<Validator[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchValidators = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/validators');
      if (!response.ok) {
        throw new Error('Failed to fetch validators');
      }
      const data = await response.json();
      setValidators(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchValidators();
  }, []);

  return {
    validators,
    loading,
    error,
    refetch: fetchValidators,
  };
};