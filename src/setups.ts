import {
  type INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export abstract class Setups {
  static app: INestApplication;

  static setApp(app: INestApplication): typeof Setups {
    this.app = app;
    return this;
  }

  static swagger(): typeof Setups {
    this.app.enableVersioning({ type: VersioningType.URI });
    const config = new DocumentBuilder()
      .setTitle('New application')
      .setDescription('The new application description')
      .setVersion('1')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(this.app, config);

    const routeSwagger: string = '/docs';

    SwaggerModule.setup(`${routeSwagger}`, this.app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        defaultModelsExpandDepth: 0,
        docExpansion: 'none',
      },
    });

    return this;
  }

  static middlewares(): typeof Setups {
    this.app.useGlobalPipes(new ValidationPipe());
    return this;
  }

  static async startDependencies(): Promise<void> {
    this.app.enableShutdownHooks();
    await this.app.startAllMicroservices();
  }
}
