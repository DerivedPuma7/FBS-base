import { dataSource } from "@/infra/database/typeorm/config/datasource.config";
import { Setups } from "@/setups";
import { Seeds } from "@/tests/e2e/seeds/e2e.seeds";

import { type INestApplication, type ModuleMetadata } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export class TestModuleFactory {
  static async makeModule(moduleMetadata: ModuleMetadata): Promise<INestApplication> {
    const module = await Test.createTestingModule({
      imports: [
        // TypeOrmModule.forRootAsync({
        //   dataSourceFactory: async () => {
        //     await dataSource.initialize();
        //     return dataSource;
        //   },
        //   useFactory: () => ({}),
        // }),
        ...(moduleMetadata.imports?.length ? moduleMetadata.imports : []),
      ],
      controllers: moduleMetadata.controllers,
      providers: [
        ...(moduleMetadata.providers ?? []),
        Seeds,
      ],
      exports: moduleMetadata.exports,
    }).compile();

    const app = module.createNestApplication();
    await Setups.setApp(app).middlewares().startDependencies();
    // await TestModuleFactory.setDatabase(app);
    // await TestModuleFactory.runSeeds(app);

    await app.init();
    return app;
  }

  static async setDatabase(app: INestApplication): Promise<void> {
    const ds = app.get(DataSource);
    await ds.dropDatabase();
    await ds.runMigrations();
  }

  static async runSeeds(app: INestApplication): Promise<void> {
    const ds = app.get(DataSource);
    const seeds = app.get(Seeds);
    await seeds.run(ds.createQueryRunner());
  }

  static async dropModule(app: INestApplication): Promise<void> {
    await app.close();
  }
}
