import { memo, useCallback } from 'react';
import { Button } from '@/shared/ui/Button/Button';
import { type ResetPasswordFormData, resetPasswordSchema } from '../../model';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthService } from '@/shared/libs/services';
import { toast } from 'react-toastify';
import { AuthInput } from '@/features/authUser/ui/AuthInput.tsx';

const inputs = [
  { name: 'password', label: 'New password', placeholder: 'New password', type: 'password' },
  { name: 'confirmPassword', label: 'Confirm password', placeholder: 'Confirm password', type: 'password' },
] as const

export const ResetPasswordForm = memo(({ token, onSuccess }: { token?: string | null, onSuccess?: () => void }) => {
  const { control, handleSubmit, formState: { isDirty, isSubmitting } } = useForm<ResetPasswordFormData>({
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
      {inputs.map(({ name, label, placeholder, type }) => (
        <AuthInput<ResetPasswordFormData>
          key={name}
          name={name}
          label={label}
          placeholder={placeholder}
          control={control}
          type={type}
        />
      ))}

      <Button className="ml-auto" type="submit" disabled={!isDirty || isSubmitting}>
        Reset password
      </Button>
    </form>
  )
})

ResetPasswordForm.displayName = 'ResetPasswordForm'
