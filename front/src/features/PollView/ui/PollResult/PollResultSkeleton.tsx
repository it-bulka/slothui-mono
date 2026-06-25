import { memo } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton';
import cls from './PollResultModal.module.css';

const SKELETON_COUNT = 3

export const PollResultSkeleton = memo(() => (
  <div className={cls.optionsList}>
    {Array.from({ length: SKELETON_COUNT }, (_, i) => (
      <div key={i} className={cls.skeletonOption}>
        <Skeleton height={16} width="60%" border="8px" />
        <Skeleton height={6} width="100%" border="12px" />
        <Skeleton height={16} width="30%" border="8px" />
      </div>
    ))}
  </div>
))

PollResultSkeleton.displayName = 'PollResultSkeleton'
