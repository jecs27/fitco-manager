import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType, ValidationPipe, Logger } from '@nestjs/common';
import helmet from 'helmet';
import { PREFIX } from './common/config';

const logger = new Logger('HTTP');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  app.setGlobalPrefix(PREFIX);

  app.useGlobalPipes(new ValidationPipe());

  app.use(
    helmet({
      contentSecurityPolicy: true,
      referrerPolicy: true,
      xssFilter: true,
      xContentTypeOptions: true,
      xDownloadOptions: true,
      dnsPrefetchControl: true,
    }),
  );

  app.use((req, res, next) => {
    logger.debug(`${req.method} ${req.originalUrl}`);
    next();
  });

  const port = process.env.PORT || 3100;
  await app.listen(port);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch((err) => {
  logger.error('Error starting server:', err);
  process.exit(1);
});
