import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { buildAsyncApiDocs } from './docs/ws/config';
import { RequestMethod } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'node:path';
import { setLoggering } from './common/utils/setLoggering';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);

  setLoggering(app);

  app.set('trust proxy', true);
  app.enableCors({
    origin: config.getOrThrow<string>('FRONT_ORIGIN'),
    credentials: true,
  });
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api', {
    exclude: [
      { path: 'docs', method: RequestMethod.ALL },
      { path: 'static', method: RequestMethod.GET },
    ],
  });

  app.setViewEngine('ejs');
  app.setBaseViewsDir(path.join(__dirname, 'templates'));

  await buildAsyncApiDocs();
  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server started on port ${process.env.PORT ?? 3000}`);
  });
}
bootstrap().catch((err) => console.log(err));
