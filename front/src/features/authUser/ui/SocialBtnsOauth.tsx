import {
  FacebookLoginButton, GithubLoginButton,
  GoogleLoginButton,
  InstagramLoginButton,
  LinkedInLoginButton, TelegramLoginButton, TwitterLoginButton
} from 'react-social-login-buttons';
import { useAuthService } from '@/shared/libs/services';
import type { ElementType } from 'react';

const socialBtnCls = 'max-w-12 rounded-full flex items-center justify-center p-0';
type SocialAuthCb = keyof Pick<
  ReturnType<typeof useAuthService>,
  'loginWithGoogle' | 'loginWithFacebook' | 'loginWithInstagram' | 'loginWithTelegram' | 'loginWithGithub' | 'loginWithLinkedin' | 'loginWithTwitter'
>
const socialBtns: {
  Btn: ElementType,
  id: string,
  cb: SocialAuthCb
}[] = [
  { Btn: GoogleLoginButton, id: 'Google', cb: 'loginWithGoogle' },
  { Btn: FacebookLoginButton, id: 'Facebook', cb: 'loginWithFacebook' },
  { Btn: InstagramLoginButton, id: 'Instagram', cb: 'loginWithInstagram' },
  { Btn: LinkedInLoginButton, id: 'linkedIn', cb: 'loginWithLinkedin' },
  { Btn: TelegramLoginButton, id: 'Telegram', cb: 'loginWithTelegram' },
  { Btn: GithubLoginButton, id: 'Github', cb: 'loginWithGithub' },
  { Btn: TwitterLoginButton, id: 'Twitter', cb: 'loginWithTwitter' },
]

export const SocialBtnsOauth = () => {
  const authService = useAuthService();
  return (
    <div className="flex items-center flex-row gap-2 flex-wrap w-fit mx-auto">
      {socialBtns.map(({ Btn, id, cb }) => (
        <Btn
          key={id}
          onClick={async () => await authService[cb]()}
          text=""
          className={socialBtnCls}
        />
      ))}
    </div>
  )
}