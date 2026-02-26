import { Button } from '@/shared/ui';
import { type ResetPasswordFormData, resetPasswordSchema } from '../../model';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthService } from '@/shared/libs/services';
import { toast } from 'react-toastify'
import { AuthInput } from '@/features/authUser/ui/AuthInput.tsx';

const inputs = [
  { name: 'password', placeholder: 'New password', type: 'password' },
  { name: 'confirmPassword', placeholder: 'Repeat New password', type: 'password' },
] as const

export const ResetPasswordForm = ({ token, onSuccess }: { token?: string | null, onSuccess?: () => void }) => {
  const { control, handleSubmit, formState } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema)
  })
  const authService = useAuthService();

  const submitHandler = useCallback(async (data: ResetPasswordFormData) => {
    if (!token) {
      toast.warn('No token. Failed to reset password');
      return;
    }
    try {
      await authService.resetPassword({ password: data.password, token })
      onSuccess?.()
    } catch (err) {
      toast.warn((err as Error)?.message || 'Failed to reset password');
    }
  }, [token, authService, onSuccess])

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(submitHandler)}>
      {inputs.map(({ name, placeholder, type }) => (
        <AuthInput<ResetPasswordFormData>
          key={name}
          name={name}
          label={name}
          placeholder={placeholder}
          control={control}
          type={type}
        />
      ))}

      <Button className="ml-auto" type="submit" disabled={!formState.isDirty}>Confirm</Button>
    </form>
  )
}