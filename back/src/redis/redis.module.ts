import {
  Global,
  Logger,
  Module,
  OnModuleInit,
  OnApplicationShutdown,
  Inject,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './redis.constants';

const logger = new Logger('RedisModule');

const redisProvider = {
  provide: REDIS_CLIENT,
  inject: [ConfigService],
  useFactory: (config: ConfigService): Redis => {
    const redis = new Redis({
      host: config.getOrThrow<string>('REDIS_HOST'),
      port: Number(config.getOrThrow('REDIS_PORT')),
      lazyConnect: true,
      enableReadyCheck: true,
      maxRetriesPerRequest: 3,
      retryStrategy: (times: number) => {
        const delay = Math.min(times * 200, 3000);

        if (times > 10) {
          logger.error('Redis max retry attempts reached');
          return null; // stop retry
        }

        return delay;
      },
    });

    // lifecycle events
    redis.on('connect', () => logger.log('TCP connected'));
    redis.on('ready', () => logger.log('Redis ready'));
    redis.on('error', (err) => logger.error('Redis error', err));
    redis.on('close', () => logger.warn('Redis connection closed'));
    redis.on('reconnecting', () => logger.log('Redis reconnecting'));

    return redis;
  },
};

@Global()
@Module({
  providers: [redisProvider],
  exports: [redisProvider],
})
export class RedisModule implements OnModuleInit, OnApplicationShutdown {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async onModuleInit() {
    try {
      const pong = await this.redis.ping();

      if (pong !== 'PONG') {
        throw new Error(`Unexpected Redis response: ${String(pong)}`);
      }

      logger.log('Redis is healthy (PONG)');
    } catch (err) {
      logger.error('Redis initialization failed', err);
      throw err; // fail fast (production-safe)
    }
  }

  async onApplicationShutdown() {
    try {
      await this.redis.quit();
      logger.log('Redis connection closed gracefully');
    } catch (err) {
      logger.error('Error while closing Redis', err);
    }
  }
}
