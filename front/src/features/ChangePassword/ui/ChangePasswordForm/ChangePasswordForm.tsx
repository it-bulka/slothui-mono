import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ChangePasswordFormData, changePasswordSchema } from '../../module';
import { Button } from '@/shared/ui';
import { ChangePasswordInput } from '../ChangePasswordInput/ChangePasswordInput.tsx';
import { useCallback, memo } from 'react';
import { useUserService } from '@/shared/libs/services';
import { toast } from 'react-toastify'

const ChangePasswordForm = memo(() => {
  const userService = useUserService()
  const { handleSubmit, control, formState, reset } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema)
  })

  const submitHandler = useCallback(async (data: ChangePasswordFormData) => {
    try {
      await userService.changePassword({ oldPassword: data.oldPassword, newPassword: data.password })
      reset()
      toast.info('Password successfully changed')
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toast.error(err?.message || 'Failed to change password')
    }
  }, [userService, reset])

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitHandler)} >
      <ChangePasswordInput control={control} name="oldPassword" label="Existed password" />
      <ChangePasswordInput control={control} name="password" label="New password" />
      <ChangePasswordInput control={control} name="confirmPassword" label="Repeat New password" />
      <Button className="ml-auto" type="submit" disabled={!formState.isDirty}>Confirm</Button>
    </form>
  )
})

ChangePasswordForm.displayName = 'ChangePasswordForm';

export default ChangePasswordForm;