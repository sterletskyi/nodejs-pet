import { NestFastifyApplication } from '@nestjs/platform-fastify';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export function swaggerInitialization(app: NestFastifyApplication) {
  const config = new DocumentBuilder()
    .setTitle('KGS')
    .setDescription('KGS features')
    .setVersion('1.0')
    .addTag('KGS')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api-doc', app, document, customOptions);
}
