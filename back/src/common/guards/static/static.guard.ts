import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StaticGuardMiddleware implements NestMiddleware {
  allowedBots = [
    'facebookexternalhit',
    'Facebot',
    'TelegramBot',
    'TwitterBot',
    'LinkedInBot',
    'Viber',
  ];
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const url = req.originalUrl;
    const referer = req.headers.referer || '';
    const ua = req.headers['user-agent'] || '';

    const frontOrigin = this.configService.getOrThrow<string>('FRONT_ORIGIN');

    const isBot = this.allowedBots.some((bot) => ua.includes(bot));
    const isMySite = referer.startsWith(frontOrigin);

    // === /public/social/* access for social media & my front
    if (url.startsWith('/social/')) {
      if (isBot || isMySite) {
        return next();
      }
      return res.status(403).send('Access denied');
    }

    // === All other static — only my front
    if (!isMySite) {
      return res.status(403).send('Access denied');
    }

    next();
  }
}
