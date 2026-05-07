import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { WS_RATE_LIMIT_KEY } from './ws-rate-limiter.decorator';

const limiters = new Map<string, RateLimiterMemory>();

@Injectable()
export class WsRateLimiterGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const config = this.reflector.get<{ points: number; duration: number }>(
      WS_RATE_LIMIT_KEY,
      context.getHandler(),
    );
    if (!config) return true;

    const client = context
      .switchToWs()
      .getClient<{ data?: { user?: { id?: string } } }>();
    const userId = client.data?.user?.id;
    if (!userId) return false;

    const handlerName = context.getHandler().name;
    if (!limiters.has(handlerName)) {
      limiters.set(handlerName, new RateLimiterMemory(config));
    }

    try {
      await limiters.get(handlerName)!.consume(userId);
      return true;
    } catch {
      return false;
    }
  }
}
