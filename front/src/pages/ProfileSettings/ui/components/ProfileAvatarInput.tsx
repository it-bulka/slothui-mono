import { Controller } from 'react-hook-form'
import { FileInput } from '@/shared/ui'
import DefaultAvatar from '@/shared/assets/images/default/avatar-default.png'
import type { Control } from 'react-hook-form'
import type { ProfileFormValues } from '../../model'

interface ProfileAvatarInputProps {
  control: Control<ProfileFormValues>
  avatarUrl?: string | null
  resetKey: number
}

export const ProfileAvatarInput = ({ control, avatarUrl, resetKey }: ProfileAvatarInputProps) => {
  return (
    <Controller
      key={resetKey} // for preview  reset
      name="avatarFile"
      control={control}
      render={({ field }) => (
        <FileInput
          name="avatarFile"
          title="Upload New Avatar"
          maxFiles={1}
          accept="image/*"
          defaultPreview={avatarUrl ?? DefaultAvatar}
          onChange={field.onChange}
        />
      )}
    />
  )
}
