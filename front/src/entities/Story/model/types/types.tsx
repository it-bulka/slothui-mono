import type { StoryDTO } from '@/shared/libs/services';
export interface StoryWrapperProps {
  duration: number
}

export type StoryProps = StoryDTO & { onComplete?: () => void }