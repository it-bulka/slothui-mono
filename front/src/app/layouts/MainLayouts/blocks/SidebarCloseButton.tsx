import { useSidebarContext } from '../SidebarContext';

export const SidebarCloseButton = () => {
  const { close } = useSidebarContext();

  return (
    <button
      onClick={close}
      className="p-1.5 rounded-full text-gray-g1 hover:bg-light-l3 hover:text-dark transition-colors"
      aria-label="Close sidebar"
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
};
