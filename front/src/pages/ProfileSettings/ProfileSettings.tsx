import { Input, Button } from '@/shared/ui';
import { SubSettingsWrapper } from '../Settings/SubSettingsWrapper.tsx';
import DefaultAvatar from '@/shared/assets/images/default/avatar-default.png'
import { useAuthUserSelector, useUpdateProfile } from '@/entities';
import { useForm } from "react-hook-form"
import { useEffect, useMemo, useState, useCallback } from 'react';
import type { ProfileFormValues } from './model';
import { ProfileTextInput, ProfileAvatarInput } from './ui/components';
import type { UpdateUserDto } from '@/shared/types';

const ProfileSettings = () => {
  const authUser = useAuthUserSelector()
  const { updateProfile } = useUpdateProfile()

  const [avatarKey, setAvatarKey] = useState(0)
  const { control, reset, handleSubmit, formState } = useForm<ProfileFormValues>({
    defaultValues: {
      username: authUser?.username ?? "",
      nickname: authUser?.nickname ?? "",
      bio: authUser?.bio ?? "",
      avatarUrl: authUser?.avatarUrl ?? DefaultAvatar,
    }
  })

  useEffect(() => {
    if (!authUser) return
    reset({
      username: authUser.username,
      bio: authUser.bio ?? "",
      avatarUrl: authUser.avatarUrl ?? DefaultAvatar,
    })
  }, [authUser, reset])

  const initialValues = useMemo(() => ({
    username: authUser?.username || "",
    nickname: authUser?.nickname || "",
    bio: authUser?.bio || "",
  }), [authUser])

  const onSubmit = async (data: ProfileFormValues) => {
    const dataToUpdate: UpdateUserDto = {}

    if (formState.dirtyFields.username) {
      dataToUpdate.username = data.username
    }

    if (formState.dirtyFields.bio) {
      dataToUpdate.bio = data.bio || ''
    }

    if (data.avatarFile?.[0]) {
      dataToUpdate.avatar = data.avatarFile[0]
    }

    await updateProfile(dataToUpdate)
  }

  const resetFormData = useCallback(() => {
    reset(initialValues)
    setAvatarKey(k => k + 1)
  }, [initialValues, reset, setAvatarKey])

  if(!authUser) return <p>No authorized user</p>;
  return (
    <SubSettingsWrapper title="Profile Settings">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <ProfileAvatarInput control={control} avatarUrl={authUser.avatarUrl} resetKey={avatarKey} />
        <ProfileTextInput control={control} name="username" label="Username" />
        <ProfileTextInput control={control} name="nickname" label="Nickname" />
        <ProfileTextInput control={control} name="bio" label="About me" />

        {authUser.email && <Input name="email" label="Email" readOnly value={authUser.email} />}

        <div className="flex gap-2 w-full">
          <Button
            className="grow"
            type="button"
            onClick={resetFormData}
            disabled={!formState.isDirty}
          >
            Reset
          </Button>

          <Button
            className="grow"
            type="submit"
            disabled={!formState.isDirty}
          >
            Save
          </Button>
        </div>

      </form>
    </SubSettingsWrapper>
  )
}

export default ProfileSettings
