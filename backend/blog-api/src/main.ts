import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

function configurationSwagger(app: NestFastifyApplication) {
  const config = new DocumentBuilder()
    .setTitle('Blog REST API')
    .setDescription('Api for Blog')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('blog-api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      cors: true,
    },
  );

  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const port: number = configService.get('http.port');

  configurationSwagger(app);
  await app
    .listen(port, '0.0.0.0')
    .then(() =>
      new Logger('bootstrap').log(`Application listening on port ${port}`),
    );
}
bootstrap().then(() => Logger.log('Bootstrap ended'));
