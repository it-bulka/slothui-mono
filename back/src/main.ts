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
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

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

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api', {
    exclude: [
      { path: 'docs', method: RequestMethod.ALL },
      { path: 'docs/rest', method: RequestMethod.ALL },
      { path: 'docs/rest-json', method: RequestMethod.GET },
      { path: 'static', method: RequestMethod.GET },
    ],
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('SlothUI API')
    .setDescription('REST API for the SlothUI social network')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .addCookieAuth('refresh_token')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs/rest', app, document, {
    jsonDocumentUrl: 'docs/rest-json',
  });

  app.setViewEngine('ejs');
  app.setBaseViewsDir(path.join(__dirname, 'templates'));

  await buildAsyncApiDocs();
  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server started on port ${process.env.PORT ?? 3000}`);
  });
}
bootstrap().catch((err) => console.log(err));
