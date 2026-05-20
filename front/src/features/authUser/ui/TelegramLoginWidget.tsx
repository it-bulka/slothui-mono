import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '@/shared/config/redux';
import { loginWithTelegramWidget, type TelegramWidgetUser } from '@/entities/AuthUser';
import { useUpdateToken } from '@/shared/libs/services';
import { getHomePage } from '@/shared/config/routeConfig/routeConfig.tsx';

const BOT_USERNAME = import.meta.env.VITE_TELEGRAM_BOT_USERNAME as string | undefined;

export const TelegramLoginWidget = () => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const updateToken = useUpdateToken();

  useEffect(() => {
    if (!ref.current || !BOT_USERNAME) return;

    (window as unknown as Record<string, unknown>).onTelegramAuth = (user: TelegramWidgetUser) => {
      dispatch(loginWithTelegramWidget(user))
        .unwrap()
        .then((res) => {
          updateToken(res.token);
          navigate(getHomePage());
        })
        .catch(() => {});
    };

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', BOT_USERNAME);
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '8');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    script.async = true;
    ref.current.appendChild(script);

    return () => {
      delete (window as unknown as Record<string, unknown>).onTelegramAuth;
    };
  }, [dispatch, navigate, updateToken]);

  if (!BOT_USERNAME) return null;

  return <div ref={ref} className="flex justify-center" />;
};
