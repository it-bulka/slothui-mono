import { memo } from 'react';
import { Skeleton } from '@/shared/ui';

export const UserRightSidebarLoader = memo(() => {
  return (
    <aside className="px-sidebar py-sidebar border-style-l bg-underground-secondary">

      {/* UserProfileData: centered avatar + name + nickname */}
      <div className="flex flex-col items-center gap-2 mb-4">
        <Skeleton width={64} height={64} border="50%" />
        <Skeleton width="55%" height={14} />
        <Skeleton width="40%" height={12} />
      </div>

      {/* Statistics: 3 blocks */}
      <div className="flex justify-between mb-4">
        <Skeleton width="28%" height={32} border="8px" />
        <Skeleton width="28%" height={32} border="8px" />
        <Skeleton width="28%" height={32} border="8px" />
      </div>

      {/* ActionRow: 2 pill buttons */}
      <div className="flex justify-between mb-4">
        <Skeleton width="45%" height={36} border="20px" />
        <Skeleton width="45%" height={36} border="20px" />
      </div>

      {/* SidebarInfoCard "About" */}
      <div className="bg-white rounded-xl border border-gray-g3 mb-4 overflow-hidden">
        <div className="px-4 pt-4 pb-3">
          <Skeleton width="35%" height={14} />
        </div>
        <hr className="border-gray-g3" />
        <div className="px-4 py-3 flex flex-col gap-2">
          <Skeleton height={12} width="90%" />
          <Skeleton height={12} width="70%" />
        </div>
      </div>

      {/* SidebarInfoCard "Contact Information" */}
      <div className="bg-white rounded-xl border border-gray-g3 mb-4 overflow-hidden">
        <div className="px-4 pt-4 pb-3">
          <Skeleton width="55%" height={14} />
        </div>
        <hr className="border-gray-g3" />
        <div className="px-4 py-3 flex flex-col gap-3">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton width={16} height={16} border="4px" />
              <Skeleton width="65%" height={12} />
            </div>
          ))}
        </div>
      </div>

      {/* MemberSince */}
      <div className="flex items-center gap-2">
        <Skeleton width={16} height={16} border="4px" />
        <Skeleton width="55%" height={12} />
      </div>

    </aside>
  );
});

UserRightSidebarLoader.displayName = 'UserRightSidebarLoader';
