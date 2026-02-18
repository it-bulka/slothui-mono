import { Controller, useForm } from 'react-hook-form';
import { Button, Input } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ForgotPasswordFormData, forgotPasswordSchema } from '../../modal';
import { useAuthService } from '@/shared/libs/services';
import { toast } from 'react-toastify'
import { useCallback } from 'react';

export const ForgotPasswordForm = ({ onSuccess }:{ onSuccess?: () => void}) => {
  const { control, handleSubmit, formState } = useForm<ForgotPasswordFormData>({
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
        render={({ field, formState }) => (
          <Input
            placeholder={"Enter email"}
            {...field}
            error={formState.errors[field.name]?.message}
          />
        )}
      />

      <Button type="submit" className="min-w-[50%] ml-auto" disabled={!formState.isDirty}>
        Confirm
      </Button>
    </form>
  )
}