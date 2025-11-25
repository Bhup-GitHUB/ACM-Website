import { useState, useEffect } from 'react';

const STORAGE_KEY = 'acm_dsa_progress_v1';

export const useDSAProgress = () => {
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error('Failed to load progress', e);
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress', e);
    }
  }, [progress]);

  const toggleStatus = (id) => {
    setProgress(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        completed: !prev[id]?.completed
      }
    }));
  };

  const toggleRevision = (id) => {
    setProgress(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        revision: !prev[id]?.revision
      }
    }));
  };

  const updateNote = (id, note) => {
    setProgress(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        note
      }
    }));
  };

  const getProgress = (id) => {
    return progress[id] || { completed: false, revision: false, note: '' };
  };

  const calculateProgress = (totalQuestions) => {
    const completedCount = Object.values(progress).filter(p => p.completed).length;
    return {
      completed: completedCount,
      total: totalQuestions,
      percentage: totalQuestions > 0 ? Math.round((completedCount / totalQuestions) * 100) : 0
    };
  };

  return {
    progress,
    toggleStatus,
    toggleRevision,
    updateNote,
    getProgress,
    calculateProgress
  };
};
