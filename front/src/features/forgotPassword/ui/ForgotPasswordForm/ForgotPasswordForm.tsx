import { memo, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ForgotPasswordFormData, forgotPasswordSchema } from '../../modal';
import { useAuthService } from '@/shared/libs/services';
import { toast } from 'react-toastify';

export const ForgotPasswordForm = memo(({ onSuccess }: { onSuccess?: () => void }) => {
  const { control, handleSubmit, formState: { isDirty, isSubmitting } } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema)
  })
  const authService = useAuthService();

  const onSubmit = useCallback(async (data: ForgotPasswordFormData) => {
    try {
      await authService.forgotPassword({ email: data.email });
      onSuccess?.()
    } catch (err) {
      toast.error((err as Error)?.message || 'Failed to reset password');
    }
  }, [authService, onSuccess])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <Input
            label="Email"
            placeholder="your@email.com"
            {...field}
            error={fieldState.error?.message}
          />
        )}
      />

      <Button type="submit" className="min-w-[50%] ml-auto" disabled={!isDirty || isSubmitting}>
        Send reset link
      </Button>
    </form>
  )
})

ForgotPasswordForm.displayName = 'ForgotPasswordForm'
